package org.ets.core.utils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Session;
import javax.servlet.ServletException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
class ExportPageTagsTest {

    private AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
    
    @Mock
	private QueryBuilder queryBuilder;
	
	@Mock
	private Query query;
	
	@Mock
	private SearchResult searchResult;
	
	private List<Resource> queryResults = new ArrayList<>();
	
	private Map<String, Object> parameterMap = new HashMap<String, Object>();

    @BeforeEach
    public void setUp() throws Exception {
		 aemContext.registerAdapter(ResourceResolver.class, QueryBuilder.class, queryBuilder);
		 lenient().when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
		 lenient().when(query.getResult()).thenReturn(searchResult);
		 aemContext.load().json("/org/ets/core/servlets/SamplePageResource.json", "/content");
		 queryResults.add(aemContext.currentResource("/content/press-release/article-one"));
		 queryResults.add(aemContext.currentResource("/content/press-release/article-two"));
		 queryResults.add(aemContext.currentResource("/content/press-release/article-three"));
		 queryResults.add(aemContext.currentResource("/content/press-release"));
		 queryResults.add(aemContext.currentResource("/content/press-release-test"));
		 Iterator<Resource> resultIterator=queryResults.iterator();
		 lenient().when(searchResult.getResources()).thenReturn(resultIterator);
    }
    
    @Test
    void testCalling() throws ServletException, IOException, LoginException {
    	ExportPageTags exportPageTagsServlet = new ExportPageTags();
        MockSlingHttpServletRequest mockSlingRequest = aemContext.request();
        MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
        parameterMap.put("path", "/content/press-release,/content/press-release-test");
        mockSlingRequest.setParameterMap(parameterMap);
        exportPageTagsServlet.doGet(mockSlingRequest, mockSlingResponse);
    }
    
    @Test
    void testNullResource() throws ServletException, IOException, Exception {
    	ExportPageTags exportPageTagsServlet = new ExportPageTags();
        MockSlingHttpServletRequest mockSlingRequest = aemContext.request();
        MockSlingHttpServletResponse mockSlingResponse = aemContext.response();
        parameterMap.put("path", null);
        mockSlingRequest.setParameterMap(parameterMap);
        exportPageTagsServlet.doGet(mockSlingRequest, mockSlingResponse);
    }
}