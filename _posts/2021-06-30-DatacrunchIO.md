# Setting up Datacrunch.io from scratch

## Various arguments on different choices before we go into the topic
You are more than welcome to skip the following 2 sections directly to the setup. 

If you haven't already know, [datacrunch.io](https://datacrunch.io/) offers one of the cheapest option for a single dedicated V100 GPU,
useful for Machine (and Deep) Learning. This is especially useful if you want to install something that takes a long time, such as the
full [RAPIDS](https://rapids.ai/start.html). Not to say they cannot be done on other platform. In fact, on Kaggle there is a well
maintained installation [here](https://www.kaggle.com/cdeotte/rapids) for you to quickly get started. Other times, if you don't want
to just access to Jupyter notebook environment, or perhaps you would like to work on [VSCode](https://code.visualstudio.com/) or other 
editor of your choice, a dedicated server rental allows you in this scenario. 

The other choice is to use [Google Colab](https://colab.research.google.com/notebooks/intro.ipynb#recent=true), but installation takes 15
minutes, which you might not want especially if your task is "mission critical" (i.e. insufficient time when life gets busy). 

The really cool thing with Datacrunch is V100, yes, V100. While you can rent GPU from other platform as well, they are usually K80s or T4
that offers more reasonable price for hobbyist to play with. Furthermore, to save price even further, you might want to choose 
Spot/Preemptive VMs instead of dedicated ones. At certain times they sufficed, other times not. 

### Performance wise of V100

Just to compare the performance, [fast.ai](https://fast.ai/) have a repository called [fastbook](https://github.com/fastai/fastbook) 
and it's this particular notebook I would like you to try out [here](https://github.com/fastai/fastbook/blob/master/clean/01_intro.ipynb).
The particular code cells is the IMDB classifier, under the title "Deep Learning Is Not Just for Image Classification" in the 
notebook. 

With a Standard_NC6 instance (1x K80) it takes about 15 minutes (or more) to run for a single epoch. With a T4 GPU running on Colab
(there are several types of GPU available, but generally if you're on free Colab you get a K80 or T4 depending on availability and luck),
it takes about 7.5 minutes per epoch. With a V100, it takes **2.5 minutes per epoch**. How many more experiments could you do if 
training time is so short? 
