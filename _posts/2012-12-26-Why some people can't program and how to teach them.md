There is a draft research paper (well, read more like a blog post) that mentioned on the two extremes of people who can't program and who can program. Today, one would like to take a look at the paper, give some of one's opinion, and give some opinion of how to let people be aware of what they're thinking, and hopefully they might be able to start programming. 

Here are the links to that [particular paper](https://web.archive.org/web/20070318023700/http://www.cs.mdx.ac.uk/research/PhDArea/saeed/paper1.pdf), and here is the link to the [blog post](https://blog.codinghorror.com/separating-programming-sheep-from-non-programming-goats/) where one first read about it. 

And lastly, one of the author **retracted the paper in 2014**, here is [the retraction](http://www.eis.mdx.ac.uk/staffpages/r_bornat/papers/camel_hump_retraction.pdf).

One would like to mention several things in the research paper before we start to have an overview. 

First, the author Richard **do not believe** in aptitude test for programming, nor do he believe in programming sheep and non-programming goats. In one's opinion, this might have been true. In fact, if one isn't mistaken, one would be partly the "non-programming goats" before and nowadays one programs quite a lot (no reasoning though, it's been a long time since one started programming and one can't really recall whether this statement is True or False anymore). And one believes so. 

<p class="callout success">
  Programming is a mental state problem, and if you could change your mental state, you can program. Non-programming goats not need stay goats all the way. 
</p>

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
