# Experimenting with Roketo v2 API: A Diary

Referencing: [Roketo v2 API](https://kikimora-labs.notion.site/Roketo-v2-api-a6b1cff8b9f74014a42b86b084cbbbd0)

First, check the "stream creation" part. Let's explain an error: 

- **Remember to make "double backslashes" into "single backslashes"**. In near api js, we perhaps don't need to do that if we use `JSON.stringify`, though. 

That creates the stream. 

Then, we could view all with `get_account_outgoing_streams`. For receiver, that's `get_account_incoming_streams`. However, if we want to view the last created ones, we 
should check `get_account` and there's a field for "last created stream". 

If the receiver hasn't registered, `pause_stream` raises an exception. 

**If the stream was stopped by owner halfway**, then the `withdraw` doesn't work. 
