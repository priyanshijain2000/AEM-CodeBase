package org.ets.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.wcm.api.Page;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PopOverBannerModel {
	
	@ScriptVariable
	private Page currentPage;

	@ValueMapValue
	private boolean isEnabled;

	@ValueMapValue
	private String fileReference;

	@ValueMapValue
	private String optionsType;

	@ValueMapValue
	private String description;

	@ValueMapValue
	private String descriptionDesignTwo;

	@ValueMapValue
	private String termsAndCondition;

	@ValueMapValue
	private String buttonText;

	@ValueMapValue
	private String link;

	@ValueMapValue
	private boolean newTab;
	
	@ValueMapValue
	private String isSessionEnabled;
	
	private String brandName;

	public boolean isEnabled() {
		return isEnabled;
	}

	public String getFileReference() {
		return fileReference;
	}

	public String getOptionsType() {
		return optionsType;
	}

	public String getDescription() {
		return description;
	}

	public String getDescriptionDesignTwo() {
		return descriptionDesignTwo;
	}

	public String getTermsAndCondition() {
		return termsAndCondition;
	}

	public String getButtonText() {
		return buttonText;
	}

	public String getLink() {
		return link;
	}

	public boolean isNewTab() {
		return newTab;
	}
		
	public String getIsSessionEnabled() {
		return isSessionEnabled;
	}

	public String getBrandName() {
		return brandName;
	}

	@PostConstruct
	private void init() {
		brandName = currentPage.getAbsoluteParent(5).getName();
	}
}