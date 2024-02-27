# Opinion on what "easy" means for programming
thoughts-and-opinions

When one learns about Ruby on Rails, one found the idea "convention over configuration" great. Whether or not one understood (or misunderstood) that idea, it lays down a foundation over what we can do too in programming and Machine Learning. 

For example, there might be some conventions in Machine Learning that are already tuned by others that works quite good in most situations. Unless the result out is really bad (or just not satisfactory), we might or might not choose to tune it for the better. 

And as one of Rails (mission?) is: to not repeat those things that are always the same (or at least, similar). We also would like something similar in Machine Learning: to not always build the training cycle if they are always the same. We could make alterations with callbacks as well if required. Furthermore, only if the training cycle is completely different then we need to build from scratch (and perhaps integrate it in the future), otherwise they are almost always the same. That's why we have fast.ai. 

Yet not everyone conforms to the thought that fast.ai will make things fast. In fact, conclusion is that it will be more difficult than what had already been done, because they had stuck in their comfort zone that what they're currently doing is the easiest. In fact, one had fallen into this trap as well when one tries to move from TensorFlow (TF) to PyTorch. The idea that PyTorch requires using classes to build models, and one without a strong background on computer programming, likes to stay with TF Keras. Only until a point when one are forced to move so one moved. So, that was an example of ones' mistake made. 

If there is a library to make you not to do all the things that are already done, not to repeat yourself, use it and try it out. Don't come into conclusion too quickly, which from ones eyes it seems more to protect yourself against mistakes, or perhaps protect against admitting "mistakes", or perhaps protect against the thought that what you had done till now is not worth it. All are related to not being able to admit something rather than putting the focus on the object itself: whether it really helps or not. And shifting the focus is necessary. 

It doesn't mean that the "they must do their homework to reach our stage" professionalism is fake. In fact, if we don't have the people who had build our OS for us, perhaps in C++ or even Assembly code, we wouldn't have all these wonderful things right now. Going back earlier, if we don't have those whom ported machine code into higher level assembly code into higher level C code, we wouldn't have something as easy to write as Python (or Rails or other high level programming languages) today. We can't ignore their contributions. 

Yet that doesn't mean we can allow that thought to persist. After another layer of abstraction and making things easier, those that doesn't need to be repeated, need not be repeated. **Convention over Configuration**. And of course, those that aren't yet build, we shall build from a lower level of abstraction and try to integrate it in. 

And what one saw (not from everybody, but at least there exist some) is, **Configuration over convention**. That is, the saying that "You cannot build something flexible if you have something full-stack. You can only build something flexible if backend is backend, frontend is frontend, and they **must** call each other through json or other means". So you must build them separately. Not to say they're wrong, but that makes things slow. And most importantly, those that say this would not say it's slower to build. They would not admit it's slow. That's a big problem. 

Rails have said that "veteran programmers moved to us, even though they complain, because we build faster with our framework". Ok, what is missing here is the hard-headed that "and some other veteran programmer will never move to us because they think full stack is never the choice, you can never use something full stack. Things needs to be flexible, not prepared. This way you can **control** everything". 

So ultimately, it may (or may not) lies in a strong desire to control stuffs. 

## Other stuffs to say

Though there are some thing that one would like to mention. There are some programs out there that are easy at the top but crazy at the bottom. Interacting with the top (calling at the surface level using parsers, arguments, and perhaps configuration file like YAML) aren't too bad, but when programmers want to look at the underlying code, ha ha ha... 

That is when you have so many folders, and so many files, and so many code. The code isn't the problem, the problem is there exist no way to reuse the code in some other ways. Actually, it can be reuse **if and only if** you're familiar with the codebase. At least, it's not something that you can see and understand immediately. You are required to read the research paper, have the (model) architecture by heart, how to call it and where are the entry point, all these, then ok it's not too bad. However for a beginner whom want to just use the code without much understanding, it's not quite. 

Especially when you want to change the job of the model to do some other things. Like from reusing a model doing instance segmentation to perform regression. Some aren't that bad, while others is, especially if to build that single model, there are a lot going underneath, hence lots of folders in the "model" directory, and lots of files, and everything linked together like the internet...

Crazy. Though I don't know... 
