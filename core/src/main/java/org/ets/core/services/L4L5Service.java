package org.ets.core.services;

import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.ResourceResolver;

public interface L4L5Service {
    public void getL4L5Items(Page parentPage, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName);
}
