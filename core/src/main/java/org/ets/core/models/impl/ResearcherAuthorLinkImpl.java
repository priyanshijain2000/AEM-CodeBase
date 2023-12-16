package org.ets.core.models.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.ets.core.models.ResearcherAuthorLink;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = SlingHttpServletRequest.class,
	   adapters = {ResearcherAuthorLink.class},
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
	   resourceType ={ResearcherAuthorLinkImpl.RESEARCHER_INFO_DETAILS,ResearcherAuthorLinkImpl.RESEARCHER_PATENT})
public class ResearcherAuthorLinkImpl implements ResearcherAuthorLink {
	
	static final String RESEARCHER_PATENT = "ets/components/researcher-patent";

	static final String RESEARCHER_INFO_DETAILS = "ets/components/researcher-info-details";
	
	protected static final Logger log = LoggerFactory.getLogger(ResearcherAuthorLinkImpl.class);
	
	@ScriptVariable
    private PageManager pageManager;
	
	@ValueMapValue
    private String[] authors;

	@Override
	public List<Map<String,String>> getAuthorLinks() {
		log.debug("Start of Researcher author link model");
		List<Map<String,String>> authorList=new ArrayList<>();
		Page authorParentPage=pageManager.getPage("/content/ets-org/language-master/en/home/research/author-bio");
		Map<String, String> authorPageMap = new HashMap<>();
		if (authorParentPage != null) {
			Iterator<Page> listChildren = authorParentPage.listChildren();
			while (listChildren.hasNext()) {
				Page authorName = listChildren.next();
				authorPageMap.put(authorName.getTitle(), authorName.getPath());
			}
		}
		for(String author: authors) {
			Map<String,String> authorMap=new HashMap<>();
			authorMap.put("name", author);
			authorMap.put("link", authorPageMap.get(author));
			authorList.add(authorMap);
		}
		log.debug("End of Researcher author link model");
		return authorList;
	}
	
    
}