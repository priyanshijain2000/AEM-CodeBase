package org.ets.core.services;

import org.apache.sling.api.SlingHttpServletRequest;

import com.google.gson.JsonObject;

/**
 * This interface exposes the functionality of calling a JSON Web Service
 */
public interface ResearcherSolr {
	public JsonObject getSolrResult(SlingHttpServletRequest request);
}

