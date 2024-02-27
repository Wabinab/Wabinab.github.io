# Experimenting with Roketo v2 API: A Diary
technology

Referencing: [Roketo v2 API](https://kikimora-labs.notion.site/Roketo-v2-api-a6b1cff8b9f74014a42b86b084cbbbd0)

First, check the "stream creation" part. Let's explain an error: 

- **Remember to make "double backslashes" into "single backslashes"**. In near api js, we perhaps don't need to do that if we use `JSON.stringify`, though. 

That creates the stream. 

Then, we could view all with `get_account_outgoing_streams`. For receiver, that's `get_account_incoming_streams`. However, if we want to view the last created ones, we 
should check `get_account` and there's a field for "last created stream". 

If the receiver hasn't registered the tokens, `pause_stream` raises an exception. To ensure registration, before streaming, the receiver needs to check by retrieving at [https://helper.testnet.near.org/account/wabinab2.testnet/likelyTokens](https://helper.testnet.near.org/account/wabinab2.testnet/likelyTokens) whether there's the token contract exists or not. 
If not, we redirect them to deposit a minute amount hence registering the token before owner can stream, before receiver can receive. Requires 2 way communication. 

**If the stream was stopped by owner halfway**, then the `withdraw` doesn't work. 
