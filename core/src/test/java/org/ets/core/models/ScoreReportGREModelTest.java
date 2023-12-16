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
class ScoreReportGREModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ScoreReportGREModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/score-report-gre";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ScoreReportGREModel scoreReportGREModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ScoreReportGREModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		scoreReportGREModel = context.request().adaptTo(ScoreReportGREModel.class);
		assertNotNull(scoreReportGREModel);
		assertNotNull(scoreReportGREModel.getDateAriaLabel());
		assertNotNull(scoreReportGREModel.getDateLabel());
		assertNotNull(scoreReportGREModel.getDatePlaceholder());
		assertNotNull(scoreReportGREModel.getDesc1());
		assertNotNull(scoreReportGREModel.getDesc2());
		assertNotNull(scoreReportGREModel.getDisclaimerAlt());
		assertNotNull(scoreReportGREModel.getMonthAriaLabel());
		assertNotNull(scoreReportGREModel.getMonthLabel());
		assertNotNull(scoreReportGREModel.getMonthPlaceholder());
		assertNotNull(scoreReportGREModel.getYearAriaLabel());
		assertNotNull(scoreReportGREModel.getYearLabel());
		assertNotNull(scoreReportGREModel.getYearPlaceholder());
	}
}