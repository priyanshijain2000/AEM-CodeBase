package org.ets.core.services.impl;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.Cookie;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.xss.XSSAPI;
import org.ets.core.config.EssaApiConfiguration;
import org.ets.core.services.EssaApiService;
import org.ets.core.utils.NetworkUtil;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 *   Implementation class of HttpService interface and this class reads
 *   values from the OSGi configuration as well
 */
@Component(service = EssaApiService.class, immediate = true)
@Designate(ocd = EssaApiConfiguration.class)
public class EssaApiServiceImpl implements EssaApiService {

	private static final String DAYS_STRING = "days";
	private static final String TRANSACTION_ID = "transactionID";
	private static final String SESSION_ID = "sessionID";
	private static final String SOURCE = "source";
	private static final String MESSAGE_ID = "messageID";
	private static final String AUTHORIZATION = "Authorization";
	private static final String ESSA_TOKEN = "essaToken";
	private static final String PROGRAM_CODE = "programCode";
	private static final String BEARER = "Bearer ";
	private static final String HTTP = "http";
	private static final int EXPIRY = 59*60;
	/* Logger*/
	private static final Logger log = LoggerFactory.getLogger(EssaApiServiceImpl.class);

	/**
	 * Instance of the OSGi configuration class
	 */
	private EssaApiConfiguration configuration;

	@Activate
	protected void activate(EssaApiConfiguration configuration) {
		this.configuration = configuration;
	}

	@Override
	public Cookie setTokenCookie(SlingHttpServletRequest request, SlingHttpServletResponse response) {
		Cookie cookie=request.getCookie(ESSA_TOKEN);
		if(cookie==null) {
			String bearerToken=getBearerToken();
			cookie=new Cookie(ESSA_TOKEN, bearerToken);
			cookie.setHttpOnly(true);
			cookie.setPath("/");
			cookie.setMaxAge(EXPIRY);
			cookie.setDomain(request.getServerName());
			response.addCookie(cookie);
		}
		return cookie;
	}
	
	private String getBearerToken() {
		/* Reading values from the configuration*/
		String url = configuration.getTokenApiEndpoint();
		String username = configuration.getUsername();
		String password = configuration.getPassword();
		JsonObject jo=null;
		/* Making the actual HTTP call*/
		if(url!=null && username!=null && password!=null) {
			// Create authorization header
			String plainCredentials = username + ":" + password;
			String base64Credentials = new String(Base64.getEncoder().encode(plainCredentials.getBytes()));
			String authorizationHeader = "Basic " + base64Credentials;
			HttpPost post = new HttpPost(url);
			CloseableHttpClient httpClient = HttpClients.createDefault();
			post.addHeader(AUTHORIZATION, authorizationHeader);
			post.addHeader("Content-Type", "application/x-www-form-urlencoded");
			// add request parameters or form parameters
			List<NameValuePair> urlParameters = new ArrayList<>();
			urlParameters.add(new BasicNameValuePair("grant_type", "client_credentials"));
			try {
				post.setEntity(new UrlEncodedFormEntity(urlParameters));
				CloseableHttpResponse response = httpClient.execute(post);
				String jsonString = EntityUtils.toString(response.getEntity());
				jo = (JsonObject)JsonParser.parseString(jsonString);
			} catch (UnsupportedEncodingException e) {
				log.error("UnsupportedEncodingException in getBearerToken Method {}", e.getMessage());
			}
			catch (IOException e) {
				log.error("IOException in getBearerToken Method {}", e.getMessage());
			}
			finally {
	            try {
	            	httpClient.close();
	            } catch (final IOException e) {
	            	log.error("Exception in closing httpClient {}", e.getMessage());
	            }
			}
		}
		return ((jo!=null)?jo.get("access_token").getAsString():StringUtils.EMPTY);
	}
	
	@Override
	public String getAvailableLocation(String token,SlingHttpServletRequest request,XSSAPI xssAPI, String startDate, String endDate) {
		String jsonString = StringUtils.EMPTY;
		String url = configuration.getLocationAvailabilityEndpoint();
		String programCode=xssAPI.encodeForJSString(request.getParameter(PROGRAM_CODE));
		String days=xssAPI.encodeForJSString(request.getParameter(DAYS_STRING));
		List<RequestParameter> requestParameterList=request.getRequestParameterList();
		try {
			if(url!=null && programCode!=null && !programCode.contains(HTTP) && days!=null) {
				final URIBuilder uri = new URIBuilder(url).addParameter("StartDate", startDate)
						.addParameter("EndDate", endDate)
						.addParameter("TimeZoneId", "America/New_York")
						.addParameter("DeliveryMode", "ALL")
						.addParameter("IncludeAdtnlTestCenterInfo", "true");
				for (RequestParameter requestParameter : requestParameterList) {
					uri.addParameter(requestParameter.getName(), requestParameter.getString());
				}
				final HttpGet httpGet = new HttpGet(uri.build());
				httpGet.setHeader(TRANSACTION_ID, UUID.randomUUID().toString());
				httpGet.setHeader(SESSION_ID, UUID.randomUUID().toString());
				httpGet.setHeader(SOURCE, "VAN");
				httpGet.setHeader(MESSAGE_ID, "1");
				httpGet.setHeader(PROGRAM_CODE, programCode);
				httpGet.setHeader(AUTHORIZATION, BEARER + token);
				if(url.startsWith("https://")) {
					CloseableHttpClient httpClient = HttpClients.createDefault();
					jsonString=NetworkUtil.httpCall(httpGet,httpClient);
				}
			}
		}
		catch(URISyntaxException e) {
			log.error("Exception in getAvailableLocation Method {}",e.getMessage());
		}
		return jsonString;
	}
	
	@Override
	public String getAvailableSeats(String token, SlingHttpServletRequest request, XSSAPI xssAPI) {
		String jsonString = null;
		String seatsAvailUrl = configuration.getSeatsAvailabilityEndpoint();
		String programCode=xssAPI.encodeForJSString(request.getParameter(PROGRAM_CODE));
		List<RequestParameter> requestParameterList=request.getRequestParameterList();
		try {
			if(seatsAvailUrl!=null && !seatsAvailUrl.isEmpty() && programCode!=null && !programCode.contains(HTTP)) {
				final URIBuilder uri = new URIBuilder(seatsAvailUrl);
				for (RequestParameter requestParameter : requestParameterList) {
					URLEncoder.encode(requestParameter.getString(), "UTF-8");
					uri.addParameter(requestParameter.getName(), requestParameter.getString());
				}
				final HttpGet httpGet = new HttpGet(uri.build());
				httpGet.setHeader(TRANSACTION_ID, UUID.randomUUID().toString());
				httpGet.setHeader(SESSION_ID, UUID.randomUUID().toString());
				httpGet.setHeader(SOURCE, "VAN");
				httpGet.setHeader(MESSAGE_ID, "1");
				httpGet.setHeader(PROGRAM_CODE, programCode);
				httpGet.setHeader(AUTHORIZATION, BEARER + token);
				if(seatsAvailUrl.startsWith("https://")) {
					CloseableHttpClient httpClient = HttpClients.createDefault();
					jsonString=NetworkUtil.httpCall(httpGet,httpClient);
				}
			}
		}
		catch (URISyntaxException e) {
			log.error("Exception in getAvailableSeats Method {}", e.getMessage());
		} catch (UnsupportedEncodingException e) {
			log.error("Exception in URL encoding {}", e.getMessage());
		}
		return jsonString;
	}

}
