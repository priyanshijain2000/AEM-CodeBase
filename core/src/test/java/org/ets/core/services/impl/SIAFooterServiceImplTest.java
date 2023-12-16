package org.ets.core.services.impl;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class SIAFooterServiceImplTest {

    AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
    SIAFooterServiceImpl siaFooterService;

    ResourceResolver resourceResolver;

    String jsonStorageDirectory = "/content/dam/ets-org/json";
    String jsonFileName = "en.json";

    Page page;

    @BeforeEach
    void setUp() {
    }

    @Test
    void getFooterItems() {
    }
}