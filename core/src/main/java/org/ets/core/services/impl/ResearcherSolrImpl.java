package org.ets.core.services.impl;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.ResourceResolver;
import org.ets.core.services.ResearcherSolr;
import org.ets.core.utils.NetworkUtil;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


@Component(service = ResearcherSolr.class, immediate = true)
public class ResearcherSolrImpl implements ResearcherSolr {

	private static final String RESEARCH_AUTHOR_BIO_PATH = "/content/ets-org/language-master/en/home/research/author-bio";
	/* Logger */
	private static final Logger log = LoggerFactory.getLogger(ResearcherSolrImpl.class);

	@Override
	public JsonObject getSolrResult(SlingHttpServletRequest request) {
		JsonObject jo = null;
		String jsonResponse = StringUtils.EMPTY;
		String url = "https://sitesearch.ets.org/sitesearch/researcher/search";
		Map<String, String> authorPageMap = new HashMap<>();
		try {
			ResourceResolver resourceResolver = request.getResourceResolver();
			PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
			Page authorParentPage = pageManager.getPage(RESEARCH_AUTHOR_BIO_PATH);
			String searchTerm=request.getParameter("text");
			if (authorParentPage != null) {
				Iterator<Page> listChildren = authorParentPage.listChildren();
				while (listChildren.hasNext()) {
					Page authorName = listChildren.next();
					authorPageMap.put(authorName.getTitle(), authorName.getPath().concat(".html").replace("/content/ets-org/language-master/en/home", ""));
				}
				authorPageMap.remove(searchTerm);
			}
			List<RequestParameter> requestParameterList = request.getRequestParameterList();
			URIBuilder uri = new URIBuilder(url);
			for (RequestParameter requestParameter : requestParameterList) {
				uri.addParameter(requestParameter.getName(), requestParameter.getString());
			}
			final HttpGet httpGet = new HttpGet(uri.build());
			if (url.startsWith("https://")) {
				CloseableHttpClient httpClient = HttpClients.createDefault();
				jsonResponse = NetworkUtil.httpCall(httpGet,httpClient);
			}
			if (jsonResponse != null) {
				jo = JsonParser.parseString(jsonResponse).getAsJsonObject();
				JsonArray jsonArray = jo.get("results").getAsJsonArray();
				Iterator<JsonElement> itr2 = jsonArray.iterator();
				while (itr2.hasNext()) {
					JsonObject jo2 = (JsonObject) itr2.next();
					JsonArray jsonArray2 = jo2.get("authors").getAsJsonArray();
					Iterator<JsonElement> itr3 = jsonArray2.iterator();
					while (itr3.hasNext()) {
						JsonObject jo3 = (JsonObject) itr3.next();
						String authorName = jo3.get("name").getAsString();
						if (authorPageMap.get(authorName) != null) {
							jo3.addProperty("bio", authorPageMap.get(authorName));
						}
					}
				}
			}
		} catch (URISyntaxException e) {
			log.error("Exception in ResearcherSolrImpl : {}", e.getMessage());
		}
		return jo;
	}

}