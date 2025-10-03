    #!/bin/bash
        curl -X PUT 'http://localhost:9200/vince' -H 'Content-Type: application/json' -d '
        {
          "settings": {
            "analysis": {
              "analyzer": {
                "my_analyzer": {"tokenizer": "my_tokenizer"},
                "simple_analyzer": {"tokenizer":"standard","filter":["synonym","stemmer","uppercase","my_custom_stop_words_filter"]}
              },
              "tokenizer": {
                "my_tokenizer": {"type": "ngram","min_gram":3,"max_gram":3,"token_chars":["letter","digit"]}
              },
              "filter": {
                "my_custom_stop_words_filter": {"type":"stop","ignore_case":true,"stopwords":["a","is","the"]},
                "synonym": {"type":"synonym","lenient":true,"synonyms":["remove,delete","change,modify"]}
              }
            }
          },
          "mappings": {
            "properties": {
              "category": {"type": "keyword"},
              "subCategory": {"type": "keyword"},
              "question": {"type": "text", "analyzer":"simple_analyzer"},
              "answer": {"type": "text", "analyzer":"simple_analyzer"}
            }
          }
        }'
    
