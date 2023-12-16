package org.ets.core.servlets;

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

import javax.servlet.Servlet;
import javax.servlet.http.Cookie;

import java.io.IOException;
import java.io.Serializable;

@Component(service = Servlet.class, property = {
        "sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths=" + "/bin/ets/test-location-availability",
        "sling.servlet.extensions=" + "json"})
@ServiceDescription("Test location availability Servlet")
public class TestLocationAvailabilityServlet extends SlingSafeMethodsServlet implements Serializable{
	
	private static final String HTTP = "http";
	private static final String START_DATE = "startDate";
	private static final String END_DATE = "endDate";

	private static final long serialVersionUID = -5835590412332179115L;
	
	protected static final Logger log = LoggerFactory.getLogger(TestLocationAvailabilityServlet.class);

	@Reference
	private transient EssaApiService essaApiService;
	
	@Reference
	private transient XSSAPI xssAPI;

	@Override
	    protected void doGet(SlingHttpServletRequest request, final SlingHttpServletResponse response) {
			try
			{
				String startDate= request.getParameter(START_DATE);
				String endDate= request.getParameter(END_DATE);
				String jsonResponse = StringUtils.EMPTY;
				Cookie cookie = essaApiService.setTokenCookie(request, response);
				String token=cookie.getValue();
				if(!token.contains(HTTP)) {
					jsonResponse=essaApiService.getAvailableLocation(token, request, xssAPI, startDate, endDate);
				}
				response.setContentType("application/json");
				response.getWriter().print(jsonResponse);
			}catch (Exception e) {
				log.error("IOException in AllSeatsAvailabilityServlet : {}",e.getMessage());
			}
	 	}
}
