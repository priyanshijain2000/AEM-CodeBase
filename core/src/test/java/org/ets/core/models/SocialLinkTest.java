package org.ets.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class SocialLinkTest {
	
	static final String RESOURCE_PATH = "/org/ets/core/models/SocialLinkResource.json";
	
	static final String ROOT_PATH = "/content";
	
	static final String PRAXIS_RESOURCE_PATH = "/content/praxis";
	
	static final String GRE_RESOURCE_PATH = "/content/gre";
	
	static final String TOEIC_RESOURCE_PATH = "/content/toeic";
	
	static final String TOEFL_RESOURCE_PATH = "/content/toefl";
	
	static final String CORP_RESOURCE_PATH = "/content/corp";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;
	
	SocialLink socialLink = null;
	
	String bgColor = StringUtils.EMPTY;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(PageMetadataModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}
	
	@Test
    void testPraxisBrand() {
        context.currentResource(PRAXIS_RESOURCE_PATH);
        socialLink = context.request().adaptTo(SocialLink.class);
        bgColor = socialLink.getBgcolor();
        assertNotNull(bgColor);
        assertNotNull(socialLink.getBgStyle());
    }
	
	@Test
    void testGreBrand() {
        context.currentResource(GRE_RESOURCE_PATH);
        socialLink = context.request().adaptTo(SocialLink.class);
        bgColor = socialLink.getBgcolor();
        assertNotNull(bgColor);
    }
	
	@Test
    void testToeicBrand() {
        context.currentResource(TOEIC_RESOURCE_PATH);
        socialLink = context.request().adaptTo(SocialLink.class);
        bgColor = socialLink.getBgcolor();
        assertNotNull(bgColor);
    }
	
	@Test
    void testToeflBrand() {
        context.currentResource(TOEFL_RESOURCE_PATH);
        socialLink = context.request().adaptTo(SocialLink.class);
        bgColor = socialLink.getBgcolor();
        assertNotNull(bgColor);
    }
	
	@Test
    void testCorpBrand() {
        context.currentResource(CORP_RESOURCE_PATH);
        socialLink = context.request().adaptTo(SocialLink.class);
        bgColor = socialLink.getBgcolor();
        assertNotNull(bgColor);
    }
}
