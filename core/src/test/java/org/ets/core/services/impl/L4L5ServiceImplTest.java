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
class L4L5ServiceImplTest {

    AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);
    L4L5ServiceImpl l4L5Service;

    ResourceResolver resourceResolver;

    String jsonStorageDirectory = "/content/dam/ets-org/json";
    String jsonFileName = "en.json";

    Page page;

    @BeforeEach
    void setUp() {
        aemContext.load().json("/org/ets/core/service/header.json", "/content/header/en");
        resourceResolver = aemContext.resourceResolver();
        l4L5Service = aemContext.registerService(new L4L5ServiceImpl());
        page = aemContext.currentPage("/content/header/en/l4l5Pages");
    }

    @Test
    void getL4L5Items() {
        l4L5Service.getL4L5Items(page, resourceResolver, jsonStorageDirectory, jsonFileName);
    }
}