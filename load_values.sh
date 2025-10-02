# sh parse_html_to_json.sh "https://www.vincent-luciani.com/javascript-tutorial/" | \
# curl -s -X POST "http://localhost:9200/_bulk" -H 'Content-Type: application/json' --data-binary @-


sh parse_html_to_json.sh "https://www.vincent-luciani.com/javascript-tutorial/" 


# Get 10 documents
#curl -s 'http://localhost:9200/us/_search?size=10' | jq '.hits.hits[]._source'

# Or count total documents
curl -s 'http://localhost:9200/us/_count' | jq '.count'

