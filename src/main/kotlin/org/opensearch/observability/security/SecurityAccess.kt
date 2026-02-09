/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.security

import org.opensearch.secure_sm.AccessController

/**
 * Class for providing the elevated permission for the function call.
 */
internal object SecurityAccess {
    /**
     * Execute the operation in privileged mode.
     */
    @Throws(Exception::class)
    fun <T> doPrivileged(operation: AccessController.CheckedSupplier<T, Exception>): T = AccessController.doPrivilegedChecked(operation)
}
