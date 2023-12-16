package org.ets.core.servlets;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.ets.core.helper.FetchProductsHelper;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

@Component(service = Servlet.class, property={
        "sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths=" + "/bin/ets/fetchProducts" })
@ServiceDescription("Products Servlet")
public class FetchProductsServlet extends SlingSafeMethodsServlet implements Serializable {

    private static final long serialVersionUID = 78746479550010233L;
    protected static final Logger log = LoggerFactory.getLogger(FetchProductsServlet.class);
    private static final String PATH = "path";
  
    @Override
    protected void doGet(SlingHttpServletRequest request, final SlingHttpServletResponse response) {
        ResourceResolver resourceResolver = null;
        Map<String,Object> mapObject = new HashMap<>();
        FetchProductsHelper fetchProductsHelper = new FetchProductsHelper();
        try {
            resourceResolver = request.getResourceResolver();
            String productsCfFolderPath = request.getParameter(PATH);
            mapObject.put("ets-products",fetchProductsHelper.getProductsList(productsCfFolderPath,resourceResolver));
            mapObject.put("category-list",fetchProductsHelper.getCategorySet());
            Gson gson = new Gson();
            String jsonString = gson.toJson(mapObject);
            response.getWriter().write(jsonString);
        }
        catch(IOException e){
            log.error("IOException in FetchNewsPagesServlet class {}", e.getMessage());
        }
    }

}
