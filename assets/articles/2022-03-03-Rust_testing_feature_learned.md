# Rust testing features learned

This article hopes to speak about one's learning today about Rust testing feature and smart contract, including the pain of using pre-release rather than stable version. 

When one is experimenting with Rust testing features, one found out that you can't have a single file (called `test_utils.rs`) that can be shared among multiple Rust files in the main (`src`) folder. In fact, you need a `src/foundation/tests/test_utils.rs` for the `src/foundation.rs` file; and `src/tests/test_utils.rs` for `src/lib.rs` file (the only one with a folder name that doesn't match others, since it's special). You can import from `src/tests/test_utils.rs` into `src/foundation.rs`; at least not that one knows of. 
If you know how to do this, please leave a comment [here](https://github.com/Wabinab/Wabinab.github.io/discussions) by creating a new discussion channel. 

Second, about smart contract. When one was trying to test something today, one realizes that one can't really modify the value during test. This means 2 things: 

- the function couldn't be tested directly; there may be some modification function that needs to be used in place to modify the value before we could test it. 
- The contract is sufficiently safe. You are supposed to find out whether you can access and modify the detail during test to improve the security of your contract. If one could test it, that means there's an endpoint vulnerability where hackers could also take advantage of. Hence, rather delete your test or use more difficult method than letting hackers access your contract. 

Third and final, about pre-release feature. With pre-release, the update is progressive than immediate; hence you get to update your code here, but it wouldn't reflect elsewhere. For simple code, this is easy to write, but more complex code means you have inconsistencies here and there. This is what one met today. 

There's a thing called `near_sdk::VMContext` that still take in old type arguments; while in other parts of the code, they're rendered deprecated. Of course, you can always have some method to cast it back to the old type (for some of the easier-to-understand functions which have examples). For example, `AccountId` can easily be cast back to `String`. 
However, this is not true for everything. There's a deprecation of `Base58PublicKey` in favor of `PublicKey`. First, there's not much example about the latter, but one could always make them easily based on the docs example. The problem came when `Base58PublicKey` implements `Into` which cast them to `Vec<u8, Global>`. 
The exact thing have not been tried, but at least one currently haven't know if you could `.into()` or `.try_into()` the `Vec` equivalent and pass it in. At least when making it, it's not possible to use the old function anymore; it can't even take in a `Vec` anymore. 
The `Base58PublicKey` used not to be a type, hence you can do `Base58PublicKey(pe)` where `pe` is of type `Vec<u8, Global>` to wrap around; but now it's no longer available. The inconsistency plus one's insufficient expertise can't derive what we can do in place of here. 

Also, if you try to just use `Vec<u8, Global>`, you should be able to do that, but bear in mind `Global` is part of the `allocator_api` which as of writing, it's only available in the nightly version. One runs on stable version so that's not possible (provided that one don't want to switch to the nightly version). 
