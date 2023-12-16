package org.ets.core.servlets;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
class ResearcherSolrServletTest {

	private AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setUp() throws Exception {
		 /*aemContext.registerAdapter(ResourceResolver.class, QueryBuilder.class, queryBuilder);
		 lenient().when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
		 lenient().when(query.getResult()).thenReturn(searchResult);
		 aemContext.load().json("/org/ets/core/servlets/FetchNewsResource.json", "/content");
		 queryResults.add(aemContext.currentResource("/content/press-release/article-one"));
		 queryResults.add(aemContext.currentResource("/content/press-release/article-two"));
		 queryResults.add(aemContext.currentResource("/content/press-release/article-three"));
		 Iterator<Resource> resultIterator=queryResults.iterator();
		 lenient().when(searchResult.getResources()).thenReturn(resultIterator);*/
	}
	 
	@Test
	void testDoGetSlingHttpServletRequestSlingHttpServletResponse() {
		ResearcherSolrServlet researcherSolrServlet = new ResearcherSolrServlet();
		MockSlingHttpServletRequest mockSlingRequest = aemContext.request();
		MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
		researcherSolrServlet.doGet(mockSlingRequest, mockSlingResponse);
		assertEquals(200, mockSlingResponse.getStatus());
	}
	
}
