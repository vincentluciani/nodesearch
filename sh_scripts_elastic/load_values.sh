# sh parse_html_to_json.sh "https://www.vincent-luciani.com/javascript-tutorial/" | \
# curl -s -X POST "http://localhost:9200/_bulk" -H 'Content-Type: application/json' --data-binary @-


sh parse_html_to_json.sh "https://www.vincent-luciani.com/javascript-tutorial/" 
sh parse_html_to_json.sh "https://www.vincent-luciani.com/python-tutorial/" 
sh parse_html_to_json.sh "https://www.vincent-luciani.com/java-tutorial//" 
sh parse_html_to_json.sh "https://www.vincent-luciani.com/sql-tutorial/" 
sh parse_html_to_json.sh "https://www.vincent-luciani.com/php-tutorial/" 

# Get 10 documents
#curl -s 'http://localhost:9200/us/_search?size=10' | jq '.hits.hits[]._source'

# Or count total documents
curl -s 'http://localhost:9200/vince/_count' | jq '.count'

