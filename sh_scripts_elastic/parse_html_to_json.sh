#!/bin/bash

# Usage: ./load_values_complete.sh <url_of_html_page>
URL="$1"
ES_HOST=${ES_HOST:-http://localhost:9200}
INDEX=${INDEX:-vince}

if [ -z "$URL" ]; then
  echo "Usage: $0 <url_of_html_page>"
  exit 1
fi

# Extract category from URL
CATEGORY=$(echo "$URL" | sed -E 's|https?://[^/]+/([^/]+)/.*|\1|')

# Download HTML
HTML_FILE=$(mktemp)
curl -s "$URL" -o "$HTML_FILE"

# Temp file for bulk data
BULK_FILE=$(mktemp)

# Loop over each table inside #contenttext
TABLE_COUNT=$(xmllint --html --xpath 'count(//*[@id="contenttext"]//table)' "$HTML_FILE" 2>/dev/null)

for i in $(seq 1 $TABLE_COUNT); do
    # Get subcategory for this table
    SUBCATEGORY=$(xmllint --html --xpath "string(//*[@id='contenttext']//table[$i]/preceding::h2[1])" "$HTML_FILE" 2>/dev/null | xargs)

    # Extract rows for this table
    ROW_COUNT=$(xmllint --html --xpath "count(//*[@id='contenttext']//table[$i]//tr)" "$HTML_FILE" 2>/dev/null)

    for j in $(seq 1 $ROW_COUNT); do
        # Extract question
        question=$(xmllint --html --xpath "string(//*[@id='contenttext']//table[$i]//tr[$j]/td[1])" "$HTML_FILE" 2>/dev/null | sed 's/<br\s*\/?>/\\n/g')
        # Extract answer
        answer=$(xmllint --html --xpath "string(//*[@id='contenttext']//table[$i]//tr[$j]/td[2])" "$HTML_FILE" 2>/dev/null | sed 's/<br\s*\/?>/\\n/g')

        [ -z "$question" ] && continue

        # Safely escape question and answer for JSON
        ESCAPED_QUESTION=$(jq -R <<< "$question")
        ESCAPED_ANSWER=$(jq -R <<< "$answer")

        # Append to bulk file
        echo "{\"index\":{\"_index\":\"$INDEX\"}}" >> "$BULK_FILE"
        echo "{\"question\":$ESCAPED_QUESTION,\"answer\":$ESCAPED_ANSWER,\"category\":\"$CATEGORY\",\"subCategory\":\"$SUBCATEGORY\"}" >> "$BULK_FILE"
    done
done

# Ensure final newline
echo "" >> "$BULK_FILE"
head 100 "$BULK_FILE"
tail 100 "$BULK_FILE"


# Send to Elasticsearch
curl -s -X POST "$ES_HOST/_bulk" -H 'Content-Type: application/json' --data-binary @"$BULK_FILE"

# Clean up
rm "$HTML_FILE" "$BULK_FILE"
