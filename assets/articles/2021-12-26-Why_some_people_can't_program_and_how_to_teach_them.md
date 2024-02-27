There is a draft research paper (well, read more like a blog post) that mentioned on the two extremes of people who can't program and who can program. Today, one would like to take a look at the paper, give some of one's opinion, and give some opinion of how to let people be aware of what they're thinking, and hopefully they might be able to start programming. 

Here are the links to that [particular paper](https://web.archive.org/web/20070318023700/http://www.cs.mdx.ac.uk/research/PhDArea/saeed/paper1.pdf), and here is the link to the [blog post](https://blog.codinghorror.com/separating-programming-sheep-from-non-programming-goats/) where one first read about it. 

And lastly, one of the author **retracted the paper in 2014**, here is [the retraction](http://www.eis.mdx.ac.uk/staffpages/r_bornat/papers/camel_hump_retraction.pdf).

One would like to mention several things in the research paper before we start to have an overview. 

First, the author Richard **do not believe** in aptitude test for programming, nor do he believe in programming sheep and non-programming goats. In one's opinion, this might have been true. In fact, if one isn't mistaken, one would be partly the "non-programming goats" before and nowadays one programs quite a lot (no reasoning though, it's been a long time since one started programming and one can't really recall whether this statement is True or False anymore). And one believes so. 

> Programming is a mental state problem, and if you could change your mental state, you can program. Non-programming goats not need stay goats all the way. 

## The argument
Note that these are things that one extracted based on one's focus. Particularly, when one was reading, those that doesn't catch my mind goes filtered out almost immediately, and the first thing that get caught was (rephrased):

**Novice learners' tries to use <u>Natural Language</u> and expect the computer to understand their intention.**

That is, aside from machine learning, normal computer programs are rules that you tell the computer what to do. It's **meaningless**, but novice tries to derive meaning from what is conveyed. Not only that, *they try to convey their own mental representation to the computer, and hope it will understand, as if the computer has some neural networks like human (or animals) does*. 

If you're experienced programmer, you know that computer takes in meaningless commands, execute them without meaning, and output without meaning. **It's us human whom derive meaning from a program's output, not the computer give meaning to the output or the process.**

Let's take a look at an example question they gave. Consider the following code (not written in any language, particularly it's Python but one expanded `elif` to `else if` as the latter is easier to understand by non-programmers, and one added semicolons as well). 

```ruby
if      (mark > 80): grade = 'A';
else if (mark > 60): grade = 'B';
else if (mark > 40): grade = 'C';
else               : grade = 'F';
```

The question is: What is the effect of executing this code if the variable `mark` has the value **-12**? 

a) The program will crash.  
b) The program will output an error message.  
c) The variable `grade` will be undefined.  
d) The program will never terminate.  
e) The variable `grade` will be assigned the value 'F'.

Let's think from the **perspective of a human** whom can understand how exam works. In exams, we know **marks are within the range of 0-100**, and we think the computer know this too! In fact, this is what leads to problem when novice tries to learn programming. **Computer have no idea what an exam is, nor does it have an idea what range are exam marks in UNLESS YOU TOLD IT**. Clearly the above program you did not introduce the range of marks to the computer, hence it doesn't know about it. But that's not what you might think. You expect this easy peasy stuffs to be known to the computer, it *should* be "God-ly" and be able to read your mind, it should do everything you need it to do. Well, it does do everything you need it to do, just how you define 'everything' needs to be without any assumption nor expectations. You need to define the expectations to the computer to process. 

Given our perspective of 0-100, it's easy to get mistaken that marks cannot be negative, and also cannot be more than 100. So the first answer *the program will crash* is a viable option. The computer *knows* that marks cannot be negative, so to parry against your input, it will crash to signifies you that it is undefined. **But howdy, that's not the right answer Ho Ho Ho!**

And then you might expect ok, the computer want to live longer. It doesn't want to crash easily. Let's say it interpret marks correctly and output an error message `sorry, marks must be between 0 and 100. Please enter marks again`. And this is what you'd expect as well, that sounds reasonable. Well, reasonable to humans whom have taken exams and know how exam works. But not for computer. To a computer, a `mark` is just a meaningless piece of item that holds a value. In fact, the following program is the same as the program above: 

```ruby
if      (a > 80): b = 'A';
else if (a > 60): b = 'B';
else if (a > 40): b = 'C';
else            : b = 'F';
```

Nothing difference, `mark` and `a` works the same, no difference to a computer, since it takes meaningless objects. To a human though, it isn't interpretable. **The only reason program are named the ways they do is to explain to the programmers/users**, to optimize for user understanding so to ease communication channel between a computer and a human. Otherwise, irregardless of the output is `grade` or `b`, it's still the same output (from the computer's side). 

The same goes for `grade` will be undefined chain of thoughts. 

One doesn't know how people could think of the program never terminate though. One can't simulate this chain of thought. 

The last value is the correct one. Since it doesn't match any of the `if` and `else if` statement, it will be `else`. If you have a mark of 1,000,000 instead of 100, you'll still get an 'A'. A million is indeed larger than 80, just like 100 is larger than 80. 

Let's see how to write a program/pseudocode that gives you your expectation. 

```ruby
if      (mark <= 100) and (mark > 80): grade = 'A';
else if (mark <= 100) and (mark > 60): grade = 'B';
else if (mark <= 100) and (mark > 40): grade = 'C';
else if (mark <= 100) and (mark >= 0): grade = 'F';
else                                 : grade = 'mark is not within range 0-100';
```

Ok that's it. Why we're repeating the `(mark <= 100)`, because it's necessary. Try remove it and you'll see your program doesn't match your behavior. Example if we only have the first like to have this statement, if `marks = 120`, then the second statement will be True (120 > 60 is correct). That's why we need to restrict each and every single line to meet our expectations. 

## Noticed terms
In particular, the researchers looked at the terms of "camel with two humps". Those that are in the *inconsistent* group scores lower than those with the *consistent* group. However, one looked at the sentence **everyone either become consistent or inconsistent in the second test. No blank returns.**

To understand this question, let's understand a bit about the test. The question like the question above (and some other ways of representing questions, be it multiple choices, or fill in the blanks or whatever) is assigned to the students first time before they wrote any program, and then once again 3 weeks into the programming course. (One isn't sure whether the question is asked several times in the same test in a different manner to test for consistency though). At least, those whom doesn't change their mental representation by answering the questions exactly the same are called the **consistent** group. Those whom changes their mental representation by answering the questions different from the first time is the **inconsistent** group. And then those whom did not answer anything, doesn't give a damn about it, is called the **blank** group. 

**Note:** One couldn't give you an idea of what the test looks like as one doesn't know either. So one won't discuss in depth, and be careful with what one wrotes as well to read out any imposed stuffs that one wrote subconsciously. 

Hence, at the second test, people whom don't give a damn at first, either move to become inconsistent or become consistent (one isn't sure how blank can become inconsistent or consistent either since it's the first test that carry forward to determine the second. Perhaps it's from some other questions that they answered, and only leave blank for some question. But one doesn't know). And then there also said that **inconsistent might become consistent** as well. One also doesn't know how this is tested, perhaps from other exams since this test is administered to their class students. 

Now this is important because it signifies that **we can actually learn how to program, given that we changes our mental model representation.** There's no labelling of programming sheeps, and no-programming goats. **What really matters is you're willing to change your mental model.**

But changing mental model isn't easy. It's like asking you to change what you previously belief. To see why, read this book: [Black Box Thinking by Matthew Syed](https://www.amazon.com/Black-Box-Thinking-People-Mistakes-But/dp/1591848229). 

In brief, things like you're not willing to accept your mistakes, you're not willing to change what you believe, stereotypes cannot be put down, are all mental representations (this is **one's opinion, do not treat them as scientific reasonings!**) that resides in whether you're willing to change or not. And the same goes to this programming to change mental representation. 

Second thing is how to stay consistent with the mental representation. Now this is the "stubborn" side of thing to just believe it as it is. You must not accept your mistakes that kind of thing. Though this sounds wrong in terms of other conditionings (like why won't you accept your mistakes when you know they're your mistakes to change for the better), but at least in terms of programming that it is. Unless that particular programming language have a different representation, being consistent allows you to write a consistently working program. 

## Three (semantic) hurdles of programming
The following are 3 hurdles, ordered in the way they are met from starting to program journey. Note the following applies to **imperative programming**. Check the difference between imperative and declarative [in this explanation](https://docs.microsoft.com/en-us/answers/questions/211050/declarative-vs-imperative-language.html#:~:text=Declarative%20programming%20is%20a%20programming,friend%20to%20fix%20your%20car.)

1. Assignment and sequence
2. Recursion or iteration.
3. Concurrency.

What is mentioned in the article is the first hurdle: **assignment and sequence**. This is where the test for mental representation lies. The others are more easily seen in **low-level programming language**. Example, **recursion or iteration** requires a set of mental models in mind of how it works, particularly because there are lots of loops that are available to choose, like `for` loop, `while` loop, `do-while` loop, etc that works somewhat differently to each other. This is both a hurdle in high-level and low-level programming language. And the final is the **concurrency** programming. Well, most programmers doesn't reach this stage until they're advanced enough. In one's experience, **high-level** programming language makes this easy to deal with, be it multiprocessing or threading. Example is *Python's `joblib` library*. Though, Python's own `threading` and `multiprocessing` library aren't that easy to dealt with though, and one oneself only used the multiprocessing library so one can't say much about how threading works. Furthermore, one isn't even sure one handles multprocessing correctly previously, though what one wants it to work does work, it might not be the best way to program concurrency. 

And that's it for today. 

## Conclusion
Programming for novice is more of a mental representation problem rather than knowledge/expertise problem. Only after you break through the assignment and sequence hurdles, get hold of it, then it starts become knowledge/expertise problem. 

### One last thing
This has nothing to do with the content, just to talk a little bit about **requiring proofs**. Yes, proofs are important in some sense, in some situation. Proof is what made something equal and fair for people when you go to court, proofs is what makes a theory stays important. 

But for other situations? Proof is not that important. Opinions are. Proof is optimized for logical reasoning. Opinions are optimized for <u>happiness</u>. If you need proof in things that are opinionated, one guesses (or hypothesize in the scientific term) that you live a miserable life. No, you yourself are happy with how you live, you love the proofs. But others find you miserable. Perhaps two people whom optimized for logic can live together, but most people aren't optimized for logic. Most people are opinionated. 

And imagine that you are about to get married tomorrow, and you need prove that your partner loves you, and solid proof you need. What are the metrics to measure your partner loves you (classification), and what on the scale does (s)he loves you (regression)? And perhaps you ask your partner to sit down and solidifies it into number, close their eyes, access their brains, their hearts, and give you a number. Proofs! 

Conclusion: Sometimes, things don't have to be explain. Nor do you have to believe in everything. Skeptical is good, but happiness is equally important (or even more). (**Be wary of the `because` you use in conversations, each and every sentence, in recursive manner**). 
