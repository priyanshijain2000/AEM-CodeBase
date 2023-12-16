package org.ets.core.services;

import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.ResourceResolver;

public interface SIAHeaderService {
    public void getFirstNavItems(Page parentPage, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName);
}
