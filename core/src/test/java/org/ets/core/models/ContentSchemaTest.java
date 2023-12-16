package org.ets.core.models;

import org.ets.core.bean.ContentSchema;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ContentSchemaTest {
    ContentSchema cs = new ContentSchema();

    @Test
    void testCs() {

        Assertions.assertNull(cs.getTitle());
        Assertions.assertNull(cs.getDescription());
        Assertions.assertNull(cs.getImage());
        Assertions.assertNull(cs.getDate());
        Assertions.assertNull(cs.getPath());
        Assertions.assertNull(cs.getName());
    }
}
