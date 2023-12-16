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
class ScheduleCalendarModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ScheduleCalendarModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/calendar";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ScheduleCaledarModel scheduleCaledarModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ScheduleCaledarModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		scheduleCaledarModel = context.request().adaptTo(ScheduleCaledarModel.class);
		assertNotNull(scheduleCaledarModel);
		assertNotNull(scheduleCaledarModel.getAddressLabel());
		assertNotNull(scheduleCaledarModel.getAlertDescription());
		assertNotNull(scheduleCaledarModel.getAlertLinkText());
		assertNotNull(scheduleCaledarModel.getAlertTitle());
		assertNotNull(scheduleCaledarModel.getAvailTimeLabel());
		assertNotNull(scheduleCaledarModel.getBannerText());
		assertNotNull(scheduleCaledarModel.getBothShortForm());
		assertNotNull(scheduleCaledarModel.getBothLegend());
		assertNotNull(scheduleCaledarModel.getDataCalendarDialogDescription());
		assertNotNull(scheduleCaledarModel.getDataCalendarFocusLabel());
		assertNotNull(scheduleCaledarModel.getDataTestAnnouncementDistance());
		assertNotNull(scheduleCaledarModel.getDataTestAnnouncementLocation());
		assertNotNull(scheduleCaledarModel.getDataTestAnnouncementTestCenter());
		assertNotNull(scheduleCaledarModel.getDataTestAnnouncementTestFromHome());
		assertNotNull(scheduleCaledarModel.getDays());
		assertNotNull(scheduleCaledarModel.getDisableTestFromHome());
		assertNotNull(scheduleCaledarModel.getDistanceAriaLabel());
		assertNotNull(scheduleCaledarModel.getDistanceLabel());
		assertNotNull(scheduleCaledarModel.getGetDirectionAccessibleLabel());
		assertNotNull(scheduleCaledarModel.getGetDirectionLabel());
		assertNotNull(scheduleCaledarModel.getJsonPath());
		assertNotNull(scheduleCaledarModel.getLoader());
		assertNotNull(scheduleCaledarModel.getLocationAriaLabel());
		assertNotNull(scheduleCaledarModel.getLocationErrorDescText());
		assertNotNull(scheduleCaledarModel.getLocationLabel());
		assertNotNull(scheduleCaledarModel.getLocationPlaceholder());
		assertNotNull(scheduleCaledarModel.getMaxTestDate());
		assertNotNull(scheduleCaledarModel.getMinTestDate());
		assertNotNull(scheduleCaledarModel.getOnlyRemoteTest());
		assertNotNull(scheduleCaledarModel.getPraxisDisclaimerText());
		assertNotNull(scheduleCaledarModel.getPreselectDescText());
		assertNotNull(scheduleCaledarModel.getScheduleButtonText());
		assertNotNull(scheduleCaledarModel.getScheduleButtonUrl());
		assertNotNull(scheduleCaledarModel.getSeatsOpenLabel());
		assertNotNull(scheduleCaledarModel.getTestAriaLabel());
		assertNotNull(scheduleCaledarModel.getTestCenterAriaLabel());
		assertNotNull(scheduleCaledarModel.getTestCenter());
		assertNotNull(scheduleCaledarModel.getTestCenterInfo());
		assertNotNull(scheduleCaledarModel.getTestCenterLegend());
		assertNotNull(scheduleCaledarModel.getTestCenterPlaceHolder());
		assertNotNull(scheduleCaledarModel.getTestCenterShortForm());
		assertNotNull(scheduleCaledarModel.getTestErrorDescText());
		assertNotNull(scheduleCaledarModel.getTestFromHome());
		assertNotNull(scheduleCaledarModel.getTestFromHomeDescription());
		assertNotNull(scheduleCaledarModel.getTestFromHomeLegend());
		assertNotNull(scheduleCaledarModel.getTestFromHomeReqLink());
		assertNotNull(scheduleCaledarModel.getTestFromHomeReqText());
		assertNotNull(scheduleCaledarModel.getTestFromHomeShortForm());
		assertNotNull(scheduleCaledarModel.getTestJsonPath());
		assertNotNull(scheduleCaledarModel.getTestLabel());
		assertNotNull(scheduleCaledarModel.getTestPlaceholder());
		assertNotNull(scheduleCaledarModel.getTestPlaceholder());
		assertNotNull(scheduleCaledarModel.getTooltipText());
		assertNotNull(scheduleCaledarModel.getWarnDescription());
		assertNotNull(scheduleCaledarModel.getWarnTitle());
	}
}