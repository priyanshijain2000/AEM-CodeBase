package org.ets.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class SystemMessageModelTest {

    static final String RESOURCE_PATH = "/org/ets/core/models/SystemMessageModelResource.json";

    static final String CURRENT_RESOURCE_PATH = "/content/systemmessage";

    static final String ROOT_PATH = "/content";

    private AemContext aemContext = new AemContext();

    @Mock
    private ModelFactory modelFactory;

    SystemMessageModel systemMessageModel;

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SystemMessageModel.class);
        aemContext.load().json(RESOURCE_PATH, ROOT_PATH);
        aemContext.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
                Integer.MAX_VALUE);
    }

    @Test
    void testWithAlertDescription() {
        aemContext.currentResource(CURRENT_RESOURCE_PATH);
        systemMessageModel = aemContext.request().adaptTo(SystemMessageModel.class);
        assertNotNull(systemMessageModel.getWarnDescription());
        assertNotNull(systemMessageModel.getAlertDescription());
        assertNotNull(systemMessageModel.getInformDescription());
    }
}