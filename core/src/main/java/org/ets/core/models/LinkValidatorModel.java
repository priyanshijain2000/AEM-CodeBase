package org.ets.core.models;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.ets.core.services.CommonService;

@Model(adaptables = {SlingHttpServletRequest.class,Resource.class},defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LinkValidatorModel {

    private static final String HTTPS = "https://";

	@RequestAttribute
    private String link;
	
	@OSGiService
	CommonService commonService;

    @PostConstruct
    public void init() {
        if(null!=link && !StringUtils.isBlank(link)) {
        	boolean isPublish=true;
        	if(commonService!=null) {
        		isPublish =commonService.getRunmode().equals("publish");
        	}
            String shortLink=isPublish?link.replace("/content/ets-org/language-master/en/home", StringUtils.EMPTY):link;
            if(StringUtils.isEmpty(shortLink)) {
                link="/";
            }
            else if ((StringUtils.startsWith(link, HTTPS)) || (StringUtils.startsWith(link, "http://"))) {
                link=shortLink;
            }
            else if(StringUtils.isNotEmpty(shortLink) && link.toLowerCase().startsWith("/content")) {
                link = shortLink.contains(".") ? shortLink : (shortLink+".html") ;
            }else if (StringUtils.isNotEmpty(link) && (StringUtils.startsWith(link, "www"))) {
                link = HTTPS.concat(link);
            }
        }
    }
    public String getLink() {
        return link;
    }
}
