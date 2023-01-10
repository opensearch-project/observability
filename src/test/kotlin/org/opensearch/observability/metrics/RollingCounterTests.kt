/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.metrics

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.junit.jupiter.MockitoExtension
import java.time.Clock

@ExtendWith(MockitoExtension::class)
internal class RollingCounterTests {
    @Mock
    var clock: Clock? = null

    @Test
    fun increment() {
        val counter = RollingCounter(3, 1, clock!!)
        for (i in 0..4) {
            counter.increment()
        }
        assertThat(counter.value, Matchers.equalTo(0L))
        Mockito.`when`(clock!!.millis()).thenReturn(1000L) // 1 second passed
        assertThat(counter.value, Matchers.equalTo(5L))
        counter.increment()
        counter.increment()
        Mockito.`when`(clock!!.millis()).thenReturn(2000L) // 1 second passed
        assertThat(counter.value, Matchers.lessThanOrEqualTo(3L))
        Mockito.`when`(clock!!.millis()).thenReturn(3000L) // 1 second passed
        assertThat(counter.value, Matchers.equalTo(0L))
    }

    @Test
    fun add() {
        val counter = RollingCounter(3, 1, clock!!)
        counter.add(6)
        assertThat(counter.value, Matchers.equalTo(0L))
        Mockito.`when`(clock!!.millis()).thenReturn(1000L) // 1 second passed
        assertThat(counter.value, Matchers.equalTo(6L))
        counter.add(4)
        Mockito.`when`(clock!!.millis()).thenReturn(2000L) // 1 second passed
        assertThat(counter.value, Matchers.equalTo(4L))
        Mockito.`when`(clock!!.millis()).thenReturn(3000L) // 1 second passed
        assertThat(counter.value, Matchers.equalTo(0L))
    }

    @Test
    fun trim() {
        val counter = RollingCounter(2, 1, clock!!)
        for (i in 1..5) {
            counter.increment()
            assertThat(counter.size(), Matchers.equalTo(i))
            Mockito.`when`(clock!!.millis()).thenReturn(i * 1000L) // i seconds passed
        }
        counter.increment()
        assertThat(counter.size(), Matchers.lessThanOrEqualTo(3))
    }
}
