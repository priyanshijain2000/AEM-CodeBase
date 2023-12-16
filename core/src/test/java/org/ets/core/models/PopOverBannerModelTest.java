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
class PopOverBannerModelTest {
	
	static final String RESOURCE_PATH = "/org/ets/core/models/PopOverBannerModel.json";
	
	static final String CURRENT_RESOURCE_PATH_1 = "/content/home/page-depth1/page-depth2/page-depth3/page-depth4/page-depth5/jcr:content/popoverbanner1";
	
	static final String CURRENT_RESOURCE_PATH_2 = "/content/home/page-depth1/page-depth2/page-depth3/page-depth4/page-depth5/jcr:content/popoverbanner2";

	static final String ROOT_PATH = "/content";

    private AemContext context = new AemContext();
    
    @Mock
    private ModelFactory modelFactory;

    PopOverBannerModel popUp;
    
    @BeforeEach
    public void setUp() throws Exception {
    	context.addModelsForClasses(PopOverBannerModel.class);
    	context.load().json(RESOURCE_PATH, ROOT_PATH);
    	context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
                Integer.MAX_VALUE);
    }
    
    @Test
    void testDesignPromo() {
    	context.currentResource(CURRENT_RESOURCE_PATH_1);
    	popUp = context.request().adaptTo(PopOverBannerModel.class);
        assertNotNull(popUp.getDescription()); 
        assertNotNull(popUp.getOptionsType());
        assertNotNull(popUp.getFileReference());
        assertNotNull(popUp.getButtonText());
        assertNotNull(popUp.getLink());
        assertNotNull(popUp.getBrandName());
        assertNotNull(popUp.isNewTab()); 
        assertNotNull(popUp.isEnabled());
        assertNotNull(popUp.getIsSessionEnabled());  
    }
    
    @Test
    void testDesignSummerPromo() {
    	context.currentResource(CURRENT_RESOURCE_PATH_2);
    	popUp = context.request().adaptTo(PopOverBannerModel.class);
        assertNotNull(popUp.getDescriptionDesignTwo()); 
        assertNotNull(popUp.getOptionsType());
        assertNotNull(popUp.getFileReference());
        assertNotNull(popUp.getButtonText());
        assertNotNull(popUp.getLink());
        assertNotNull(popUp.getBrandName());
        assertNotNull(popUp.isNewTab()); 
        assertNotNull(popUp.isEnabled()); 
        assertNotNull(popUp.getTermsAndCondition());
        assertNotNull(popUp.getIsSessionEnabled()); 
    }
}