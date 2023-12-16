package org.ets.core.services.impl;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class SIAHeaderServiceImplTest {

    AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
    SIAHeaderServiceImpl siaHeaderService;

    ResourceResolver resourceResolver;

    String jsonStorageDirectory = "/content/dam/ets-org/json";
    String jsonFileName = "en.json";

    Page page;

    @BeforeEach
    void setUp() {
        aemContext.load().json("/org/ets/core/service/header.json", "/content/header/en");
        resourceResolver = aemContext.resourceResolver();
        siaHeaderService = aemContext.registerService(new SIAHeaderServiceImpl());
        page = aemContext.currentPage("/content/header/en/sia-header");
    }

    @Test
    void getFirstNavItems() {
        siaHeaderService.getFirstNavItems(page, resourceResolver, jsonStorageDirectory, jsonFileName);
    }
}