package org.ets.core.workflows;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.ets.core.services.EPNContactAPIService;
import org.ets.core.utils.EtsResourceUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component(service = WorkflowProcess.class, property = {"process.label = Contact EPN Workflow"})
public class ContactEPNWorkflow implements WorkflowProcess {

	/**
	 * Logger
	 */
	private static final Logger log = LoggerFactory.getLogger(ContactEPNWorkflow.class);

	@Reference
	private EPNContactAPIService epnContactAPIService;

	@Reference
	private ResourceResolverFactory resolverFactory;

	/**
	 * Overridden method which executes when the workflow is invoked
	 */
	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {
		try {
			ResourceResolver resourceResolver = EtsResourceUtil.getResourceResolver(resolverFactory);
			if(epnContactAPIService!=null) {
				String token = epnContactAPIService.getToken();
				epnContactAPIService.getEPNContactJson(resourceResolver, token);
			}
		} catch (LoginException e) {
			log.error("Exception in Contact EPN Workflow : {}",e.getMessage());
		}
	}
}
