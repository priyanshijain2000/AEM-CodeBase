package org.ets.core.services.impl;

import org.osgi.framework.Constants;
import org.ets.core.config.CommonConfiguration;
import org.ets.core.services.CommonService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

@Component(
        service = CommonService.class,
        immediate = true,
        property = {
                Constants.SERVICE_ID + "=Common Service",
                Constants.SERVICE_DESCRIPTION + "=This service reads values from Common Configuration"
        })
@Designate(ocd = CommonConfiguration.class)
public class CommonServiceImpl implements CommonService {

	private CommonConfiguration configuration;

    @Activate
    protected void activate(CommonConfiguration configuration) {
        this.configuration = configuration;
    }

	@Override
	public String getRunmode() {
		return configuration.getRunmode();
	}
	
	@Override
	public String getEnvironment() {
		return configuration.getEnvironment();
	}

	@Override
	public String getGtmId() {
		return configuration.getGtmId();
	}
}
