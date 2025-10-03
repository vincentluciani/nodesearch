

ES_HOST=${ES_HOST:-http://localhost:9200}

echo "Checking Elasticsearch connection..."
curl -s "$ES_HOST" | jq .

echo
echo "=== Index settings for 'vince' ==="
curl -s "$ES_HOST/vince/_settings" | jq .

echo
echo "=== Index mappings for 'vince' ==="
curl -s "$ES_HOST/vince/_mapping" | jq .

echo
echo "=== Analyzer test: analyze 'test text' with simple_analyzer ==="
curl -s -X GET "$ES_HOST/vince/_analyze" -H 'Content-Type: application/json' -d '{
  "analyzer": "simple_analyzer",
  "text": "remove the changes"
}' | jq .
