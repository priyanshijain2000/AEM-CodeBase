package org.ets.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class PageMetadataModelTest {
	
	static final String RESOURCE_PATH = "/org/ets/core/models/PageMetadataModelResource.json";
	
	static final String ROOT_PATH = "/content";
	
	static final String CURRENT_RESOURCE_PATH = "/content/product-page/jcr:content";
	
	static final String CATEGORY_RESOURCE_PATH = "/content/category-page/page-depth1/page-depth2/page-depth3/page-depth4/jcr:content";
	
	static final String CATEGORY_LEVEL1_RESOURCE_PATH = "/content/category-page/page-depth1/page-depth2/page-depth3/page-depth4/page-depth5/jcr:content";
	
	static final String CATEGORY_LEVEL2_RESOURCE_PATH = "/content/category-page/page-depth1/page-depth2/page-depth3/page-depth4/page-depth5/page-depth6/jcr:content";
	
	static final String CATEGORY_LEVEL3_RESOURCE_PATH = "/content/category-page/page-depth1/page-depth2/page-depth3/page-depth4/page-depth5/page-depth6/page-depth7/jcr:content";
	
	static final String CF_RESOURCE_PATH = "/content/cf";

    private AemContext context = new AemContext();
    
    @Mock
    private ModelFactory modelFactory;
    
    PageMetadataModel pageMetadataModel = null;
        
    @BeforeEach
    public void setUp() throws Exception {
    	context.addModelsForClasses(PageMetadataModel.class);
    	context.load().json(RESOURCE_PATH , ROOT_PATH);
    	context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,Integer.MAX_VALUE);
    }
    
    @Test
    void testGetMultifield() {
        context.currentResource(CURRENT_RESOURCE_PATH);
        pageMetadataModel = context.request().adaptTo(PageMetadataModel.class);
        pageMetadataModel.getCategoryLists();
        pageMetadataModel.getCfLists();
        pageMetadataModel.getContentType();
        pageMetadataModel.getPublishDate();
        pageMetadataModel.getDataLayerPageName();
        pageMetadataModel.getCategory();
        pageMetadataModel.getCategoryLevel1();
        pageMetadataModel.getCategoryLevel2();
        pageMetadataModel.getCategoryLevel3();
        assertNotNull(pageMetadataModel);
    }
    
    @Test
    void testGetCategory() {
    	context.currentResource(CATEGORY_RESOURCE_PATH);
        pageMetadataModel = context.request().adaptTo(PageMetadataModel.class);
        String category = pageMetadataModel.getCategory();
        assertNotNull(category);
    }
    
    @Test
    void testGetCategoryLevel1() {
    	context.currentResource(CATEGORY_LEVEL1_RESOURCE_PATH);
        pageMetadataModel = context.request().adaptTo(PageMetadataModel.class);
        String categoryLevel1 = pageMetadataModel.getCategoryLevel1();
        assertNotNull(categoryLevel1);
    }
    
    @Test
    void testGetCategoryLevel2() {
    	context.currentResource(CATEGORY_LEVEL2_RESOURCE_PATH);
        pageMetadataModel = context.request().adaptTo(PageMetadataModel.class);
        String categoryLevel2 = pageMetadataModel.getCategoryLevel2();
        assertNotNull(categoryLevel2);
    }
    
    @Test
    void testGetCategoryLevel3() {
    	context.currentResource(CATEGORY_LEVEL3_RESOURCE_PATH);
        pageMetadataModel = context.request().adaptTo(PageMetadataModel.class);
        String categoryLevel3 = pageMetadataModel.getCategoryLevel3();
        assertNotNull(categoryLevel3);
    }
      
    @Test
    void testContentType() {
    	context.currentResource(CF_RESOURCE_PATH);
    	pageMetadataModel = context.request().adaptTo(PageMetadataModel.class);
    	List<String> cfList = pageMetadataModel.getCfLists();
        assertNotNull(cfList);   	
    }
}
