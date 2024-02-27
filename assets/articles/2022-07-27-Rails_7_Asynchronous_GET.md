# How to "GET" (request) from database without reloading page in Rails 7
technology

While [this page](https://medium.com/swlh/build-a-dynamic-search-with-stimulus-js-and-rails-6-56b537a44579) explains with stimulus and Rails in Rails 6, it only "almost" explain how to do it in Rails 7. Particularly, because `respond_to` got deprecated for some security reasons, what's used to work in Rails 6 now doesn't work in Rails 7. Hence, we need some other way to do it. 

**One assumes you know how to use stimulus controller in Rails 7.**

As usual, we still have the frontend the same, with a search controller with hotwired stimulus: 

In whatever frontend html.erb you're coding to: 
```erb
<div data-controller="search">
  <%= form_with(url: "/find_currency", method: :get, data: { action: "search#submit"}) do |f| %>
    <%= f.label "Search for" %>
    <%= f.select :currency, ["USD", "GBP", "EURO"] , {}, selected: "USD", class: "form-select" %>

    <%= f.submit "Search", class: "btn btn-primary" %>
  <% end %>
</div>

<%# This is where our output goes. %>
<p id="result_value"></p>
```

In app/javascript/controllers/search_controller.js: 
```js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ ]

  static values = {current: String, all: String}

  submit() {
    const value = document.getElementById('currency').value;

    fetch(`/find_currency?currency=${value}`, {
      headers: { accept: 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result_value").innerText = data.currency;
      console.log(data);
    });
  }
}
```

So, when we post to the respective controller, say, currency controller. And we have a Currency model too. 

In routes.rb:
```rb
get '/find_currency', to: "currency#find_currency"
```

which is a custom function we defined in currency controller, than the pre-defined names like `create` and `update` etc. Then, in currency_controller.rb:

Assuming we have a "currency" field that's searchable by `find_by`, and we want `@data.field_name` to be returned under the json key "currency":  

```rb
def find_currency
  @data = Currency.find_by(currency: params[:currency])
  
  render json: { currency: @data.field_name }
end
```

That's why, if you check back to the stimulus, we have `data.currency`. That's accessing the key of that json. 

And that's it! Instead of having a single function that do multiple things, we have splitted it to a function that directly handles the `find_currency` that we need! It doesn't reload the page, and as for one, the `select` field also doesn't reset itself to its default value (one isn't sure for you, though). 

Try it! 



## Reference
- https://medium.com/swlh/build-a-dynamic-search-with-stimulus-js-and-rails-6-56b537a44579
