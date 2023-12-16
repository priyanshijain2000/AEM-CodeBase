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
class FilterDropdownModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/FilterDropdownModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/filter-dropdown";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	FilterDropdownModel filterDropdownModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(FilterDropdownModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		filterDropdownModel = context.request().adaptTo(FilterDropdownModel.class);
		assertNotNull(filterDropdownModel);
		assertNotNull(filterDropdownModel.getDataTemplate());
		assertNotNull(filterDropdownModel.getInputAriaLabel());
		assertNotNull(filterDropdownModel.getJson());
		assertNotNull(filterDropdownModel.getPlaceholderText());
		assertNotNull(filterDropdownModel.getPrimaryLabel());
		assertNotNull(filterDropdownModel.getSecondaryLabel());
		assertNotNull(filterDropdownModel.getSecondaryPlaceholderText());
		assertNotNull(filterDropdownModel.getSectionTitle());
	}
}