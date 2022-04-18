# NEAR Protocol and Rails

(Non-technical summary post on read.cash will be included later when completed). 

(This article will never be completed. As we learn, we add more stuffs. If it gets stuffed with too many lines, we'll move them to another post). 

While the view functions we can use `near_api` gem, the call function we couldn't. Not only do we need to sign a transaction, we also need to borsh serialize the message before signing, and the RPC could only take a `broadcast_tx` which is a signed transaction. Signing a transaction on the server side is dangerous, we shall reside on the client-side; hence it'll use javascript rather than Ruby. 

First important thing is the login function; because we use the login function from javascript, sending the data via ajax to database is difficult. However, one discovers that after signing in, the parameters are stored in the `params` (i.e. stored on the URL) temporarily; we could cache this (in the future after one learns how
to do that) or send these data to store in the database. Nevertheless, the latter method is what we currently do, but that might be dangerous. Furthermore, it requires an extra button to call the save method, posting to the database; as one button can only do one thing. 
Of course it's not viable in the short term, though we learn a lot from it. 

For posting, just use a form with `hidden_fields` equals to `params[:variable_name]`, then finally have a model that will do the creation. If it's already created, update the internal values. Here, we have the `public_key` and `all_keys`. The latter is dangerous to store on the database; though it only allow 0.25 NEAR, but it's 
still a lot considering many people using our program. 

### Unsolved Problem
Usually, `redirect_to @user` would bring you to say `/users/:id` (replace `:id` with the id number; it's a variable); but ours it brought to `/user.:id`, which is obviously wrong. One cannot solve this problem except to rewrite the function `user_url` to handle it manually. 
It may be one's computer problem; hopefully it's not a global problem. 

## 15 April 2022

After one deletes the static pages controller, some stuffs get resetted - especially the routes. We need to ensure that GET and POST can run on the routes. 

When updating to Heroku, javascript initially cannot run. What we need is set in `config/environments/production.rb`: 

```ruby
config.assets.compile = true
```

By default, this is false because it impacts performance. 

Another thing is ensure that you have this:

```ruby
def new
  @user = User.new
end
```

in `UsersController` (which we deleted earlier as heroku fails to compile). That time it's because of other reasons, and the logfile incorrectly direct us to this reason. Hence, we just add it back to ensure it runs. 

There's a master key that gets created when you first create the Rails app. It's in .gitignore, so you can't recover it. Make sure to copy it and save it properly: it might be useful next time when you need running some stuffs. Together with the confidentials.env.yml (is it that name, can't remember, starts with "c")

(Ahh too much stuffs to write my brain can't remember everything). Will write again when one can remember something. 

## 18 April 2022
Currently we have everything in Javascript itself. We could have move some stuffs to js.erb files; but one doubt that could be put inside helper folder (one haven't try, but you can try); and one doubt we could make multiple functions inside one js.erb file. Hence, unless required (e.g. too many args to pass into one-liner `javascript:function_name(*args)`, we won't do that; it makes things more complicated. 

Another thing is, in the current project, we manually define specific `id` for the input field, then we use `document.getElementById(...).value` to fetch them. **Actually, `form_with` already define an `id` for us, so we could just use that `id` instead of self-defining one**. So that's another change we will make next time. 

Third, js.erb is used in controllers, [explained by Joel Christiansen here](https://joelc.io/ajax-ruby-on-rails-forms); we don't know if we could move it to the helper. It really needs multiple function, and the logic should be in helper, not in controller. 