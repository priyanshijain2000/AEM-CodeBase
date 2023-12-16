package org.ets.core.servlets;

import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Test;

class ExcelToContentFragmentServletTest {

    private AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);

    @Test
    void testSlingHttpServletRequestSlingHttpServletResponse() {
    	ExcelToContentFragmentServlet excelToContentFragmentServlet = new ExcelToContentFragmentServlet();
        MockSlingHttpServletRequest mockSlingRequest = aemContext.request();
        MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
        excelToContentFragmentServlet.doPost(mockSlingRequest, mockSlingResponse);
    }

    @Test
    void testException() throws Exception {
    	ExcelToContentFragmentServlet excelToContentFragmentServlet = new ExcelToContentFragmentServlet();
        MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
        excelToContentFragmentServlet.doPost(null, mockSlingResponse);
    }
}