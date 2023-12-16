package org.ets.core.utils;


import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({MockitoExtension.class })
class NetworkUtilTest {
	
	private NetworkUtil netObj;

	@Test
	void httpCall() throws ClientProtocolException, IOException
	{
		//HttpUriRequest httpUriRequest=Mockito.mock(HttpUriRequest.class);
		HttpUriRequest httpUriRequest=Mockito.mock(HttpUriRequest.class);
		CloseableHttpClient httpClient = mock(CloseableHttpClient.class);
		CloseableHttpResponse httpResponse = mock(CloseableHttpResponse.class);
		StatusLine statusLine=mock(StatusLine.class);
		HttpEntity httpEntity=mock(HttpEntity.class);
		String sampleJsonString = "[{\"name\":\"John\", \"age\":30, \"car\":null}]";
	    InputStream targetStream = new ByteArrayInputStream(sampleJsonString.getBytes());
		when(httpClient.execute(httpUriRequest)).thenReturn(httpResponse);
		lenient().when(httpResponse.getStatusLine()).thenReturn(statusLine);
		lenient().when(statusLine.getStatusCode()).thenReturn(200);
		lenient().when(httpResponse.getEntity()).thenReturn(httpEntity);
		lenient().when(httpEntity.getContent()).thenReturn(targetStream);
		assertNotNull(netObj.httpCall(httpUriRequest,httpClient));
	}
	
	@Test
	void httpCallEmptyJSON() throws ClientProtocolException, IOException
	{
		//HttpUriRequest httpUriRequest=Mockito.mock(HttpUriRequest.class);
		HttpUriRequest httpUriRequest=Mockito.mock(HttpUriRequest.class);
		CloseableHttpClient httpClient = mock(CloseableHttpClient.class);
		CloseableHttpResponse httpResponse = mock(CloseableHttpResponse.class);
		StatusLine statusLine=mock(StatusLine.class);
		HttpEntity httpEntity=mock(HttpEntity.class);
		String sampleJsonString = "";
	    InputStream targetStream = new ByteArrayInputStream(sampleJsonString.getBytes());
		when(httpClient.execute(httpUriRequest)).thenReturn(httpResponse);
		lenient().when(httpResponse.getStatusLine()).thenReturn(statusLine);
		lenient().when(statusLine.getStatusCode()).thenReturn(200);
		lenient().when(httpResponse.getEntity()).thenReturn(httpEntity);
		lenient().when(httpEntity.getContent()).thenReturn(targetStream);
		assertNotNull(netObj.httpCall(httpUriRequest,httpClient));
	}
	
	@Test
	void httpCallErrorResponse() throws ClientProtocolException, IOException
	{
		//HttpUriRequest httpUriRequest=Mockito.mock(HttpUriRequest.class);
		HttpUriRequest httpUriRequest=Mockito.mock(HttpUriRequest.class);
		CloseableHttpClient httpClient = mock(CloseableHttpClient.class);
		CloseableHttpResponse httpResponse = mock(CloseableHttpResponse.class);
		StatusLine statusLine=mock(StatusLine.class);
		HttpEntity httpEntity=mock(HttpEntity.class);
		String sampleJsonString = "[{\"errorMessage\":\"Internal server error\", \"code\":500}]";
	    InputStream targetStream = new ByteArrayInputStream(sampleJsonString.getBytes());
		when(httpClient.execute(httpUriRequest)).thenReturn(httpResponse);
		lenient().when(httpResponse.getStatusLine()).thenReturn(statusLine);
		lenient().when(statusLine.getStatusCode()).thenReturn(500);
		lenient().when(httpResponse.getEntity()).thenReturn(httpEntity);
		lenient().when(httpEntity.getContent()).thenReturn(targetStream);
		assertNotNull(netObj.httpCall(httpUriRequest,httpClient));
	}
}
