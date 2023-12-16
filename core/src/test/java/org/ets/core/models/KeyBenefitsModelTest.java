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
class KeyBenefitsModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/KeyBenefitsModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/benefits-panel";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	KeyBenefitsModel keyBenefitsModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(KeyBenefitsModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		keyBenefitsModel = context.request().adaptTo(KeyBenefitsModel.class);
		assertNotNull(keyBenefitsModel);
		assertNotNull(keyBenefitsModel.getVariant());
		assertNotNull(keyBenefitsModel.getTitle());
		assertNotNull(keyBenefitsModel.getColor());
		assertNotNull(keyBenefitsModel.getCtaButtonLabel());
		assertNotNull(keyBenefitsModel.getCtaButtonLink());
		assertNotNull(keyBenefitsModel.getCtaButtonAriaLabel());
		assertNotNull(keyBenefitsModel.getNewTab1());
		assertNotNull(keyBenefitsModel.getCtaText());
		assertNotNull(keyBenefitsModel.getCtaLink());
		assertNotNull(keyBenefitsModel.getCtaLinkAriaLabel());
		assertNotNull(keyBenefitsModel.getNewTab2());
	}
}