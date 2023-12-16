package org.ets.core.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(
        name = "ETS Weekday - Scheduler Configuration",
        description = "This configuration sets the cron expression for the scheduler"
)

public @interface CronSchedulerConfiguration {

    @AttributeDefinition(
            name = "Scheduler name",
            description = "Name of the scheduler",
            type = AttributeType.STRING)
    public String schedulerName();

    @AttributeDefinition(
            name = "Payload Path",
            description = "Payload Path",
            type = AttributeType.STRING)
    public String jsonPayload();

    @AttributeDefinition(
            name = "Model Path",
            description = "Workflow Model Path",
            type = AttributeType.STRING)
    public String modelName();

    @AttributeDefinition(
            name = "Cron Expression",
            description = "Cron expression used by the scheduler",
            type = AttributeType.STRING)
    public String cronExpression();
}