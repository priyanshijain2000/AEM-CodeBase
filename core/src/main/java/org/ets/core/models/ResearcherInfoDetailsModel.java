package org.ets.core.models;

import java.util.Arrays;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ResearcherInfoDetailsModel {

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String authors;

	@ValueMapValue
	private String year;

	@ValueMapValue
	private String reportNumber;

	@ValueMapValue
	private String source;

	@ValueMapValue
	private String publicationType;

	@ValueMapValue
	private String numPages;

	@ValueMapValue
	private String[] keywords;

	@ValueMapValue
	private String bodyDescription;

	@ValueMapValue @Default(values = "")
	private String url;

	@ValueMapValue
	private String arialabelURL;

	@PostConstruct
	public void init() {
		url = url.replaceAll("(?<!(http:|https:))[//]+", "/");
	}

	public String getTitle() {
		return title;
	}

	public String getAuthors() {
		return authors;
	}

	public String getYear() {
		return year;
	}

	public String getReportNumber() {
		return reportNumber;
	}

	public String getSource() {
		return source;
	}

	public String getPublicationType() {
		return publicationType;
	}

	public String getNumPages() {
		return numPages;
	}

	public String[] getKeywords() {
		return Arrays.copyOf(keywords, keywords.length);
	}

	public String getBodyDescription() {
		return bodyDescription;
	}

	public String getUrl() {
		return url;
	}

	public String getArialabelURL() {
		return arialabelURL;
	}
}
