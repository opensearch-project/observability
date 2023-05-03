/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.model

import org.opensearch.common.io.stream.Writeable
import org.opensearch.core.xcontent.ToXContent

/**
 * interface for representing objects.
 */
interface BaseModel : Writeable, ToXContent
