One am working on learning Ruby on Rails currently, and there are some problems that are met. This post serves as a diary to conclude what errors are being made, and how they are solved. We might or might not include the thought process of solving them, and they might or might not include the only method to solve, and some might or might not be necessary to solve the problem. 

### Syntax error: expecting do or '{' or '('
This happens in the `article.rb`. Originally we have the code: 

```ruby
class Article < ApplicationRecord
  validates :title, presence :title, length: {minimum: 5}
end
```

And it gives error. However, the question is solved [here in this article](https://stackoverflow.com/questions/59519945/ruby-on-rails-syntax-error-unexpected-tsymbeg-expecting-do-or-or). Particularly, the colon before **true** must **stick to presence rather than stick to true**, `presence: true` than `presence :true`. 

### Destroy not working
The first thing after the CRUD, we have the Destroy link not working. Particularly, we tried quite a number of stuffs, especially we make comparison with the `rails generate scaffold ...` and copy and paste one by one and see what they gives. 

We changed things in the `articles_controller.rb` to support json file for `delete` and `create` but to no avail. The thing still doesn't change much. Finally, only when we changed our `show.html.erb` file to some other things then only it's solved. Particularly, we moved the destroy outside into their own dividers rather than inside the list. 

Before:
```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Destroy", @article , 
                        method: :delete, 
                        data: { confirm: 'Are you sure?' } %></li>
  <li><%= link_to "Home", root_path %></li>
</ul>
```

After:
```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Home", root_path %></li>
</ul>

<div>
<%= button_to "Destroy", @article , 
                        method: :delete, 
                        data: { confirm: 'Are you sure?' } %>
</div>
```

Violà it works! **Though a caveat**, even the `scaffold` generated does not show the `confirm` part (no pop-up, no confirmation being displayed), so that part one doesn't know what happens with it. It might be due to OS, installation problem, or some other thing. 

And why it works when moving out of the list? One have no idea. It just works. You could also try to use `link_to` instead of `button_to` in the latter ones, it might work as well, one aren't sure about that. Basically it looks more like just how to display it. You can also use `button_to` in the non-working ones, and it also display a button, and it still doesn't work until you move it out. 

### Where do partials go
the `.html.erb` files don't necessarily always go into the same folder, but they are in the same **grandparent folder**. So for example, comments don't go into the usual article folder, but they go into the comments folder. And also check whether the naming is correct, particularly add or remove an 's' from the erb file. 

## Cannot add or delete comments
There are nothing specific arises, but if you check the log of `rails server`, you found 404 not found. 

Particularly, that's because we have some errors (not the tutorial, but when one type it in) with `app/controllers/comments_controller.rb`). 

Instead of this: 

```ruby
@article = Article.find(params[:article_id])
```

we have this: 
```ruby
@article = Article.find(params[:id])
```

We need to fetch in the correct id for it to work. Or else, we cannot delete or create. 

## Bootstrap
Bootstrap is different from Rails 6. First, you need ruby v3 which cannot be installed with normal sudo, but requires rvm to do the work. If you type `rvm use ruby-3.0.3` it will tell you the command to. Then, you can continue with [this video](https://www.youtube.com/watch?v=uiLAPHPdAis) for tutorial. 

Though you can add css bootstrap to current files, it might fail. As one did, it fails with `yarn build:css` NoMethodError. So there are two ways to solve the problem: one is rebuilding from the beginning using `rails new name_of_project --css=bootstrap`, another being manually add the `build:css` function to `package.json`. The command will require you to run `rails new some_name --css=bootstrap`, copy the package.json build:css command from there, delete that project, then paste to the package.json you have. (As of rails v7.0.2.3). In the future, this might not require if they discover the bug and fix it. 

**The former is using Turbo, the latter uses importmap. So that's the difference.**

If you are looking at Michael Hartl v6 tutorial (not the most current, but the book from archive which is quite old), there are some problem with the bootstrap. Specifically, the bootstrap I think it changes, so some classes no longer available. For example this: 

```erb
    <header class="navbar navbar-fixed-top navbar-inverse">
      <div class="container">
        <%= link_to "sample_app", '#', id: "logo" %>
        <nav>
          <ul class="nav navbar-nav navbar-right me-auto mb-2 mb-lg-0"> 
            <li class="nav-item"><%= link_to "Home",    '#' %></li>
            <li class="nav-item"><%= link_to "Help",    '#' %></li>
            <li class="nav-item"><%= link_to "Log in",  '#' %></li>
          </ul>
        </nav>
      </div>
    </header>
```

This no longer works. First, `navbar-inverse` is not even a class anymore, it's replaced with `navbar-dark bg-dark`. Etc. When one complete the migration one will make changes here (which one haven't yet). **One guesses its Bootstrap 4 above, and we require updating to Bootstrap 5**, hence class changes. 

```erb
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <%= link_to"sample_app", '#', class: "navbar-brand", id: "logo" %>

    <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
      <ul class="nav navbar-nav navbar-right me-auto mb-2 mb-lg-0"> 
        <li class="nav-item"><%= link_to "Home",    '#', class: "nav-link active"%></li>
        <li class="nav-item"><%= link_to "Help",    '#', class: "nav-link active" %></li>
        <li class="nav-item"><%= link_to "Log in",  '#', class: "nav-link active" %></li>
      </ul>
    </div>
  </div>
</nav>
```

## ERb requires class before id
Make sure to put class before id when using ERb. Let's see an example:

```erb
<%= link_to"sample_app", '#', class: "navbar-brand", id: "logo" %>
```

will work, but if you go the other way round, it won't. Compilation will fail (at least that's what one encounters. If it changes in the future, please do tell me, thanks!)

## SCSS coloring
Because we want the container to have a gray background, we made a CSS for it in the `application.bootstrap.scss`. However, one tested it and doesn't work. (The test is not extensive, it may be one inserting the wrong command, because css requires rebuilding with a series of commands which one tested in parallel and only come to conclusion at the end of testing this too, so that may be a reason why it doesn't built). 

**The solution being put in another scss file and import it into `application.bootstrap.scss`**. 

Another being the background color, we couldn't use common colors like `white`, `orange`, it doesn't seem to work. It may be because one put the `!important` tag, but it may be not. Whatever the reason is, **the solution is to use `background-color: rgba(128, 128, 128, 0.1) !important;`** that kind of definition for example, example for light-gray background. 

## Wrong migration?
We did something wrong. Migration of database done on heroku, then we realize upload wrong, requires remigration. However, one of the migration is a conflicting migration we need to delete. If we don't, we have to push to heroku, rollback, then change branch re-push to heroku, then migrate up again. Ok with that? 

If not, another way is to destroy the database (it may work with reset, one don't know) by going to your heroku webpage, then click on app name, check for postgresql, open it up in new page, destroy database. After destroy, recreate it. Then, run `heroku run rails db:migrate`. Voilà! 

---
## Styling `link_to`
When you loop through a `link_to`, you can add the class there, and everything that's wrap inside don't need manual declaration of class. For the CSS, you can just make one single class. 

```scss
.article {
  color: #000;
  text-decoration: none;
  
  div {
    background-color: #eee;
  }
  
  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  
  li {
    border: 1px solid green;
    background-color: rgba(127, 127, 127, 0.075) !important;
    border-right: -3em;
    
    &:hover {
      background-color: rgba(250, 190, 88, 0.35) !important;
    }
  }
}
```

Note there are some we put at the top-level scss. These are those that make changes to the `link_to` directly. Previously if you're in `a`, you would put it in there, but that cannot change `link_to` directly. **Every single class inside will be overwritten with `link_to` class, wherever it wraps till the "end" tag**. If you define another class for say the `p` element, it won't work. You must put the `p` related to `article` for it to work. 

Then the ERb:
```erb
<%= link_to article[:target], class: "article" do %>
  <ul>
    <li>
      <h4><%= article[:title] %></h4>
      <p><%= article[:explanation] %></p>
    </li>
  </ul>
<% end %>
```

## Turbo Error with Forms
There's an error with forms discussed here: [https://github.com/hotwired/turbo-rails/issues/12](https://github.com/hotwired/turbo-rails/issues/12). However, the method discuss there does work when we have an errors and use `render 'new'` with a POST request. However, it fails if we want to `redirect_to @user` page because it's a GET request instead. What we need is to deactivate turbo. The solution is [here](https://stackoverflow.com/questions/70400958/error-form-responses-must-redirect-to-another-location)

Just change your form: 

```erb
<%= form_with model: @user, local: true, data: { turbo: false } do |f| %>
...
<% end %>
```

Note the `turbo: false` part. 

## `has-error` bootstrap
That has deprecated on v3; so we know that the course one is looking at is using Bootstrap v3. Rather, now we don't need to override the `.field_with_errors` anymore for `.has-error`. 

Anyways; we don't need to anything; plus it uses `.is-invalid` nowadays and there are `form-control.is-invalid` already in place for red text. No override is needed. 

## Integration test error
The usual integration test `assert_difference` (and `assert_no_difference`) have this:

```ruby
post users_path, params: { user: ...} 
```

Problem is the comma between `users_path` and `params`. Upon removal of that comma, things works! 

## Database postgresql production error
If you follow M Hartl book, there they determine the database with some name; however that's not true; we also don't have the specific environment variable as such, only one DATABASE_URL. Hence, we need to extract data into that. 

First, in `config`, we create `config/database_helper.rb` and include the following class: 

```ruby
class String
  def string_between marker1, marker2
    self[/#{Regexp.escape(marker1)}(.*?)#{Regexp.escape(marker2)}/m, 1]
  end
end
```

This is use for string extraction. Then, in the `config/database.yml`, add the following: 

```yaml
<% require_relative 'database_helper' %>

...

production:
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  database: <%= ENV['DATABASE_URL'].split('/').last %>
  username: <%= ENV['DATABASE_URL'].string_between("postgres://", ":") %> 
  password: <%= ENV['DATABASE_URL'].string_between(":", "@").partition(":").last %>
```

This allow us to connect to the correct database, not hanging around hence **having some 500 Internal Server Error that doesn't explain itself** (which is actually due to connection with database not established). 

