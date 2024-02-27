# Postgresql With Rails
technology

As usual, this is just a diary of what problems being encountered during the process. 

## Using Trigram in `pg_search` gem. 
As mentioned, we need a `pg_trgm` in `pg_search` gem. The problem is with [this article](https://pganalyze.com/blog/similarity-in-postgres-and-ruby-on-rails-using-trigrams), which misled me to enable the extension in the same gem. 

**Ultimately, make another migration that specifically create this extension. 

```bash
rails generate migration AddPgTrgmExtensionToDB
```

```rb
class AddPgTrgmExtensionToDb < ActiveRecord::Migration[7.0]
  def change
    enable_extension :pg_trgm 
  end
end
```

after you've created the database (not sure about before, though, didn't try). Refer to [this older article](https://www.sitepoint.com/awesome-autocomplete-trigram-search-in-rails-and-postgresql/) (which have outdated rails, but generally the flow and steps still works quite well!)

And additionally, don't use own method when `pg_search` gem is available, like in that article. 

Then of course, you can add gin search index (or maybe gist) such mentioned in [the first article](https://pganalyze.com/blog/similarity-in-postgres-and-ruby-on-rails-using-trigrams). For whether to use GIN or GiST, [check the postgresql article out](https://postgrespro.com/docs/postgresql/9.4/textsearch-indexes). 
