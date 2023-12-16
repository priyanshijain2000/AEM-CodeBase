package org.ets.core.utils;

import java.io.IOException;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * This class has all the Network related calls
 */
public class NetworkUtil {

	private static final String SUCCESS= "success";
    private static final String FAILURE = "failure";
    private static final String STATUS = "status";
    private static final String DATA = "data";
    private static final String ERRORMESSAGE= "errorMessage";
	private static final String EMPTYRESULT = "No results found with search criteria, try again...";
	private static final String ERRORRESULT = "Something went wrong. Try again later…";
	private static final Logger log = LoggerFactory.getLogger(NetworkUtil.class);

	public static String httpCall(HttpUriRequest httpUriRequest,CloseableHttpClient httpClient) {
		String jsonString = StringUtils.EMPTY;
		JsonObject responseObject = new JsonObject();
		try {
			CloseableHttpResponse response = httpClient.execute(httpUriRequest);
			
			if(response.getStatusLine().getStatusCode() >= 200 &&
    				response.getStatusLine().getStatusCode() <= 299){
        		jsonString = EntityUtils.toString(response.getEntity());
        		if (jsonString != null && !jsonString.trim().equals(""))
        		{
					if (JsonParser.parseString(jsonString).isJsonArray()) {
						JsonArray jsonArray = JsonParser.parseString(jsonString).getAsJsonArray();
						responseObject.addProperty(STATUS, SUCCESS);
						responseObject.add(DATA, jsonArray);
						responseObject.addProperty(ERRORMESSAGE, EMPTYRESULT);
						return responseObject.toString();
					}
        		}
        		else
        		{
        			jsonString = "[]";
					if (JsonParser.parseString(jsonString).isJsonArray()) {
						JsonArray jsonArray = JsonParser.parseString(jsonString).getAsJsonArray();
						responseObject.addProperty(STATUS, SUCCESS);
						responseObject.add(DATA, jsonArray);
						responseObject.addProperty(ERRORMESSAGE, EMPTYRESULT);
						return responseObject.toString();
					}
        		}
        	}
        	else if(response.getStatusLine().getStatusCode() >= 300 &&
        				response.getStatusLine().getStatusCode() <= 599)
        	{
        		jsonString = EntityUtils.toString(response.getEntity());
        		if (jsonString != null && !jsonString.trim().equals(""))
        		{
					if (JsonParser.parseString(jsonString).isJsonArray()) {
						JsonArray jsonArray = JsonParser.parseString(jsonString).getAsJsonArray();
						responseObject.addProperty(STATUS, FAILURE);
						responseObject.add(DATA, jsonArray);
						responseObject.addProperty(ERRORMESSAGE, ERRORRESULT);
						return responseObject.toString();
					}
        		}
        	}
		}
		catch (IllegalStateException | IOException e) {
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
