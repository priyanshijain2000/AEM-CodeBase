package org.ets.core.servlets;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.Servlet;
import javax.servlet.http.Cookie;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.xss.XSSAPI;
import org.ets.core.services.EssaApiService;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = Servlet.class, property = {
        "sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths=" + "/bin/ets/all-seats-availability",
		"sling.servlet.extensions=" + "json"})
@ServiceDescription("Seat availability Servlet")
public class AllSeatsAvailabilityServlet extends SlingSafeMethodsServlet implements Serializable{
	
	private static final String HTTP = "http";
	
	private static final long serialVersionUID = 1L;
	
	protected static final Logger log = LoggerFactory.getLogger(AllSeatsAvailabilityServlet.class);

	@Reference
	private transient EssaApiService essaApiService;
	
	@Reference
	private transient XSSAPI xssAPI;
	
	@Override
    protected void doGet(SlingHttpServletRequest request, final SlingHttpServletResponse response) {
		try
		{
			String jsonResponse=StringUtils.EMPTY;
			if(essaApiService!=null) {
				Cookie cookie = essaApiService.setTokenCookie(request, response);
				String token=cookie.getValue();
				if(!token.contains(HTTP)) {
					jsonResponse = essaApiService.getAvailableSeats(token, request, xssAPI);
				}
			}
			response.setContentType("application/json");
			response.getWriter().print(jsonResponse);
		}catch (IOException e) {
			log.error("IOException in AllSeatsAvailabilityServlet : {}",e.getMessage());
		}
	}
}
