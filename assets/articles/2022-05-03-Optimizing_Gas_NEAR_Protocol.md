# Near Protocol Contract: Optimizing Gas and Debunk Mysteries
technology optimization

Recently, there's a function that uses too much gas, from one's perspective; and we have Spring is NEAR Challenge 7 going on, so one decide to speak about gas. Let's see some methods to reduce gas cost. Note that this is not intensive, and we just discussed some experiments one tried with. 

## Reduce Callbacks: 
If you can call a function without cross-contract call, don't use cross-contract calls. For example this minting 

```rust
#[payable]
pub fn donate_and_mint(
  &mut self,
  token_id: TokenId,
  // metadata: TokenMetadata,
  metadata_id: CategoryId,
  donate_amount: f64,
) {
  let donate_amount_u128: u128 = near_to_yoctonear(donate_amount);
  require!(
    env::attached_deposit() >= (donate_amount_u128 + near_to_yoctonear(0.1)),
    "You attached less than you want to donate + 0.1N for storage (mostly refunded)."
  );

  require!(
    env::attached_deposit() <= (donate_amount_u128 + near_to_yoctonear(0.101)),
    "You attached too much money than you want to donate. Try again!"
  );

  Promise::new(env::current_account_id())
      .transfer(donate_amount_u128)
      .then(
        ext_self::nft_mint(
          token_id,
          donate_amount.to_string(),
          // yoctonear_to_near(donate_amount_u128).to_string(),
          metadata_id,
          env::signer_account_id(),
          None,

          env::current_account_id(),
          near_to_yoctonear(0.1),
          GAS_FOR_MINTING
        )
  );
}
```

Now, with this line: 
```rust
Promise::new(env::current_account_id()).transfer(donate_amount_u128)
```

plus the few `require!` above, we're sure that the worse thing that could happen is user lost 0.001 N (due to the limit), which we could always refund if user demands with proofs. 1 cent is no big deal. Hence, we could save lots of gas without
cross-contract call here. 

The reason we need a cross-contract call, is because we need a result from the promise, to ensure that it's successful before continuing. If we're certain that the promise will always be true, or the function panic before promise fails, 
then we don't need to perform a cross-contract call. In this case, user can only attach amount within this range, and promise to send money to the contract will always be successful, because if it's not, you deleted the contract account and this
contract is nonexistent by then. Hence, we don't need to cross-contract mint, we could make an internal mint function. 

```rust
#[payable]
pub fn donate_and_internal_mint(
  &mut self,
  token_id: TokenId,
  metadata_id: CategoryId,
  donate_amount: f64,
) {
  let donate_amount_u128: u128 = near_to_yoctonear(donate_amount);
  require!(
    env::attached_deposit() >= (donate_amount_u128 + near_to_yoctonear(0.1)),
    "You attached less than you want to donate + 0.1N for storage (mostly refunded)."
  );

  require!(
    env::attached_deposit() <= (donate_amount_u128 + near_to_yoctonear(0.101)),
    "You attached too much money than you want to donate. Try again!"
  );

  Promise::new(env::current_account_id()).transfer(donate_amount_u128);

  self.internal_mint(
    token_id,
    donate_amount.to_string(),
    metadata_id,
    env::signer_account_id(),
    None,
  );
}
```

## Transfer in one go
We have a function called `minting_interface` that needs to mint multiple NFTs so it calls a `for` loop through the `donate_and_mint` function we have before; nothing else. 

If we check the receipt, we see that for every single "transfer" we made, there's a receipt to transfer the rest of the gas back to whoever calling the function. Hence, to reduce gas, call the `Promise::new(...).transfer(...)` only once if everything is transferred to the same account! 
The only reason we need multiple promises is each transfer is to different accounts; otherwise calling them aggregated together in one single promise reduces gas by reducing the receipt length. 

## Args and Kwargs: 
They made a really small differences, consider these two functions: 

```rust
    /// Complicated function with lots of params but do nothing
    pub fn complicated_fn(
      &mut self,
      token_id: TokenId,
      metadata: TokenMetadata,
      donate_amount_f64: f64,
      donate_amount_u128: U128,
      some_complicated_string: String,
    ) {
      require!(
        1 == 1,
        "Do nothing"
      );
    }


    /// same simple function with no params but do nothing
    pub fn no_param_fn(
      &mut self
    ) {
      require!(
        1 == 1,
        "Do nothing"
      );
    }
```

We can call these functions as such: 

```bash
export CONTRACT=...

near call $CONTRACT complicated_fn '{
  "token_id": "d_first_last",
  "metadata": {
    "title": "First Template",
    "description": "First description",
    "media": "https://www.google.com"
  },
  "donate_amount_f64": 0.1,
  "donate_amount_u128": "100000000000000000000000",
  "some_complicated_string": "something complicated to make this maximum borsh"
}' --accountId wabinab.testnet 


near call $CONTRACT no_param_fn '{}'  --accountId wabinab.testnet
```

The gas used isn't too huge a difference. In fact, it uses extra 0.00001 Near, which just is negligible. Check out the transaction [for complicated function](https://explorer.testnet.near.org/transactions/8Af9smH4iv8pM9iCDZSKJ5ffP8H1dCzyPbPNtki5aznH) and [no param function](https://explorer.testnet.near.org/transactions/DcD3MrmWGrAEQW2GTN1x7p3b6qA9fidUinFN5nrdaqdX) here. 


## What maths you think is complicated isn't really that complicated
Assuming gas cost is proportional to computation time, what you think is complicated isn't really that complicated to the computer. Consider trying it locally first; if it takes immediately to get an answer, it isn't complicated to the computer. 


