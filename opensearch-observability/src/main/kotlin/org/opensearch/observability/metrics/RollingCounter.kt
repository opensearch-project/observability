/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.metrics

import java.time.Clock
import java.util.concurrent.ConcurrentSkipListMap

/**
 * Rolling counter. The count is refreshed every interval. In every interval the count is cumulative.
 */
internal class RollingCounter(
    private val window: Long = METRICS_ROLLING_WINDOW_VALUE,
    private val interval: Long = METRICS_ROLLING_INTERVAL_VALUE,
    private val clock: Clock = Clock.systemDefaultZone()
) : Counter<Long> {
    private val capacity: Long = window / interval * 2
    private val timeToCountMap = ConcurrentSkipListMap<Long, Long>()

    /**
     * {@inheritDoc}
     */
    override fun increment() {
        add(1L)
    }

    /**
     * {@inheritDoc}
     */
    override fun add(n: Long) {
        trim()
        timeToCountMap.compute(
            getKey(clock.millis())
        ) { k: Long?, v: Long? -> if (v == null) n else v + n }
    }

    /**
     * {@inheritDoc}
     */
    override val value get() = getValue(getPreKey(clock.millis()))

    /**
     * {@inheritDoc}
     */
    fun getValue(key: Long): Long {
        return timeToCountMap[key] ?: return 0
    }

    private fun trim() {
        if (timeToCountMap.size > capacity) {
            timeToCountMap.headMap(getKey(clock.millis() - window * MILLIS_MULTIPLIER)).clear()
        }
    }

    private fun getKey(millis: Long): Long {
        return millis / MILLIS_MULTIPLIER / interval
    }

    private fun getPreKey(millis: Long): Long {
        return getKey(millis) - 1
    }

    /**
     * Number of existing intervals
     */
    fun size(): Int {
        return timeToCountMap.size
    }

    /**
     * Remove all the items from counter
     */
    override fun reset() {
        timeToCountMap.clear()
    }

    companion object {
        private const val METRICS_ROLLING_WINDOW_VALUE = 3600L
        private const val METRICS_ROLLING_INTERVAL_VALUE = 60L
        private const val MILLIS_MULTIPLIER = 1000
    }
}
