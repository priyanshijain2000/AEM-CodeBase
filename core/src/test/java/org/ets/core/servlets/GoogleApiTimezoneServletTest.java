package org.ets.core.servlets;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
class GoogleApiTimezoneServletTest {
	
	private AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@Test
	void testDoGet() {
		GoogleApiTimezoneServlet googleApiTimezoneServlet = new GoogleApiTimezoneServlet();
		MockSlingHttpServletRequest mockSlingRequest = aemContext.request();
		MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
		googleApiTimezoneServlet.doGet(mockSlingRequest, mockSlingResponse);
	}
}
