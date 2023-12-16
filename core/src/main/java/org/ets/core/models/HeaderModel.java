package org.ets.core.models;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.crx.JcrConstants;
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

import javax.annotation.PostConstruct;
import java.util.*;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderModel {

    @ScriptVariable
    private ResourceResolver resolver;

    @ScriptVariable
    private Page currentPage;
    
    @ValueMapValue
    private String homePagePath;
    
    @ValueMapValue
    private String productMenuCf;
    
    @ValueMapValue
    private String commonLinkCf;
    
    @ValueMapValue
    private String productName;
    
    @ValueMapValue
    private String navtitle1;
    
    @ValueMapValue
    private String nav1AriaLabel;
    
    @ValueMapValue
    private String col1title1;
    
    @ValueMapValue
    private String col2title1;
    
    @ValueMapValue
    private String navtitle2;
    
    @ValueMapValue
    private String nav2AriaLabel;
    
    @ValueMapValue
    private String col1title2;
    
    @ValueMapValue
    private String col2title2;
    
    @ValueMapValue
    private String navtitle3;
    
    @ValueMapValue
    private String nav3AriaLabel;
    
    @ValueMapValue
    private String col1title3;
    
    @ValueMapValue
    private String col2title3;
    
    @ValueMapValue
    private String navtitle4;
    
    @ValueMapValue
    private String nav4AriaLabel;
    
    @ValueMapValue
    private String col1title4;
    
    @ValueMapValue
    private String col2title4;
    
    @ValueMapValue
    private String navtitle5;
    
    @ValueMapValue
    private String nav5AriaLabel;
    
    @ValueMapValue
    private String col1title5;
    
    @ValueMapValue
    private String col2title5;
    
    @ValueMapValue
    private String navtitle6;
    
    @ValueMapValue
    private String nav6AriaLabel;
    
    @ValueMapValue
    private String col1title6;
    
    @ValueMapValue
    private String col2title6;
    
    @ValueMapValue
    private String searchResult;
    
    @ValueMapValue
    private String searchPlaceholder;
    
    @ValueMapValue
    private String searchAriaLabel;
    
    @ValueMapValue
    private String megaMenuAriaLabel;
    
    @ValueMapValue
    private String languageMenuAriaLabel;
    
    @ValueMapValue
    private String searchAriaLabelHeader;

    protected static final Logger log = LoggerFactory.getLogger(HeaderModel.class);
    
    private Map<String,String> cfMap=new HashMap<>();
    
    private List<Map<String,String>> cfLists =new ArrayList<>();

	private Map<String, Resource> langMap = new HashMap<>();

	public Map<String, Resource> getLangMap() { return langMap; }

    public Map<String, String> getCfMap() { return cfMap; }

	public List<Map<String, String>> getCfLists() {
		return new ArrayList<>(cfLists);
	}

	@PostConstruct
    public void headerMenuList() {
    		log.info("Start of the header model");
    		if(homePagePath!=null){
	    		cfMap.clear();
	    		PageManager pageManager=resolver.adaptTo(PageManager.class);
	    		Page parentPage=pageManager.getPage(homePagePath);
	    		if(!(currentPage.getPath().equals(homePagePath))) {
	    			Map<String,String> cfMenuMap=new HashMap<>();
	    			 cfMenuMap.put("productLandingPage", homePagePath);
	    			 cfMenuMap.put("productTitle", parentPage.getTitle());
	    			 cfMenuMap.put("themeCssClass", "theme-generic-bar");
	    			cfLists.add(cfMenuMap);
	    		}
	    		cfMap.put("langname",parentPage.getAbsoluteParent(3)!=null? parentPage.getAbsoluteParent(3).getTitle():StringUtils.EMPTY);
    		}
    		if(commonLinkCf!=null) {
    			Resource commonLinkCfResource = resolver.getResource(commonLinkCf);
    			if(commonLinkCfResource!=null) {
		    		ContentFragment dcf = commonLinkCfResource.adaptTo(ContentFragment.class);
		    		if(dcf!=null) {
			            Iterator<ContentElement> contentElement =dcf.getElements();
			            while (contentElement.hasNext()) {
			                ContentElement contentElementObject = contentElement.next();
			                String tagElement = contentElementObject.getName();
			                String elementContent = contentElementObject.getContent();
			                cfMap.put(tagElement, elementContent);
			            }
		    		}
    			}
    		}
    		if(productMenuCf!=null) {
	    		Resource menuList = resolver.getResource(productMenuCf);
	    		getProductMenu(menuList);
    		}
			getSiteProperties();
    		log.info("End of the header model");
    }

	/**
	 * Used to construct the product menu map
	 * @param menuList
	 */
	private void getProductMenu(Resource menuList) {
		String templateName=(currentPage.getTemplate()!=null)?currentPage.getTemplate().getName():StringUtils.EMPTY;
		if(menuList!=null) {
			Iterator<Resource> cfResourceList=menuList.getChildren().iterator();
			while(cfResourceList.hasNext()) {
				Map<String,String> cfMenuMap=new HashMap<>();
				Resource resource=cfResourceList.next();
				if(resource!=null) {
					ContentFragment cf = resource.adaptTo(ContentFragment.class);
					if(cf!=null) {
			            Iterator<ContentElement> contentElement =cf.getElements();
			            while (contentElement.hasNext()) {
			                ContentElement contentElementObject = contentElement.next();
			                String tagElement = contentElementObject.getName();
			                String elementContent = contentElementObject.getContent();
			                if(tagElement.equals("themeCssClass")) {
			                	elementContent=elementContent.concat(getActiveProduct(elementContent,templateName));
			                }
			                cfMenuMap.put(tagElement, elementContent);
			            }
			            cfLists.add(cfMenuMap);
					}
				}
			}
		}
	}

	private String getActiveProduct(String themeCss,String templateName) {
		String product=StringUtils.substringBetween(themeCss, "theme-", "-bar");
		return templateName.contains(product)?" active":StringUtils.EMPTY;
	}

	private void getSiteProperties() {
		if(!(currentPage.getPath().startsWith("/content/experience-fragments") || currentPage.getPath().startsWith("/conf"))) {
			Resource siteResource = resolver.getResource(currentPage.getAbsoluteParent(1).getPath());
			if(siteResource!=null && siteResource.hasChildren()) {
				Resource jcrResource = siteResource.getChild(JcrConstants.JCR_CONTENT);
				if(jcrResource!=null && jcrResource.hasChildren()) {
					Resource languageList = jcrResource.getChild("langList");
					langMap.put("langList", languageList);
				}
			}
		}
	}

	public String getProductName() {
		return productName;
	}

	public String getNavtitle1() {
		return navtitle1;
	}

	public String getNav1AriaLabel() {
		return nav1AriaLabel;
	}

	public String getCol1title1() {
		return col1title1;
	}

	public String getCol2title1() {
		return col2title1;
	}

	public String getNavtitle2() {
		return navtitle2;
	}

	public String getNav2AriaLabel() {
		return nav2AriaLabel;
	}

	public String getCol1title2() {
		return col1title2;
	}

	public String getCol2title2() {
		return col2title2;
	}

	public String getNavtitle3() {
		return navtitle3;
	}

	public String getNav3AriaLabel() {
		return nav3AriaLabel;
	}

	public String getCol1title3() {
		return col1title3;
	}

	public String getCol2title3() {
		return col2title3;
	}

	public String getNavtitle4() {
		return navtitle4;
	}

	public String getNav4AriaLabel() {
		return nav4AriaLabel;
	}

	public String getCol1title4() {
		return col1title4;
	}

	public String getCol2title4() {
		return col2title4;
	}

	public String getNavtitle5() {
		return navtitle5;
	}

	public String getNav5AriaLabel() {
		return nav5AriaLabel;
	}

	public String getCol1title5() {
		return col1title5;
	}

	public String getCol2title5() {
		return col2title5;
	}

	public String getNavtitle6() {
		return navtitle6;
	}

	public String getNav6AriaLabel() {
		return nav6AriaLabel;
	}

	public String getCol1title6() {
		return col1title6;
	}

	public String getCol2title6() {
		return col2title6;
	}

	public String getSearchResult() {
		return searchResult;
	}

	public String getSearchPlaceholder() {
		return searchPlaceholder;
	}

	public String getSearchAriaLabel() {
		return searchAriaLabel;
	}

	public String getMegaMenuAriaLabel() {
		return megaMenuAriaLabel;
	}

	public String getLanguageMenuAriaLabel() {
		return languageMenuAriaLabel;
	}

	public String getSearchAriaLabelHeader() {
		return searchAriaLabelHeader;
	}
}