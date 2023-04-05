package org.opensearch.integrations

import com.google.gson.JsonObject
import com.google.gson.JsonParser

fun jsonify(text: String): JsonObject {
    return JsonParser.parseString(text).asJsonObject
}
