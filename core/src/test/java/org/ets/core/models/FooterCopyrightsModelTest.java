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
class FooterCopyrightsModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/FooterCopyrightsModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/copyrights";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	FooterCopyrightsModel footerCopyrightsModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(FooterCopyrightsModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		footerCopyrightsModel = context.request().adaptTo(FooterCopyrightsModel.class);
		assertNotNull(footerCopyrightsModel);
		assertNotNull(footerCopyrightsModel.getTexttitle());
		assertNotNull(footerCopyrightsModel.getCopyrightdesc());
		assertNotNull(footerCopyrightsModel.getCookiePlaceholder());
	}
}