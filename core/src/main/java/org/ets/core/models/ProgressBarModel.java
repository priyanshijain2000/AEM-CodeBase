package org.ets.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProgressBarModel {

    @ScriptVariable
    private PageManager pageManager;

    @ScriptVariable
    private Page currentPage;
    
    @ValueMapValue
    private String parentPagePath;
    
    @ValueMapValue
    private String goBackTitle;

    protected static final Logger log = LoggerFactory.getLogger(ProgressBarModel.class);

    private List<Page> listItems = new ArrayList<>();
    
    private List<Map<String,String>> pageList = new ArrayList<>();

    @PostConstruct
    private void progressBarList() {
		log.info("Start of the progress bar model");
		listItems.clear();
		if(parentPagePath!=null) {
    		Page parentPage=pageManager.getPage(parentPagePath);
    		setActiveState(parentPage);
    		getAllChild(parentPage);
		}
		log.info("End of the progress bar model");
    }
    
    private String getAllChild(Page path)
    {
    	if(path!=null) {
	        Iterator<Page> childIterator = path.listChildren();
	        while (childIterator.hasNext()) {
	            Page child = childIterator.next();
	            setActiveState(child);
	            getAllChild(child);
	            break;
	        }
    	}
    	return null;
    }
    
    private void setActiveState(Page pageObj) {
    	if(pageObj!=null) {
	    	Map<String,String> map=new HashMap<>();
			map.put("title",pageObj.getTitle());
			map.put("url",getPageLink(pageObj));
			map.put("isActive",
					(currentPage.getDepth()==pageObj.getDepth())?
							"active":"inactive");
			map.put("isComplete",
					(currentPage.getDepth()>pageObj.getDepth())?
							"complete panelJourney":"incomplete");
			pageList.add(map);
    	}
    }
    
    private String getPageLink(Page pageObj) {
    	Page currentPageObj=currentPage;
    	while(currentPageObj.getDepth()>pageObj.getDepth()) {
    		currentPageObj=currentPageObj.getParent();
    	}
    	return currentPageObj.getPath();
    }
    
    public List<Map<String, String>> getPageList() {
        return new ArrayList<>(pageList);
    }

	public String getParentPagePath() {
		return parentPagePath;
	}

	public String getGoBackTitle() {
		return goBackTitle;
	}
}

