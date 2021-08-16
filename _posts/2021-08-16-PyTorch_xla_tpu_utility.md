# PyTorch XLA TPU Utility

**Goal:** To ease the usage of TPU without much changes in your original code, provided the original code is more functionally written. 

Tensor Processing Unit (TPU) is a very fast hardware in terms of performing matrix multiplication. While GPU display computation usage percentage when you use CUDA and/or Tensor Cores to perform calculation, TPU display MXU (matrix multiplication unit) usage percentage. Just by the name of MXU you know how specialized it is for matrix multiplications calculations. And seriously speaking, **if there are no bottleneck in other sections**, TPU is very very fast. 

![name](https://lh3.googleusercontent.com/jFe33X6CNK3_tbiLACnV71HyO3mpntQ6nd6-it-whvptN_u1qmyF4M2N5kr-t0NctnTbqGo7xnd2=e14-rw-lo-sc0xffffff-w1502)(Image taken from https://cloud.google.com/tpu). 

Let's look at some of the speed of TPU comparison with GPUs. We will only compare memory bandwidth and compute speed since they are the two most important factors. 

Difference between TPU and GPU is GPU calculation can be done with FP16, FP32, FP64 (and in the near future, might have support for INT8 on PyTorch Quantization. Unsure about TensorFlow quantization support for GPU). TPU uses `bfloat16` (Brain Floating Point Format) instead. You will have to be slightly more careful of BFP16 usage. For example, if inside the training code you make conversion to FP16 instead of FP32, *an exception will be raised*. (solution is convert to FP32 instead). One is unsure how bfloat16 represents its mantissa and exponent but you can check it out yourself. 

Note: TPU v4 just came out on May 20, 2021 [here](https://www.hpcwire.com/2021/05/20/google-launches-tpu-v4-ai-chips/) and one is unsure whether it is available for rent yet on Google Cloud Platform (GCP). However, Colab and Kaggle have not yet made it available. In particular, Colab Free mostly get TPU v2 while Kaggle certainly gets TPU v3. 
