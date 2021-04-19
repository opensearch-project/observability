/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 */

package com.amazon.opendistroforelasticsearch.notebooks.settings

import com.amazon.opendistroforelasticsearch.notebooks.NotebooksPlugin.Companion.LOG_PREFIX
import com.amazon.opendistroforelasticsearch.notebooks.NotebooksPlugin.Companion.PLUGIN_NAME
import org.apache.logging.log4j.LogManager
import org.opensearch.bootstrap.BootstrapInfo
import org.opensearch.cluster.service.ClusterService
import org.opensearch.common.settings.Setting
import org.opensearch.common.settings.Setting.Property.Dynamic
import org.opensearch.common.settings.Setting.Property.NodeScope
import org.opensearch.common.settings.Settings
import java.io.IOException
import java.nio.file.Path

/**
 * settings specific to notebooks Plugin.
 */
internal object PluginSettings {

    /**
     * Settings Key prefix for this plugin.
     */
    private const val KEY_PREFIX = "opendistro.notebooks"

    /**
     * General settings Key prefix.
     */
    private const val GENERAL_KEY_PREFIX = "$KEY_PREFIX.general"

    /**
     * Polling settings Key prefix.
     */
    private const val POLLING_KEY_PREFIX = "$KEY_PREFIX.polling"

    /**
     * Access settings Key prefix.
     */
    private const val ACCESS_KEY_PREFIX = "$KEY_PREFIX.access"

    /**
     * Operation timeout for network operations.
     */
    private const val OPERATION_TIMEOUT_MS_KEY = "$GENERAL_KEY_PREFIX.operationTimeoutMs"

    /**
     * Setting to choose Job lock duration.
     */
    private const val JOB_LOCK_DURATION_S_KEY = "$POLLING_KEY_PREFIX.jobLockDurationSeconds"

    /**
     * Setting to choose Minimum polling duration.
     */
    private const val MIN_POLLING_DURATION_S_KEY = "$POLLING_KEY_PREFIX.minPollingDurationSeconds"

    /**
     * Setting to choose Maximum polling duration.
     */
    private const val MAX_POLLING_DURATION_S_KEY = "$POLLING_KEY_PREFIX.maxPollingDurationSeconds"

    /**
     * Setting to choose Maximum number of retries to try locking.
     */
    private const val MAX_LOCK_RETRIES_KEY = "$POLLING_KEY_PREFIX.maxLockRetries"

    /**
     * Setting to choose default number of items to query.
     */
    private const val DEFAULT_ITEMS_QUERY_COUNT_KEY = "$GENERAL_KEY_PREFIX.defaultItemsQueryCount"

    /**
     * Setting to choose admin access restriction.
     */
    private const val ADMIN_ACCESS_KEY = "$ACCESS_KEY_PREFIX.adminAccess"

    /**
     * Setting to choose filter method.
     */
    private const val FILTER_BY_KEY = "$ACCESS_KEY_PREFIX.filterBy"

    /**
     * Setting to choose ignored roles for filtering.
     */
    private const val IGNORE_ROLE_KEY = "$ACCESS_KEY_PREFIX.ignoreRoles"

    /**
     * Default operation timeout for network operations.
     */
    private const val DEFAULT_OPERATION_TIMEOUT_MS = 60000L

    /**
     * Minimum operation timeout for network operations.
     */
    private const val MINIMUM_OPERATION_TIMEOUT_MS = 100L

    /**
     * Default Job lock duration.
     */
    private const val DEFAULT_JOB_LOCK_DURATION_S = 300

    /**
     * Minimum Job lock duration.
     */
    private const val MINIMUM_JOB_LOCK_DURATION_S = 10

    /**
     * Default Minimum polling duration.
     */
    private const val DEFAULT_MIN_POLLING_DURATION_S = 300

    /**
     * Minimum Min polling duration.
     */
    private const val MINIMUM_MIN_POLLING_DURATION_S = 60

    /**
     * Default Maximum polling duration.
     */
    private const val DEFAULT_MAX_POLLING_DURATION_S = 900

    /**
     * Minimum Maximum polling duration.
     */
    private const val MINIMUM_MAX_POLLING_DURATION_S = 300

    /**
     * Default number of retries to try locking.
     */
    private const val DEFAULT_MAX_LOCK_RETRIES = 4

    /**
     * Minimum number of retries to try locking.
     */
    private const val MINIMUM_LOCK_RETRIES = 1

    /**
     * Default number of items to query.
     */
    private const val DEFAULT_ITEMS_QUERY_COUNT_VALUE = 100

    /**
     * Minimum number of items to query.
     */
    private const val MINIMUM_ITEMS_QUERY_COUNT = 10

    /**
     * Default admin access method.
     */
    private const val DEFAULT_ADMIN_ACCESS_METHOD = "AllNotebooks"

    /**
     * Default filter-by method.
     */
    private const val DEFAULT_FILTER_BY_METHOD = "NoFilter"

    /**
     * Default filter-by method.
     */
    private val DEFAULT_IGNORED_ROLES = listOf("own_index",
        "opensearch_dashboards_user",
        "notebooks_full_access",
        "notebooks_read_access")

    /**
     * Operation timeout setting in ms for I/O operations
     */
    @Volatile
    var operationTimeoutMs: Long

    /**
     * Job lock duration
     */
    @Volatile
    var jobLockDurationSeconds: Int

    /**
     * Minimum polling duration
     */
    @Volatile
    var minPollingDurationSeconds: Int

    /**
     * Maximum polling duration.
     */
    @Volatile
    var maxPollingDurationSeconds: Int

    /**
     * Max number of retries to try locking.
     */
    @Volatile
    var maxLockRetries: Int

    /**
     * Default number of items to query.
     */
    @Volatile
    var defaultItemsQueryCount: Int

    /**
     * admin access method.
     */
    @Volatile
    var adminAccess: AdminAccess

    /**
     * Filter-by method.
     */
    @Volatile
    var filterBy: FilterBy

    /**
     * list of ignored roles.
     */
    @Volatile
    var ignoredRoles: List<String>

    /**
     * Enum for types of admin access
     * "Standard" -> Admin user access follows standard user
     * "AllNotebooks" -> Admin user with "all_access" role can see all notebooks of all users.
     */
    internal enum class AdminAccess { Standard, AllNotebooks }

    /**
     * Enum for types of filterBy options
     * NoFilter -> everyone see each other's notebooks
     * User -> notebooks are visible to only themselves
     * Roles -> notebooks are visible to users having any one of the role of creator
     * BackendRoles -> notebooks are visible to users having any one of the backend role of creator
     */
    internal enum class FilterBy { NoFilter, User, Roles, BackendRoles }

    private const val DECIMAL_RADIX: Int = 10

    private val log = LogManager.getLogger(javaClass)
    private val defaultSettings: Map<String, String>

    init {
        var settings: Settings? = null
        val configDirName = BootstrapInfo.getSystemProperties()?.get("opensearch.path.conf")?.toString()
        if (configDirName != null) {
            val defaultSettingYmlFile = Path.of(configDirName, PLUGIN_NAME, "notebooks.yml")
            try {
                settings = Settings.builder().loadFromPath(defaultSettingYmlFile).build()
            } catch (exception: IOException) {
                log.warn("$LOG_PREFIX:Failed to load ${defaultSettingYmlFile.toAbsolutePath()}")
            }
        }
        // Initialize the settings values to default values
        operationTimeoutMs = (settings?.get(OPERATION_TIMEOUT_MS_KEY)?.toLong()) ?: DEFAULT_OPERATION_TIMEOUT_MS
        jobLockDurationSeconds = (settings?.get(JOB_LOCK_DURATION_S_KEY)?.toInt()) ?: DEFAULT_JOB_LOCK_DURATION_S
        minPollingDurationSeconds = (settings?.get(MIN_POLLING_DURATION_S_KEY)?.toInt())
            ?: DEFAULT_MIN_POLLING_DURATION_S
        maxPollingDurationSeconds = (settings?.get(MAX_POLLING_DURATION_S_KEY)?.toInt())
            ?: DEFAULT_MAX_POLLING_DURATION_S
        maxLockRetries = (settings?.get(MAX_LOCK_RETRIES_KEY)?.toInt()) ?: DEFAULT_MAX_LOCK_RETRIES
        defaultItemsQueryCount = (settings?.get(DEFAULT_ITEMS_QUERY_COUNT_KEY)?.toInt())
            ?: DEFAULT_ITEMS_QUERY_COUNT_VALUE
        adminAccess = AdminAccess.valueOf(settings?.get(ADMIN_ACCESS_KEY) ?: DEFAULT_ADMIN_ACCESS_METHOD)
        filterBy = FilterBy.valueOf(settings?.get(FILTER_BY_KEY) ?: DEFAULT_FILTER_BY_METHOD)
        ignoredRoles = settings?.getAsList(IGNORE_ROLE_KEY) ?: DEFAULT_IGNORED_ROLES

        defaultSettings = mapOf(
            OPERATION_TIMEOUT_MS_KEY to operationTimeoutMs.toString(DECIMAL_RADIX),
            JOB_LOCK_DURATION_S_KEY to jobLockDurationSeconds.toString(DECIMAL_RADIX),
            MIN_POLLING_DURATION_S_KEY to minPollingDurationSeconds.toString(DECIMAL_RADIX),
            MAX_POLLING_DURATION_S_KEY to maxPollingDurationSeconds.toString(DECIMAL_RADIX),
            MAX_LOCK_RETRIES_KEY to maxLockRetries.toString(DECIMAL_RADIX),
            DEFAULT_ITEMS_QUERY_COUNT_KEY to defaultItemsQueryCount.toString(DECIMAL_RADIX),
            ADMIN_ACCESS_KEY to adminAccess.name,
            FILTER_BY_KEY to filterBy.name
        )
    }

    private val OPERATION_TIMEOUT_MS: Setting<Long> = Setting.longSetting(
        OPERATION_TIMEOUT_MS_KEY,
        defaultSettings[OPERATION_TIMEOUT_MS_KEY]!!.toLong(),
        MINIMUM_OPERATION_TIMEOUT_MS,
        NodeScope, Dynamic
    )

    private val JOB_LOCK_DURATION_S: Setting<Int> = Setting.intSetting(
        JOB_LOCK_DURATION_S_KEY,
        defaultSettings[JOB_LOCK_DURATION_S_KEY]!!.toInt(),
        MINIMUM_JOB_LOCK_DURATION_S,
        NodeScope, Dynamic
    )

    private val MIN_POLLING_DURATION_S: Setting<Int> = Setting.intSetting(
        MIN_POLLING_DURATION_S_KEY,
        defaultSettings[MIN_POLLING_DURATION_S_KEY]!!.toInt(),
        MINIMUM_MIN_POLLING_DURATION_S,
        NodeScope, Dynamic
    )

    private val MAX_POLLING_DURATION_S: Setting<Int> = Setting.intSetting(
        MAX_POLLING_DURATION_S_KEY,
        defaultSettings[MAX_POLLING_DURATION_S_KEY]!!.toInt(),
        MINIMUM_MAX_POLLING_DURATION_S,
        NodeScope, Dynamic
    )

    private val MAX_LOCK_RETRIES: Setting<Int> = Setting.intSetting(
        MAX_LOCK_RETRIES_KEY,
        defaultSettings[MAX_LOCK_RETRIES_KEY]!!.toInt(),
        MINIMUM_LOCK_RETRIES,
        NodeScope, Dynamic
    )

    private val DEFAULT_ITEMS_QUERY_COUNT: Setting<Int> = Setting.intSetting(
        DEFAULT_ITEMS_QUERY_COUNT_KEY,
        defaultSettings[DEFAULT_ITEMS_QUERY_COUNT_KEY]!!.toInt(),
        MINIMUM_ITEMS_QUERY_COUNT,
        NodeScope, Dynamic
    )

    private val ADMIN_ACCESS: Setting<String> = Setting.simpleString(
        ADMIN_ACCESS_KEY,
        defaultSettings[ADMIN_ACCESS_KEY]!!,
        NodeScope, Dynamic
    )

    private val FILTER_BY: Setting<String> = Setting.simpleString(
        FILTER_BY_KEY,
        defaultSettings[FILTER_BY_KEY]!!,
        NodeScope, Dynamic
    )

    private val IGNORED_ROLES: Setting<List<String>> = Setting.listSetting(
        IGNORE_ROLE_KEY,
        DEFAULT_IGNORED_ROLES,
        { it },
        NodeScope, Dynamic
    )

    /**
     * Returns list of additional settings available specific to this plugin.
     *
     * @return list of settings defined in this plugin
     */
    fun getAllSettings(): List<Setting<*>> {
        return listOf(OPERATION_TIMEOUT_MS,
            JOB_LOCK_DURATION_S,
            MIN_POLLING_DURATION_S,
            MAX_POLLING_DURATION_S,
            MAX_LOCK_RETRIES,
            DEFAULT_ITEMS_QUERY_COUNT,
            ADMIN_ACCESS,
            FILTER_BY,
            IGNORED_ROLES
        )
    }

    /**
     * Update the setting variables to setting values from local settings
     * @param clusterService cluster service instance
     */
    private fun updateSettingValuesFromLocal(clusterService: ClusterService) {
        operationTimeoutMs = OPERATION_TIMEOUT_MS.get(clusterService.settings)
        jobLockDurationSeconds = JOB_LOCK_DURATION_S.get(clusterService.settings)
        minPollingDurationSeconds = MIN_POLLING_DURATION_S.get(clusterService.settings)
        maxPollingDurationSeconds = MAX_POLLING_DURATION_S.get(clusterService.settings)
        maxLockRetries = MAX_LOCK_RETRIES.get(clusterService.settings)
        defaultItemsQueryCount = DEFAULT_ITEMS_QUERY_COUNT.get(clusterService.settings)
        adminAccess = AdminAccess.valueOf(ADMIN_ACCESS.get(clusterService.settings))
        filterBy = FilterBy.valueOf(FILTER_BY.get(clusterService.settings))
        ignoredRoles = IGNORED_ROLES.get(clusterService.settings)
    }

    /**
     * Update the setting variables to setting values from cluster settings
     * @param clusterService cluster service instance
     */
    private fun updateSettingValuesFromCluster(clusterService: ClusterService) {
        val clusterOperationTimeoutMs = clusterService.clusterSettings.get(OPERATION_TIMEOUT_MS)
        if (clusterOperationTimeoutMs != null) {
            log.debug("$LOG_PREFIX:$OPERATION_TIMEOUT_MS_KEY -autoUpdatedTo-> $clusterOperationTimeoutMs")
            operationTimeoutMs = clusterOperationTimeoutMs
        }
        val clusterJobLockDurationSeconds = clusterService.clusterSettings.get(JOB_LOCK_DURATION_S)
        if (clusterJobLockDurationSeconds != null) {
            log.debug("$LOG_PREFIX:$JOB_LOCK_DURATION_S_KEY -autoUpdatedTo-> $clusterJobLockDurationSeconds")
            jobLockDurationSeconds = clusterJobLockDurationSeconds
        }
        val clusterMinPollingDurationSeconds = clusterService.clusterSettings.get(MIN_POLLING_DURATION_S)
        if (clusterMinPollingDurationSeconds != null) {
            log.debug("$LOG_PREFIX:$MIN_POLLING_DURATION_S_KEY -autoUpdatedTo-> $clusterMinPollingDurationSeconds")
            minPollingDurationSeconds = clusterMinPollingDurationSeconds
        }
        val clusterMaxPollingDurationSeconds = clusterService.clusterSettings.get(MAX_POLLING_DURATION_S)
        if (clusterMaxPollingDurationSeconds != null) {
            log.debug("$LOG_PREFIX:$MAX_POLLING_DURATION_S_KEY -autoUpdatedTo-> $clusterMaxPollingDurationSeconds")
            maxPollingDurationSeconds = clusterMaxPollingDurationSeconds
        }
        val clusterMaxLockRetries = clusterService.clusterSettings.get(MAX_LOCK_RETRIES)
        if (clusterMaxLockRetries != null) {
            log.debug("$LOG_PREFIX:$MAX_LOCK_RETRIES_KEY -autoUpdatedTo-> $clusterMaxLockRetries")
            maxLockRetries = clusterMaxLockRetries
        }
        val clusterDefaultItemsQueryCount = clusterService.clusterSettings.get(DEFAULT_ITEMS_QUERY_COUNT)
        if (clusterDefaultItemsQueryCount != null) {
            log.debug("$LOG_PREFIX:$DEFAULT_ITEMS_QUERY_COUNT_KEY -autoUpdatedTo-> $clusterDefaultItemsQueryCount")
            defaultItemsQueryCount = clusterDefaultItemsQueryCount
        }
        val clusterAdminAccess = clusterService.clusterSettings.get(ADMIN_ACCESS)
        if (clusterAdminAccess != null) {
            log.debug("$LOG_PREFIX:$ADMIN_ACCESS_KEY -autoUpdatedTo-> $clusterAdminAccess")
            adminAccess = AdminAccess.valueOf(clusterAdminAccess)
        }
        val clusterFilterBy = clusterService.clusterSettings.get(FILTER_BY)
        if (clusterFilterBy != null) {
            log.debug("$LOG_PREFIX:$FILTER_BY_KEY -autoUpdatedTo-> $clusterFilterBy")
            filterBy = FilterBy.valueOf(clusterFilterBy)
        }
        val clusterIgnoredRoles = clusterService.clusterSettings.get(IGNORED_ROLES)
        if (clusterIgnoredRoles != null) {
            log.debug("$LOG_PREFIX:$IGNORE_ROLE_KEY -autoUpdatedTo-> $clusterIgnoredRoles")
            ignoredRoles = clusterIgnoredRoles
        }
    }

    /**
     * adds Settings update listeners to all settings.
     * @param clusterService cluster service instance
     */
    fun addSettingsUpdateConsumer(clusterService: ClusterService) {
        updateSettingValuesFromLocal(clusterService)
        // Update the variables to cluster setting values
        // If the cluster is not yet started then we get default values again
        updateSettingValuesFromCluster(clusterService)

        clusterService.clusterSettings.addSettingsUpdateConsumer(OPERATION_TIMEOUT_MS) {
            operationTimeoutMs = it
            log.info("$LOG_PREFIX:$OPERATION_TIMEOUT_MS_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(JOB_LOCK_DURATION_S) {
            jobLockDurationSeconds = it
            log.info("$LOG_PREFIX:$JOB_LOCK_DURATION_S_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(MIN_POLLING_DURATION_S) {
            minPollingDurationSeconds = it
            log.info("$LOG_PREFIX:$MIN_POLLING_DURATION_S_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(MAX_POLLING_DURATION_S) {
            maxPollingDurationSeconds = it
            log.info("$LOG_PREFIX:$MAX_POLLING_DURATION_S_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(MAX_LOCK_RETRIES) {
            maxLockRetries = it
            log.info("$LOG_PREFIX:$MAX_LOCK_RETRIES_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(DEFAULT_ITEMS_QUERY_COUNT) {
            defaultItemsQueryCount = it
            log.info("$LOG_PREFIX:$DEFAULT_ITEMS_QUERY_COUNT_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(ADMIN_ACCESS) {
            adminAccess = AdminAccess.valueOf(it)
            log.info("$LOG_PREFIX:$ADMIN_ACCESS_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(FILTER_BY) {
            filterBy = FilterBy.valueOf(it)
            log.info("$LOG_PREFIX:$FILTER_BY_KEY -updatedTo-> $it")
        }
        clusterService.clusterSettings.addSettingsUpdateConsumer(IGNORED_ROLES) {
            ignoredRoles = it
            log.info("$LOG_PREFIX:$IGNORE_ROLE_KEY -updatedTo-> $it")
        }
    }
}
