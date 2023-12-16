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
class DestinationSearchModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/DestinationSearchModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/destination-search";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	DestinationSearchModel destinationSearchModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(DestinationSearchModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		destinationSearchModel = context.request().adaptTo(DestinationSearchModel.class);
		assertNotNull(destinationSearchModel);
		assertNotNull(destinationSearchModel.getCountText());
		assertNotNull(destinationSearchModel.getCtaButtonAriaLabel());
		assertNotNull(destinationSearchModel.getCtaLabel());
		assertNotNull(destinationSearchModel.getDestinationAPI());
		assertNotNull(destinationSearchModel.getDropdownAriaLabel());
		assertNotNull(destinationSearchModel.getDropdownListAriaLabel());
		assertNotNull(destinationSearchModel.getErrormsg1());
		assertNotNull(destinationSearchModel.getErrormsg2());
		assertNotNull(destinationSearchModel.getInitialContent());
		assertNotNull(destinationSearchModel.getInputPaginationAriaLabel());
		assertNotNull(destinationSearchModel.getInstitutions());
		assertNotNull(destinationSearchModel.getInstitutionsRadioLabel());
		assertNotNull(destinationSearchModel.getLocations());
		assertNotNull(destinationSearchModel.getLocationsRadioLabel());
		assertNotNull(destinationSearchModel.getNextAriaLabel());
		assertNotNull(destinationSearchModel.getNextLabel());
		assertNotNull(destinationSearchModel.getPlaceholderAriaLabel());
		assertNotNull(destinationSearchModel.getPlaceHolderText());
		assertNotNull(destinationSearchModel.getPrevAriaLabel());
		assertNotNull(destinationSearchModel.getPrevLabel());
		assertNotNull(destinationSearchModel.getResultDisclaimer());
	}
}