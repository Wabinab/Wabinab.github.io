# CurioMeet Is Now Officially V2
curiomeet failure

A few days ago, or was it a week ago, one officially killed CurioMeet, the app one'd been working on ever since the end of March, when one'd devised my 1/5/10 Planasy, halting work on my previous project (on "rotating around a person and create a 3D TikTok dancer that'll attract billions in dollars because everyone want to show off their ass in front of everyone else, and so people can rotate around and see how their ass moves if they want to do so" -- doesn't sound good eh, or maybe too good to be true) and moving on to CurioMeet. When one first started, one was enthusiastic, and one had ideas of how it should be laid out, all the flows, all the settings, how they can do this, how they can do that, etc. Sure, one don't have them all connect together, and hence one developed them as separate components and put it in, to be assembled later, just like car parts are first build before they're assembled. 

But there's a much bigger problem. 

First, one was vibe coding it mostly (on the frontend), though one understood the code; one wasn't merely copy and paste without rereading it over. How the AI handled it was... exactly how one wanted it to be handled. But that doesn't mean that one don't change my mind later. As time passed, one realized that one had been building on the wrong stuff, or rather, one'd been avoiding building the actual logic. 

The first and foremost goal of CurioMeet is to allow you to meet someone else, one to one; but what had one been building? First, a chat message that don't allow you to chat with somebody, instead, forcing you to select a range of dates and the system automatically select the dates where you both are available at the same time. The frontend is completed easily with an AI, the backend had been thrown away. But most of all, one'd been focusing on building the settings -- the profile page, the change language page, the change country page, the feedback page, the export and import data page, the... whatever's not related to the main CurioMeet logic. 

Do the Work, bro, Do the Work. 

Yes, one's doing the work -- except one's doing the wrong work. 

And as if that wasn't enough, when one moved on to build the backend for CurioMeet with Rust, one started to have problems. First, one had to download a lot of libraries, and that means compiling a lot of content on my slow computer. To compile the whole thing, and recompile the whole thing, can take up to 15 minutes, so one thought, why not build a "rust predictor," where you split every single function into its own binaries and just recompile that single binary on demand? Wouldn't that be much much much much much faster on a 10-year-old computer than what Rust is doing now, recompiling the whole thing? God, even the final linkage (the final step of Rust is a single-threaded linking step) is so damn slow, took like 30 seconds because my program is huge. If only one could just sidestep it and pass data between the conglomerate of independent binaries, where each takes input and spit out output for others to use. 

Apparently, it wasn't that easy though, and some data just can't be Jsonify, like an object such as "SqlConnection" (this isn't Rust naming, but one just put it like this so you can understand it easily). But don't worry, some problems surely can be solve, while others can't be. 

And then, if you have an LSP to detect where your cursor is, then you could just update the function and all the test that depends on that functions, and hence you could see on your GUI what tests are being run "on the go" right? Just like rust-analyzer is running in the background, right? 

Until my dad setup a VM for me on a Xubuntu computer with 16 vCPU and the program that used to compile in 15 minutes now compiles in 2. One wonder why did one need rust predictor for. One's not even building for the public, and rust predictor is ultimately a very restrictive library that can only be used in very restrictive programs, particularly, with Axum and the specific sql library that one used (one can't remember exactly what it's called anymore, not diesel, but another one, and lazy to search for it now, but whatever) -- and while it possibly could support standard Rust, if you use some special libraries that's too away from Rust standard functions (no, no classes, only functions, one seldom, if never, wrote in classes, unless the thing is a class per se, like Angular Typescript -- not even in Python do one write classes, usually and almost always one uses functions, unlinked to each other, unless one's vibe coding and the AI wrote the code for me and one's lazy to change it). 

It's a waste of time, and one never went back to look at it. 

Then, one saw [Modal](https://modal.com/), the free serverless GPU provider, and then one said one must have a private model hosted on it so that one don't share my secret CurioMeet with any AI that collects info, which is almost everyone, despite no telemetry and/or Zero-Data Retention Policy. One need it to be in my control. So my modal need to host my model, it needs to start up really fast, and so one can use it really fast. 

And so one went and test it, totally forgetting about CurioMeet in the meantime. 

It actually took one quite long to setup. First, it's been a long time since one setup models, and one want to setup it before the end of May (when my free quota refreshes), so one was burning time and money on it. Finally, when one managed to set it up, it wasn't as one expected. GPU snapshot do make things faster, but _only if snapshot works_. Sometimes, they fail, and then startup will not be within 1 minute (yes, damn 1 minutes, unlike what's advertised 2-5 seconds, because loading the snapshot at 1-2 Gbps or GiBps, one don't know, from modal Volume will take around 30 seconds to finish pulling the whole snapshotted model, which is a Qwen 3.6 27B FP8, with around 28.8 GiB of data, will take around half a minute, plus overhead to warm it up and wake it up from sleep, will take around a minute or so) but more like 5-8 minutes, and mind you, one set `timeout=300` in the code, so sometimes, it timeout and restart in a new container (which usually succeed the second time, not sure why) -- that's more like 10-15 minutes wait actually. 

One don't know how this AI provider, one could never remember the name of it, it's not easy to remember, could do subsecond startup of the same model with vLLM. One found them on reddit somewhere and then in the end they're still on beta testing mode, and one wasn't ready to go all in. 

Anyways, the dream had broken, but one was still using it anyways, and one always want to build something as fast as Zed, so one was building my frontend interface with GPUI until that day, around 2 days before the deadline last month -- one said, one can't do this anymore, one need something _quick_, even if it's slow, even if it's flawful, even if it's vibe coded. So one asked Gemini to build something quick, and it ended up being the frontend interface one's using now -- and one, again, abandoned my previous attempt after a few comebacks earlier this month. 

No more excuses, one'll had to focus on creating CurioMeet. My 1/5/10 Planasy for last month and this month hadn't been well met. The central logic of the app hadn't been build, and had been halfway laying waste. 

But it seems like the data that one wanted to collect, based on my own 'wisdom', especially from my past experience and my trip to Budapest for 2 months last year, was... not supported by the author of _You're Not Listening_. One was reading her book as a way to escape, apart from being introduced to it by Derek Sivers whom'd just finished reading it recently when one first saw it at the top of his reading list. Unless my memory had been performing tricks on me, she said that it's best not to use algorithm that's flawed and "assumed by a person" to match people -- you never know the quirks that people can get in chemistry with one another, and that can't be reliably predicted with any "Amazon's similarity algorithm," just like we don't read the same genre of books, and hence found Amazon's algorithm stupid. 

We want something _different!_

But _different_ does not means you're meeting someone directly opposite different. It's not that simple. One wish it could be that simple, so one could collect a list of items like: 
- Are you a listener or a speaker? (i.e. Listener will be matched to speaker, because people who like to speak like to be listened to, and one wrongly assumed that people that like to listen like to be paired with someone who suppresses them from speaking even a single word, walk out of the restaurant happily, and yada yada -- like from that what radio was the author introducing again, where the speaker wants to reunite on the Second Date, but the other person didn't want to because they're not listening to what they really want, but then the speaker snatched over and tried to explain that the other side is wrong because they're correct, refusing to listen even at this point when they're on broadcast). 
- Are you more in a group or more towards individual? (i.e. if you like to stay in a group, we'll pair you in a group, just like what TimeLeft does, but mind you, TimeLeft is very unsatisfactory, and one already gave up with it -- one believe it earns commission from the restaurants, that's why it keeps referring poor people like me to expensive restaurants -- to make sure we're bankrupt and live a more desolate life so we're hooked to the TimeLeft drug of "meetup". Jut my opinion, though. But anyways, individuals are paired with individuals, and one like individuals because it's more focused attention. TimeLeft 6 people is too big; the author agrees, saying that 4 is the max your attention can span, including yourself, hence 3 other people.)
- Do you only want to be pair with same gender or different gender? (i.e. some people hate the opposite gender for political or family reasons, and so this was a choice that one removed in CurioMeet v2. **You should not hold strong opinions when meeting someone else -- know them, don't criticize them.** And not to mention that some people prefer to neither be male nor female, and how can one decide whether they're classified as "same gender" or "different gender"? Heck, this question is only viewable if you choose either male or female, and others will always be paired last after all the males and females had been paired and there are other more open people that can pair with anyone.)

Just these questions, you already can smell the rubbish in it. What the heck are they really deciding, anyways? Just who is one that decides how people should be matched? One isn't even a scientist that researched that this is really the best way to match people, except one was using my gut to do the pairing. And one was still thinking how one can optimize this with GPU matrix multiplication! 

Come on, one's not even trying to solve the problem itself -- one was just addicted to GPUs!!!

---

Enough rubbish. Let's get to why one was rewriting CurioMeet. After all those pause and all those stop and all those diversions, one just... couldn't continue anymore. Plus, _You're Not Listening_ was the final straw that weigh on one to rewrite CurioMeet. 

Which now becomes CurioMeet v2. 

The important thing is, CurioMeet v2 is integrating what the author of _You're Not Listening_ had said, like removing all those specific pairing and just do a random pairing (with some specific hard criteria), reducing data collection as much as possible so one don't have to care much about GDPR and all those messy stuff that one don't want to think about yet, and then damn it, **start working on the main item -- meet** -- that one never managed to finish working until CurioMeet v1's end of life. 

Choose Hard, Live Easy. Choose Easy, Live Hard. 

What's the most important thing that the program can't live without? Of course it's the Meet, the central property of the app. Forget about all the other stuff, we just need to make the Meet perfect; and then the rest can be as imperfect as they want to be, and slowly learn as we go, as long as we can meet. Chat someone up? Use WhatsApp or Line or Telegram or whatever! Edit profile picture? Heck, you don't need one. The only setting you really need is to change the app's language to your native tongue, or, in the worst case scenario, to a language that you can understand. 

Then what about the export data, the feedback? None. Not until we build meet. Not until we can meet. 

Then, if we don't collect data, and you forget to exchange contact, how are we going to connect with each other? 

One's sorry -- but to not violate GDPR without a GDPR, one's not saving your contact info, and hence there's no way you could connect with the other person after you meet if you'd forgotten them. Your meet data link will be delete forever after pairing (maybe retain for a week for complaints, but one don't know -- GDPR, bro, GDPR); we won't know if you ever meet that guy before, only you knows. All messages send between the server and the client is encrypted in paranoid mode (hopefully -- though it's not like you had something to lose anyways, given we're doing 'minimal data collection', which one hadn't decide what exactly to collect yet, there'll be a notice in the app, a page on it, when one finished building, detailing that -- GDPR, bro). 

So, remember to connect with them, or regret forever. 

Like how one regret one didn't exchange contact with the girl one met on the plane on the way to Budapest because one didn't had the gut to initiate it, even though she said "you're a nice person, let's exchange contact later when we start up our phone," and then, while waiting to unboard the plane, one didn't have the courage to remind her about it and she totally forgot about it of course. 

Anyways, when starting to rebuild CurioMeet v2, we're no longer vibe coding. One's using AI yes, but one's coding it by hand too, critically assessing what to copy over and what not to copy over, hopefully understanding the code that one's copying over by hand-typing it, though not necessarily always. 

Second, one unboxed the flaws that one'd left from the lazy implementation because previously, one wanted result quick, and skipped the most important part as if "as long as it works OK, it's fine," which is... fine, but not perfect enough because they're related to the main "meet" logic, which is the only part that needs to be extra careful about. And so, uncovering the flaws, now one had to redo them. 

---

When you're writing a book, you had to write your first draft, throw the whole thing away, rewriting it over and over again. Maybe you refer to some parts of the thrownaway and include it in, but most of it, you'd shed them off because they just don't feel like it. You make a dozens of them, if not hundreds, even thousands if you're persistent, before you get to write your final product -- the book, now looking very different from the very first draft and how you set out to write it in the first place because something in it tells you that it wants to be written this way instead of how you thought you want to write it, and you can't force it to be written in some way or risk breaking it. 

It's the same with writing programs. There's no difference between writing book and writing program. While writing this program, one's also halfway writing the 2nd draft of my trip to Budapest. "The End" had really been just the start of recreating it. And one don't think it's any different with CurioMeet. 

Only that this time, one's more dedicated, and bought curiomeet.com as a reminder that if one hadn't build something satisfactory by next year, one'll have to pay a recurrent fee to maintain the domain name! 

We'll make it. 

Let's be **Curio**us about someone, and **Meet** them. 