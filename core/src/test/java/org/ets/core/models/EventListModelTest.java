package org.ets.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class EventListModelTest {

	private AemContext ctx = new AemContext();
    
    @Mock
    private ModelFactory modelFactory;

    @BeforeEach
    public void setUp() throws Exception {
        ctx.addModelsForClasses(EventListModel.class);
        ctx.load().json("/org/ets/core/models/EventListModel.json", "/content");
        ctx.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
                Integer.MAX_VALUE);
    }
    
    @Test
    void testParentPath() {  	
    	Resource resource=ctx.currentResource("/content/model");
    	EventListModel eventListModel = resource.adaptTo(EventListModel.class);
        assertNotNull(eventListModel.getParentPath());
    }	
    
    @Test
    void testCfLists() {  	
    	Resource resource=ctx.currentResource("/content/model");
    	EventListModel eventListModel = resource.adaptTo(EventListModel.class);
        assertNotNull(eventListModel.getCfLists());
    }
    
    @Test
    void testSortedCfLists() throws ParseException {  	
    	Resource resource=ctx.currentResource("/content/model");
    	EventListModel eventListModel = resource.adaptTo(EventListModel.class);
    	List<Map<String, String[]>> unsortedCFList = new ArrayList<>();
    	Map<String, String[]> cfMap_1 = new HashMap<>();
    	cfMap_1.put("sessionid", new String[]{"1684932382_646e071e6bad27.48765523"});
    	cfMap_1.put("institutionname", new String[]{"SDA Bocconi School of Management"});
    	cfMap_1.put("stateregion", new String[]{"9"});
    	cfMap_1.put("institutioncountry", new String[]{"Italy"});
    	cfMap_1.put("programname", new String[]{"Executive Master in Marketing and Sales (EMMS)"});
    	cfMap_1.put("eventname", new String[]{"EMMS: Marketing & Sales leader"});
    	cfMap_1.put("rsvpurloremailaddressformoreinformation", new String[]{"www.gmail.com"});
    	cfMap_1.put("eventtype", new String[]{"online"});
    	cfMap_1.put("eventdate", new String[]{"09/09/2023"});
    	Map<String, String[]> cfMap_2 = new HashMap<>();
    	cfMap_2.put("sessionid", new String[]{"1684932382_646e071e6bad27.48765523"});
    	cfMap_2.put("institutionname", new String[]{"SDA Bocconi School of Management"});
    	cfMap_2.put("stateregion", new String[]{"9"});
    	cfMap_2.put("institutioncountry", new String[]{"Italy"});
    	cfMap_2.put("programname", new String[]{"Executive Master in Marketing and Sales (EMMS)"});
    	cfMap_2.put("eventname", new String[]{"EMMS: Marketing & Sales leader"});
    	cfMap_2.put("rsvpurloremailaddressformoreinformation", new String[]{"www.gmail.com"});
    	cfMap_2.put("eventtype", new String[]{"online"});
    	cfMap_2.put("eventdate", new String[]{"07/09/2022"});
    	unsortedCFList.add(cfMap_1);
    	unsortedCFList.add(cfMap_2);
        assertNotNull(eventListModel.sort(unsortedCFList));
    }
}