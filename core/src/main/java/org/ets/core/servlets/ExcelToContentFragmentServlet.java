package org.ets.core.servlets;


import javax.servlet.Servlet;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.ets.core.services.impl.ExcelToContentFragmentServiceImpl;
import org.ets.core.utils.EtsResourceUtil;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Excel to Content Fragment Converter Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_POST, "sling.servlet.paths=" + "/bin/ets/cf/from/xls" })
public class ExcelToContentFragmentServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = -2613666358166400244L;
	private static final Logger LOGGER = LoggerFactory.getLogger(ExcelToContentFragmentServlet.class);

	@Reference
	protected transient ResourceResolverFactory resolverFactory;

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) {
		ExcelToContentFragmentServiceImpl excelToCfServiceImpl = new ExcelToContentFragmentServiceImpl();
		ResourceResolver resourceResolver;
		try {
			resourceResolver = EtsResourceUtil.getResourceResolver(resolverFactory);
			Workbook workbook = excelToCfServiceImpl.getWorkbook(request,response);
			if(workbook!=null && resourceResolver!=null) {
				excelToCfServiceImpl.dataExtractor(request, response, resourceResolver, workbook);
			}
		} catch (Exception e) {
			LOGGER.error("Exception in XLS to Content Fragment conversion {}",e.getMessage());
		}
	}
}