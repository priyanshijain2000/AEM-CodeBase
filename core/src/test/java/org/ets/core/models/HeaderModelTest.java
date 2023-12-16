package org.ets.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HeaderModelTest {

    private AemContext context = new AemContext();
    
    @Mock
    private ModelFactory modelFactory;

    @BeforeEach
    public void setUp() throws Exception {
    	context.addModelsForClasses(HeaderModel.class);
    	context.load().json("/org/ets/core/models/HeaderModelResource.json", "/content");
    	context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
                Integer.MAX_VALUE);
    }
    
    @Test
    void currentPageIsHome() {
    	context.currentResource("/content/home/jcr:content/header");
    	HeaderModel headerModel = context.request().adaptTo(HeaderModel.class);
        assertNotNull(headerModel);
        assertNotNull(headerModel.getLangMap());
        assertNotNull(headerModel.getCfMap());
        assertNotNull(headerModel.getCfLists());
    }
    
    @Test
    void currentPageIsNotHome() {
    	context.currentResource("/content/praxis/jcr:content/header");
    	HeaderModel headerModel = context.request().adaptTo(HeaderModel.class);
        assertNotNull(headerModel);
    }
    
    @Test
    void testDetails() {
    	context.currentResource("/content/header-page/jcr:content/header-nav");
    	HeaderModel headerModel = context.request().adaptTo(HeaderModel.class);
        assertNotNull(headerModel);
        assertNotNull(headerModel.getCol1title1());
        assertNotNull(headerModel.getCol1title2());
        assertNotNull(headerModel.getCol1title3());
        assertNotNull(headerModel.getCol1title4());
        assertNotNull(headerModel.getCol1title5());
        assertNotNull(headerModel.getCol1title6());
        assertNotNull(headerModel.getCol2title1());
        assertNotNull(headerModel.getCol2title2());
        assertNotNull(headerModel.getCol2title3());
        assertNotNull(headerModel.getCol2title4());
        assertNotNull(headerModel.getCol2title5());
        assertNotNull(headerModel.getCol2title6());
        assertNotNull(headerModel.getLanguageMenuAriaLabel());
        assertNotNull(headerModel.getMegaMenuAriaLabel());
        assertNotNull(headerModel.getNav1AriaLabel());
        assertNotNull(headerModel.getNav2AriaLabel());
        assertNotNull(headerModel.getNav3AriaLabel());
        assertNotNull(headerModel.getNav4AriaLabel());
        assertNotNull(headerModel.getNav5AriaLabel());
        assertNotNull(headerModel.getNav6AriaLabel());
        assertNotNull(headerModel.getNavtitle1());
        assertNotNull(headerModel.getNavtitle2());
        assertNotNull(headerModel.getNavtitle3());
        assertNotNull(headerModel.getNavtitle4());
        assertNotNull(headerModel.getNavtitle5());
        assertNotNull(headerModel.getNavtitle6());
        assertNotNull(headerModel.getProductName());
        assertNotNull(headerModel.getSearchAriaLabel());
        assertNotNull(headerModel.getSearchAriaLabelHeader());
        assertNotNull(headerModel.getSearchPlaceholder());
        assertNotNull(headerModel.getSearchResult());       
    }
}