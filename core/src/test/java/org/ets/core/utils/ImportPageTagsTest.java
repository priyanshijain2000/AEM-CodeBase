package org.ets.core.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.ServletException;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
class ImportPageTagsTest {

    private AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
	
    BulkImportPageTags servletObj = null;
	
	MockSlingHttpServletRequest mockSlingRequest = null;
	
	MockSlingHttpServletResponse mockSlingResponse = null;

    @BeforeEach
    public void setUp() throws Exception {
    	servletObj= new BulkImportPageTags();
    	mockSlingRequest = aemContext.request();
        mockSlingResponse = aemContext.response();
    }
    
    @Test
    void testCalling() throws ServletException, IOException {
        String excelFilePath = "src/test/resources/org/ets/core/servlets/Export_Keywords_Sample.xls";
        byte[] bytes = Files.readAllBytes(Paths.get(excelFilePath));
        mockSlingRequest.addRequestParameter("file", bytes, "application/vnd.ms-excel", "Export_Keywords_Sample.xls");
        mockSlingRequest.setMethod("POST");
        mockSlingRequest.setContentType("multipart/form-data");
        servletObj.doPost(mockSlingRequest, mockSlingResponse);
    }
    
    @Test
    void testResponse() throws ServletException, IOException {
        String excelFilePath = "src/test/resources/org/ets/core/servlets/Export_Keywords_Sample.xls";
        byte[] bytes = Files.readAllBytes(Paths.get(excelFilePath));
        mockSlingRequest.addRequestParameter("file", bytes, "application/vnd.ms-excel", "Export_Keywords_Sample.xls");
        mockSlingRequest.setMethod("POST");
        mockSlingRequest.setContentType(null);
        servletObj.doPost(mockSlingRequest, mockSlingResponse);
    }
    
    @Test
    void testInvalidColumnHeaders() throws ServletException, IOException {
        String excelFilePath = "src/test/resources/org/ets/core/servlets/Invalid_Column_headers.xls";
        byte[] bytes = Files.readAllBytes(Paths.get(excelFilePath));
        mockSlingRequest.addRequestParameter("file", bytes, "application/vnd.ms-excel", "Invalid_Column_headers.xls");
        mockSlingRequest.setMethod("POST");
        mockSlingRequest.setContentType("multipart/form-data");
        servletObj.doPost(mockSlingRequest, mockSlingResponse);
    }
    
    @Test
    void testInvalidFileExtension() throws ServletException, IOException {
        String excelFilePath = "src/test/resources/org/ets/core/servlets/FetchFragmentResource.json";
        byte[] bytes = Files.readAllBytes(Paths.get(excelFilePath));
        mockSlingRequest.addRequestParameter("file", bytes, "application/vnd.ms-excel", "Export_Keywords_Sample.xls");
        mockSlingRequest.setMethod("POST");
        mockSlingRequest.setContentType("multipart/form-data");
        servletObj.doPost(mockSlingRequest, mockSlingResponse);
    }
}