package org.ets.core.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(
        name = "ETS - Common Configuration",
        description = "This is for common configurations"
)

public @interface CommonConfiguration {

    @AttributeDefinition(name = "Run mode",type = AttributeType.STRING)
    public String getRunmode() default "author";
    
    @AttributeDefinition(name = "Environment",type = AttributeType.STRING)
    public String getEnvironment() default "non-prod";
    
    @AttributeDefinition(name = "GTM ID",type = AttributeType.STRING)
    public String getGtmId() default "GTM-TNNKSB5";//default will have non-production GTM ID

}