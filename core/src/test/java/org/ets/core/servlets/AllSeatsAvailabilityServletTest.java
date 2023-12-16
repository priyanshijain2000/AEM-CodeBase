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
public class AllSeatsAvailabilityServletTest {
	
	private AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@Test
	void testDoGetSlingHttpServletRequestSlingHttpServletResponse() {
		AllSeatsAvailabilityServlet allSeatsAvailabilityServletObj = new AllSeatsAvailabilityServlet();
		MockSlingHttpServletRequest mockSlingRequest = aemContext.request();
		MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
		allSeatsAvailabilityServletObj.doGet(mockSlingRequest, mockSlingResponse);
	}
}
