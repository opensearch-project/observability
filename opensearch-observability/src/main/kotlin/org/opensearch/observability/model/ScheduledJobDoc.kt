package org.opensearch.observability.model

import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.jobscheduler.spi.ScheduledJobParameter
import org.opensearch.jobscheduler.spi.schedule.Schedule
import org.opensearch.jobscheduler.spi.schedule.ScheduleParser
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.model.RestTag.ACCESS_LIST_FIELD
import org.opensearch.observability.model.RestTag.CREATED_TIME_FIELD
import org.opensearch.observability.model.RestTag.ID_FIELD
import org.opensearch.observability.model.RestTag.IS_ENABLED_TAG
import org.opensearch.observability.model.RestTag.OBJECT_ID_FIELD
import org.opensearch.observability.model.RestTag.SCHEDULED_JOB_TYPE_TAG
import org.opensearch.observability.model.RestTag.SCHEDULE_INFO_TAG
import org.opensearch.observability.model.RestTag.TENANT_FIELD
import org.opensearch.observability.model.RestTag.UPDATED_TIME_FIELD
import org.opensearch.observability.security.UserAccessManager.DEFAULT_TENANT
import org.opensearch.observability.util.logger
import org.opensearch.observability.util.stringList
import java.io.IOException
import java.time.Instant

/**
 * TODO: this whole class is for poc purpose. As for actual implementation, it depends on the data model of Metric.
 */
internal data class ScheduledJobDoc(
    val id: String,
    val updatedTime: Instant,
    val createdTime: Instant,
    val tenant: String,
    val access: List<String>,
    val jobType: JobType,
    val scheduleInfo: Schedule,
    val enabled: Boolean
) : ScheduledJobParameter, BaseModel {

    internal enum class JobType { Metrics, Uptime }

    internal companion object {
        private val log by logger(ScheduledJobDoc::class.java)

        /**
         * Parse the data from parser and create ScheduledJobDoc object
         * @param parser data referenced at parser
         * @param userId use this id if not available in the json
         * @return created ScheduledJobDoc object
         */
        @JvmStatic
        @Throws(IOException::class)
        @Suppress("ComplexMethod")
        fun parse(parser: XContentParser, userId: String? = null): ScheduledJobDoc {
            var id: String? = userId
            var updatedTime: Instant? = null
            var createdTime: Instant? = null
            var tenant: String? = null
            var access: List<String> = listOf()
            var jobType: JobType? = null
            var scheduleInfo: Schedule? = null
            var enabled = false

            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    OBJECT_ID_FIELD -> id = parser.text()
                    UPDATED_TIME_FIELD -> updatedTime = Instant.ofEpochMilli(parser.longValue())
                    CREATED_TIME_FIELD -> createdTime = Instant.ofEpochMilli(parser.longValue())
                    TENANT_FIELD -> tenant = parser.text()
                    ACCESS_LIST_FIELD -> access = parser.stringList()
                    SCHEDULED_JOB_TYPE_TAG -> jobType = JobType.valueOf(parser.text())
                    SCHEDULE_INFO_TAG -> scheduleInfo = ScheduleParser.parse(parser)
                    IS_ENABLED_TAG -> enabled = parser.booleanValue()
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:ScheduledJobDoc Skipping Unknown field $fieldName")
                    }
                }
            }

            id ?: throw IllegalArgumentException("$ID_FIELD field absent")
            updatedTime ?: throw IllegalArgumentException("$UPDATED_TIME_FIELD field absent")
            createdTime ?: throw IllegalArgumentException("$CREATED_TIME_FIELD field absent")
            tenant = tenant ?: DEFAULT_TENANT
            jobType ?: throw IllegalArgumentException("$SCHEDULED_JOB_TYPE_TAG field absent")
            scheduleInfo ?: throw IllegalArgumentException("$SCHEDULE_INFO_TAG field absent")

            return ScheduledJobDoc(
                id,
                updatedTime,
                createdTime,
                tenant,
                access,
                jobType,
                scheduleInfo,
                enabled
            )
        }
    }

    /**
     * create XContentBuilder from this object using [XContentFactory.jsonBuilder()]
     * @param params XContent parameters
     * @return created XContentBuilder object
     */
    fun toXContent(params: ToXContent.Params = ToXContent.EMPTY_PARAMS): XContentBuilder? {
        return toXContent(XContentFactory.jsonBuilder(), params)
    }

    override fun writeTo(output: StreamOutput) {
        output.writeString(id)
        output.writeInstant(updatedTime)
        output.writeInstant(createdTime)
        output.writeString(tenant)
        output.writeStringCollection(access)
        output.writeEnum(jobType)
        output.writeEnum(jobType) // jobType is read twice in constructor
        output.writeOptionalWriteable(scheduleInfo)
        output.writeBoolean(enabled)
    }

    /**
     * {ref toXContent}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        builder.startObject()
        if (params?.paramAsBoolean(ID_FIELD, false) == true) {
            builder.field(ID_FIELD, id)
        }
        builder.field(UPDATED_TIME_FIELD, updatedTime.toEpochMilli())
            .field(CREATED_TIME_FIELD, createdTime.toEpochMilli())
            .field(TENANT_FIELD, tenant)
        if (params?.paramAsBoolean(ACCESS_LIST_FIELD, true) == true && access.isNotEmpty()) {
            builder.field(ACCESS_LIST_FIELD, access)
        }

        builder.field(SCHEDULE_INFO_TAG)
        schedule.toXContent(builder, ToXContent.EMPTY_PARAMS)

        builder.field(SCHEDULED_JOB_TYPE_TAG, jobType)
            .field(IS_ENABLED_TAG, enabled)
        builder.endObject()
        return builder
    }

    override fun getName(): String {
        return "poc name" // TODO: placeholder e.g. metric.name
    }

    override fun getLastUpdateTime(): Instant {
        return updatedTime
    }

    override fun getEnabledTime(): Instant {
        return createdTime
    }

    override fun getSchedule(): Schedule {
        return scheduleInfo
    }

    override fun isEnabled(): Boolean {
        return enabled
    }
}
