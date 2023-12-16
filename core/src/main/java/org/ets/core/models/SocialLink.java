package org.ets.core.models;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(adaptables = {SlingHttpServletRequest.class,Resource.class},defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SocialLink {
	
	@ScriptVariable
	private ResourceResolver resolver;
	
	@ValueMapValue
	private String brand;
	@ValueMapValue
	private String bgcolorPraxis;
	@ValueMapValue
	private String bgcolorGre;
	@ValueMapValue
	private String bgcolorToeic;
	@ValueMapValue
	private String bgcolorCorp;
	@ValueMapValue
	private String bgcolorToefl;
	@ValueMapValue
	private String bgStyle;
	
	private String bgColor=StringUtils.EMPTY;
	
	protected static final Logger log = LoggerFactory.getLogger(SocialLink.class);
	
    @PostConstruct
    public void init() {
        if(bgStyle!=null && bgStyle.equals("theme-color") && null!=brand && !StringUtils.isBlank(brand) && resolver!=null) {
        		switch(brand){
        			case "corp":
	    				bgColor = bgcolorCorp;
	    				break;
        			case "praxis":
        				bgColor = bgcolorPraxis;
        				break;
        			case "gre":
        				bgColor = bgcolorGre;
        				break;
        			case "toeic":
        				bgColor = bgcolorToeic;
        				break;
        			case "toefl":
        				bgColor = bgcolorToefl;
        				break;
        			default:
        		}
        }
    }

	public String getBgcolor() {
		return "background:"+bgColor+";";
	}

	public String getBgStyle() {
		return bgStyle;
	}
}
