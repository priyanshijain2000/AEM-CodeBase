package org.ets.core.helper;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.ItemExistsException;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.lock.LockException;
import javax.jcr.nodetype.ConstraintViolationException;
import javax.jcr.nodetype.NoSuchNodeTypeException;
import javax.jcr.version.VersionException;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.ets.core.bean.ETSAuthorSchema;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;

import io.wcm.testing.mock.aem.junit5.AemContext;

public class PagePropertyHelperTest {

	AemContext aemContext = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);
	PagePropertyHelper pagePropertyHelper;
	ETSAuthorSchema etsAuthorSchema = new ETSAuthorSchema();
	PageManager pageManager;
	Session session;
	
	@BeforeEach
	public void setup() {
		pagePropertyHelper = new PagePropertyHelper();
	}
	
	@Test
	void testPositiveCondition() throws WCMException, ItemExistsException, PathNotFoundException, NoSuchNodeTypeException, LockException, VersionException, ConstraintViolationException, RepositoryException {
		Page researcherPage = mock(Page.class);
		Node pageNode=mock(Node.class);
		Node jcrNode=mock(Node.class);
		Node containerNode=mock(Node.class);
		Node componentNode=mock(Node.class);
		Session session = mock(Session.class);
		Property property=mock(Property.class);
		List<String> emptyList=new ArrayList<>();
		when(researcherPage.hasContent()).thenReturn(false);
		when(researcherPage.adaptTo(Node.class)).thenReturn(pageNode);
		when(pageNode.addNode("jcr:content","cq:PageContent")).thenReturn(jcrNode);
		when(jcrNode.getNode("root/container")).thenReturn(containerNode);
		when(containerNode.hasNode("researcher")).thenReturn(true);
		when(containerNode.getNode("researcher")).thenReturn(componentNode);
		when(componentNode.setProperty(anyString(), anyString())).thenReturn(property);
		when(jcrNode.setProperty(anyString(), anyString())).thenReturn(property);
		Map<String, String> primaryProperties=new HashMap<>();
		Map<String, List<String>> multiValueFields = new HashMap<>();
		multiValueFields.put("inventorLK", emptyList);
		multiValueFields.put("PatSubLK", emptyList);
		multiValueFields.put("Author", emptyList);
		multiValueFields.put("Reportno2", emptyList);
		multiValueFields.put("Subject", emptyList);
		multiValueFields.put("Citation", emptyList);
		etsAuthorSchema.setPrimaryFields(primaryProperties);
		etsAuthorSchema.setMultiValueFields(multiValueFields);
		pagePropertyHelper.setComponentProperties(researcherPage, session, etsAuthorSchema, "ETSAuthors");
		pagePropertyHelper.setComponentProperties(researcherPage, session, etsAuthorSchema, "Patent");
	}
}
