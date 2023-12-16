package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ScoreRequirementModel {

	@ValueMapValue
	private String path;

	@ValueMapValue
	private String stateph;

	@ValueMapValue
	private String stateAriaLabel;

	@ValueMapValue
	private String testph;

	@ValueMapValue
	private String testAriaLabel;

	@ValueMapValue
	private String stateLabel;

	@ValueMapValue
	private String codeLabel;

	@ValueMapValue
	private String testLabel;

	@ValueMapValue
	private String scoreLabel;

	@ValueMapValue
	private String prevLabel;

	@ValueMapValue
	private String nextLabel;

	@ValueMapValue
	private String countTextLabel;

	@ValueMapValue
	private String prevAriaLabel;

	@ValueMapValue
	private String nextAriaLabel;

	@ValueMapValue
	private String inputPaginationAriaLabel;

	public String getPath() {
		return path;
	}

	public String getStateph() {
		return stateph;
	}

	public String getStateAriaLabel() {
		return stateAriaLabel;
	}

	public String getTestph() {
		return testph;
	}

	public String getTestAriaLabel() {
		return testAriaLabel;
	}

	public String getStateLabel() {
		return stateLabel;
	}

	public String getCodeLabel() {
		return codeLabel;
	}

	public String getTestLabel() {
		return testLabel;
	}

	public String getScoreLabel() {
		return scoreLabel;
	}

	public String getPrevLabel() {
		return prevLabel;
	}

	public String getNextLabel() {
		return nextLabel;
	}

	public String getCountTextLabel() {
		return countTextLabel;
	}

	public String getPrevAriaLabel() {
		return prevAriaLabel;
	}

	public String getNextAriaLabel() {
		return nextAriaLabel;
	}

	public String getInputPaginationAriaLabel() {
		return inputPaginationAriaLabel;
	}
}
