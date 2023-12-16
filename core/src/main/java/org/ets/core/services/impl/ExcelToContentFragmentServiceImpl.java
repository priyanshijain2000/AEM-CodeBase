package org.ets.core.services.impl;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.dam.cfm.ContentFragmentException;
import com.adobe.cq.dam.cfm.ContentFragmentManager;
import com.adobe.cq.dam.cfm.ElementTemplate;
import com.adobe.cq.dam.cfm.FragmentTemplate;
import com.google.common.collect.Iterators;

import javax.jcr.Session;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

public class ExcelToContentFragmentServiceImpl {

	private static final String XLSX = "xlsx";
	private static final String XLS = "xls";
	private static final String CSV = "csv";
	private static final String DESTINATION_PATH = "destinationPath";
	private static final String MODEL_PATH = "modelPath";
	private static final String JCR_CONTENT = "/jcr:content";
	private static final String SESSION_ID = "sessionid";
	private static final String EVENT_DATE = "eventdate";
	private static final String PLAIN_TEXT = "text/plain";
	private static final String DATE = "date";

	private static final Logger LOGGER = LoggerFactory.getLogger(ExcelToContentFragmentServiceImpl.class);

	@Reference
	private ContentFragmentManager fragmentManager;

	public Workbook getWorkbook(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		final boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		Workbook workbook = null;
		if (isMultipart) {
			/* Getting XLS parameters */
			final Map<String, RequestParameter[]> params = request.getRequestParameterMap();
			RequestParameter[] parameterArray = params.get(XLS);
			RequestParameter file = parameterArray[0];
			String mimeType = FilenameUtils.getExtension(file.getFileName());
			LOGGER.debug("MimeType :{}", mimeType);
			if (mimeType != null && (mimeType.startsWith(XLS) || mimeType.equals(CSV))) {
				workbook = convertStreamToWorkbook(response, workbook, file, mimeType);
			} else {
				sendStatus(response, HttpServletResponse.SC_BAD_REQUEST, "Empty file!");
			}
		}
		return workbook;
	}

	public Workbook convertStreamToWorkbook(SlingHttpServletResponse response, Workbook workbook, RequestParameter file,
			String mimeType) throws IOException {
		try (final InputStream stream = file.getInputStream()) {
			if (Objects.nonNull(stream) && StringUtils.isNotBlank(mimeType)) {
				if (mimeType.equals(XLSX)) {
					workbook = new XSSFWorkbook(stream);
				} else if (mimeType.equals(XLS)) {
					workbook = new HSSFWorkbook(stream);
				} else if (mimeType.equals(CSV)) {
					//Creating workbook with csv file data
					workbook = new HSSFWorkbook();
					Sheet sheet = workbook.createSheet();
					String csvData = IOUtils.toString(stream, StandardCharsets.ISO_8859_1);
					if (!csvData.isEmpty() && !csvData.equals("\r\n")) {
						String[] rowData = csvData.split("\r\n");
						for (int i = 0; i < rowData.length; i++) {
							Row row = sheet.createRow(i);
							String[] cellData = rowData[i].split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)");
							for (int j = 0; j < cellData.length; j++) {
								Cell cell = row.createCell(j);
								String cellValue = cellData[j];
								if (cellValue.startsWith("\"") && cellValue.endsWith("\"")) {
									cellValue = cellValue.replaceAll("^\"|\"$", "").replaceAll("\"\"", "\"");
								}
								cell.setCellValue(cellValue);
							}
						}
					}
				} else {
					LOGGER.error("Unsupported file type : {}", mimeType);
					sendStatus(response, HttpServletResponse.SC_BAD_REQUEST,
							mimeType.concat(" Unsupported file type!"));
				}
			}
		} catch (IOException e) {
			LOGGER.error("IOException in convertStreamToWorkbook {}", e.getMessage());
			sendStatus(response, SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR,
					"Java exception occurred while conversion!");
		} finally {
			if (Objects.nonNull(workbook)) {
				workbook.close();
			}
		}
		return workbook;
	}

	public void dataExtractor(SlingHttpServletRequest request, SlingHttpServletResponse response,
			ResourceResolver resourceResolver, Workbook workbook) throws Exception {
		/* Getting parameters */
		String destinationPath = request.getParameter(DESTINATION_PATH);
		String modelPath = request.getParameter(MODEL_PATH);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		LinkedHashMap<String,LinkedHashMap<String, String>> excelData = new LinkedHashMap<>();
		if (StringUtils.isNotBlank(destinationPath) && StringUtils.isNotBlank(modelPath)) {
			try {
				Sheet sheet = workbook.getSheetAt(0);
				List<String> requiredHeaders = new ArrayList<>();
				Iterator<Row> rowIterator = sheet.iterator();
				Resource model = resourceResolver.getResource(modelPath + JCR_CONTENT);
				FragmentTemplate fragment = model.adaptTo(FragmentTemplate.class);
				List<String> modelFields = getModelFields(fragment);
				boolean columnheaderCheck = columnHeaderValidation(resourceResolver, modelFields, sheet,
						sheet.getRow(0));
				if (!columnheaderCheck) {
					boolean emptySessionIdCheck = true;
					while (rowIterator.hasNext()) {
						Row row = rowIterator.next();
						if (row.getRowNum() == 0) {
							for (Cell cell : sheet.getRow(0)) {
								String cellHeader = cell.getStringCellValue().replaceAll("[^a-zA-Z0-9]", "")
										.toLowerCase();
								requiredHeaders.add(cellHeader);
							}
						} else {
							Iterator<Cell> cellIterator = row.cellIterator();
							LinkedHashMap<String, String> rowData = new LinkedHashMap<>();
							String sessionId = "";
							for (int index = 0; index < requiredHeaders.size() && cellIterator.hasNext(); index++) {
								Cell cell = cellIterator.next();
								String coulmnName = sheet.getRow(0).getCell(cell.getColumnIndex()).getStringCellValue().replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
								if (cell.getCellType() == CellType.NUMERIC) {
									DataFormatter formatter = new DataFormatter();
									String val = "";
									if (coulmnName.contains(DATE)) {
										val = dateFormat.format(cell.getDateCellValue());
									} else {
										val = formatter.formatCellValue(cell);
										if (coulmnName.contains(SESSION_ID)) {
											sessionId = val;
										}
									}
									if (val.isEmpty()) {
										rowData.put(requiredHeaders.get(cell.getColumnIndex()), "");
									} else {
										rowData.put(requiredHeaders.get(cell.getColumnIndex()), val);
									}
								} else {
									if (coulmnName.contains(SESSION_ID)) {
										sessionId = cell.getRichStringCellValue().getString();
									}
									if (cell.getRichStringCellValue().getString().isEmpty()) {
										rowData.put(requiredHeaders.get(cell.getColumnIndex()), "");
									} else {
										if (coulmnName.equals(EVENT_DATE)) {
											SimpleDateFormat actualDateFormat = new SimpleDateFormat("MM/dd/yyyy");
											rowData.put(requiredHeaders.get(cell.getColumnIndex()), dateFormat.format(
													actualDateFormat.parse(cell.getRichStringCellValue().getString())));
										} else {
											rowData.put(requiredHeaders.get(cell.getColumnIndex()),
													cell.getRichStringCellValue().getString());
										}
									}
								}
							}
							if (!rowData.isEmpty() && !sessionId.isEmpty()) {
								excelData.put(sessionId, rowData);
								emptySessionIdCheck = false;
							} else {
								emptySessionIdCheck = true;
								break;
							}
						}
					}
					if(emptySessionIdCheck) {
						sendStatus(response, SlingHttpServletResponse.SC_BAD_REQUEST, "Failed to convert the file! Session ID value is mandatory to create Content Fragment.");
					} else {
						contentFragmentDetails(response, resourceResolver, destinationPath, modelPath,
							excelData);
					}
				} else {
					sendStatus(response, SlingHttpServletResponse.SC_BAD_REQUEST,
							"Failed to convert the file, please ensure that you have the following headers in your file "
									+ modelFields.toString());
				}
 			} catch (Exception e) {
				LOGGER.error("Error Occurred: {}", e.getMessage());
				sendStatus(response, SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR,
						"Java exception occurred while conversion!");
			} finally {
				if (Objects.nonNull(workbook)) {
					workbook.close();
				}
			}
		} else {
			sendStatus(response, SlingHttpServletResponse.SC_BAD_REQUEST, "Unsupported request payload!");
		}
	}

	//Updating or creating the content fragment with data
	protected void contentFragmentDetails(SlingHttpServletResponse response, ResourceResolver resourceResolver,
			String destinationPath, String modelPath, LinkedHashMap<String,LinkedHashMap<String, String>> excelData) throws Exception {
		Session session = null;
		try {
			session = resourceResolver.adaptTo(Session.class);
			Resource model = resourceResolver.getResource(modelPath + JCR_CONTENT);
			Resource destination = resourceResolver.getResource(destinationPath);
			Iterator<Resource> destinationFolder = resourceResolver.getResource(destinationPath).listChildren();
			if (Iterators.size(destinationFolder) <= 1) {
				for (String sessionId : excelData.keySet()) {
					FragmentTemplate fragment = model.adaptTo(FragmentTemplate.class);
					LinkedHashMap<String, String> content = excelData.get(sessionId);
					createContentFragment(response, fragment, destination, content, sessionId);
				}
				sendStatus(response, SlingHttpServletResponse.SC_OK,
						"Successfully parsed the file! Check the content fragment at " + destinationPath);
			} else {
				for (String sessionId : excelData.keySet()) {
					LinkedHashMap<String, String> content = excelData.get(sessionId);
					Resource resource = resourceResolver.getResource(destinationPath + "/" + sessionId);
					if (resource != null) {
						updateContentFragment(resource, content);
					} else {
						FragmentTemplate fragment = model.adaptTo(FragmentTemplate.class);
						createContentFragment(response, fragment, destination, content, sessionId);
					}
				}
				sendStatus(response, SlingHttpServletResponse.SC_OK,
						"Successfully parsed the file! Check the content fragment at " + destinationPath);
			}
		} catch (Exception e) {
			LOGGER.error("Error Occurred: {}", e.getMessage());
			sendStatus(response, SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR,
					"Java exception occurred while conversion!");
		} finally {
			if (session != null) {
				session.save();
			}
		}
	}

	private void sendStatus(SlingHttpServletResponse response, int status, String message) throws IOException {
		response.setCharacterEncoding(StandardCharsets.UTF_8.displayName());
		response.setContentType(PLAIN_TEXT);
		response.setStatus(status);
		response.getWriter().print(message);
	}
	
	//Validate the column header with content fragment model
	protected boolean columnHeaderValidation(ResourceResolver resourceResolver, List<String> modelFields, Sheet sheet, Row row) {
		boolean columnheaderCheck = false;
		try {
			int cells = sheet.getRow(0).getLastCellNum();
			if (cells == modelFields.size()) {
				Iterator<Cell> cellIterator = row.cellIterator();
				for (int headerIndex = 0; headerIndex < modelFields.size() && cellIterator.hasNext(); headerIndex++) {
					Cell cell = cellIterator.next();
					if (modelFields.get(headerIndex).equals(cell.getStringCellValue())) {
						continue;
					} else {
						columnheaderCheck = true;
						break;
					}
				}
			} else {
				columnheaderCheck = true;
			}
		} catch (Exception e) {
			LOGGER.error("Error Occurred: {}", e.getMessage());
		}
		return columnheaderCheck;
	}
	
	// Creates a new content fragment with data
	protected void createContentFragment(SlingHttpServletResponse response, FragmentTemplate fragment,
			Resource destination, LinkedHashMap<String, String> content, String contentFragmentName) throws ContentFragmentException, IOException {
		if (!contentFragmentName.isEmpty()) {
			ContentFragment contentFragment = fragment.createFragment(destination, contentFragmentName,
					contentFragmentName);
			if (contentFragment != null) {
				Iterator<ContentElement> contentElement = contentFragment.getElements();
				while (contentElement.hasNext()) {
					ContentElement contentElementObject = contentElement.next();
					if (content.containsKey(contentElementObject.getName())) {
						contentElementObject.setContent(content.get(contentElementObject.getName()), PLAIN_TEXT);
					}
				}
			}
		}
	}

	// Updates the existing content fragment with data
	protected void updateContentFragment(Resource resource, LinkedHashMap<String, String> content)
			throws ContentFragmentException {
		ContentFragment contentFragment = resource.adaptTo(ContentFragment.class);
		if (contentFragment != null) {
			Iterator<ContentElement> contentElement = contentFragment.getElements();
			while (contentElement.hasNext()) {
				ContentElement contentElementObject = contentElement.next();
				if (content.containsKey(contentElementObject.getName())) {
					contentElementObject.setContent(content.get(contentElementObject.getName()), PLAIN_TEXT);
				}
			}
		}
	}
	
	// Get fields from content fragment model
	protected List<String> getModelFields(FragmentTemplate fragment) {
		List<String> modelFields = new ArrayList<>();
		try {
			Iterator<ElementTemplate> modelData = fragment.getElements();
			while (modelData.hasNext()) {
				ElementTemplate field = modelData.next();
				String title = field.getTitle();
				modelFields.add(title);
			}
		} catch (Exception e) {
			LOGGER.error("Error Occurred: {}", e.getMessage());
		}
		return modelFields;
	}
}
