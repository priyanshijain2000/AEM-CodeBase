package org.ets.core.services;

public interface CommonService {

    /**
     * @return name of the instance run mode
     */
    String getRunmode();
    
    /**
     * @return name of the instance environment
     */
    String getEnvironment();
    
    /**
     * @return GTM script id
     */
    String getGtmId();
}
