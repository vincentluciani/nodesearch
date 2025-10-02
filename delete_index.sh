curl -X POST http://localhost:9200/us/_delete_by_query \
  -H 'Content-Type: application/json' \
  -d '{"query": {"match_all": {}}}'
