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
class ResearcherPatentModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ResearcherPatentModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/researcher-patent";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ResearcherPatentModel researcherPatentModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ResearcherPatentModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		researcherPatentModel = context.request().adaptTo(ResearcherPatentModel.class);
		assertNotNull(researcherPatentModel);
		assertNotNull(researcherPatentModel.getAltText());
		assertNotNull(researcherPatentModel.getAuthors());
		assertNotNull(researcherPatentModel.getBodyDescription());
		assertNotNull(researcherPatentModel.getKeywords());
		assertNotNull(researcherPatentModel.getFamilyId());
		assertNotNull(researcherPatentModel.getPublicationType());
		assertNotNull(researcherPatentModel.getReportNumber());
		assertNotNull(researcherPatentModel.getSource());
		assertNotNull(researcherPatentModel.getTitle());
		assertNotNull(researcherPatentModel.getUrl());
		assertNotNull(researcherPatentModel.getYear());
	}
}