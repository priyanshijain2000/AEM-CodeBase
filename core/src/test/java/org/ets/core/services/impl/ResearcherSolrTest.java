package org.ets.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.FileNotFoundException;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.gson.JsonObject;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class })
class ResearcherSolrTest {

	    public AemContext aemContext = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

	    private ResearcherSolrImpl researcherSolrService = new ResearcherSolrImpl();
	    MockSlingHttpServletRequest request=null;

	    @BeforeEach
	    public void setup() {
	    	aemContext.load().json("/org/ets/core/service/ResearcherSolrResource.json", "/content");
	        aemContext.registerService(researcherSolrService);
			request = aemContext.request();
			request.addRequestParameter("text", "John");
	    }

	    @Test
	    void testPatentPage() throws FileNotFoundException {
	    	JsonObject jsonObject = researcherSolrService.getSolrResult(request);
	        assertNotNull(jsonObject);
	    }
}