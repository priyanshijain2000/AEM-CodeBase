package org.ets.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class AlertMessageModelTest {
	
	static final String RESOURCE_PATH = "/org/ets/core/models/AlertMessageModelResource.json";
	
	static final String CURRENT_RESOURCE_PATH = "/content/alertmessage";
	
	static final String ROOT_PATH = "/content";
	
	private AemContext aemContext = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	AlertMessageModel alertMessageModel;

	@BeforeEach
	void setUp() {
		aemContext.addModelsForClasses(AlertMessageModel.class);
		aemContext.load().json(RESOURCE_PATH, ROOT_PATH);
		aemContext.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testWithAlertDescription() {
		String expected = "All services closed on July 28, 2021 for updates";
		String actual = null;
		aemContext.currentResource(CURRENT_RESOURCE_PATH);
		alertMessageModel = aemContext.request().adaptTo(AlertMessageModel.class);
		actual = alertMessageModel.getAlertdesc();
		assertEquals(actual, expected);
	}

	@Test
	void testWithoutAlertDescription() {
		String actual = null;
		aemContext.currentResource(CURRENT_RESOURCE_PATH);
		alertMessageModel = aemContext.request().adaptTo(AlertMessageModel.class);
		actual = alertMessageModel.getAlertdesc();
		assertNotNull(actual);
	}

	@Test
	void testWithValidIcon() {
		String actual = null;
		aemContext.currentResource(CURRENT_RESOURCE_PATH);
		alertMessageModel = aemContext.request().adaptTo(AlertMessageModel.class);
		actual = alertMessageModel.getIcon();
		assertNotNull(actual);
	}

	@Test
	void testVisibleOnPage() {
		aemContext.currentResource(CURRENT_RESOURCE_PATH);
		alertMessageModel = aemContext.request().adaptTo(AlertMessageModel.class);
		Assert.assertTrue(alertMessageModel.isOnoff());
	}

	@Test
	void testWithAlternateText() {
		String expected = "Bell Icon";
		String actual = null;
		aemContext.currentResource(CURRENT_RESOURCE_PATH);
		alertMessageModel = aemContext.request().adaptTo(AlertMessageModel.class);
		actual = alertMessageModel.getAltText();
		assertEquals(actual, expected);
	}

	@Test
	void testWithoutAlternateText() {
		String actual = null;
		aemContext.currentResource(CURRENT_RESOURCE_PATH);
		alertMessageModel = aemContext.request().adaptTo(AlertMessageModel.class);
		actual = alertMessageModel.getAltText();
		assertNotNull(actual);
	}

	@Test
	void testAriaLabel() {
		String actual = null;
		aemContext.currentResource(CURRENT_RESOURCE_PATH);
		alertMessageModel = aemContext.request().adaptTo(AlertMessageModel.class);
		actual = alertMessageModel.getAriaLabel();
		assertNotNull(actual);
	}
}