/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.metrics

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers
import org.junit.jupiter.api.Test

internal class BasicCounterTests {
    @Test
    fun increment() {
        val counter = BasicCounter()
        for (@Suppress("unused") i in 0..4) {
            counter.increment()
        }
        assertThat(counter.value, Matchers.equalTo(5L))
    }

    @Test
    fun incrementN() {
        val counter = BasicCounter()
        counter.add(5)
        assertThat(counter.value, Matchers.equalTo(5L))
    }
}
