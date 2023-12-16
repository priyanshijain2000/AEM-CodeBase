package org.ets.core.workflows;


import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.metadata.SimpleMetaDataMap;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.ets.core.services.SIAFooterService;
import org.ets.core.utils.EtsResourceUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class FooterJsonWorkflowTest {

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowData workflowData;

    @Mock
    WorkflowSession workflowSession;

    @Mock
    ResourceResolverFactory resourceResolverFactory;

    ResourceResolver resourceResolver;
    Page page;

    @Mock
    SIAFooterService siaFooterService;

    MetaDataMap metadataMap;

    FooterJsonWorkflow footerJsonWorkflow = new FooterJsonWorkflow();

    @BeforeEach
    void setUp(){
        metadataMap = new SimpleMetaDataMap();
        lenient().when(workItem.getWorkflowData()).thenReturn(workflowData);
        lenient().when(workflowData.getPayload()).thenReturn("/content/ets-org/footer/en");
//        lenient().when(metadataMap.get("PROCESS_ARGS", "string")).thenReturn("/content/dam/ets-org/json");
//        lenient().when(EtsResourceUtil.getResourceResolver(resourceResolverFactory)).thenReturn(resourceResolver);
//        lenient().when(resourceResolver.getResource(anyString()).adaptTo(Page.class)).thenReturn(page);
//        lenient().when(page.getName().concat(",json")).thenReturn("en.json");
//        if(page!=null)
//            siaFooterService.getFooterItems(page,resourceResolver,"/content/dam/ets-org/json","en.json");
    }

    @Test
    void execute_activate() throws Exception{
        metadataMap.put("PROCESS_ARGS", "activate");
        footerJsonWorkflow.execute(workItem, workflowSession, metadataMap);
    }
}