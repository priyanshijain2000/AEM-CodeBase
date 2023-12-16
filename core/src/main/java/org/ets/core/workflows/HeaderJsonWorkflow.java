package org.ets.core.workflows;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.ets.core.services.SIAHeaderService;
import org.ets.core.utils.EtsResourceUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = WorkflowProcess.class, property = {"process.label = JSON Creation Workflow"})
public class HeaderJsonWorkflow implements WorkflowProcess {

    private static final Logger log = LoggerFactory.getLogger(HeaderJsonWorkflow.class);

    @Reference
    private ResourceResolverFactory resolverFactory;

    @Reference
    private SIAHeaderService siaHeaderService;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {
        try {
            String parentPagePath = workItem.getWorkflowData().getPayload().toString();
            String jsonStorageDirectory = metaDataMap.get("PROCESS_ARGS", "string");
            ResourceResolver resourceResolver = EtsResourceUtil.getResourceResolver(resolverFactory);
            Page parentPage = resourceResolver.getResource(parentPagePath).adaptTo(Page.class);
            if (parentPage != null) {
                String jsonFileName = parentPage.getParent().getName().concat(".json");
                siaHeaderService.getFirstNavItems(parentPage, resourceResolver, jsonStorageDirectory, jsonFileName);
            }
        } catch (LoginException e) {
            log.error("Login Exception {}", e.getMessage());
        } catch (NullPointerException e) {
            log.error("Null Pointer Exception {}", e.getMessage());
        }
    }
}
