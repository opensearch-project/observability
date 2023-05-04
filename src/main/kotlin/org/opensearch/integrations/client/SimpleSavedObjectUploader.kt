package org.opensearch.integrations.client

import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

class SimpleSavedObjectUploader {
    fun upload(ndjson: String) {
        val url = URL("http://localhost:5601/api/saved_objects/_import?overwrite=true")
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "POST"
        connection.setRequestProperty("osd-xsrf", "true")
        connection.doOutput = true

        val boundary = "===" + System.currentTimeMillis() + "==="
        connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary)

        val outputStream = DataOutputStream(connection.outputStream)
        outputStream.writeBytes("--$boundary\r\n")
        outputStream.writeBytes("Content-Disposition: form-data; name=\"file\"; filename=\"sso-logs-dashboard.ndjson\"\r\n")
        outputStream.writeBytes("\r\n")

        val fileBytes = ndjson.toByteArray(Charsets.UTF_8)
        outputStream.write(fileBytes, 0, fileBytes.size)

        outputStream.writeBytes("\r\n")
        outputStream.writeBytes("--$boundary--\r\n")
        outputStream.flush()
        outputStream.close()

        val responseCode = connection.responseCode
        if (responseCode == HttpURLConnection.HTTP_OK) {
            val inputStream = BufferedReader(InputStreamReader(connection.inputStream))
            var inputLine: String?
            val response = StringBuffer()
            while (inputStream.readLine().also { inputLine = it } != null) {
                response.append(inputLine)
            }
            inputStream.close()
            println(response.toString())
        } else {
            println("Error: ${connection.responseMessage}")
        }
        connection.disconnect()
    }
}