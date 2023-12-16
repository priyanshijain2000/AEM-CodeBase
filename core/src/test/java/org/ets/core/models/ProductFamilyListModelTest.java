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
class ProductFamilyListModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ProductFamilyListModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/product-family-list";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ProductFamilyListModel productFamilyListModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ProductFamilyListModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		productFamilyListModel = context.request().adaptTo(ProductFamilyListModel.class);
		assertNotNull(productFamilyListModel);
		assertNotNull(productFamilyListModel.getAllResourcesLink1());
		assertNotNull(productFamilyListModel.getAllResourcesLink2());
		assertNotNull(productFamilyListModel.getAllResourcesTitle1());
		assertNotNull(productFamilyListModel.getAllResourcesTitle2());
		assertNotNull(productFamilyListModel.getAltText());
		assertNotNull(productFamilyListModel.getAssetType());
		assertNotNull(productFamilyListModel.getCtaLinkAriaLabel1());
		assertNotNull(productFamilyListModel.getCtaLinkAriaLabel2());
		assertNotNull(productFamilyListModel.getImagePath());
		assertNotNull(productFamilyListModel.getLink());
		assertNotNull(productFamilyListModel.getNewTab());
		assertNotNull(productFamilyListModel.getNewTab1());
		assertNotNull(productFamilyListModel.getNewTab2());
		assertNotNull(productFamilyListModel.getTabonetitle());
		assertNotNull(productFamilyListModel.getTabtwotitle());
		assertNotNull(productFamilyListModel.getTitle());
		assertNotNull(productFamilyListModel.getText());
		assertNotNull(productFamilyListModel.getThumbnail());
		assertNotNull(productFamilyListModel.getVideoPath());
	}
}