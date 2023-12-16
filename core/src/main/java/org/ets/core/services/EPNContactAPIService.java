package org.ets.core.services;

import org.apache.sling.api.resource.ResourceResolver;

/**
 * This interface exposes the functionality of calling a JSON Web Service
 */

public interface EPNContactAPIService {
	
	/**
	 * This method makes the HTTP call on the given URL
	 * 
	 * @param url
	 * @return {@link String}
	 */

	public String getToken();
	
	/**
	 * @param token
	 * @param request
	 * @return
	 */

	public String fetchEPNTokenResponse(String url, String clientId, String clientSecret, String username, String password);
	public void getEPNContactJson(ResourceResolver resourceResolver, String token);
}
