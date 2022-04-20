/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.scheduler

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.opensearch.jobscheduler.spi.JobExecutionContext
import org.opensearch.jobscheduler.spi.ScheduledJobParameter
import org.opensearch.jobscheduler.spi.ScheduledJobRunner
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.model.ScheduledJobDoc
import org.opensearch.observability.ppl.PPLActions
import org.opensearch.observability.security.UserAccessManager
import org.opensearch.observability.util.logger

internal object ObservabilityJobRunner : ScheduledJobRunner {
    private val log by logger(ObservabilityJobRunner::class.java)
    private val scope: CoroutineScope = CoroutineScope(Dispatchers.IO)

    override fun runJob(job: ScheduledJobParameter, context: JobExecutionContext) {
        if (job !is ScheduledJobDoc) {
            log.warn("$LOG_PREFIX:job is not of type ScheduledJobDoc:${job.javaClass.name}")
            throw IllegalArgumentException("job is not of type ScheduledJobDoc:${job.javaClass.name}")
        }


        scope.launch {
            val scheduledJob: ScheduledJobDoc = job
            val jobType = scheduledJob.jobType
            log.info("zhongnan - start to execute scheduled job, type: [${jobType}]")

            val pplQueryString = """
                source=bank
                | where age > 18
                | fields firstname, lastname | head
            """.trimIndent()// TODO:

            val sqlQueryString = "SELECT * FROM bank LIMIT 1"
            log.info("zhongnan- sending PPL query: ${pplQueryString}")

            val user = UserAccessManager.getUserFromAccess(job.access)
            val userStr = user?.let { it.toString() } ?: ""
            PPLActions.send(pplQueryString, userStr)
        }
    }
}
