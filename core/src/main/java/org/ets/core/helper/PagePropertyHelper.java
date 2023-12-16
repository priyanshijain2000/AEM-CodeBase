package org.ets.core.helper;

import java.util.List;
import java.util.Map;

import javax.jcr.ItemExistsException;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.ets.core.bean.ETSAuthorSchema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import com.day.cq.wcm.api.Page;

public class PagePropertyHelper {

	private static final String PAT_SUB_LK = "PatSubLK";
	private static final String SUBJECT = "Subject";
	private static final String NUM_PAGES = "numPages";
	private static final String FAMILY_ID = "familyId";
	private static final String KEYWORDS = "keywords";
	private static final String AUTHORS = "authors";
	private static final String URL = "url";
	private static final String BODY_DESCRIPTION = "bodyDescription";
	private static final String PUBLICATION_TYPE = "publicationType";
	private static final String SOURCE = "source";
	private static final String REPORT_NUMBER = "reportNumber";
	private static final String YEAR = "year";
	private static final String TITLE = "title";
	private static final String RESEARCHER = "researcher";
	
	/* Logger */
	private static final Logger log = LoggerFactory.getLogger(PagePropertyHelper.class);

	public void setComponentProperties(Page researcherPage, Session session, ETSAuthorSchema etsAuthorSchema, String attribute) {
		try {
			if (session != null && researcherPage!=null) {
				Node pageNode = researcherPage.adaptTo(Node.class);
				Node jcrNode = null;
				if (researcherPage.hasContent()) {
					jcrNode = researcherPage.getContentResource().adaptTo(Node.class);
				} else {
					jcrNode = pageNode.addNode(JcrConstants.JCR_CONTENT, "cq:PageContent");
				}
				Node containerNode=jcrNode.getNode("root/container");
				if(containerNode!=null) {
					Node component=null;
					if(containerNode.hasNode(RESEARCHER)) {
						component= containerNode.getNode(RESEARCHER);
					} else {
						component= containerNode.addNode(RESEARCHER);
					}
					if(attribute.equals("ETSAuthors")) {
						etsAuthorDocType(etsAuthorSchema, component, jcrNode);
					} else {
						patentDocType(etsAuthorSchema, component, jcrNode);
					}
				}
				session.save();
				session.refresh(true);
			}
		} catch (ItemExistsException e) {
			log.error("ItemExistsException {}",e.getMessage());
		} catch (RepositoryException e) {
			log.error("RepositoryException {}",e.getMessage());
		} 
	}

	private void patentDocType(ETSAuthorSchema etsAuthorSchema, Node component, Node jcrNode) throws RepositoryException {
		Map<String, String> primaryProperties=etsAuthorSchema.getPrimaryFields();
		component.setProperty(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY, "ets/components/researcher-patent");
		component.setProperty(TITLE, primaryProperties.get("pattitle"));
		component.setProperty(YEAR, primaryProperties.get("patissdate"));
		component.setProperty(REPORT_NUMBER, primaryProperties.get("uspatnumbe"));
		component.setProperty(SOURCE, "ETS Patent");
		component.setProperty(PUBLICATION_TYPE, "Patent");
		component.setProperty(FAMILY_ID, primaryProperties.get("FamilyIDLk"));
		component.setProperty(BODY_DESCRIPTION, primaryProperties.get("Abstractte"));
		component.setProperty(URL, primaryProperties.get("uspaturl"));
		Map<String, List<String>> multiValueFields = etsAuthorSchema.getMultiValueFields();
		if(multiValueFields.containsKey("inventorLK")) {
			component.setProperty(AUTHORS,multiValueFields.get("inventorLK").toArray(new String[0]));
		}
		if(multiValueFields.containsKey(PAT_SUB_LK)) {
			component.setProperty(KEYWORDS, multiValueFields.get(PAT_SUB_LK).toArray(new String[0]));
			jcrNode.setProperty(KEYWORDS, multiValueFields.get(PAT_SUB_LK).toArray(new String[0]));
		}
		jcrNode.setProperty(JcrConstants.JCR_TITLE, primaryProperties.get("pattitle"));
		jcrNode.setProperty(JcrConstants.JCR_DESCRIPTION, primaryProperties.get("Abstractte"));
	}
	
	private void etsAuthorDocType(ETSAuthorSchema etsAuthorSchema, Node component, Node jcrNode) throws RepositoryException {
		Map<String, String> primaryProperties=etsAuthorSchema.getPrimaryFields();
		component.setProperty(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY, "ets/components/researcher-info-details");
		component.setProperty(TITLE, primaryProperties.get("TitleAgg"));
		component.setProperty(YEAR, primaryProperties.get("DateYear"));
		component.setProperty(PUBLICATION_TYPE, primaryProperties.get("DocumentTyp"));
		component.setProperty(NUM_PAGES, primaryProperties.get("Pages"));
		component.setProperty(BODY_DESCRIPTION, primaryProperties.get("Abstracts"));
		component.setProperty(URL, primaryProperties.get("URL"));
		jcrNode.setProperty(JcrConstants.JCR_TITLE, primaryProperties.get("TitleAgg"));
		jcrNode.setProperty(JcrConstants.JCR_DESCRIPTION, primaryProperties.get("Abstracts"));
		Map<String, List<String>> multiValueFields = etsAuthorSchema.getMultiValueFields();
		if(multiValueFields.get("Author")!=null) {
			component.setProperty(AUTHORS,multiValueFields.get("Author").toArray(new String[0]));
		}
		if(multiValueFields.get("Reportno2")!=null) {
			component.setProperty(REPORT_NUMBER,multiValueFields.get("Reportno2").toArray(new String[0]));
		}
		if(multiValueFields.get(SUBJECT)!=null) {
			component.setProperty(KEYWORDS,multiValueFields.get(SUBJECT).toArray(new String[0]));
			jcrNode.setProperty(KEYWORDS,multiValueFields.get(SUBJECT).toArray(new String[0]));
		}
		if(multiValueFields.get("Citation")!=null) {
			component.setProperty(SOURCE,multiValueFields.get("Citation").toArray(new String[0]));
		}
	}
}