package org.ets.core.utils;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.TagConstants;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.common.collect.Lists;

@Component(service = Servlet.class, property = {"sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths=" + "/bin/downloadpagetags", "sling.servlet.selectors=" + "report",
        "sling.servlet.extensions={xlsx,xls}"})
@ServiceDescription("Download Page Keywords/Tags Servlet")
public class ExportPageTags extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;
    private final transient Logger logger = LoggerFactory.getLogger(getClass());
    private static final String[] rowHeaders = new String[] { "ITEMNO", "PAGEURL","TAGS","KEYWORDS", "ISUPDATED"};

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {

        String resourcePaths = request.getParameter("path");
        if(resourcePaths != null) {
			List<String> resources = Arrays.asList(resourcePaths.split(","));
			Workbook workbook = null;
			try {
				workbook = new HSSFWorkbook();
				// To create multiple sheets correspond to each section path.
				for (String resourcePath : resources) {
					ResourceResolver resolver = request.getResourceResolver();
					Page page = resolver.adaptTo(PageManager.class).getPage(resourcePath);
					String currentPageName = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);
					String sheetTitle = page.getNavigationTitle() != null ? page.getNavigationTitle()
							: (page.getPageTitle() != null ? page.getPageTitle() : currentPageName);
					Sheet sheetTest = workbook.createSheet(sheetTitle.toUpperCase());
					CellStyle style = workbook.createCellStyle();
					Font font = workbook.createFont();
					font.setFontHeightInPoints((short) 10);
					font.setBold(true);
					style.setFont(font);
					Row row = sheetTest.createRow(0);
					for (int i = 0; i < rowHeaders.length; i++) {
						Cell cell = row.createCell(i);
						cell.setCellStyle(style);
						cell.setCellValue(rowHeaders[i]);
					}
					Session session = resolver.adaptTo(Session.class);
					Map<String, String> map = new HashMap<>();
					map.put("path", resourcePath);
					map.put("type", NameConstants.NT_PAGE);
					map.put("p.limit", "-1");
					final QueryBuilder queryBuilder = resolver.adaptTo(QueryBuilder.class);
					Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
					SearchResult searchResult = query.getResult();
					int count = 1;
					Iterator<Resource> childResourceIterator = searchResult.getResources();
					Resource currentPageResource = resolver.getResource(resourcePath);
					//To add current page resource to the list of child page resources.
					List<Resource> listOfResources = Lists.newArrayList(childResourceIterator);
					listOfResources.add(currentPageResource);
					for (Resource pageResource:listOfResources) {
						row = sheetTest.createRow(count);
						Resource resource = pageResource.getChild(JcrConstants.JCR_CONTENT);
						if (resource != null) {
							Node metaNode = resource.adaptTo(Node.class);
							String tags = StringUtils.EMPTY;
							String keywords = StringUtils.EMPTY;
							if (metaNode.hasProperty(TagConstants.PN_TAGS)) {
								StringBuilder tagsStr = new StringBuilder();
								Value[] values = metaNode.getProperty(TagConstants.PN_TAGS).getValues();
								for (Value val : values) {
									tagsStr.append(val.getString()).append("|");
								}
								tags = tagsStr.toString();
							}
							if (metaNode.hasProperty("keywords")) {
								StringBuilder keywordStringBuiler = new StringBuilder();
								Property keywordProperty = metaNode.getProperty("keywords");
								if (keywordProperty.isMultiple()) {
									Value[] values = keywordProperty.getValues();
									for (Value val : values) {
										keywordStringBuiler.append(val.getString()).append("|");
									}
								} else {
									Value value = keywordProperty.getValue();
									keywordStringBuiler.append(value.getString().replace(",", "|"));
								}
								keywords = keywordStringBuiler.toString();
							}

							addExcelRecords(row, count, pageResource.getPath(), tags, keywords);

						}
						count++;
					}
				}
				response.setContentType("application/vnd.ms-excel");
				response.setHeader("Expires", "0");
				response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
				response.setHeader("Pragma", "public");
				response.setHeader("Content-Disposition", "attachment; filename=" + "Exported_Tags_and_Keywords.xls");
				ServletOutputStream out = response.getOutputStream();
				if (out != null) {
					workbook.write(out);
					out.flush();
				}
				logger.error(":::::workbook.write:::::");
			} catch ( IllegalStateException | RepositoryException ex) {
				logger.error("Error generating excel export for " + request.getResource().getPath(), ex);
			} finally {
				if (workbook != null) {
					workbook.close();
				}
			}
        }
    }


    private void addExcelRecords(Row row, int count, String pagePath, String tags, String keywords) {
        // construct excel records
        for (int i = 0; i < rowHeaders.length; i++) {
            Cell cell = row.createCell(i);
            switch (rowHeaders[i]) {
                case "ITEMNO":
                    cell.setCellValue(count);
                    break;

                case "PAGEURL":
                    cell.setCellValue(pagePath);
                    break;

                case "TAGS":
                    cell.setCellValue(tags);
                    break;
                    
                case "KEYWORDS":
                    cell.setCellValue(keywords);
                    break;

                case "ISUPDATED":
                    cell.setCellValue("NO");
                    break;
                    
                default:
            }
        }
    }
}
