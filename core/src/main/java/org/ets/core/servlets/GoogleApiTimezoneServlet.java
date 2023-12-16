package org.ets.core.servlets;

import java.io.IOException;
import java.io.Serializable;
import java.net.URISyntaxException;
import java.util.List;

import javax.servlet.Servlet;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(service = Servlet.class, property = {
        "sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths=" + "/bin/ets/timeZoneId",
		"sling.servlet.extensions=" + "json"})
@ServiceDescription("Google API Servlet")
public class GoogleApiTimezoneServlet extends SlingSafeMethodsServlet implements Serializable{

	private static final long serialVersionUID = 1L;
	
	protected static final Logger log = LoggerFactory.getLogger(GoogleApiTimezoneServlet.class);
	private static final String KEY = "key";
	private static final String APIKEY = "AIzaSyCVeRqi46XXY1hK-lPxt8LZxSFpKD9h9Xo";
	
	protected void doGet(SlingHttpServletRequest request, final SlingHttpServletResponse response) {
		String jsonResponseString = StringUtils.EMPTY;
		List<RequestParameter> requestParameterList=request.getRequestParameterList();
		CloseableHttpClient httpClient = HttpClients.createDefault();
		String url = "https://maps.googleapis.com/maps/api/timezone/json";
		
		try{
			JsonObject jsonObject = new JsonObject();
			
			final URIBuilder uri = new URIBuilder(url).addParameter(KEY, APIKEY);
			
			for (RequestParameter requestParameter : requestParameterList) {
				uri.addParameter(requestParameter.getName(), requestParameter.getString());
			}
			
			final HttpGet httpGet = new HttpGet(uri.build());
			CloseableHttpResponse httpresponse = httpClient.execute(httpGet);
			
			
			if(httpresponse.getStatusLine().getStatusCode() >= 200 &&
					httpresponse.getStatusLine().getStatusCode() <= 299){
				jsonResponseString = EntityUtils.toString(httpresponse.getEntity());
				jsonObject = (JsonObject)JsonParser.parseString(jsonResponseString);
            }
			else
			{
				response.setContentType("application/json");
				response.getWriter().print(jsonObject);
            }
			response.setContentType("application/json");
			response.getWriter().print(jsonObject);
		}
		catch (IOException | URISyntaxException e) {
			log.error("Exception in GoogleApiTimezoneServlet Get Method {}", e.getMessage());
		}
		finally {
            try {
            	httpClient.close();
            } catch (final IOException e) {
            	log.error("Exception in closing httpClient {}", e.getMessage());
            }
		}
	}
}
