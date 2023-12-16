package org.ets.core.services.impl;

import com.day.cq.dam.api.AssetManager;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.ets.core.config.EPNApiConfiguration;
import org.ets.core.services.EPNContactAPIService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.jcr.Binary;
import javax.jcr.Session;
import javax.jcr.ValueFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component(service = EPNContactAPIService.class, immediate = true)
@Designate(ocd = EPNApiConfiguration.class)
public class EPNContactTokenServiceGeneratorImpl implements EPNContactAPIService{

	private static final String BEARER = "Bearer ";
	private static final String TOKEN_IDENTIFIER = "access_token";
	private static final String MIME_TYPE = "application/json";
	private static final Logger log = LoggerFactory.getLogger(EPNContactTokenServiceGeneratorImpl.class);

	@Reference
	private Replicator replicator;

	private EPNApiConfiguration configuration;

	@Activate
	protected void activate(EPNApiConfiguration configuration) {
		this.configuration = configuration;
	}

	@Override
	public String getToken() {
		JsonObject jo = null;
		try {
			String url = configuration.getTokenApiEndpoint();
			String clientId = configuration.getClientId();
			String clientSecret = configuration.getSecret();
			String username = configuration.getUsername();
			String password = configuration.getPassword();
			String jsonString = fetchEPNTokenResponse(url, clientId, clientSecret, username, password);
			jo = (JsonObject)JsonParser.parseString(jsonString);
			if (jo.get(TOKEN_IDENTIFIER).getAsString()!=null) {
				return jo.get(TOKEN_IDENTIFIER).getAsString();
			}
			log.error("Unable to fetch the Token for EPN");
			return StringUtils.EMPTY;
		} catch (ClassCastException e) {
			log.error("Exception in getToken Method {}",e.getMessage());
			return "Error occurred: " + e.getMessage();
		}
	}

	@Override
	public String fetchEPNTokenResponse(String url, String clientId, String clientSecret, String username, String password) {
		String jsonString = "";
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {
			HttpPost post = new HttpPost(url);
			String plainCredentials = username + ":" + password;
			String base64Credentials = new String(Base64.getEncoder().encode(plainCredentials.getBytes()));
			// Create authorization header
			String authorizationHeader = "Basic " + base64Credentials;
			// add request parameters or form parameters
			List<NameValuePair> urlParameters = new ArrayList<>();
			urlParameters.add(new BasicNameValuePair("grant_type", "password"));
			urlParameters.add(new BasicNameValuePair("client_id", clientId));
			urlParameters.add(new BasicNameValuePair("client_secret", clientSecret));
			urlParameters.add(new BasicNameValuePair("username", username));
			urlParameters.add(new BasicNameValuePair("password", password));
			post.setEntity(new UrlEncodedFormEntity(urlParameters));
			post.addHeader("Authorization", authorizationHeader);
			post.addHeader("Content-Type", "application/x-www-form-urlencoded");
			CloseableHttpResponse response = httpClient.execute(post);
			jsonString = EntityUtils.toString(response.getEntity());
		} catch (ParseException | IOException e) {
			log.error("Exception in fetchEPNTokenResponse Method {}", e.getMessage());
		}
		finally {
			try {
				httpClient.close();
			} catch (final IOException e) {
				log.error("IOException in closing httpClient {}", e.getMessage());
			}
		}
		return jsonString;
	}

	@Override
	public void getEPNContactJson(ResourceResolver resourceResolver, String token) {
		/* Reading values from the configuration*/
		String url = configuration.getEpnEndpoint();
		CloseableHttpClient httpClient = null;
		try {
			RequestConfig requestConfig = RequestConfig.custom()
					.setConnectTimeout(5000)
					.setSocketTimeout(5000)
					.build();
			final HttpGet httpGet = new HttpGet(url);
			httpGet.setHeader("Authorization", BEARER+token);
			httpClient = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();
			networkCall(resourceResolver, httpClient, httpGet);
		}
		catch(IOException | ReplicationException e) {
			log.error("Exception in getEPNContactJson method {}",e.getMessage());
		}
		finally {
			if(httpClient!=null) {
				try {
					httpClient.close();
				} catch (final IOException e) {
					log.error("IOException in closing httpClient {}", e.getMessage());
				}
			}
		}
	}

	protected void networkCall(ResourceResolver resourceResolver, CloseableHttpClient httpClient, final HttpGet httpGet)
			throws IOException, ReplicationException {
		try {
			final CloseableHttpResponse response = httpClient.execute(httpGet);
			String jsonString = httpCall(httpClient, response);
			if (jsonString != null) {
				/* Create and Publish the JSON Asset in DAM */
				AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
				Session session = resourceResolver.adaptTo(Session.class);
				InputStream jsonInputStream = new ByteArrayInputStream(jsonString.getBytes(StandardCharsets.UTF_8));
				String assetPath = configuration.getJsonStoragePath().concat("/".concat(configuration.getJsonFilename()));
				ValueFactory valueFactory = session.getValueFactory();
				Binary binary = valueFactory.createBinary(jsonInputStream);
				if (assetManager != null) {
					assetManager.createOrUpdateAsset(assetPath, binary, MIME_TYPE, true);
					replicator.replicate(session, ReplicationActionType.ACTIVATE, assetPath);
				}
			}
		} catch (Exception e) {
			log.error("Exception in networkCall method {}", e.getMessage());
		}
	}

	public static String httpCall(CloseableHttpClient httpClient, CloseableHttpResponse response) {
		String jsonString = StringUtils.EMPTY;
		try {
			if(response.getStatusLine().getStatusCode() >= 200 && response.getStatusLine().getStatusCode() <= 299){
				jsonString = IOUtils.toString(response.getEntity().getContent(), StandardCharsets.UTF_8);
				if (jsonString != null && !jsonString.trim().equals(""))
				{
					JsonObject responseObject = JsonParser.parseString(jsonString).getAsJsonObject();
					return responseObject.toString();
				}
			}
			else if(response.getStatusLine().getStatusCode() >= 300 && response.getStatusLine().getStatusCode() <= 599)
			{
				log.error("Unable to get the Salesforce API data for EPN directory. Issue with API response...");
				return null;
			}
		}
		catch (Exception e) {
			log.error("Exception in httpCall Method {}", e.getMessage());
		}
		finally {
			try {
				httpClient.close();
			} catch (final IOException e) {
				log.error("Exception in closing httpClient {}", e.getMessage());
			}
		}
		return jsonString;
	}
}
