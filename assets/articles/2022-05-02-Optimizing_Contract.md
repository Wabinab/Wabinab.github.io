# Optimizing Smart Contract Gas and Storage Consumption
technology optimization

Recently we did a competition on SiNEAR_EA_* repo, and there are some idea on optimization. 

First, we have quite a lot of repeats in `Contract` interface, including `tokens_by_owner` and `tokens_by_owner_ordered`. We could remove the former if we need an ordered version like the latter. Easy stuff. 
How to store the ordered version is another problem. Currently, we're using `HashMap` for storage, where the key is a numerical character (of type `u16`) and the value the `TokenId`. The numerical character are mapped to `pub categories` in `Contract`, which is a `Vector` containing the category names. This way, we don't have to store the category name twice. 
Storing the number in `u16` might be more cost efficient than storing `String`. 

There's a time one thought of not using `HashMap` but `Vec`. However, if owner only donate to one field for the rest of their lives, and we have 10 fields available for donations, 9 of 10 of the fields stores an empty String, which is just a waste of place. `Vec` is more storage efficient if and only if the people 
donate to more than half of the categories, which isn't true most of the time. People usually have their specific "cause areas" (more info on this term please learn about Effective Altruism), not simply donate. Oneself used to donate to "maximum impact" all the time. 

Then goes the communication between backend and frontend; how do we make a view functions so frontend don't have to deal with what backend has? We solved this in the code, go check it out! Basically, we just take values from the view function and returns them (in random order) to frontend; and frontend deals with donations also in "random order". 

## Data-Oriented Programming
Currently, we have a `donate_and_mint` and `donate_and_update` as callback from `minting_interface`, which have their own callbacks. Each of these takes about 15-20 TGas (depending on how much args are passed in and the function 
calculation complexity); which just isn't ideal. Cross contract calls seems to be expensive? I don't know. Hence, we want to reduce cross-contract calls if that's true. 

First, we don't need `donate_and_mint` and `donate_and_update` as a contract function, but could be internal functions. We can deal with everything (except the Promises to call `mint` and perhaps callbacks) internally, hence no need to perform cross contract calls, in one go. Then only we call `mint` via cross-contract calls as it requires. 

Second, we don't need to call `Promise::new(env::signer_account_id()).transfer(money)` for each of `donate_and_mint` and `donate_and_update`. We could just minus the total once, but store how much money people donate separately. That way, calling `Promise` only once saves lots of gas! The only exception? When the donation goes to different accounts for each of the category, then we have no choice. If they all go to contract account, don't call them separately. 
Minting have to do separately, one afraid; though there might be solution for mass minting? I don't know. 

Then how metadata is stored. For those that have mostly the same metadata, especially generating from a template, they don't need to store their own metadata in a `LookupMap`. Instead, we could replace it with a pointer pointing to a template for metadata. If there is a small difference like `issued_at`, we could store that separately, but just for that particular field, not the whole metadata. 
By pointing to the template, we're saving unnecessary space from being used, and pull metadata directly from template + extra differences (that worth if storing separately for each `TokenId` than storing the whole Metadata), aggregate them in the _view functions_ before pushing to frontend for user to view. 

That's all one could think for now! Stay tuned. 
