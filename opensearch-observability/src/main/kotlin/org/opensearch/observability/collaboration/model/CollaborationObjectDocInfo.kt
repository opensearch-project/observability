package org.opensearch.observability.collaboration.model

import org.opensearch.index.seqno.SequenceNumbers

/**
 * Class for storing the collaboration object document with document properties.
 */
data class CollaborationObjectDocInfo(
    val id: String? = null,
    val version: Long = -1L,
    val seqNo: Long = SequenceNumbers.UNASSIGNED_SEQ_NO,
    val primaryTerm: Long = SequenceNumbers.UNASSIGNED_PRIMARY_TERM,
    val collaborationObjectDoc: CollaborationObjectDoc
)
