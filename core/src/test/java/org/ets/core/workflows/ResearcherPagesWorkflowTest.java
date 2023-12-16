package org.ets.core.workflows;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.metadata.SimpleMetaDataMap;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ResearcherPagesWorkflowTest {

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowSession workflowSession;

    @Mock
    WorkflowData workflowData;

    MetaDataMap metadataMap;

    ResearcherPagesWorkflow researcherPagesWorkflow = new ResearcherPagesWorkflow();

    @BeforeEach
    void setup() {
        metadataMap = new SimpleMetaDataMap();
        lenient().when(workItem.getWorkflowData()).thenReturn(workflowData);
        lenient().when(workflowData.getPayloadType()).thenReturn("JCR_PATH");
        lenient().when(workflowData.getPayload()).thenReturn("/content/ets-org/en/home/research");
    }

    @Test
    void execute_activate() throws Exception {
        metadataMap.put("PROCESS_ARGS", "activate");
        researcherPagesWorkflow.execute(workItem, workflowSession, metadataMap);
    }
}