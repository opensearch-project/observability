/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.util

import org.opensearch.action.ActionFuture
import org.opensearch.action.ActionListener
import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionResponse
import org.opensearch.action.ActionType
import org.opensearch.action.bulk.BulkRequest
import org.opensearch.action.bulk.BulkResponse
import org.opensearch.action.delete.DeleteRequest
import org.opensearch.action.delete.DeleteResponse
import org.opensearch.action.explain.ExplainRequest
import org.opensearch.action.explain.ExplainResponse
import org.opensearch.action.fieldcaps.FieldCapabilitiesRequest
import org.opensearch.action.fieldcaps.FieldCapabilitiesResponse
import org.opensearch.action.get.GetRequest
import org.opensearch.action.get.GetResponse
import org.opensearch.action.get.MultiGetRequest
import org.opensearch.action.get.MultiGetResponse
import org.opensearch.action.index.IndexRequest
import org.opensearch.action.index.IndexResponse
import org.opensearch.action.search.ClearScrollRequest
import org.opensearch.action.search.ClearScrollResponse
import org.opensearch.action.search.MultiSearchRequest
import org.opensearch.action.search.MultiSearchResponse
import org.opensearch.action.search.SearchRequest
import org.opensearch.action.search.SearchResponse
import org.opensearch.action.search.SearchScrollRequest
import org.opensearch.action.termvectors.MultiTermVectorsRequest
import org.opensearch.action.termvectors.MultiTermVectorsResponse
import org.opensearch.action.termvectors.TermVectorsRequest
import org.opensearch.action.termvectors.TermVectorsResponse
import org.opensearch.action.update.UpdateRequest
import org.opensearch.action.update.UpdateResponse
import org.opensearch.client.Client
import org.opensearch.common.util.concurrent.ThreadContext

/**
 * Wrapper class on [Client] with security context removed.
 */
@Suppress("TooManyFunctions")
internal class SecureIndexClient(private val client: Client) : Client by client {
    /**
     * {@inheritDoc}
     */
    override fun <Request : ActionRequest, Response : ActionResponse> execute(
        action: ActionType<Response>,
        request: Request
    ): ActionFuture<Response> {
        client.threadPool().threadContext.stashContext().use { return client.execute(action, request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun <Request : ActionRequest, Response : ActionResponse> execute(
        action: ActionType<Response>,
        request: Request,
        listener: ActionListener<Response>
    ) {
        client.threadPool().threadContext.stashContext().use { return client.execute(action, request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun index(request: IndexRequest): ActionFuture<IndexResponse> {
        client.threadPool().threadContext.stashContext().use { return client.index(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun index(request: IndexRequest, listener: ActionListener<IndexResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.index(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun update(request: UpdateRequest): ActionFuture<UpdateResponse> {
        client.threadPool().threadContext.stashContext().use { return client.update(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun update(request: UpdateRequest, listener: ActionListener<UpdateResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.update(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun delete(request: DeleteRequest): ActionFuture<DeleteResponse> {
        client.threadPool().threadContext.stashContext().use { return client.delete(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun delete(request: DeleteRequest, listener: ActionListener<DeleteResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.delete(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun bulk(request: BulkRequest): ActionFuture<BulkResponse> {
        client.threadPool().threadContext.stashContext().use { return client.bulk(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun bulk(request: BulkRequest, listener: ActionListener<BulkResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.bulk(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun get(request: GetRequest): ActionFuture<GetResponse> {
        client.threadPool().threadContext.stashContext().use { return client.get(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun get(request: GetRequest, listener: ActionListener<GetResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.get(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun multiGet(request: MultiGetRequest): ActionFuture<MultiGetResponse> {
        client.threadPool().threadContext.stashContext().use { return client.multiGet(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun multiGet(request: MultiGetRequest, listener: ActionListener<MultiGetResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.multiGet(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun search(request: SearchRequest): ActionFuture<SearchResponse> {
        client.threadPool().threadContext.stashContext().use { return client.search(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun search(request: SearchRequest, listener: ActionListener<SearchResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.search(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun searchScroll(request: SearchScrollRequest): ActionFuture<SearchResponse> {
        client.threadPool().threadContext.stashContext().use { return client.searchScroll(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun searchScroll(request: SearchScrollRequest, listener: ActionListener<SearchResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.searchScroll(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun multiSearch(request: MultiSearchRequest): ActionFuture<MultiSearchResponse> {
        client.threadPool().threadContext.stashContext().use { return client.multiSearch(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun multiSearch(request: MultiSearchRequest, listener: ActionListener<MultiSearchResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.multiSearch(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun termVectors(request: TermVectorsRequest): ActionFuture<TermVectorsResponse> {
        client.threadPool().threadContext.stashContext().use { return client.termVectors(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun termVectors(request: TermVectorsRequest, listener: ActionListener<TermVectorsResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.termVectors(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun multiTermVectors(request: MultiTermVectorsRequest): ActionFuture<MultiTermVectorsResponse> {
        client.threadPool().threadContext.stashContext().use { return client.multiTermVectors(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun multiTermVectors(request: MultiTermVectorsRequest, listener: ActionListener<MultiTermVectorsResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.multiTermVectors(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun explain(request: ExplainRequest): ActionFuture<ExplainResponse> {
        client.threadPool().threadContext.stashContext().use { return client.explain(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun explain(request: ExplainRequest, listener: ActionListener<ExplainResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.explain(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun clearScroll(request: ClearScrollRequest): ActionFuture<ClearScrollResponse> {
        client.threadPool().threadContext.stashContext().use { return client.clearScroll(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun clearScroll(request: ClearScrollRequest, listener: ActionListener<ClearScrollResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.clearScroll(request, listener) }
    }

    /**
     * {@inheritDoc}
     */
    override fun fieldCaps(request: FieldCapabilitiesRequest): ActionFuture<FieldCapabilitiesResponse> {
        client.threadPool().threadContext.stashContext().use { return client.fieldCaps(request) }
    }

    /**
     * {@inheritDoc}
     */
    override fun fieldCaps(request: FieldCapabilitiesRequest, listener: ActionListener<FieldCapabilitiesResponse>) {
        client.threadPool().threadContext.stashContext().use { return client.fieldCaps(request, listener) }
    }

    /**
     * Executes the given [block] function on this resource and then closes it down correctly whether an exception
     * is thrown or not.
     *
     * In case if the resource is being closed due to an exception occurred in [block], and the closing also fails with an exception,
     * the latter is added to the [suppressed][java.lang.Throwable.addSuppressed] exceptions of the former.
     *
     * @param block a function to process this [AutoCloseable] resource.
     * @return the result of [block] function invoked on this resource.
     */
    @Suppress("TooGenericExceptionCaught")
    private inline fun <T : ThreadContext.StoredContext, R> T.use(block: (T) -> R): R {
        var exception: Throwable? = null
        try {
            return block(this)
        } catch (e: Throwable) {
            exception = e
            throw e
        } finally {
            closeFinally(exception)
        }
    }

    /**
     * Closes this [AutoCloseable], suppressing possible exception or error thrown by [AutoCloseable.close] function when
     * it's being closed due to some other [cause] exception occurred.
     *
     * The suppressed exception is added to the list of suppressed exceptions of [cause] exception.
     */
    @Suppress("TooGenericExceptionCaught")
    private fun ThreadContext.StoredContext.closeFinally(cause: Throwable?) = when (cause) {
        null -> close()
        else -> try {
            close()
        } catch (closeException: Throwable) {
            cause.addSuppressed(closeException)
        }
    }
}
