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

Though you can add css bootstrap to current files, it might fail. As one did, it fails with `yarn build:css` NoMethodError. And one couldn't solve it properly, hence rebuilding from start is the best method. 

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



