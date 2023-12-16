package org.ets.core.workflows;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.metadata.SimpleMetaDataMap;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.ets.core.services.EPNContactAPIService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.lenient;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ContactEPNWorkflowTest {

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowSession workflowSession;

    @Mock
    EPNContactAPIService epnContactAPIService;

    MetaDataMap metadataMap;
    ContactEPNWorkflow contactEPNWorkflow = new ContactEPNWorkflow();

    @BeforeEach
    void setup() {
        metadataMap = new SimpleMetaDataMap();
        lenient().when(epnContactAPIService.getToken()).thenReturn("Sample token");
    }

    @Test
    void testFlow() throws Exception {
        metadataMap.put("PROCESS_ARGS", "activate");
        contactEPNWorkflow.execute(workItem, workflowSession, metadataMap);
    }
}