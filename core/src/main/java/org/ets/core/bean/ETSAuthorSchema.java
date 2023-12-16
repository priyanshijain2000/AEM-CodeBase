package org.ets.core.bean;

import java.util.List;
import java.util.Map;

public class ETSAuthorSchema {
	private Map<String,String> primaryFields;
	private Map<String,List<String>> multiValueFields;
    public Map<String, String> getPrimaryFields() {
		return primaryFields;
	}
	public void setPrimaryFields(Map<String, String> primaryFields) {
		this.primaryFields = primaryFields;
	}
	public Map<String, List<String>> getMultiValueFields() {
		return multiValueFields;
	}
	public void setMultiValueFields(Map<String, List<String>> multiValueFields) {
		this.multiValueFields = multiValueFields;
	}
}