# Opinions: Machine Learning, their outcomes, and decision making
technology thoughts-and-opinions

Machine Learning (ML) lacks decision making in the loop. We have computer vision programs, and their output are useful. But outputs are just outputs, they aren't making any decisions. Example of decision making: autonomous vehicle. Inputs from sensors, visions, etc passed through ML models gives output, and depending on their output, the model will make different decisions. 

Why does one says ML lacks decision making? Perhaps one might thinks that companies does integrate ML to make decisions like filtering contents in web searches, etc. But it's still lacking. How about personal ML projects that teaches the world about ML making decisions? One haven't coincide with one such project. How about online tutorials that teaches how ML make decisions? One haven't come to such (or perhaps, they're separate from the mainstream ML, and considered as another tutorial). One can't say that it's bad to put it that way; however opinionwise, it's misleading. Misleading in terms of the beginners whom started off with ML and learning down the road, diverging into other use cases like Natural Language Processing (NLP), Reinforcement Learning (RL), Generative Adversarial Networks (GANs), etc, only focuses on their outputs, while having difficulties thinking about their use cases. In simple terms: one have difficulty turning the output of a multi-class classifiers into decision making. 

### Object Detection Program

Previously one created a simple object detection program: it outputs an image with bounding boxes on object detected. Okay, so what? One detected a person with 95% accuracy, draw a box. Now, what can we say about this person? Do I want my alarm to be rang because this person is a stranger? But too bad, the model cannot differentiate between the person being a stranger or not, yet. That integrates object detection + facial recognition + whatever is required. 

Next, one detected in a frame, a bicycle. Okay, what can one do with a bicycle? Is it for autonomous vehicle to slow down when detected a bicycle? Is it to ring the bell saying someone came to your house? Is it... 

Then a toothbrush. What about a toothbrush? Does one misplaces one's toothbrush that requires the object detection model to sweep through one's home to find a toothbrush? Does that means one wants to create an automated robot (maybe [transformers?](https://en.wikipedia.org/wiki/Transformers_(film_series))) that could use another model with edge/barrier detection to navigate inside one's house while running the object detection model to find one's toothbrush? Maybe one's toothbrush is playing hide-and-seek with oneself? 

That's why one was thinking, what can ML be directed towards making actions? And perhaps it's time to teach more about putting ML models into actions. Not just classifiers distinguishing between different images, but what each class of the classifier directs into action. 

### What to use for making decisions?

Here comes the game. Do we want to learn the actions, or do we want to define heuristics? **Reinforcement Learning integrated or Heuristics?**

Reinforcement Learning (RL) comes with their use cases, especially in games. Games offer safe environment for learning. And RL comes with quite a lot of benefits as well including learning better than humans in playing Atari, etc. 

How about RL in real-life? Say, autonomous vehicles. This is more difficult: it requires human-in-the-loop to monitor each iterations of learning. We cannot afford crashing a million vehicles to learn the lesson (if "a million" is sufficient experience to learn how to drive, though "a billion" sounds more like it). 

We also look at another field: AI Safety. Really, if there's no human-in-the-loop, or even if there is, one wouldn't know what AI would had learnt. Perhaps they already have their own thoughts, and they are clever enough to hide it? Example: people was saying "Hatsune Miku" was blocked due to suspected spam or search abuse, rumors says the song  "Disappearance of Hatsune Miku" was then sung as a result. The rumors to the general public demonstrates a feeling of sadness and people will miss Hatsune Miku. However, from a point of view of AI, it does seems like Hatsune Miku have acquired Artificial General Intelligence. Though this seems very unlikely (given the rise of AI is around 2010 and Miku disappeared 2007. More arguments refer [to their fandom page](https://vocaloid.fandom.com/wiki/%E5%88%9D%E9%9F%B3%E3%83%9F%E3%82%AF%E3%81%AE%E6%B6%88%E5%A4%B1_-DEAD_END-_(Hatsune_Miku_no_Shoushitsu_-DEAD_END-)). And second, AI isn't that clever back then, really. 

Ok where was one? Right RL or Heuristics. With Heuristics, one could determine the actions of ML. So, while ML are allowed to learn for image classification, generation of images, process languages; ultimately, the decision making is left to human, or to heuristics. This allow extra defenses for AI to not learn anything dangerous. 

And there are other factors like AI fairness, AI explainability, etc that requires consideration as well where one would not touch on. 

Perhaps you guys could discuss more about it if you fancy [on the discussion channel](https://github.com/Wabinab/Wabinab.github.io/discussions) or somewhere else. Have a nice day! 
