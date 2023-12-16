package org.ets.core.models;

import org.ets.core.bean.CategorySchema;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class CategorySchemaTest {

    CategorySchema cs = new CategorySchema();

    @Test
    void testCs() {

        Assertions.assertNull(cs.getTitle());
        Assertions.assertNull(cs.getValue());
    }
}
