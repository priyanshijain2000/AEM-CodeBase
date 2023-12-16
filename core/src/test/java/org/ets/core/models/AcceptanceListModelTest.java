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
class AcceptanceListModelTest {
	
static final String RESOURCE_PATH = "/org/ets/core/models/AcceptanceListModelResource.json";
	
	static final String CURRENT_RESOURCE_PATH = "/content/acceptanceList";
	
	static final String ROOT_PATH = "/content";

    private AemContext context = new AemContext();
    
    @Mock
    private ModelFactory modelFactory;
    
    AcceptanceListModel acceptanceListModel;

    @BeforeEach
    public void setUp() throws Exception {
    	context.addModelsForClasses(AcceptanceListModel.class);
    	context.load().json(RESOURCE_PATH, ROOT_PATH);
    	context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
                Integer.MAX_VALUE);
    	
    }
    
    @Test
    void testDetails() { 
    	context.currentResource(CURRENT_RESOURCE_PATH);
    	acceptanceListModel = context.request().adaptTo(AcceptanceListModel.class);
        assertNotNull(acceptanceListModel);
        assertNotNull(acceptanceListModel.getJson());
        assertNotNull(acceptanceListModel.getNorecmsg());
        assertNotNull(acceptanceListModel.getPrevLabel());
        assertNotNull(acceptanceListModel.getNextLabel());
        assertNotNull(acceptanceListModel.getCountTextLabel());
        assertNotNull(acceptanceListModel.getInputPaginationAriaLabel());
        assertNotNull(acceptanceListModel.getPrevAriaLabel());
        assertNotNull(acceptanceListModel.getNextAriaLabel());
        assertNotNull(acceptanceListModel.getFootnote());
        assertNotNull(acceptanceListModel.getSearchBoxPlaceholder());
        assertNotNull(acceptanceListModel.getSearchLabel());
        assertNotNull(acceptanceListModel.getEntriesLabel());
        assertNotNull(acceptanceListModel.getCountryLabel());
        assertNotNull(acceptanceListModel.getStateLabel());
        assertNotNull(acceptanceListModel.getInstitutionLabel());
        assertNotNull(acceptanceListModel.getProgramLabel());
        assertNotNull(acceptanceListModel.getSearchAlt());
        assertNotNull(acceptanceListModel.getArrowAlt());
        assertNotNull(acceptanceListModel.getSearchAriaLabel());
        assertNotNull(acceptanceListModel.getEntriesAriaLabel());
        assertNotNull(acceptanceListModel.getRightArrowAlt());
    }
}