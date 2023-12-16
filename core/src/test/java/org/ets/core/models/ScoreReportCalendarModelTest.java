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
class ScoreReportCalendarModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ScoreReportCalendarModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/score-report-calendar";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ScoreReportCalendarModel scoreReportCalendarModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ScoreReportCalendarModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		scoreReportCalendarModel = context.request().adaptTo(ScoreReportCalendarModel.class);
		assertNotNull(scoreReportCalendarModel);
		assertNotNull(scoreReportCalendarModel.getDateAriaLabel());
		assertNotNull(scoreReportCalendarModel.getDateLabel());
		assertNotNull(scoreReportCalendarModel.getDatePlaceholder());
		assertNotNull(scoreReportCalendarModel.getDesc1());
		assertNotNull(scoreReportCalendarModel.getDesc2());
		assertNotNull(scoreReportCalendarModel.getDesc3());
		assertNotNull(scoreReportCalendarModel.getDisclaimerAlt());
		assertNotNull(scoreReportCalendarModel.getDisclaimerTitle());
		assertNotNull(scoreReportCalendarModel.getInfoDescription());
		assertNotNull(scoreReportCalendarModel.getJson());
		assertNotNull(scoreReportCalendarModel.getMaxDate());
		assertNotNull(scoreReportCalendarModel.getMinDate());
		assertNotNull(scoreReportCalendarModel.getMonthAriaLabel());
		assertNotNull(scoreReportCalendarModel.getMonthLabel());
		assertNotNull(scoreReportCalendarModel.getMonthPlaceholder());
		assertNotNull(scoreReportCalendarModel.getSubtitle());
		assertNotNull(scoreReportCalendarModel.getTestAriaLabel());
		assertNotNull(scoreReportCalendarModel.getTestLabel());
		assertNotNull(scoreReportCalendarModel.getTestPlaceHolder());
		assertNotNull(scoreReportCalendarModel.getTitle());
		assertNotNull(scoreReportCalendarModel.getYearAriaLabel());
		assertNotNull(scoreReportCalendarModel.getYearLabel());
		assertNotNull(scoreReportCalendarModel.getYearPlaceholder());
	}
}