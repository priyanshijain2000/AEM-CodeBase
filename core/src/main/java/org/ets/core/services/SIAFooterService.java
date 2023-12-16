package org.ets.core.services;

import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.ResourceResolver;

public interface SIAFooterService {
    public void getFooterItems(Page parentPage, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName);
}
