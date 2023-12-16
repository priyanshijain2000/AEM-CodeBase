package org.ets.core.services;

import javax.servlet.http.Cookie;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.xss.XSSAPI;

/**
 * This interface exposes the functionality of calling a JSON Web Service
 */

public interface EssaApiService {

	public Cookie setTokenCookie(SlingHttpServletRequest request, SlingHttpServletResponse response);
		
	/**
	 * @param token
	 * @param request
	 * @return
	 */
	public String getAvailableLocation(String token, SlingHttpServletRequest request, XSSAPI xssAPI, String startDate, String endDate);
	
	/**
	 * @param token
	 * @param request
	 * @return
	 */
	public String getAvailableSeats(String token, SlingHttpServletRequest request, XSSAPI xssAPI);
	
}