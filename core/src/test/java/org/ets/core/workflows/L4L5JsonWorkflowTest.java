package org.ets.core.workflows;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.metadata.SimpleMetaDataMap;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class L4L5JsonWorkflowTest {

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowData workflowData;

    @Mock
    WorkflowSession workflowSession;

    MetaDataMap metadataMap;

    L4L5JsonWorkflow l4L5JsonWorkflow = new L4L5JsonWorkflow();

    @BeforeEach
    void setUp() {
        metadataMap = new SimpleMetaDataMap();
        lenient().when(workItem.getWorkflowData()).thenReturn(workflowData);
        lenient().when(workflowData.getPayload()).thenReturn("/content/ets-org/header/en");
    }

    @Test
    void execute() throws WorkflowException {
        metadataMap.put("PROCESS_ARGS", "activate");
        l4L5JsonWorkflow.execute(workItem, workflowSession, metadataMap);
    }
}