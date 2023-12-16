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
class ResearcherSearchModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ResearcherSearchModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/researcher-search";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ResearcherSearchModel researcherSearchModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ResearcherSearchModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		researcherSearchModel = context.request().adaptTo(ResearcherSearchModel.class);
		assertNotNull(researcherSearchModel);
		assertNotNull(researcherSearchModel.getCtaButtonAriaLabel());
		assertNotNull(researcherSearchModel.getCtaLabel());
		assertNotNull(researcherSearchModel.getLink());
		assertNotNull(researcherSearchModel.getPlaceHolderText());
		assertNotNull(researcherSearchModel.getSearchAlt());
		assertNotNull(researcherSearchModel.getSectionTitle());
		assertNotNull(researcherSearchModel.getSearchAriaLabel());
	}
}