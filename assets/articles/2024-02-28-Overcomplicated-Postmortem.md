# Postmortem: Overcomplicated by Samuel Arbesman
postmortem

Imagine yourself building something. Then, imagine a hundred years later, they're still in use. How can they provide maintenance? You're long gone! When Voyager I, the only spacecraft (as of writing) that escape the solar system, had bugs, and all their original builders are either long gone, or long retired. Luckily, they have documentations. Imagine again, that what you write, only you can understand, either because of illegible handwriting (urg... one was guilty years ago), or worse, because one had difficulty putting ideas, thinkings, into words. How can they understand what you write, if what you write has ambiguities, dependencies upon assumptions that only you know what it is, but they don't. 

One can see that in programming. Beginner programmers copy and paste, strive only to make it work, without understand what they're doing. At the extreme, upgrading these systems requires rewriting from scratch. Advanced programmers, when optimizing for "efficiency", also have this issue. Pray, that your decendants can understand what you wrote, that they can read your mind! It's an art to balance between "efficiency" and maintainability. 

The author then introduces us to "entanglement", where all these programs are interacting with each other. If you're play with Python (the simplest programming language that one think many people know a bit), ever use `pip install`? Have you ever check the source code of what you install? Do you understand what you've installed is dependent on? And their dependency of their dependency of their dependency...? This is abstraction. And how they interact with each other at different abstraction level? That's entanglement. Actually, you might create something that clash at an abstraction level that you don't know, and you'd be amazed when you found out! 

Your brain is only that large, and you'll find it difficult to keep all things together; that's why we use tools to help us remember. Yet, there are problems with recalling from our memory, what says recalling from writings? As far as one's concern, not everyone can write well, and many suffers the "disability" of putting down their thoughts into words. You thought putting down a few words could help you recall? Sure it does, but how can you be sure what you recall is really what you initially want to recall? How can you be sure your memory doesn't play trick on you? 

These complicated structures are far too complicated, and far too large, to let us remember. Even one, as a programmer, only focus on one's part; and doesn't look at the source code of any dependencies unless required (like they don't have a function, then one might want to write something to "monkey patch"). It frees one's attention to focus on the task at hand than worry about those "non-related" tasks, the heavy-lifting that others have done for one. 

Author teach us to learn from bugs, from glitches. If we treat the bottom level as a black box, sometimes, we can fix a bug without touching the level causing the bug. For example, you can write some filtering function at that level of abstraction you know, that if it detects this output, you convert it to another output. This is called an "adapter." Just like the adapter you use when you visit a country that doesn't support your "three-pin plug" (ahem, UK standard). Or you visit a country that uses much lower voltage than your country (ahem, 110V vs 220-240V). The conversion, is an adapter. Just, this is a software adapter. 

Author suggests, we needn't simplify; at least not always. The world is complicated, and we really should learn to live in complicated, as suggested in _Superforecasters_ (by Philip Tetlock). Simplicity sometimes means abstracting (i.e. throwing away information), and how can one be sure what's thrown is useless? One can't. Therefore, while abstraction allows one to see from a major perspective, sometimes, we do need to peek under the hood, and go in-depth understanding of how things work. It's learning! And of course, the reason we see on the surface level, is because we don't have enough memory and attention to probe in depth for all. Author called this _biological thinking_, whereas simplicity thinking is _physics thinking_. 

As a child, one had read about Isaac Newton, fancy of him (like people nowadays fancy of some Korean singers), and thought, yeah, he has so many job, one want to be like that. Then, as one grows up, one was disappointed to found out that people only take one job today... What has changed? Well, specialization, because we can't focus on everything with our limited memory. Yet, there are a lot of information that you might find solution in other sectors. E.g. if you never been to a winter place (that is, you live near the Equator), and your freezer condensor have ice (i.e. it starts to break down). What do you do? Some people replace it with new refrigerator. Some people just ignore it (and their freezer don't feel cold anymore). Others might try to clear the ice, say, with a hair dryer. But actually, in aviation, there's something called anti-icing fluid that if you pour, can melt the ice (for it reduce the ice's melting point below zero, and turns it into water). It's used in countries with heavy winters; but one didn't know that until one saw it in aviation videos, and search online if the liquid is buy-able. 

Anyway, author suggests that generalists may be flourishing in understanding these "kluge", these tangled stuffs, at least to some extent. 

That's it for today. 

### P.S.
[Post any suggestions here](https://github.com/Wabinab/Wabinab.github.io/discussions/2), one'll read it and consider the changes. 