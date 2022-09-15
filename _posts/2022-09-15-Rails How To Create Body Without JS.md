# Rails How to Create body without JS. 

Rails use ERb, so if we change something that needs to change the basic structure, it needs **to reload**. So far, one haven't found anyway to not reload if one are to perform a GET request **inline**. If you know how, please, leave me [a message in the discussion with a link/details](https://github.com/Wabinab/Wabinab.github.io/discussions). 

Anyway, we need a seperate GET if we are to not reload; usualy outside of rails conventional routes. This way, we could use a `fetch` in the javascript to call that routes and fetch back details. Usually, these details are in JSON format. Then, we reconstruct the body in javascript. 

But this has a caveat: sometimes, things are just too difficult to write in pure HTML. One prefers instead to write in ERb. Therefore, it might be easier to generate and we could fetch a body instead of json. 

This is not too difficult. Instead of `render json:`, we change to `render body:`. Then, we could use `render_to_string` to deal with things. 

```rb
@g = [1, 2, 3]
render body: render_to_string("customer/_my_layout", layout: false)
```

So in the above, after settling the routes and functions in controller, we add something like above to it. Then, we could have a view in app/views/customer/\_my\_layout.html.erb which contains the following items: 

```erb
<ul>
  <% @g.each do |g| %>
    <li><%= g %></li>
  <% end %>
</ul>
```

With `layout: false`, we don't render anything in application.html.erb. Now, voilà, we have something we need. 

Then in js, we could do: 
```js
fetch(`/our_routes`, {
  headers: 'application/body'
})
.then((response) => response.text())
.then((data) => console.log(data));
```

Whatever we want to do with `data` could be made there. 
