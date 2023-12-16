package org.ets.core.helper;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.FragmentData;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

class FetchProductsHelperTest {

	FetchProductsHelper fetchProductsHelper;
	
	@BeforeEach
	public void setup() {
		fetchProductsHelper = new FetchProductsHelper();
	}
	
	@Test
	void testGetTagMethod() {
		TagManager tagManager=mock(TagManager.class);
		ContentElement productElementObject=mock(ContentElement.class);
		FragmentData fragmentData=mock(FragmentData.class);
		Tag mockTag=mock(Tag.class);
		String tagElement=StringUtils.EMPTY;
		String[] categoryList={"GRE", "PRAXIS", "TOEIC"};
		Map<String,String> productMap=new HashMap<String,String>();
		when(productElementObject.getValue()).thenReturn(fragmentData);
		when(fragmentData.getValue(String[].class)).thenReturn(categoryList);
		when(tagManager.resolve(anyString())).thenReturn(mockTag);
		when(mockTag.getTitle()).thenReturn("tagTitle");
		fetchProductsHelper.getTags(tagManager, productMap, productElementObject, tagElement);
	}
}
