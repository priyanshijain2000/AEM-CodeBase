package org.ets.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.sling.api.request.RequestParameter;
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
class ExcelToJsonServiceTest {

	private final AemContext aemContext = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

	private Map<String, Object> parameterMap = new HashMap<String, Object>();
	private ExcelToJsonServiceImpl excelToJsonService;
	private MockSlingHttpServletRequest mockSlingRequest;
	private MockSlingHttpServletResponse mockSlingResponse;
	private ResourceResolver resourceResolver;
	private File file;
	@BeforeEach
    public void setUp() throws Exception {
		/* Instantiate Service */
		excelToJsonService = aemContext.registerService(new ExcelToJsonServiceImpl());
		/* Get mock request and response from aemContext */
		mockSlingRequest = aemContext.request();
		mockSlingResponse = aemContext.response();
		resourceResolver = aemContext.resourceResolver();
		file = new File("src/test/resources/org/ets/core/servlets/empty-file.xlsx");
	}
	
	@Test
	void testGetWorkbook() throws IOException {
		FileInputStream input = new FileInputStream(file);
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("xls", input);
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook workbook=excelToJsonService.getWorkbook(mockSlingRequest,mockSlingResponse);
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
        workbook=excelToJsonService.convertStreamToWorkbook(mockSlingResponse, workbook, file, mimeType);
        assertNull(workbook);
	}
	@Test
	void testDataExtractorWithInvalidFunctionName() throws IOException {
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "invalid-function-name");
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
		Iterator<Cell> cellIterator= CellList.iterator();
		when(mockWorkbook.getSheetAt(anyInt())).thenReturn(mockSheet);
		when(mockSheet.iterator()).thenReturn(rowIterator);
		when(mockRow.cellIterator()).thenReturn(cellIterator);
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, mockWorkbook);
	}
	
	@Test
	void testDataExtractorWithESSAFunctionName() throws IOException {
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "essa");
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
		Iterator<Cell> cellIterator= CellList.iterator();
		when(mockWorkbook.getSheetAt(anyInt())).thenReturn(mockSheet);
		//when(mockWorkbook.getSheetName(anyInt())).thenReturn("Sheet-name");
		when(mockWorkbook.getNumberOfSheets()).thenReturn(1);
		when(mockSheet.iterator()).thenReturn(rowIterator);
		when(mockRow.cellIterator()).thenReturn(cellIterator);
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, mockWorkbook);
	}
	
	@Test
	void testDataExtractorESSAWithNullFunctionName() throws IOException {
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "essa");
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook wb = new HSSFWorkbook();
		Sheet  sheet1= wb.createSheet("essa");
		Row sheet1row1 = sheet1.createRow(0);
		Row sheet1row2 = sheet1.createRow(1);
		Cell Row1Cell1 = sheet1row1.createCell(0);
		Cell Row1Cell2 = sheet1row1.createCell(1);
		Cell Row1Cell3 = sheet1row1.createCell(2);
		Cell Row1Cell4 = sheet1row1.createCell(3);
		Cell Row1Cell5 = sheet1row1.createCell(4);
		Row1Cell1.setCellValue("programCode");
		Row1Cell2.setCellValue("programInfo");
		Row1Cell3.setCellValue("examId");
		Row1Cell4.setCellValue("testName");
		Row1Cell5.setCellValue("testDuration(in minutes)");
		Cell Row2Cell1 = sheet1row2.createCell(0);
		Cell Row2Cell2 = sheet1row2.createCell(1);
		Cell Row2Cell3 = sheet1row2.createCell(2);
		Cell Row2Cell4 = sheet1row2.createCell(3);
		Cell Row2Cell5 = sheet1row2.createCell(4);
		Row2Cell1.setCellValue("USA");
		Row2Cell2.setCellValue("New york");
		Row2Cell3.setCellValue(2341);
		Row2Cell4.setCellValue("");
		Row2Cell5.setCellValue(120);
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, wb);
	}
	
	@Test
	void testDataExtractorWithScoreReportCalFunctionName() throws IOException {
		//final Row.MissingCellPolicy CREATE_NULL_AS_BLANK;
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "scorereportcalendar");
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
		Iterator<Cell> cellIterator= CellList.iterator();
		RichTextString mockRichTextString = mock(RichTextString.class);
		when(mockWorkbook.getSheetAt(anyInt())).thenReturn(mockSheet);
		when(mockSheet.iterator()).thenReturn(rowIterator);
		//when(mockWorkbook.getNumberOfSheets()).thenReturn(1);
		when(mockRow.cellIterator()).thenReturn(cellIterator);
		when(mockCell.getRichStringCellValue()).thenReturn(mockRichTextString);
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, mockWorkbook);
	}
	
	@Test
	void testDataExtractorWithMyBestScoresAcceptanceFunctionName() throws IOException {
		//final Row.MissingCellPolicy CREATE_NULL_AS_BLANK;
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "mybest_scores_acceptance");
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook wb = new HSSFWorkbook();
		Sheet  sheet1= wb.createSheet("mybest_scores_acceptance");
		Row sheet1row1 = sheet1.createRow(0);
		Row sheet1row2 = sheet1.createRow(1);
		Row sheet1row3 = sheet1.createRow(2);
		Cell Row1Cell1 = sheet1row1.createCell(0);
		Cell Row1Cell2 = sheet1row1.createCell(1);
		Cell Row1Cell3 = sheet1row1.createCell(2);
		Cell Row1Cell4 = sheet1row1.createCell(3);
		Row1Cell1.setCellValue("Country");
		Row1Cell2.setCellValue("State/Province");
		Row1Cell3.setCellValue("Institution");
		Row1Cell4.setCellValue("Program");
		Cell Row2Cell1 = sheet1row2.createCell(0);
		Cell Row2Cell2 = sheet1row2.createCell(1);
		Cell Row2Cell3 = sheet1row2.createCell(2);
		Cell Row2Cell4 = sheet1row2.createCell(3);
		Row2Cell1.setCellValue("USA");
		Row2Cell2.setCellValue("New york");
		Row2Cell3.setCellValue(2341);
		Row2Cell4.setCellValue("");
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, wb);
	}
	
	@Test
	void testDataExtractorWithScoreRequirementFunctionName() throws IOException {
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "scorerequirement");
		mockSlingRequest.setParameterMap(parameterMap);
		Workbook wb = new HSSFWorkbook();
		Sheet  sheet1= wb.createSheet("Sheet1");
		Sheet footnoteSheet = wb.createSheet("Footnote Text");
		Row sheet1row1 = sheet1.createRow(0);
		Row sheet1row2 = sheet1.createRow(1);
		Row sheet1row3 = sheet1.createRow(2);
		Row headingRow = footnoteSheet.createRow(0);
		Row createRow2 = footnoteSheet.createRow(1);
		Row createRow3 = footnoteSheet.createRow(2);
		headingRow.createCell(0).setCellValue("FootnoteID");
		headingRow.createCell(1).setCellValue("Symbol");
		headingRow.createCell(2).setCellValue("Symbol Name");
		headingRow.createCell(3).setCellValue("FootnoteText");
		createRow2.createCell(0).setCellValue(232);
		createRow2.createCell(0).setCellValue("PRX");
		createRow2.createCell(0).setCellValue("Praxis");
		createRow2.createCell(0).setCellValue("");
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, wb);
	}
	
	@Test
	void testDataExtractorWithScoreRequirementFunctionNameForNullSheet() throws IOException {
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "scorerequirement");
		mockSlingRequest.setParameterMap(parameterMap);
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, null);
	}
	
	@Test
	void testDataExtractorWithESSAFunctionNameForNullSheet() throws IOException {
		mockSlingRequest.setContentType("multipart/form-data");
		mockSlingRequest.setMethod("POST");
		parameterMap.put("destPath", "/content/dam/json");
		parameterMap.put("functionSelect", "essa");
		mockSlingRequest.setParameterMap(parameterMap);
		excelToJsonService.dataExtractor(mockSlingRequest, mockSlingResponse, resourceResolver, null);
	}
}
