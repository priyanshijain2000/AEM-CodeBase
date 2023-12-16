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
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HeaderJsonWorkflowTest {

    AemContext aemContext = new AemContext();

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowData workflowData;

    @Mock
    WorkflowSession workflowSession;

    MetaDataMap metadataMap;

    HeaderJsonWorkflow headerJsonWorkflow = new HeaderJsonWorkflow();

    @BeforeEach
    void setUp() {
        metadataMap = new SimpleMetaDataMap();
//        aemContext.create().pa
        lenient().when(workItem.getWorkflowData()).thenReturn(workflowData);
        lenient().when(workflowData.getPayload()).thenReturn("/content/ets-org/header/en");
    }

    @Test
    void execute_activate() throws WorkflowException {
        metadataMap.put("PROCESS_ARGS", "activate");
        headerJsonWorkflow.execute(workItem, workflowSession, metadataMap);
    }
}