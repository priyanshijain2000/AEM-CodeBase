package org.ets.core.models;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import javax.annotation.PostConstruct;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.Rendition;

@Model(adaptables = {SlingHttpServletRequest.class,Resource.class},defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SvgInlineImage {

	@RequestAttribute
    private String imagePath;
	
	@ScriptVariable
	private ResourceResolver resolver;
	
	private String imageSource=StringUtils.EMPTY;
	private boolean isSvg=false; 
	
	protected static final Logger log = LoggerFactory.getLogger(SvgInlineImage.class);
	
    @PostConstruct
    public void init() throws IOException {
        if(null!=imagePath && !StringUtils.isBlank(imagePath) && resolver!=null) {
        	isSvg=imagePath.endsWith(".svg");
        		if(isSvg) {
					Resource resource = resolver.getResource(imagePath);
					if(resource!=null) {
						Asset assetObj = resource.adaptTo(Asset.class);
						if(assetObj!=null) {
							Rendition rendition = assetObj.getRendition("original");
							InputStream stream = rendition.getStream();
							imageSource = IOUtils.toString(stream, StandardCharsets.UTF_8).replaceFirst("<svg", "<svg aria-hidden=\"true\" focusable=\"false\"");
							stream.close();
						}
					}
        		}
        }
    }
    public String getImage() {
        return imageSource;
    }
    public boolean isSvg() {
    	return isSvg;
    }
}
