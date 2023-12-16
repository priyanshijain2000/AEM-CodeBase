package org.ets.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.ets.core.config.EPNApiConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.wcm.testing.mock.aem.junit5.AemContext;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.replication.ReplicationException;

@ExtendWith(MockitoExtension.class)
class EPNContactServiceTest {

	AemContext aemContext = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);
	EPNContactTokenServiceGeneratorImpl epnContactTokenServiceGeneratorImpl;
	ResourceResolver resourceResolver = aemContext.resourceResolver();

	@BeforeEach
	public void setup() {
		epnContactTokenServiceGeneratorImpl = aemContext.registerService(new EPNContactTokenServiceGeneratorImpl());
		EPNApiConfiguration config = mock(EPNApiConfiguration.class);
		lenient().when(config.getUsername()).thenReturn("username");
		lenient().when(config.getPassword()).thenReturn("password");
		lenient().when(config.getClientId()).thenReturn("sample-id");
		lenient().when(config.getSecret()).thenReturn("sample-secret");
		lenient().when(config.getJsonFilename()).thenReturn("epn_directory");
		lenient().when(config.getJsonStoragePath()).thenReturn("/content/dam/ets-org/s/epn");
		lenient().when(config.getTokenApiEndpoint()).thenReturn("https://test.sample");
		lenient().when(config.getEpnEndpoint()).thenReturn("https://test2.sample");
		epnContactTokenServiceGeneratorImpl.activate(config);
	}

	@Test
	void testAllMethods() throws UnsupportedOperationException, IOException, ReplicationException {
		assertNotNull(epnContactTokenServiceGeneratorImpl.getToken());
		String token = "sample-token";
		epnContactTokenServiceGeneratorImpl.getEPNContactJson(resourceResolver, token);
		final CloseableHttpResponse httpResponse = mock(CloseableHttpResponse.class);
		final CloseableHttpClient httpClient = mock(CloseableHttpClient.class);
		StatusLine statusLine=mock(StatusLine.class);
		HttpEntity httpEntity=mock(HttpEntity.class);
		HttpGet httpGet=mock(HttpGet.class);
		String sampleJsonString = "{\"name\":\"John\", \"age\":30, \"car\":null}";
	    InputStream targetStream = new ByteArrayInputStream(sampleJsonString.getBytes());
		lenient().when(httpResponse.getStatusLine()).thenReturn(statusLine);
		lenient().when(statusLine.getStatusCode()).thenReturn(200);
		lenient().when(httpResponse.getEntity()).thenReturn(httpEntity);
		lenient().when(httpEntity.getContent()).thenReturn(targetStream);
		epnContactTokenServiceGeneratorImpl.networkCall(resourceResolver, httpClient, httpGet);
		EPNContactTokenServiceGeneratorImpl.httpCall(httpClient, httpResponse);
	}
	
	@Test
	void testCaseWithAuthError() throws UnsupportedOperationException, IOException {
		final CloseableHttpResponse httpResponse = mock(CloseableHttpResponse.class);
		final CloseableHttpClient httpClient = mock(CloseableHttpClient.class);
		StatusLine statusLine=mock(StatusLine.class);
		lenient().when(httpResponse.getStatusLine()).thenReturn(statusLine);
		lenient().when(statusLine.getStatusCode()).thenReturn(401);
		String httpCall = EPNContactTokenServiceGeneratorImpl.httpCall(httpClient, httpResponse);
		assertNull(httpCall);
	}
	
	
}