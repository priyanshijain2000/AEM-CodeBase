package org.ets.core.schedulers;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.model.WorkflowModel;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.commons.scheduler.ScheduleOptions;
import org.apache.sling.commons.scheduler.Scheduler;
import org.ets.core.config.CronSchedulerConfiguration;
import org.ets.core.services.EPNContactAPIService;
import org.ets.core.utils.EtsResourceUtil;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(immediate = true, service = Runnable.class)
@Designate(ocd = CronSchedulerConfiguration.class)

public class ETSWeekDayScheduler implements Runnable {

    private static final Logger log = LoggerFactory.getLogger(ETSWeekDayScheduler.class);
    private String modelName;
    private String jsonPayload;
    private int schedulerId;

    @Reference
    protected ResourceResolverFactory resolverFactory;

    @Reference
    private EPNContactAPIService epnContactAPIService;

    @Reference
    private Scheduler scheduler;

    @Activate
    protected void activate(CronSchedulerConfiguration config) {
        modelName = config.modelName();
        jsonPayload = config.jsonPayload();
        schedulerId = config.schedulerName().hashCode();
        addScheduler(config);
    }

    @Deactivate
    protected void deactivate(CronSchedulerConfiguration config) {
        removeScheduler();
    }

    protected void removeScheduler() {
        if(scheduler!=null){
            scheduler.unschedule(String.valueOf(schedulerId));
        }
    }

    protected void addScheduler(CronSchedulerConfiguration config) {
        if(scheduler!=null){
            ScheduleOptions scheduleOptions = scheduler.EXPR(config.cronExpression());
            scheduleOptions.name(String.valueOf(schedulerId));
            scheduler.schedule(this, scheduleOptions);
            //ScheduleOptions scheduleOptionsNow = scheduler.NOW();
            //scheduler.schedule(this, scheduleOptionsNow);
        }
    }

    @Override
    public void run() {
        try {
            ResourceResolver resourceResolver = EtsResourceUtil.getResourceResolver(resolverFactory);
            if (resourceResolver != null) {
                WorkflowSession workflowSession = resourceResolver.adaptTo(WorkflowSession.class);
                if (workflowSession != null) {
                    WorkflowModel workflowModel = workflowSession.getModel(modelName);
                    WorkflowData workflowData = workflowSession.newWorkflowData("JCR_PATH", jsonPayload);
                    workflowSession.startWorkflow(workflowModel, workflowData);
                }
            }
        } catch(LoginException | WorkflowException e) {
            log.error("Exception in ETS Weekday Scheduler {}",e.getMessage());
        }
    }

}