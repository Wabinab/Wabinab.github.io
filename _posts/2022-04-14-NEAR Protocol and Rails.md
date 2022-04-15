# NEAR Protocol and Rails

(Non-technical summary post on read.cash will be included later when completed). 

While the view functions we can use `near_api` gem, the call function we couldn't. Not only do we need to sign a transaction, we also need to borsh serialize the message before signing, and the RPC could only take a `broadcast_tx` which is a signed transaction. Signing a transaction on the server side is dangerous, we shall reside on the client-side; hence it'll use javascript rather than Ruby. 

First important thing is the login function; because we use the login function from javascript, sending the data via ajax to database is difficult. However, one discovers that after signing in, the parameters are stored in the `params` (i.e. stored on the URL) temporarily; we could cache this (in the future after one learns how
to do that) or send these data to store in the database. Nevertheless, the latter method is what we currently do, but that might be dangerous. Furthermore, it requires an extra button to call the save method, posting to the database; as one button can only do one thing. 
Of course it's not viable in the short term, though we learn a lot from it. 

For posting, just use a form with `hidden_fields` equals to `params[:variable_name]`, then finally have a model that will do the creation. If it's already created, update the internal values. Here, we have the `public_key` and `all_keys`. The latter is dangerous to store on the database; though it only allow 0.25 NEAR, but it's 
still a lot considering many people using our program. 

### Unsolved Problem
Usually, `redirect_to @user` would bring you to say `/users/:id` (replace `:id` with the id number; it's a variable); but ours it brought to `/user.:id`, which is obviously wrong. One cannot solve this problem except to rewrite the function `user_url` to handle it manually. 
It may be one's computer problem; hopefully it's not a global problem. 

(To be completed). 
