package org.ets.core.utils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import com.day.cq.replication.ReplicationStatus;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.distribution.DistributionRequestType;
import org.apache.sling.distribution.Distributor;
import org.apache.sling.distribution.SimpleDistributionRequest;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.TagConstants;


@Component(service = Servlet.class, property = {
		"sling.servlet.methods=" + HttpConstants.METHOD_POST,
		"sling.servlet.paths=" + "/bin/bulkimportmetadata"})
@ServiceDescription("Metakeywords Update Servlet")
public class BulkImportPageTags extends SlingAllMethodsServlet {

	private static final String KEYWORDS = "KEYWORDS";
	private static final String TAGS = "TAGS";
	private static final long serialVersionUID = 7841887211968948753L;
	private static final String XLSX = "xlsx";
	private static final String XLS = "xls";
	private final transient Logger LOGGER = LoggerFactory.getLogger(getClass());
	private static final String[] colHeaders = new String[] {"ITEMNO","PAGEURL",TAGS,KEYWORDS,"ISUPDATED"};

	@Reference
	private transient ResourceResolverFactory resolverFactory;

	@Reference
	private transient Distributor slingDistributor;

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		
		final boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		final Map<String, RequestParameter[]> params = request.getRequestParameterMap();
		Iterator<Map.Entry<String, RequestParameter[]>> paramsIterator = params.entrySet().iterator();
		Map.Entry<String, RequestParameter[]> pairs = paramsIterator.next();
		RequestParameter[] parameterArray = pairs.getValue();

		//Uploaded file
		RequestParameter file = parameterArray[0];
		LOGGER.error("file::::" + file);
		//File's mime type
		String mimeType = FilenameUtils.getExtension(file.getFileName());
		LOGGER.error("mimeType::::" + mimeType);
		if (isMultipart
				&& StringUtils.isNotEmpty(mimeType)
				&& (mimeType.contains(XLS) || mimeType.contains(XLSX))
		) {
			LOGGER.error("inside if::::" + isMultipart);
			Workbook workbook = null;
			try (final InputStream stream = file.getInputStream()) {
				if (Objects.nonNull(stream)) {
					if (mimeType.equals(XLSX)) {
						workbook = new XSSFWorkbook(stream);
					} else if (mimeType.equals(XLS)) {
						workbook = new HSSFWorkbook(stream);
					} else {
						LOGGER.error("{}: Unsupported file type!", mimeType);
						sendStatus(
								response,
								SlingHttpServletResponse.SC_BAD_REQUEST,
								mimeType.concat(" Unsupported file type!")
						);
						return;
					}
					LOGGER.error("workbook:::" + workbook);
					//read the excel records to update the metadata
					ResourceResolver resolver = null;					
					resolver = request.getResourceResolver();
					LOGGER.error("resolver:::" + resolver);					
					Session session = resolver.adaptTo(Session.class);
					int sheetIndex = 0, sheetCount = workbook.getNumberOfSheets();
					while (sheetIndex < sheetCount) {
						Sheet sheet = workbook.getSheetAt(sheetIndex);
						LOGGER.error("sheet:::" + sheet);

						// set the headers in a map
						Map<String, Integer> requiredHeaders = new HashMap<>();
						LOGGER.error("requiredHeaders:::" + requiredHeaders);
						Iterator<Row> rowIterator = sheet.iterator();
						LOGGER.error("get the row at position zero" + sheet);
						while (rowIterator.hasNext()) {
							Row row = rowIterator.next();
							if (row.getRowNum() == 0) {
								for (Cell cell : sheet.getRow(0)) {
									if (colHeaders[cell.getColumnIndex()].equals(cell.getStringCellValue())) {
										requiredHeaders.put(cell.getStringCellValue(), cell.getColumnIndex());
									} else {
										LOGGER.error("Invalid headers! Mismatched header in cell address : {}",
												cell.getAddress());
										sendStatus(response, SlingHttpServletResponse.SC_BAD_REQUEST,
												"Invalid headers! Mismatched header in cell address :"
														+ cell.getAddress().formatAsString());
										return;
									}
								}
								continue;
							}
							// update the metakeywords value in the given page.
							if ("yes".equalsIgnoreCase(
									row.getCell(requiredHeaders.get("ISUPDATED")).getStringCellValue())) {
								Cell pageCell = row.getCell(requiredHeaders.get("PAGEURL"));
								String tagValue = row.getCell(requiredHeaders.get(TAGS)) != null
										? row.getCell(requiredHeaders.get(TAGS)).getStringCellValue()
										: StringUtils.EMPTY;
								String keywordValues = row.getCell(requiredHeaders.get(KEYWORDS)) != null
										? row.getCell(requiredHeaders.get(KEYWORDS)).getStringCellValue()
										: StringUtils.EMPTY;
								String pagePath = pageCell.getStringCellValue();
								Resource nodeResource = resolver.getResource(pagePath + "/" + JcrConstants.JCR_CONTENT);
								if (nodeResource != null) {
									setPropertyToNode(tagValue, TagConstants.PN_TAGS, nodeResource);
									setPropertyToNode(keywordValues, "keywords", nodeResource);
									session.save();
									ReplicationStatus replicationStatus = resolver.getResource(pagePath).adaptTo(ReplicationStatus.class);
									if(replicationStatus.isActivated()) {
										SimpleDistributionRequest sdr = new SimpleDistributionRequest(DistributionRequestType.ADD, false, nodeResource.getPath());
										slingDistributor.distribute("publish", resolver, sdr);
									}
								} else {
									sendStatus(response, SlingHttpServletResponse.SC_BAD_REQUEST,
											"Invalid Page! Provided page path in "+sheet.getSheetName() +" at row number " + row.getRowNum()
													+ " doesn't exist.");
									return;
								}
							}
						}
						sheetIndex++;
					}
						session.save();
					}

					sendStatus(response, SlingHttpServletResponse.SC_OK, "Successfully imported the metadata values!");

			} catch (RepositoryException e) {
				LOGGER.error("RepositoryException : {}", e.getMessage());
				sendStatus(
						response,
						SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR,
						"Error occurred while saving the metadata values!"
				);
			} catch (IOException e) {
				LOGGER.error("Login Exception : {}", e.getMessage());
				sendStatus(
						response,
						SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR,
						"Error occurred while saving the metadata values!"
				);
			} finally {
				if (workbook != null) {
					workbook.close();
				}
			}
		}else{
			LOGGER.error("Unsupported request payload::::" );
			sendStatus(
					response,
					SlingHttpServletResponse.SC_BAD_REQUEST,
					"Unsupported request payload!"
			);
		}

	}

	private void setPropertyToNode(String value, String propertyName, Resource nodeResource)
			throws RepositoryException{
		Node metanode = nodeResource.adaptTo(Node.class);
		if(StringUtils.isNotBlank(value)) {
			//overwrite the existing node property
			String[] valArr = value.split("\\|");
			if (metanode.hasProperty(propertyName)) {
				metanode.getProperty(propertyName).remove();
			}
			metanode.setProperty(propertyName, valArr);
		}
		else if(metanode.hasProperty(propertyName)) {
			//remove the property from node
			metanode.getProperty(propertyName).remove();
		}
	}
	
	private void sendStatus(SlingHttpServletResponse response, int status, String message) throws IOException {
		response.setCharacterEncoding(StandardCharsets.UTF_8.displayName());
		response.setContentType("text/plain");
		response.setStatus(status);
		response.getWriter().print(message);
	}
}
