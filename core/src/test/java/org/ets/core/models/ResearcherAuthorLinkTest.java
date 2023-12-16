package org.ets.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.models.factory.ModelFactory;
import org.ets.core.models.impl.ResearcherAuthorLinkImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ResearcherAuthorLinkTest {

	private AemContext ctx = new AemContext();
    
    @Mock
    private ModelFactory modelFactory;

    @BeforeEach
    public void setUp() throws Exception {
        ctx.addModelsForClasses(ResearcherAuthorLinkImpl.class);
        ctx.load().json("/org/ets/core/models/ResearcherAuthorLinkResource.json", "/content");
        ctx.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
                Integer.MAX_VALUE);
    }
    
    @Test
    void progressBarList() {
    	ctx.currentResource("/content/research-article/jcr:content/researcher-patent");
    	ResearcherAuthorLinkImpl researcherAuthorLink = ctx.request().adaptTo(ResearcherAuthorLinkImpl.class);
        assertNotNull(researcherAuthorLink.getAuthorLinks());
    }
}