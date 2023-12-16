package org.ets.core.servlets;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.ets.core.services.ResearcherSolr;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonObject;

@Component(service = Servlet.class, property = { "sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.paths=" + "/bin/ets/researcher-solr", "sling.servlet.extensions=" + "json" })
@ServiceDescription("Test location availability Servlet")
public class ResearcherSolrServlet extends SlingSafeMethodsServlet implements Serializable {

	private static final long serialVersionUID = -5835590412332379115L;

	protected static final Logger log = LoggerFactory.getLogger(ResearcherSolrServlet.class);

	@Reference
	private transient ResearcherSolr researcherSolr;

	@Override
	protected void doGet(SlingHttpServletRequest request, final SlingHttpServletResponse response) {
		try {
			JsonObject jo = researcherSolr.getSolrResult(request);
			response.setContentType("application/json");
			response.getWriter().print(jo.toString());
		} catch (Exception e) {
			log.error("Exception in ResearcherSolrServlet : {}", e.getMessage());
		}
	}
}
