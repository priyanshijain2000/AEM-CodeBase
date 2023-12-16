package org.ets.core.models;

import java.util.List;
import java.util.Map;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface ResearcherAuthorLink {
	public List<Map<String,String>> getAuthorLinks();
}