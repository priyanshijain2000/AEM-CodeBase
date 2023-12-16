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
class ScoreRequirementModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ScoreRequirementModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/score-requirement";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ScoreRequirementModel scoreRequirementModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ScoreRequirementModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		scoreRequirementModel = context.request().adaptTo(ScoreRequirementModel.class);
		assertNotNull(scoreRequirementModel);
		assertNotNull(scoreRequirementModel.getCodeLabel());
		assertNotNull(scoreRequirementModel.getCountTextLabel());
		assertNotNull(scoreRequirementModel.getInputPaginationAriaLabel());
		assertNotNull(scoreRequirementModel.getNextAriaLabel());
		assertNotNull(scoreRequirementModel.getNextLabel());
		assertNotNull(scoreRequirementModel.getPath());
		assertNotNull(scoreRequirementModel.getPrevAriaLabel());
		assertNotNull(scoreRequirementModel.getPrevLabel());
		assertNotNull(scoreRequirementModel.getScoreLabel());
		assertNotNull(scoreRequirementModel.getStateAriaLabel());
		assertNotNull(scoreRequirementModel.getStateLabel());
		assertNotNull(scoreRequirementModel.getStateph());
		assertNotNull(scoreRequirementModel.getTestAriaLabel());
		assertNotNull(scoreRequirementModel.getTestLabel());
		assertNotNull(scoreRequirementModel.getTestph());
	}
}