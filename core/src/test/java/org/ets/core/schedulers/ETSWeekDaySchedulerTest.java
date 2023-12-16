package org.ets.core.schedulers;

import com.google.common.collect.ImmutableList;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.ets.core.config.CronSchedulerConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.org.lidalia.slf4jtest.LoggingEvent;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ETSWeekDaySchedulerTest {

    AemContext aemContext = new AemContext();
    private TestLogger LOG;
    private ETSWeekDayScheduler schedulerTest;
    CronSchedulerConfiguration schedulerConfiguration;
    int schedulerId;

    @BeforeEach
    void setup() {
        schedulerTest=aemContext.registerService(new ETSWeekDayScheduler());
        LOG= TestLoggerFactory.getTestLogger(schedulerTest.getClass());
        schedulerConfiguration=mock(CronSchedulerConfiguration.class);
        lenient().when(schedulerConfiguration.schedulerName()).thenReturn("ETS Weekday Configuration");
        lenient().when(schedulerConfiguration.cronExpression()).thenReturn("0 0 1 ? * MON-FRI");
        lenient().when(schedulerConfiguration.modelName()).thenReturn("/var/workflow/models/contact-epn-json-creation");
        lenient().when(schedulerConfiguration.jsonPayload()).thenReturn("/content/dam/ets-org/s/epn/epn_directory.json");
    }

    @Test
    void run() {
        schedulerTest.activate(schedulerConfiguration);
        schedulerTest.addScheduler(schedulerConfiguration);
        schedulerTest.deactivate(schedulerConfiguration);
        schedulerTest.removeScheduler();
        schedulerTest.run();
        ImmutableList<LoggingEvent> logEvents = LOG.getLoggingEvents();
    }

}
