package org.ets.core.workflows;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.xfa.ut.StringUtils;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.ets.core.services.SIAFooterService;
import org.ets.core.utils.EtsResourceUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = WorkflowProcess.class, property = {"process.label = Footer JSON Creation Workflow"})

public class FooterJsonWorkflow implements WorkflowProcess {

    /**
     * Logger
     */
    private static final Logger log = LoggerFactory.getLogger(FooterJsonWorkflow.class);

    @Reference
    private ResourceResolverFactory resolverFactory;

    @Reference
    private SIAFooterService siaFooterService;

    /**
     * Overridden method which executes when the workflow is invoked
     */
    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {
        try {
            String footerParentPagePath = workItem.getWorkflowData().getPayload().toString();
            String jsonStorageDirectory = metaDataMap.get("PROCESS_ARGS", "string");
            ResourceResolver resourceResolver = EtsResourceUtil.getResourceResolver(resolverFactory);
//            assert resourceResolver != null;
            Page parentPage = resourceResolver.getResource(footerParentPagePath).adaptTo(Page.class);
            if (parentPage != null) {
                String jsonFileName = parentPage.getName().concat(".json");
                siaFooterService.getFooterItems(parentPage, resourceResolver, jsonStorageDirectory, jsonFileName);
            }
        }catch (LoginException e) {
            log.error("Login Exception {}", e.getMessage());
        } catch (NullPointerException e) {
            log.error("Null Pointer Exception {}", e.getMessage());
        }
    }
}
