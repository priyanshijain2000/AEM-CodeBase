package org.ets.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class AllProductsFilterModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/AllProductFilterModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/allProductFilter";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	AllProductsFilterModel allProductsFilterModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(AllProductsFilterModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);

	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		allProductsFilterModel = context.request().adaptTo(AllProductsFilterModel.class);
		assertNotNull(allProductsFilterModel);
		assertNotNull(allProductsFilterModel.getSourcePath());
		assertNotNull(allProductsFilterModel.getAllProductsText());
		assertNotNull(allProductsFilterModel.getSearchBoxText());
		assertNotNull(allProductsFilterModel.getSearchAriaLabel());
		assertNotNull(allProductsFilterModel.getSearchText());
		assertNotNull(allProductsFilterModel.getNoResultText());
		assertNotNull(allProductsFilterModel.getFilterBoxText());
		assertNotNull(allProductsFilterModel.getFilterText());
		assertNotNull(allProductsFilterModel.getSearchAlt());
		assertNotNull(allProductsFilterModel.getNextLabel());
		assertNotNull(allProductsFilterModel.getPrevLabel());
		assertNotNull(allProductsFilterModel.getCountTextLabel());
		assertNotNull(allProductsFilterModel.getPrevAriaLabel());
		assertNotNull(allProductsFilterModel.getNextAriaLabel());
		assertNotNull(allProductsFilterModel.getInputPaginationAriaLabel());
	}
}
