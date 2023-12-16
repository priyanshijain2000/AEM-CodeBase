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
class SearchResultModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/SearchResultModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/results";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	SearchResultModel searchResultModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(SearchResultModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		searchResultModel = context.request().adaptTo(SearchResultModel.class);
		assertNotNull(searchResultModel);
		assertNotNull(searchResultModel.getApplyFiltersButton());
		assertNotNull(searchResultModel.getAuthorAriaLabel());
		assertNotNull(searchResultModel.getAuthorLabel());
		assertNotNull(searchResultModel.getAuthorPlaceholder());
		assertNotNull(searchResultModel.getClearFiltersButton());
		assertNotNull(searchResultModel.getCtaButtonAriaLabel());
		assertNotNull(searchResultModel.getCountTextLabel());
		assertNotNull(searchResultModel.getCtaLabel());
		assertNotNull(searchResultModel.getFilterLabel());
		assertNotNull(searchResultModel.getFormatsAriaLabel());
		assertNotNull(searchResultModel.getFormatsLabel());
		assertNotNull(searchResultModel.getFormatsPlaceholder());
		assertNotNull(searchResultModel.getInputPaginationAriaLabel());
		assertNotNull(searchResultModel.getNextAriaLabel());
		assertNotNull(searchResultModel.getNextLabel());
		assertNotNull(searchResultModel.getNoKeywordMsg());
		assertNotNull(searchResultModel.getNoResultMsg());
		assertNotNull(searchResultModel.getPath());
		assertNotNull(searchResultModel.getPlaceHolderText());
		assertNotNull(searchResultModel.getPrevAriaLabel());
		assertNotNull(searchResultModel.getPrevLabel());
		assertNotNull(searchResultModel.getPublicationYear());
		assertNotNull(searchResultModel.getSearchAriaLabel());
		assertNotNull(searchResultModel.getSubjectAriaLabel());
		assertNotNull(searchResultModel.getSubjectLabel());
		assertNotNull(searchResultModel.getSubjectPlaceholder());
	}
}