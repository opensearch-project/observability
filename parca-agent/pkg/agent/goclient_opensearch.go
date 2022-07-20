package agent

import (
	"bytes"
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/google/pprof/profile"
	"github.com/joho/godotenv"
	opensearch "github.com/opensearch-project/opensearch-go"
	opensearchapi "github.com/opensearch-project/opensearch-go/opensearchapi"
)

var IsInsecure = false
var GlobalStoreAddress = ""
var OpenSearchClient *opensearch.Client

const IndexName = "parca_agent_profile"

type OpenSearchPprof struct {
	Name       string `json:"name"`
	Value      string `json:"value"`
	Periodtype string `json:"periodtype"`
	Period     int64  `json:"period"`
	Time       int64  `json:"time"`
	Duration   string `json:"duration"`
	Samples    string `json:"samples"`
	Locations  string `json:"locations"`
	Mappings   string `json:"mappings"`
	Functions  string `json:"functions"`
}

func GoCreateClient(theStoreAddress string) {
	//check if it starts with http or https and then append if not there
	if theStoreAddress[0:1] == "h" {
		GlobalStoreAddress = theStoreAddress
	} else {
		GlobalStoreAddress = "http://" + theStoreAddress
	}

	//Load the Username and Password
	err := godotenv.Load(".env")
	if err == nil {
		log.Print("Reading from .env file\n")
	}

	OpenSearchClient, err = opensearch.NewClient(opensearch.Config{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: IsInsecure},
		},
		Addresses: []string{GlobalStoreAddress},
		Username:  os.Getenv("OPENSEARCH_USERNAME"),
		Password:  os.Getenv("OPENSEARCH_PASSWORD"),
	})

	if err != nil {
		log.Fatalf("Error creating the OpenSearch client")
	}

	// Define index mapping.
	mapping := strings.NewReader(`{
		"mappings": {
			"properties": {
				"name": { "type" : "keyword" },
				"value": { "type" : "keyword" },
				"periodtype": { "type" : "keyword" },
				"period": { "type" : "integer" },
				"time": { "type" : "date" },
				"duration": { "type" : "float" },
				"samples": { "type" : "keyword"},
				"locations": { "type" : "keyword" },
				"mappings": { "type" : "keyword" },
				"functions": { "type" : "keyword" }
			}
		}
	}`)

	resp, _ := opensearchapi.IndicesExistsRequest{
		Index: []string{IndexName},
	}.Do(context.Background(), OpenSearchClient)
	//If status code is 404 then it does not exist already
	if resp.StatusCode == 404 {
		req := opensearchapi.IndicesCreateRequest{
			Index: IndexName,
			Body:  mapping,
		}
		res, err := req.Do(context.Background(), OpenSearchClient)
		fmt.Println("creating index", res)
		if err != nil {
			log.Fatalf("failed to create index")
		}
	}
}

func GoClientWrite(key string, value string, prof *profile.Profile) error {
	openSearchPprof := OpenSearchPprof{
		key,
		value,
		"",
		prof.Period,
		prof.TimeNanos / 1000000, //To convert time from nanos
		fmt.Sprintf("%.4v", time.Duration(prof.DurationNanos)),
		fmt.Sprintf("%s", prof.Sample),
		fmt.Sprintf("%s", prof.Location),
		fmt.Sprintf("%s", prof.Mapping),
		fmt.Sprintf("%s", prof.Function),
	}

	if pt := prof.PeriodType; pt != nil {
		openSearchPprof.Periodtype = fmt.Sprintf("%s %s", pt.Type, pt.Unit)
	}

	finalJson, err := json.MarshalIndent(openSearchPprof, "", "\t")
	if err != nil {
		panic(err)
	}
	log.Printf("%s\n", finalJson)

	//Add a document to the index.
	document := bytes.NewReader(finalJson)

	req := opensearchapi.IndexRequest{
		Index: IndexName,
		Body:  document,
	}
	insertResponse, err := req.Do(context.Background(), OpenSearchClient)

	if err != nil {
		log.Fatal(insertResponse)
	}
	return err
}
