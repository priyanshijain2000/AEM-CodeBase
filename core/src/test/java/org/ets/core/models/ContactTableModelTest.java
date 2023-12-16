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
class ContactTableModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/ContactTableModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/contactTable";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	ContactTableModel contactTableModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(ContactTableModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);

	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		contactTableModel = context.request().adaptTo(ContactTableModel.class);
		assertNotNull(contactTableModel);
		assertNotNull(contactTableModel.getTitle());
		assertNotNull(contactTableModel.getSubtitle());
		assertNotNull(contactTableModel.getFetchTitle());
		assertNotNull(contactTableModel.getNote());
		assertNotNull(contactTableModel.getCenter());
		assertNotNull(contactTableModel.getTddAccess());
		assertNotNull(contactTableModel.getClo());
		assertNotNull(contactTableModel.getEmail());
		assertNotNull(contactTableModel.getEmailNote());
		assertNotNull(contactTableModel.getPhone());
		assertNotNull(contactTableModel.getTollFreePhone());
		assertNotNull(contactTableModel.getCandidateCares());
		assertNotNull(contactTableModel.getTty());
		assertNotNull(contactTableModel.getFax());
		assertNotNull(contactTableModel.getBureauOfCredentialing());
		assertNotNull(contactTableModel.getPhysicalAddress());
		assertNotNull(contactTableModel.getAddress());
		assertNotNull(contactTableModel.getMail());
		assertNotNull(contactTableModel.getNationalOffice());
		assertNotNull(contactTableModel.getWebsiteURL());
		assertNotNull(contactTableModel.getWebsiteTitle());
		assertNotNull(contactTableModel.getDepartment());
		assertNotNull(contactTableModel.getDepartmentURL());
		assertNotNull(contactTableModel.getHours());
		assertNotNull(contactTableModel.getOfficeHours());
	}
}