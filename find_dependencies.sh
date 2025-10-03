#!/bin/bash
# find-deps.sh - detect missing dependencies from source code

# 1. Scan JS/TS files for require/import
deps=$(grep -RhoE "require\(['\"][^'\"]+['\"]\)|from ['\"][^'\"]+['\"]" . \
  | sed -E "s/require\(['\"]([^'\"]+)['\"]\)/\1/; s/from ['\"]([^'\"]+)['\"]/\1/" \
  | grep -vE "^(\.|/)" \
  | sort -u)

# 2. Show detected deps
echo "🔍 Detected external dependencies in source code:"
echo "$deps"
echo

# 3. Compare with existing package.json (if it exists)
if [ -f package.json ]; then
  echo "📦 Already in package.json:"
  jq -r '.dependencies? // {} | keys[]' package.json
  echo

  #missing=$(comm -23 <(echo "$deps") <(jq -r '.dependencies? // {} | keys[]' package.json | sort))
    # 3. Compare with existing package.json (if it exists)
    missing=""
    if [ -f package.json ]; then
    echo "📦 Already in package.json:"
    jq -r '.dependencies? // {} | keys[]' package.json | sort
    echo

    for dep in $deps; do
        if ! jq -r '.dependencies? // {} | keys[]' package.json | grep -qx "$dep"; then
        missing="$missing $dep"
        fi
    done
    else
    echo "⚠️ No package.json found, assuming everything is missing."
    missing=$deps
    fi

  #rm -f "$deps_file" "$pkg_file"
else
  echo "⚠️ No package.json found, assuming everything is missing."
  missing=$deps
fi

# 4. Print npm install command
if [ -n "$missing" ]; then
  echo "🚀 To install missing dependencies, run:"
  echo "npm install --save $missing"
else
  echo "✅ No missing dependencies found!"
fi
