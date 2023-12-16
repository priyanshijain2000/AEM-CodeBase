package org.ets.core.utils;


import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.resourceresolver.MockResourceResolverFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class })
public class EtsResourceUtilTest {
	
	private final AemContext aemContext = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);
	private ResourceResolverFactory resourceResolverFactory;
	private EtsResourceUtil etsResource;
	
	
	@BeforeEach
    public void setUp() throws Exception {
		/* Instantiate Service */
		etsResource = aemContext.registerService(new EtsResourceUtil());
		resourceResolverFactory = new MockResourceResolverFactory();
		
	}
	@Test
	void getResolver() throws LoginException
	{
		assertNotNull(etsResource.getResourceResolver(resourceResolverFactory));
	}
	
}
