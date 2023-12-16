package org.ets.core.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class EventListModel {

	protected static final Logger log = LoggerFactory.getLogger(EventListModel.class);
	private static final String JCR_CONTENT = "jcr:content";
	private static final String OR = "OR";
	private static final String HTTPS = "https://";
	private static final String HTTP = "http://";
	private static final String URL_TEXT = "urltext";
	private static final String EVENT_DATE = "eventdate";
	private static final String RSVP_URL = "rsvpurloremailaddressformoreinformation";

	@Inject
	@Source("sling-object")
	private ResourceResolver resourceResolver;

	@ValueMapValue
	private String parentPath;

	private List<Map<String, String[]>> cfLists = new ArrayList<>();
	private List<Map<String, String[]>> unorderedCfList = null;
	SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");

	public String getParentPath() {
		return parentPath;
	}

	@PostConstruct
	public void init() {
		try {
		Resource cfFolder = resourceResolver.getResource(parentPath);
		log.debug("Start of EventListModel init method");
		if (cfFolder != null) {
			unorderedCfList = new ArrayList<>();
			Iterator<Resource> resources = cfFolder.listChildren();
			Map<String, String[]> cfMap = null;
			while (resources.hasNext()) {
				Resource resource = resources.next();
				if (resource.getName().equals(JCR_CONTENT)) {
					continue;
				} else {
					ContentFragment contentFragment = resource.adaptTo(ContentFragment.class);
					cfMap = new HashMap<>();
					Iterator<ContentElement> contentElement = contentFragment.getElements();
					while (contentElement.hasNext()) {
						ContentElement contentElementObject = contentElement.next();
						String elementName = contentElementObject.getName();
						if (elementName.contains(RSVP_URL)) {
							String elementContent = contentElementObject.getContent();
							if (elementContent.contains(OR)) {
								String[] multiUrls = elementContent.split(OR);
								if (multiUrls.length > 0) {
									String[] multiUrlText = new String[multiUrls.length];
									for (int index = 0; index < multiUrls.length; index++) {
										multiUrls[index] = multiUrls[index].trim();
										multiUrlText[index] = multiUrls[index].replace(HTTPS, "").replace(HTTP, "");
									}
									cfMap.put(elementName, multiUrls);
									cfMap.put(URL_TEXT, multiUrlText);
								}
							} else {
								String urlText = "";
								if (!elementContent.isEmpty()) {
									urlText = elementContent.replace(HTTPS, "").replace(HTTP, "");
									elementContent = elementContent.trim();
								}
								cfMap.put(elementName, new String[] { elementContent });
								cfMap.put(URL_TEXT, new String[] { urlText });
							}
						} 
						else if(elementName.contains(EVENT_DATE)){
							String elementContent = contentElementObject.getContent();
							String formattedDate = "";
							if (!elementContent.isEmpty()) {
								SimpleDateFormat actualDateFormat = new SimpleDateFormat("yyyy-MM-dd");
								formattedDate = dateFormat.format(actualDateFormat.parse(elementContent));
							}
							cfMap.put(elementName, new String[] {formattedDate});
						}
						else {
							String elementContent = contentElementObject.getContent();
							cfMap.put(elementName, new String[] { elementContent });
						}

					}
				}
				unorderedCfList.add(cfMap);
			}			
			if(!unorderedCfList.isEmpty()) {
				cfLists.addAll(sort(unorderedCfList));
			}
		}
		log.debug("End of EventListModel init method");
		} catch(Exception e) {
			log.error("Exception occurred in EventListModel init method : {}", e.getMessage());
		}
	}
	
	//Sorting the Content Fragment Data Based on Event Date
	protected List<Map<String, String[]>> sort(List<Map<String, String[]>> unorderedCfList) throws ParseException {	
		int size=unorderedCfList.size();
		for (int i = 0; i < size; i++) {
			for (int j = i+1; j <= size-1; j++) {
				String eventDate_1 = unorderedCfList.get(i).get(EVENT_DATE)[0];
				String eventDate_2 = unorderedCfList.get(j).get(EVENT_DATE)[0];
				if (eventDate_1.isEmpty() || eventDate_2.isEmpty()) {
					continue;
				} else {
					if (dateFormat.parse(eventDate_1).after(dateFormat.parse(eventDate_2))) {
						Collections.swap(unorderedCfList, i, j);
					}
				}
			}
		}
		return unorderedCfList;
	}

	public List<Map<String, String[]>> getCfLists() {
		return new ArrayList<>(cfLists);
	}
}
