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

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class GlobalSearchModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/GlobalSearchModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/globalSearch";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	GlobalSearchModel globalSearchModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(GlobalSearchModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		globalSearchModel = context.request().adaptTo(GlobalSearchModel.class);
		assertNotNull(globalSearchModel);
		assertNotNull(globalSearchModel.getEndpoint());
		assertNotNull(globalSearchModel.getPlaceholder());
		assertNotNull(globalSearchModel.getSearchButtonText());
		assertNotNull(globalSearchModel.getNoKeywordMsg());
		assertNotNull(globalSearchModel.getNoResultMsg());
		assertNotNull(globalSearchModel.getQuickLink());
		assertNotNull(globalSearchModel.getInputAriaLabel());
		assertNotNull(globalSearchModel.getPrevLabel());
		assertNotNull(globalSearchModel.getNextLabel());
		assertNotNull(globalSearchModel.getCountTextLabel());
		assertNotNull(globalSearchModel.getPrevAriaLabel());
		assertNotNull(globalSearchModel.getNextAriaLabel());
		assertNotNull(globalSearchModel.getInputPaginationAriaLabel());
		assertNotNull(globalSearchModel.getFilterLabel());
	}
}