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
import com.amazon.opendistroforelasticsearch.notebooks.model.UpdateNotebookRequest
import com.amazon.opendistroforelasticsearch.notebooks.model.UpdateNotebookResponse
import org.opensearch.action.ActionType
import org.opensearch.action.support.ActionFilters
import org.opensearch.client.Client
import org.opensearch.common.inject.Inject
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.transport.TransportService

/**
 * Update notebook transport action
 */
internal class UpdateNotebookAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<UpdateNotebookRequest, UpdateNotebookResponse>(NAME,
    transportService,
    client,
    actionFilters,
    ::UpdateNotebookRequest) {
    companion object {
        private const val NAME = "cluster:admin/opendistro/notebooks/update"
        internal val ACTION_TYPE = ActionType(NAME, ::UpdateNotebookResponse)
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(request: UpdateNotebookRequest, user: User?): UpdateNotebookResponse {
        return NotebookActions.update(request, user)
    }
}
