package org.ets.core.servlets;

import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Test;

class ExcelToJSONServletTest {

    private AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);

    @Test
    void testSlingHttpServletRequestSlingHttpServletResponse() {
        ExcelToJSONServlet excelToJSONServlet = new ExcelToJSONServlet();
        MockSlingHttpServletRequest mockSlingRequest = aemContext.request();
        MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
        excelToJSONServlet.doPost(mockSlingRequest, mockSlingResponse);
    }

}