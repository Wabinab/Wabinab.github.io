# Eye of ML Summary
technology

[Eye of ML](https://github.com/Wabinab/eye_of_ml) is a simple object detection program. It connects to your main webcam for input, and output the image in real time. 

To run, just run render.py (if it works by double click, if not, `python -m render` on the command line shall work). If you would like to use EfficientDet models, run `efficientdet.bat` (for Window users, mac users requires renaming the file to `efficientdet.sh` before running). This requires installation of wget for downloading models automatically. Alternatively you could infer and copy the hyperlink from the `render.py` file and download manually, and putting them into the respective folder(s). 

Additionally, there is also two different models. One is the *Fast Neural Style Transfer* (FNST) which do real-time style transfer. However, FNST wasn't very useful with real-time. Finally, there is *Canny Edge Detection* as well. 

## What was learnt? Challenges?
This is the first time one uses [Tkinter](https://wiki.python.org/moin/TkInter) to develop a GUI. Although simple, it provides a few basic functionality that the program requires. Seriously speaking, the interface is designed to be as little features as possible to not flood the users with too many choices. 

Tensorflow implementation is a nightmare. First: realigning CUDA version, cuDNN version to work with Tensorflow is one nightmare, partly because each new version (well, maybe two minor version difference) of TensorFlow requires updating the CUDA and cuDNN to match. While for PyTorch, it is said to use 10.2 or 11.1, more choices for the latest version (and what's more, you can use 11.0 and PyTorch will still works fine with 11.1 installation, at least for this program). So yes, one learns how to downgrade tensorflow one step at a time until everything works. And one learns that `cudnn built with 8.0.5, but source built with 8.1.0` is a wrong detection of CUDA (especially if you don't have CUDA 11.2 for TF 2.5, the pointer is unknown where it points to, even after you updated cuDNN, so downgrading TF to the CUDA version you have compatible with is the option to go). 

Another nightmare is loading model (EfficientDet) from TensorFlow Hub. One is unsure about whether the model is cached on disk, but assume it's cached (which makes sense because it doesn't make sense to download the model each time you want it). Without the downloading time, the loading time of the model is another nightmare. Perhaps TF Lite or TF JS might not be this crazy, one cannot speak for that as one never uses TF Lite nor TF JS before. However, loading the model from disk to run takes much much longer than bearable. The re-implementation of EfficientDet using PyTorch models load much much faster than this. 

Finally, is using the [object detection](https://github.com/tensorflow/models/tree/master/research/object_detection). It's quite a lot of code to look through, if one wants to optimize anything. Particularly, one is unsure whether the postprocessing is run on CPU or GPU, which is a big difference. On GPU, numpy operations could be speed up significantly, resulting in increase of fps. 

In terms of this direction, one suggestion is perhaps look at the [TensorFlow Object Detection API](https://github.com/tensorflow/models/tree/master/research/object_detection) and make changes from there if one wants to play with. Perhaps it might offer a faster and even better implementation. Though, on the [webpage of Efficientdet on TF Hub](https://tfhub.dev/tensorflow/efficientdet/d0/1), it mentions *unsuitable for mission-critical applications* so there is predicted to be some lag in real-time object detection. 

One would like to implement. With "full screen mode" comes "dynamic resizing of images" underneath (extra feature). To prevent Anti-aliasing resize of image being wrong, input image might requires higher resolution than default 480p (current default). Preprocessing of image to be fed into neural network might requires larger size. So, full screen mode isn't just "full screen button" and everything is done. 

## Why not uses Darknet? (Personal Opinion, **NOT FACTS**)
One tries to make Darknet on Windows Subsystem for Linux (WSL). It failed. First failure: despite following instructions to install GPU drivers on WSL, WSL failed to detect GPU presence. Second, WSL opencv does not connect to my camera, rendering great failure. With great frustrations comes great abandonment. Though, there are some tutorials (example [here](https://medium.com/analytics-vidhya/installing-darknet-on-windows-462d84840e5a), or [here](https://gitee.com/suiyifan/darknet) and many more. Though useful, for basic stuffs, one would not want to deal with CMake (which really, doesn't leave much good impression when using CMake to compile GPU support). 

Not to be ignored, Darknet have far far more features than our program do. If you requires those features, darknet would be a better choice. 
