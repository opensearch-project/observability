/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.zeppelin.notebook.repo;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.zeppelin.conf.ZeppelinConfiguration;
import org.apache.zeppelin.notebook.Note;
import org.apache.zeppelin.notebook.NoteInfo;
import org.apache.zeppelin.user.AuthenticationInfo;
import org.opensearch.ElasticsearchStatusException;
import org.opensearch.action.DocWriteResponse;
import org.opensearch.action.delete.DeleteRequest;
import org.opensearch.action.delete.DeleteResponse;
import org.opensearch.action.get.GetRequest;
import org.opensearch.action.get.GetResponse;
import org.opensearch.action.index.IndexRequest;
import org.opensearch.action.index.IndexResponse;
import org.opensearch.action.search.SearchRequest;
import org.opensearch.action.search.SearchResponse;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestClient;
import org.opensearch.client.RestClientBuilder;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.client.indices.CreateIndexRequest;
import org.opensearch.client.indices.CreateIndexResponse;
import org.opensearch.common.xcontent.XContentType;
import org.opensearch.index.query.QueryBuilders;
import org.opensearch.search.SearchHit;
import org.opensearch.search.SearchHits;
import org.opensearch.search.builder.SearchSourceBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Backend for storing Notebooks on OpenSearch
 */
public class OpenSearchNotebookRepo implements NotebookRepo {
    private static final Logger LOGGER = LoggerFactory.getLogger(OpenSearchNotebookRepo.class);

//

    private RestHighLevelClient OpenSearchClient;
    private String user;
    private String password;
    private String host;
    private Integer port;
    private String protocol;
    private String rootIndex = ".notebooks";
    private ZeppelinConfiguration conf;

    public OpenSearchNotebookRepo() {

    }

    private RestHighLevelClient client() {
      //  Uncomment to add path for ssl keystore and using https client
      //  Discussion on generating keystore with certificate: https://github.com/opendistro-for-elasticsearch/community/issues/64#issuecomment-493258442
      //  System.setProperty("javax.net.ssl.trustStore", "/path/to/keystore/keystore.jks");
        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(user, password));

        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(
                        new HttpHost(host, port, protocol)).setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                    @Override
                    public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
                        return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                    }
                }));
        return client;
    }

    private void CreateNotebooksIndex() throws IOException {
        CreateIndexRequest request = new CreateIndexRequest(rootIndex);
        try {
            CreateIndexResponse createIndexResponse = OpenSearchClient.indices().create(request, RequestOptions.DEFAULT);
        } catch (ElasticsearchStatusException e) {
            if (!e.getMessage().contains("resource_already_exists_exception")) {
                throw e;
            }
        }
    }

    @Override
    public void init(ZeppelinConfiguration conf) throws IOException {
        this.conf = conf;
        // Change Client configuration here
        user = "admin";
        password = "admin";
        host = "localhost";
        port = 9200;
        protocol = "http";
        OpenSearchClient = client();
        CreateNotebooksIndex();
    }


    @Override
    public Map<String, NoteInfo> list(AuthenticationInfo subject) throws IOException {
        Map<String, NoteInfo> notesInfo = new HashMap<>();
        SearchRequest searchRequest = new SearchRequest(rootIndex);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = OpenSearchClient.search(searchRequest, RequestOptions.DEFAULT);

        SearchHits hits = searchResponse.getHits();

        if (hits.getHits().length>0) {
            SearchHit[] searchHits = hits.getHits();
            for (SearchHit hit : searchHits) {
                Map<String, Object> noteJson = hit.getSourceAsMap();
                NoteInfo noteInfo = new NoteInfo(noteJson.get("id").toString(), noteJson.get("path").toString());
                notesInfo.put(noteJson.get("id").toString(), noteInfo);
            }
        }
        return notesInfo;
    }


    @Override
    public Note get(String noteId, String notePath, AuthenticationInfo subject) throws IOException {
        GetRequest getRequest = new GetRequest(rootIndex, noteId);
        GetResponse getResponse = OpenSearchClient.get(getRequest, RequestOptions.DEFAULT);
        if (getResponse.isExists()) {
            String json = getResponse.getSourceAsString();
            return Note.fromJson(json);
        } else {
            throw new IOException("Note '" + noteId + "' in path '" + notePath + "'not found in OpenSearch");
        }
    }

    @Override
    public void save(Note note, AuthenticationInfo subject) throws IOException {
        // TODO: Other NotebookRepos deal with File paths as a separate kept entity
        // They don't store path in the notebook itself
        // Here, we merge path as a notebook property
        // In the later release we need to decouple this to support folder structures

        JsonObject json = new JsonParser().parse(note.toJson()).getAsJsonObject();
        json.addProperty("path",note.getPath());
        try {
            IndexRequest request = new IndexRequest(rootIndex);
            request.id(note.getId());
            request.source(json.toString(), XContentType.JSON);
            IndexResponse indexResponse = OpenSearchClient.index(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new IOException("Fail to store note: " + note.getPath() + " in OpenSearch", e);
        }
    }

    @Override
    public void move(String noteId, String notePath, String newNotePath,
                     AuthenticationInfo subject) throws IOException {
        LOGGER.warn("Method not implemented");
    }

    @Override
    public void move(String folderPath, String newFolderPath, AuthenticationInfo subject) throws IOException {
        LOGGER.warn("Method not implemented");
    }

    @Override
    public void remove(String noteId, String notePath, AuthenticationInfo subject)
            throws IOException {
        DeleteRequest request = new DeleteRequest(rootIndex, noteId);
        DeleteResponse deleteResponse = OpenSearchClient.delete(request, RequestOptions.DEFAULT);
        if (deleteResponse.getResult() != DocWriteResponse.Result.NOT_FOUND) {
            System.out.println(deleteResponse.toString());
        } else {
            throw new IOException("Note '" + noteId + "' in path '" + notePath + "'cannot be deleted");
        }
    }

    @Override
    public void remove(String folderPath, AuthenticationInfo subject) throws IOException {
        LOGGER.warn("Method not implemented");
    }

    @Override
    public void close() {
        try {
            OpenSearchClient.close();
        } catch (IOException exception) {
            exception.printStackTrace();
        }

    }

    @Override
    public List<NotebookRepoSettingsInfo> getSettings(AuthenticationInfo subject) {
        LOGGER.warn("Method not implemented");
        return Collections.emptyList();
    }

    @Override
    public void updateSettings(Map<String, String> settings, AuthenticationInfo subject) {
        LOGGER.warn("Method not implemented");
    }

}

