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

package com.amazon.opendistroforelasticsearch.notebooks.action

import com.amazon.opendistroforelasticsearch.commons.authuser.User
import com.amazon.opendistroforelasticsearch.notebooks.NotebooksPlugin.Companion.LOG_PREFIX
import com.amazon.opendistroforelasticsearch.notebooks.index.NotebooksIndex
import com.amazon.opendistroforelasticsearch.notebooks.model.CreateNotebookRequest
import com.amazon.opendistroforelasticsearch.notebooks.model.CreateNotebookResponse
import com.amazon.opendistroforelasticsearch.notebooks.model.DeleteNotebookRequest
import com.amazon.opendistroforelasticsearch.notebooks.model.DeleteNotebookResponse
import com.amazon.opendistroforelasticsearch.notebooks.model.GetAllNotebooksRequest
import com.amazon.opendistroforelasticsearch.notebooks.model.GetAllNotebooksResponse
import com.amazon.opendistroforelasticsearch.notebooks.model.GetNotebookRequest
import com.amazon.opendistroforelasticsearch.notebooks.model.GetNotebookResponse
import com.amazon.opendistroforelasticsearch.notebooks.model.NotebookDetails
import com.amazon.opendistroforelasticsearch.notebooks.model.UpdateNotebookRequest
import com.amazon.opendistroforelasticsearch.notebooks.model.UpdateNotebookResponse
import com.amazon.opendistroforelasticsearch.notebooks.security.UserAccessManager
import com.amazon.opendistroforelasticsearch.notebooks.util.logger
import org.opensearch.OpenSearchStatusException
import org.opensearch.rest.RestStatus
import java.time.Instant

/**
 * Notebook index operation actions.
 */
internal object NotebookActions {
    private val log by logger(NotebookActions::class.java)

    /**
     * Create new notebook
     * @param request [CreateNotebookRequest] object
     * @return [CreateNotebookResponse]
     */
    fun create(request: CreateNotebookRequest, user: User?): CreateNotebookResponse {
        log.info("$LOG_PREFIX:Notebook-create")
        UserAccessManager.validateUser(user)
        val currentTime = Instant.now()
        val notebookDetails = NotebookDetails(
            "ignore",
            currentTime,
            currentTime,
            UserAccessManager.getUserTenant(user),
            UserAccessManager.getAllAccessInfo(user),
            request.notebook
        )
        val docId = NotebooksIndex.createNotebook(notebookDetails)
        docId ?: throw OpenSearchStatusException(
            "Notebook Creation failed",
            RestStatus.INTERNAL_SERVER_ERROR
        )
        return CreateNotebookResponse(docId)
    }

    /**
     * Update Notebook
     * @param request [UpdateNotebookRequest] object
     * @return [UpdateNotebookResponse]
     */
    fun update(request: UpdateNotebookRequest, user: User?): UpdateNotebookResponse {
        log.info("$LOG_PREFIX:Notebook-update ${request.notebookId}")
        UserAccessManager.validateUser(user)
        val currentNotebookDetails = NotebooksIndex.getNotebook(request.notebookId)
        currentNotebookDetails
            ?: throw OpenSearchStatusException("Notebook ${request.notebookId} not found", RestStatus.NOT_FOUND)
        if (!UserAccessManager.doesUserHasAccess(user, currentNotebookDetails.tenant, currentNotebookDetails.access)) {
            throw OpenSearchStatusException(
                "Permission denied for Notebook ${request.notebookId}",
                RestStatus.FORBIDDEN
            )
        }
        val currentTime = Instant.now()
        val notebookDetails = NotebookDetails(
            request.notebookId,
            currentTime,
            currentNotebookDetails.createdTime,
            UserAccessManager.getUserTenant(user),
            currentNotebookDetails.access,
            request.notebook
        )
        if (!NotebooksIndex.updateNotebook(request.notebookId, notebookDetails)) {
            throw OpenSearchStatusException("Notebook Update failed", RestStatus.INTERNAL_SERVER_ERROR)
        }
        return UpdateNotebookResponse(request.notebookId)
    }

    /**
     * Get Notebook info
     * @param request [GetNotebookRequest] object
     * @return [GetNotebookResponse]
     */
    fun info(request: GetNotebookRequest, user: User?): GetNotebookResponse {
        log.info("$LOG_PREFIX:Notebook-info ${request.notebookId}")
        UserAccessManager.validateUser(user)
        val notebookDetails = NotebooksIndex.getNotebook(request.notebookId)
        notebookDetails
            ?: throw OpenSearchStatusException("Notebook ${request.notebookId} not found", RestStatus.NOT_FOUND)
        if (!UserAccessManager.doesUserHasAccess(user, notebookDetails.tenant, notebookDetails.access)) {
            throw OpenSearchStatusException(
                "Permission denied for Notebook ${request.notebookId}",
                RestStatus.FORBIDDEN
            )
        }
        return GetNotebookResponse(notebookDetails, UserAccessManager.hasAllInfoAccess(user))
    }

    /**
     * Delete Notebook
     * @param request [DeleteNotebookRequest] object
     * @return [DeleteNotebookResponse]
     */
    fun delete(request: DeleteNotebookRequest, user: User?): DeleteNotebookResponse {
        log.info("$LOG_PREFIX:Notebook-delete ${request.notebookId}")
        UserAccessManager.validateUser(user)
        val notebookDetails = NotebooksIndex.getNotebook(request.notebookId)
        notebookDetails
            ?: throw OpenSearchStatusException(
                "Notebook ${request.notebookId} not found",
                RestStatus.NOT_FOUND
            )
        if (!UserAccessManager.doesUserHasAccess(
                user,
                notebookDetails.tenant,
                notebookDetails.access
            )
        ) {
            throw OpenSearchStatusException(
                "Permission denied for Notebook ${request.notebookId}",
                RestStatus.FORBIDDEN
            )
        }
        if (!NotebooksIndex.deleteNotebook(request.notebookId)) {
            throw OpenSearchStatusException(
                "Notebook ${request.notebookId} delete failed",
                RestStatus.REQUEST_TIMEOUT
            )
        }
        return DeleteNotebookResponse(request.notebookId)
    }

    /**
     * Get all Notebooks
     * @param request [GetAllNotebooksRequest] object
     * @return [GetAllNotebooksResponse]
     */
    fun getAll(request: GetAllNotebooksRequest, user: User?): GetAllNotebooksResponse {
        log.info("$LOG_PREFIX:Notebook-getAll fromIndex:${request.fromIndex} maxItems:${request.maxItems}")
        UserAccessManager.validateUser(user)
        val notebooksList = NotebooksIndex.getAllNotebooks(
            UserAccessManager.getUserTenant(user),
            UserAccessManager.getSearchAccessInfo(user),
            request.fromIndex,
            request.maxItems
        )
        return GetAllNotebooksResponse(notebooksList, UserAccessManager.hasAllInfoAccess(user))
    }
}
