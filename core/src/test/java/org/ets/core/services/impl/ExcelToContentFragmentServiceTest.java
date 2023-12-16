package org.ets.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class })
class ExcelToContentFragmentServiceTest {

	private final AemContext aemContext = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

	private Map<String, Object> parameterMap = new HashMap<String, Object>();
	private ExcelToContentFragmentServiceImpl excelToCfService;
	private MockSlingHttpServletRequest mockSlingRequest;
	private MockSlingHttpServletResponse mockSlingResponse;
	private ResourceResolver resourceResolver;
	private File file, csvFile;
	
	@BeforeEach
    public void setUp() throws Exception {
		excelToCfService = aemContext.registerService(new ExcelToContentFragmentServiceImpl());
		mockSlingRequest = aemContext.request();
		mockSlingResponse = aemContext.response();
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		resourceResolver = aemContext.resourceResolver();
		file = new File("src/test/resources/org/ets/core/servlets/empty-file.xlsx");
		csvFile = new File("src/test/resources/org/ets/core/servlets/csv_file_data.csv");
		aemContext.load().json("/org/ets/core/service/ExcelToContentFragmentResource.json", "/content");
	}
	
	@Test
	void testGetWorkbook() throws IOException {
		FileInputStream input = new FileInputStream(file);
		parameterMap.put("xls", input);
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook workbook=excelToCfService.getWorkbook(mockSlingRequest,mockSlingResponse);
		assertNull(workbook);
		input.close();
	}
		
	@Test
	void testConvertStreamToWorkbook() throws IOException {
		FileInputStream input = new FileInputStream(file);
		String mimeType = "xls";
		Workbook workbook = null;
		parameterMap.put("xls", input);
		mockSlingRequest.setParameterMap(parameterMap);
		Map<String, RequestParameter[]> params = mockSlingRequest.getRequestParameterMap();
		RequestParameter[] parameterArray = params.get("xls");
        RequestParameter file = parameterArray[0];
        workbook=excelToCfService.convertStreamToWorkbook(mockSlingResponse, workbook, file, mimeType);
        assertNull(workbook);
        input.close();
	}
	
	@Test
	void testConvertCsvStreamToWorkbook() throws IOException {
		FileInputStream input = new FileInputStream(csvFile);
		String mimeType = "csv";
		Workbook workbook = null;
		parameterMap.put("xls", input);
		mockSlingRequest.setParameterMap(parameterMap);
		Map<String, RequestParameter[]> params = mockSlingRequest.getRequestParameterMap();
		RequestParameter[] parameterArray = params.get("xls");
        RequestParameter file = parameterArray[0];
        workbook=excelToCfService.convertStreamToWorkbook(mockSlingResponse, workbook, file, mimeType);
        assertNotNull(workbook);
        input.close();
	}
	
	@Test
	void testInvalidExtension() throws IOException {
		FileInputStream input = new FileInputStream(file);
		String mimeType = "json";
		Workbook workbook = null;
		parameterMap.put("xls", input);
		mockSlingRequest.setParameterMap(parameterMap);
		Map<String, RequestParameter[]> params = mockSlingRequest.getRequestParameterMap();
		RequestParameter[] parameterArray = params.get("xls");
        RequestParameter file = parameterArray[0];
        workbook=excelToCfService.convertStreamToWorkbook(mockSlingResponse, workbook, file, mimeType);
        assertNull(workbook);
        input.close();
	}
	
	@Test
	void testDataExtractorWithEmptyDestinationFolder() throws Exception {
		parameterMap.put("destinationPath", "/content/cf-folder");
		parameterMap.put("modelPath", "/content/model-path");
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook mockWorkbook = mock(Workbook.class);
		Sheet mockSheet = mock(Sheet.class);
		Row mockRow = mock(Row.class);
		ArrayList<Row> RowList = new ArrayList<>();
		RowList.add(mockRow);
		Iterator<Row> rowIterator= RowList.iterator();
		Cell mockCell = mock(Cell.class);
		ArrayList<Cell> CellList = new ArrayList<>();
		CellList.add(mockCell);
		when(mockWorkbook.getSheetAt(anyInt())).thenReturn(mockSheet);
		when(mockSheet.iterator()).thenReturn(rowIterator);
		when(mockSheet.getRow(anyInt())).thenReturn(mockRow);
		excelToCfService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, mockWorkbook);
	}
	
	@Test
	void testExcelData() throws Exception {
		parameterMap.put("destinationPath", "/content/cf-folder");
		parameterMap.put("modelPath", "/content/model-path");
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook workbook = new HSSFWorkbook();
		Sheet  sheet1= workbook.createSheet("test");
		Row sheet1row1 = sheet1.createRow(0);
		Row sheet1row2 = sheet1.createRow(1);
		Cell Row1Cell1 = sheet1row1.createCell(0);
		Cell Row1Cell2 = sheet1row1.createCell(1);
		Cell Row1Cell3 = sheet1row1.createCell(2);
		Cell Row1Cell4 = sheet1row1.createCell(3);
		Cell Row1Cell5 = sheet1row1.createCell(4);
		Cell Row1Cell6 = sheet1row1.createCell(5);
		Cell Row1Cell7 = sheet1row1.createCell(6);
		Cell Row1Cell8 = sheet1row1.createCell(7);
		Cell Row1Cell9 = sheet1row1.createCell(8);
		Row1Cell1.setCellValue("SessionID");
		Row1Cell2.setCellValue("Institution Name");
		Row1Cell3.setCellValue("State/Region");
		Row1Cell4.setCellValue("Institution Country");
		Row1Cell5.setCellValue("Program Name");
		Row1Cell6.setCellValue("Event Name");
		Row1Cell7.setCellValue("RSVP URL or Email Address for more information");
		Row1Cell8.setCellValue("Event Type");
		Row1Cell9.setCellValue("Event Date");
		Cell Row2Cell1 = sheet1row2.createCell(0);
		Cell Row2Cell2 = sheet1row2.createCell(1);
		Cell Row2Cell3 = sheet1row2.createCell(2);
		Cell Row2Cell4 = sheet1row2.createCell(3);
		Cell Row2Cell5 = sheet1row2.createCell(4);
		Cell Row2Cell6 = sheet1row2.createCell(5);
		Cell Row2Cell7 = sheet1row2.createCell(6);
		Cell Row2Cell8 = sheet1row2.createCell(7);
		Cell Row2Cell9 = sheet1row2.createCell(8);
		Row2Cell1.setCellValue("1684932382_646e071e6bad27.48765523");
		Row2Cell2.setCellValue("SDA Bocconi School of Management");
		Row2Cell3.setCellValue(9);
		Row2Cell4.setCellValue("Italy");
		Row2Cell5.setCellValue("Executive Master in Marketing and Sales (EMMS)");
		Row2Cell6.setCellValue("Event Name");
		Row2Cell7.setCellValue("RSVP URL or Email Address for more information");
		Row2Cell8.setCellValue("Event Type");
		Row2Cell9.setCellValue("09/09/2023");
		List<String> modelfields = Arrays.asList(new String[] {"SessionID", "Institution Name", "State/Region", "Institution Country", "Program Name", "Event Name", "RSVP URL or Email Address for more information", "Event Date", "Event Date"});
		excelToCfService.columnHeaderValidation(resourceResolver, modelfields, sheet1, sheet1row1);
		excelToCfService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, workbook);
	}
	
	@Test
	void testEmptyDestinationPathModelPath() throws Exception {
		parameterMap.put("destinationPath", "");
		parameterMap.put("modelPath", "");
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook workbook = null;
		excelToCfService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, workbook);
	}
	
	@Test
	void testEmptyExcelFolder() throws Exception {
		LinkedHashMap<String,LinkedHashMap<String, String>> excelData = new LinkedHashMap<>();
		LinkedHashMap<String, String> data = new LinkedHashMap<>();
		data.put("sessionid", "1684932382_646e071e6bad27.48765523");
		data.put("institutionname", "SDA Bocconi School of Management");
		data.put("stateregion", "9");
		data.put("institutioncountry", "Italy");
		data.put("programname", "Executive Master in Marketing and Sales (EMMS)");
		data.put("eventname", "EMMS: Marketing & Sales leader");
		data.put("rsvpurloremailaddressformoreinformation", "www.gmail.com");
		data.put("eventtype", "online");
		data.put("eventdate", "09/09/2023");
		excelData.put("1684932382_646e071e6bad27.48765523", data);
		excelToCfService.contentFragmentDetails(mockSlingResponse, resourceResolver, "/content/cf-folder", "/content/model-path", excelData);
	}
	
	@Test
	void testNonEmptyFolder() throws Exception {
		LinkedHashMap<String,LinkedHashMap<String, String>> excelData = new LinkedHashMap<>();
		LinkedHashMap<String, String> data = new LinkedHashMap<>();
		data.put("sessionid", "1684932382_646e071e6bad27.48765523");
		data.put("institutionname", "SDA Bocconi School of Management");
		data.put("stateregion", "9");
		data.put("institutioncountry", "Italy");
		data.put("programname", "Executive Master in Marketing and Sales (EMMS)");
		data.put("eventname", "EMMS: Marketing & Sales leader");
		data.put("rsvpurloremailaddressformoreinformation", "www.gmail.com");
		data.put("eventtype", "online");
		data.put("eventdate", "09/09/2023");
		excelData.put("1684932382_646e071e6bad27.48765523", data);
		excelToCfService.contentFragmentDetails(mockSlingResponse, resourceResolver, "/content/cf", "/content/model-path", excelData);
	}
	
	@Test
	void testUpdate() throws Exception {
		LinkedHashMap<String, String> data = new LinkedHashMap<>();
		data.put("sessionid", "1684932382_646e071e6bad27.48765523");
		data.put("institutionname", "SDA Bocconi School of Management");
		data.put("stateregion", "9");
		data.put("institutioncountry", "Italy");
		data.put("programname", "Executive Master in Marketing and Sales (EMMS)");
		data.put("eventname", "EMMS: Marketing & Sales leader");
		data.put("rsvpurloremailaddressformoreinformation", "www.gmail.com");
		data.put("eventtype", "online");
		data.put("eventdate", "09/09/2023");
		Resource resource = resourceResolver.getResource("/content/cf/6574675");
		excelToCfService.updateContentFragment(resource, data);
	}
}
