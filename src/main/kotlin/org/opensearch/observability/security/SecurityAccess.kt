/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.security

import org.opensearch.secure_sm.AccessController
import java.util.function.Supplier

/**
 * Class for providing the elevated permission for the function call.
 * Ref:
 * https://www.elastic.co/guide/en/elasticsearch/plugins/current/plugin-authors.html#_java_security_permissions
 */
internal object SecurityAccess {
    /**
     * Execute the operation in privileged mode.
     */
    @Throws(Exception::class)
    fun <T> doPrivileged(operation: Supplier<T>): T {
        return AccessController.doPrivileged(operation)
    }
}
