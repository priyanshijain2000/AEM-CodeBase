package org.ets.core.servlets;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Session;
import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.ets.core.helper.FetchNewsHelper;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.QueryBuilder;
import com.google.gson.Gson;


@Component(service = Servlet.class, property = {
        "sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths=" + "/bin/ets/fetchNewsPages"})
@ServiceDescription("News Pages Servlet")
public class FetchNewsPagesServlet extends SlingSafeMethodsServlet implements Serializable {

	private static final long serialVersionUID = 1905122041950251207L;

	private static final String CONTENT_TYPE = "contentType";
	
    private static final String PATH = "path";

    private static final String CATEGORY = "category";
    
    protected static final Logger log = LoggerFactory.getLogger(FetchNewsPagesServlet.class);

    private transient Map<String,Object> mapObj=new HashMap<>();
        
    private transient FetchNewsHelper fetchNewsHelper=new FetchNewsHelper();

    @Override
    protected void doGet(SlingHttpServletRequest request, final SlingHttpServletResponse response) {

        String parentPagePath= request.getParameter(PATH);
        String resultCategory= request.getParameter(CATEGORY);
        String contentType= request.getParameter(CONTENT_TYPE);
        ResourceResolver resourceResolver = null;
        Session session = null;
        try {
            resourceResolver = request.getResourceResolver();
            session = resourceResolver.adaptTo(Session.class);
            final QueryBuilder queryBuilder = request.getResourceResolver().adaptTo(QueryBuilder.class);
            fetchNewsHelper.getList(parentPagePath,resultCategory,contentType,resourceResolver,session,queryBuilder);
            mapObj.put("collection", fetchNewsHelper.getListofcontents());
            mapObj.put(CATEGORY, fetchNewsHelper.getListofcategory());
            Gson gson = new Gson();
            String jsonString = gson.toJson(mapObj);
            response.getWriter().write(jsonString);
        }
        catch (IOException e) {
			log.error("IOException in FetchNewsPagesServlet class {}", e.getMessage());
		}
    }



}
