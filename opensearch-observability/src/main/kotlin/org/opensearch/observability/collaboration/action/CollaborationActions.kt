/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.collaboration.action

import org.opensearch.OpenSearchStatusException
import org.opensearch.commons.authuser.User
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.collaboration.model.CollaborationObjectDoc
import org.opensearch.observability.index.CollaborationIndex
import org.opensearch.observability.security.UserAccessManager
import org.opensearch.observability.util.logger
import org.opensearch.rest.RestStatus
import java.time.Instant

/**
 * CollaborationObject index operation actions.
 */
internal object CollaborationActions {

    private val log by logger(CollaborationActions::class.java)

    /**
     * Create new CollaborationObject
     * @param request [CreateCollaborationObjectRequest] object
     * @return [CreateCollaborationObjectResponse]
     */
    fun create(request: CreateCollaborationObjectRequest, user: User?): CreateCollaborationObjectResponse {
        log.info("${ObservabilityPlugin.LOG_PREFIX}:CollaborationObject-create")
        UserAccessManager.validateUser(user)
        val currentTime = Instant.now()
        val objectDoc = CollaborationObjectDoc(
            "ignore",
            currentTime,
            currentTime,
            UserAccessManager.getUserTenant(user),
            UserAccessManager.getAllAccessInfo(user),
            request.type,
            request.objectData
        )
        val docId = CollaborationIndex.createCollaborationObject(objectDoc, request.collaborationId)
        docId ?: throw OpenSearchStatusException(
            "CollaborationObject creation failed",
            RestStatus.INTERNAL_SERVER_ERROR
        )
        return CreateCollaborationObjectResponse(docId)
    }

    /**
     * Delete CollaborationObject
     * @param request [DeleteCollaborationObjectRequest] object
     * @param user the user info object
     * @return [DeleteCollaborationObjectResponse]
     */
    fun delete(request: DeleteCollaborationObjectRequest, user: User?): DeleteCollaborationObjectResponse {
        log.info("${ObservabilityPlugin.LOG_PREFIX}:CollaborationObject-delete ${request.collaborationIds}")
        return if (request.collaborationIds.size == 1) {
            delete(request.collaborationIds.first(), user)
        } else {
            delete(request.collaborationIds, user)
        }
    }

    /**
     * Delete by collaboration id
     *
     * @param collaborationId
     * @param user
     * @return [DeleteCollaborationObjectResponse]
     */
    private fun delete(collaborationId: String, user: User?): DeleteCollaborationObjectResponse {
        log.info("${ObservabilityPlugin.LOG_PREFIX}:CollaborationObject-delete $collaborationId")
        UserAccessManager.validateUser(user)
        val collaborationObjectDocInfo = CollaborationIndex.getCollaborationObject(collaborationId)
        collaborationObjectDocInfo
            ?: run {
                throw OpenSearchStatusException(
                    "CollaborationObject $collaborationId not found",
                    RestStatus.NOT_FOUND
                )
            }

        val currentDoc = collaborationObjectDocInfo.collaborationObjectDoc
        if (!UserAccessManager.doesUserHasAccess(user, currentDoc.tenant, currentDoc.access)) {
            throw OpenSearchStatusException(
                "Permission denied for CollaborationObject $collaborationId",
                RestStatus.FORBIDDEN
            )
        }
        if (!CollaborationIndex.deleteCollaborationObject(collaborationId)) {
            throw OpenSearchStatusException(
                "CollaborationObject $collaborationId delete failed",
                RestStatus.REQUEST_TIMEOUT
            )
        }
        return DeleteCollaborationObjectResponse(mapOf(Pair(collaborationId, RestStatus.OK)))
    }

    /**
     * Delete CollaborationObjects
     * @param collaborationIds CollaborationObject ids
     * @param user the user info object
     * @return [DeleteCollaborationObjectResponse]
     */
    private fun delete(collaborationIds: Set<String>, user: User?): DeleteCollaborationObjectResponse {
        log.info("${ObservabilityPlugin.LOG_PREFIX}:CollaborationObject-delete $collaborationIds")
        UserAccessManager.validateUser(user)
        val configDocs = CollaborationIndex.getCollaborationObjects(collaborationIds)
        if (configDocs.size != collaborationIds.size) {
            val mutableSet = collaborationIds.toMutableSet()
            configDocs.forEach { mutableSet.remove(it.id) }
            throw OpenSearchStatusException(
                "CollaborationObject $mutableSet not found",
                RestStatus.NOT_FOUND
            )
        }
        configDocs.forEach {
            val currentDoc = it.collaborationObjectDoc
            if (!UserAccessManager.doesUserHasAccess(user, currentDoc.tenant, currentDoc.access)) {
                throw OpenSearchStatusException(
                    "Permission denied for CollaborationObject ${it.id}",
                    RestStatus.FORBIDDEN
                )
            }
        }
        val deleteStatus = CollaborationIndex.deleteCollaborationObjects(collaborationIds)
        return DeleteCollaborationObjectResponse(deleteStatus)
    }
}
