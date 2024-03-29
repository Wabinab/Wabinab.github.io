# NEAR Protocol and Rails
technology

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

If there are anything we could **benefit from js.erb, it's login feature**. Currently, login is actually a signup button which "login" in your browser, then requires clicking another button to save them to database. Perhaps with js.erb, we could 
perform these two actions in a single click! It calls Rails to call the js.erb file; then do preprocessing afterwards. 
We might have a separate controller for login, which may or may not be redundant; but we don't know until we experiment with it. 

## 24 April 2022
**Again! Check your routes!** We thought "get" always goes to `index`, but that's not true. Here, we want to get `new` as we want to mint something. We make a changes without properly testing it, so it starts failing in Heroku; **(worse,) we don't even notice it also fails locally!** 

Unfortunately, we haven't get the .js.erb to work yet. Perhaps try play with Josh C example, then slowly expand to some basic functions in custom.js, before we can further check how to expand again. 

## 25 April 2022
Redirection fails because we use singular instead of plurals. So this is the cause: 

In routes.rb

```ruby
get 'user', to: ...
post 'user', to: ...
```

supposed be `users` not `user` (plural not singular). 

Also for cards, make sure to `flex-wrap` so it can wrap around. 

## Javascript Controller with Stimulus
Finally, we found out that js.erb deprecated in Rails 7 (in fact, it's deactivated due to security issues) in favor of Hotwire Stimulus, with Javascript Controller, directly from `app/javascript/controllers`. For examples, check [this article out](https://dev.to/bhumi/stimulus-rails-7-tutorial-5a6a). Also, check [ones' updated article about this issue](https://read.cash/@wabinab/update-on-near-api-js-with-rails-9e0124c8). 


---

# Encryption and Decryption
Without worrying about near-sdk-rs (which the library might be included but we can just make it explicit), here is how we encrypt and decrypt. 

First, we generate the RSA public and private key, saving the private key and sending the public key (as string) to user, while saving the private key for use. **Note that you can only have one pair of private-public key at a time. If you have 
multiple, it WILL FAIL** (and we're not planning to have multiple of them too). 

```toml
[dependencies]
openssl = "0.10.40"  # Make sure change to newest version
base64 = "0.13.0"
```

We just use a simple cipher system. We could always change it in the future if required. 

```rust
use openssl::rsa::{Rsa, Padding};
use openssl::symm::Cipher;

fn get_cipher() -> String {
  let passphrase = "wabinab.near";  // could be an args in the fn. 
  
  let rsa = Rsa::generate(1024).unwrap();
  let private_key: Vec<u8> = rsa.private_key_to_pem_passphrase(
    Cipher::aes_128_cbc(),
    passphrase.as_bytes()
  ).unwrap();
  let public_key: Vec<u8> = rsa.public_key_to_pem().unwrap();
  
  // Save private key into somewhere. 
  
  // return public key
  String::from_utf8(public_key).unwrap()
}
```

Then in Javascript, upon receiving the public key, we shall use it like this: 

We first need the [JSEncrypt library](https://www.npmjs.com/package/jsencrypt) to be imported. Then, 

```js
var public_key = "-----BEGIN PUBLIC KEY-----" + ...;
var encrypt = new JSEncrypt();
encrypt.setPublicKey(public_key);
var encrypted_data = encrypt.encrypt("what we want to encrypt goes here");

// Send encrypted data to decrypt function in Rust
```

Then in Rust, we can decrypt: 

```rust
use openssl::rsa::{Rsa, Padding};
use base64;

fn decode_item(encrypted_data: String) {
  let passphrase = "wabinab.near";
  let private_key_pem: &[u8] = &private_key_in_vec_u8;
  
  let rsa = Rsa::private_key_from_pem_passphrse(
    private_key_pem,
    passphrase.as_bytes()
  ).unwrap();
  
  let mut buf: Vec<u8> = vec![0; rsa.size() as usize];
  let _ = rsa.private_decrypt(
    &base64::decode(encrypted_data).unwrap(),
    &mut buf,
    Padding::PKCS1
  ).unwrap();
  
  let decrypted_data = String::from_utf8(buf).unwrap();
  
  // Then use decrypted data to do whatever you want to do. 
}
```

That's it, the basic of encryption and decryption. 

---

## 31 May 2022
Today, one realizes, what's open is open. There's no such thing as "encrypted". Thought change method will return results that're closed? Nope. They're written on the blockchain. 
As long as they have the transaction hash (which they can retrieve from the explorer) and your account id (which can be retrieved from the same transaction receipt), they can figure out the output. Even worse, they don't need to use near-api-js etc to figure it out: they can read it out from the blockchain. 
So, encryption doesn't work on the blockchain, unless you pass a public key around. But that doesn't work either: because the library "openssl" is not supported on Rust for the blockchain. End of the world! 

Anything that stays open stays open. Anything that requires to be behind closed doors stay in the database, or offline exchanges (like asking to email etc). 

