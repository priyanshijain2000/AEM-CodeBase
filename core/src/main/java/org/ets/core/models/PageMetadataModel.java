package org.ets.core.models;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.util.TextUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.ets.core.services.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

@Model(adaptables = {SlingHttpServletRequest.class,Resource.class},defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PageMetadataModel {

	@ScriptVariable
	private ResourceResolver resolver;
	
	@ScriptVariable
	private Page currentPage;
	
	@OSGiService
	CommonService commonService;
	
	protected static final Logger log = LoggerFactory.getLogger(PageMetadataModel.class);

	private String publishDate=StringUtils.EMPTY;
	
	private List<String> cfLists =new ArrayList<>();
	
	private List<String> categoryLists =new ArrayList<>();
	
	private String contentType=StringUtils.EMPTY;
	private String category=StringUtils.EMPTY;
	private String categoryLevel1=StringUtils.EMPTY;
	private String categoryLevel2=StringUtils.EMPTY;
	private String categoryLevel3=StringUtils.EMPTY;
	private String dataLayerPageName=StringUtils.EMPTY;
	private String productName="Corporate";
	private String pageCategory="All Audiences";
	
	private String gtmScriptId=StringUtils.EMPTY;
	
    public String getContentType() {
		return contentType;
	}

	public List<String> getCategoryLists() {
		return new ArrayList<>(categoryLists);
	}

	public List<String> getCfLists() {
		return new ArrayList<>(cfLists);
	}

	public String getPublishDate() {
		return publishDate;
	}
	
	public String getGtmScriptId() {
		return gtmScriptId;
	}
	
	public String getDataLayerPageName() {
		return dataLayerPageName;
	}

	public String getCategory() {
		return category;
	}

	public String getCategoryLevel1() {
		return categoryLevel1;
	}

	public String getCategoryLevel2() {
		return categoryLevel2;
	}

	public String getCategoryLevel3() {
		return categoryLevel3;
	}

	public String getProductName() {
		return productName;
	}

	public String getPageCategory() {
		return pageCategory;
	}

	@PostConstruct
    private void init(){
		try {
			TagManager tagManager = resolver.adaptTo(TagManager.class);
	    	log.info("Start of PageMetadataModel init()");
	    	ValueMap currentPageValueMap=currentPage.getProperties();
	    	SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy");
	    	Date articlePublishDate=currentPageValueMap.get("articlePublishDate", Date.class);
	    	if(articlePublishDate!=null) {
	    		publishDate = formatter.format(articlePublishDate);
	    	}
	    	String[] authorList=currentPageValueMap.get("author",String[].class);
	    	if(authorList!=null) {
		    	for(String authorCfPath:authorList) {
		    		 Resource cfResource=resolver.getResource(authorCfPath);
		    		 if(cfResource!=null) {
			    		 ContentFragment dcf = cfResource.adaptTo(ContentFragment.class);
			             log.debug("Content fragment using resource {}",dcf.getTitle());
			             cfLists.add(dcf.getTitle());
		    		 }
		    	}
	    	}
	    	String[] categoryTagIdList=currentPageValueMap.get("category",String[].class);
	    	if(categoryTagIdList!=null) {
	    		for(String categoryTagId:categoryTagIdList) {
	    			Tag tag = tagManager.resolve(categoryTagId);
	    			if (tag != null) {
	    				categoryLists.add(tag.getTitle());
	    			}
	    		}
	    	}
	    	String contentTypeTagID=currentPageValueMap.get("contentType",String.class);
	    	if(contentTypeTagID!=null) {
    			Tag tag = tagManager.resolve(contentTypeTagID);
    			if (tag != null) {
    				contentType=tag.getTitle();
    			}
	    	}

	    	if(commonService!=null) {
	    		gtmScriptId = commonService.getGtmId();
	    	}

	    	/*Data Layer for Adobe Analytics*/
	    	int pageDepth = currentPage.getDepth();
	    	if(pageDepth>5) {
	    		for(int i=pageDepth;i>=5;i--) {
	    			log.debug("i value {}",i);
	    			Page absoluteParentBrand = currentPage.getAbsoluteParent(i);
		    		if(absoluteParentBrand!=null) {
		    			switch(i){
		    				case 5:
		    					category = TextUtils.isEmpty(absoluteParentBrand.getPageTitle())?
		    							absoluteParentBrand.getNavigationTitle(): absoluteParentBrand.getPageTitle();
		    					break;
		    				case 6:
		    					categoryLevel1 = TextUtils.isEmpty(absoluteParentBrand.getPageTitle())?
		    							absoluteParentBrand.getNavigationTitle(): absoluteParentBrand.getPageTitle();
		    					break;
		    				case 7:
		    					categoryLevel2 = TextUtils.isEmpty(absoluteParentBrand.getPageTitle())?
		    							absoluteParentBrand.getNavigationTitle(): absoluteParentBrand.getPageTitle();
		    					break;
		    				case 8:
		    					categoryLevel3 = TextUtils.isEmpty(absoluteParentBrand.getPageTitle())?
		    							absoluteParentBrand.getNavigationTitle(): absoluteParentBrand.getPageTitle();
		    					break;
		    				default:
		    			}
		    		}
	    		}
	    	}
	    	else {
	    		category="Home";
	    	}
	    	/*Data Layer for Analytics*/
			if (pageDepth > 5) {
				for (int i = pageDepth; i >=5; i--) {
					Page parentPage = currentPage.getAbsoluteParent(i);
					if (parentPage != null) {
						switch (i) {
							case 5:
								productName = parentPage.getNavigationTitle() != null ? parentPage.getNavigationTitle()
										: (parentPage.getPageTitle() != null ? parentPage.getPageTitle() : parentPage.getTitle());
								break;
							case 6:
								pageCategory = parentPage.getNavigationTitle() != null ? parentPage.getNavigationTitle()
										: (parentPage.getPageTitle() != null ? parentPage.getPageTitle() : parentPage.getTitle());
								break;
							default:
						}
					}
				}
			}
		}
		catch(Exception e) {
			log.error("Exception in page metadata model {}",e);
		}
	    	log.info("End of PageMetadataModel init()");
    }
}
