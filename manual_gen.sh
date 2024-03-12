#!/bin/bash
mv ./assets/articles.json ./
mv ./assets/categories.json ./
mv ./assets/categories_file.json ./
for changed_file in assets/articles/*; do
  echo "Changed file: ${changed_file}"
  filename=$(basename -- ${changed_file})
  title=$(head -n1 ${changed_file})
  title=$(echo "${title//#}" | awk '{$1=$1};1' | sed 's/\r$//')

  value=$(pandoc -f markdown -t plain <(sed -n -e '4,10p' ${changed_file}))
  value="${value//$'\n'/ }"
  arr=($value)
  value="${arr[@]:0:32}"

  tmp=$(mktemp)
  jq -r --arg j "$filename" --arg k "$title" --arg v "$value" '.[$j] = {($k):$v}' articles.json > "$tmp" && mv "$tmp" articles.json

  # Categories
  # Delete From cat-based index (based on saved-data from file-based index)
  c=$(jq --arg k $filename '.[$k]' categories_file.json)
  if [[ $c != null ]]
  then
    # NOT NULL
    d=$(jq -r --arg k $filename '.[$k][]' categories_file.json)
    carr=($d)
    for item in "${carr[@]}" 
    do 
      jq --arg k $item --arg v $filename '.[$k] -= [$v]' categories.json > "$tmp" && mv "$tmp" categories.json
    done
  fi

  # Then Add to cat-based index
  # Together, update file based index in one go. 
  c=$(sed -n -e '2p' ${changed_file} | sed 's/\r$//')
  categories=($c)
  jq --arg k $filename '.[$k] = []' categories_file.json > "$tmp" && mv "$tmp" categories_file.json
  for item in "${categories[@]}" 
  do
    jq --arg k $item --arg v $filename '.[$k] += [$v]' categories.json > "$tmp" && mv "$tmp" categories.json
    jq --arg k $filename --arg v $item '.[$k] += [$v]' categories_file.json > "$tmp" && mv "$tmp" categories_file.json
  done
done 

# Categories.json, unlike the other two, might have empty array. Remove them. 
jq 'with_entries(select(.value != []))' categories.json > "$tmp" && mv "$tmp" categories.json

mv ./articles.json ./assets
mv ./categories.json ./assets
mv ./categories_file.json ./assets