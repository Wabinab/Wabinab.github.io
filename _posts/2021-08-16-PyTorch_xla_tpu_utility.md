# [PyTorch XLA TPU Utility](https://github.com/Wabinab/TPU_utility)

**Goal:** To ease the usage of TPU without much changes in your original code, provided the original code is more functionally written. 

Tensor Processing Unit (TPU) is a very fast hardware in terms of performing matrix multiplication. While GPU display computation usage percentage when you use CUDA and/or Tensor Cores to perform calculation, TPU display MXU (matrix multiplication unit) usage percentage. Just by the name of MXU you know how specialized it is for matrix multiplications calculations. And seriously speaking, **if there are no bottleneck in other sections**, TPU is very very fast. 

![name](https://lh3.googleusercontent.com/jFe33X6CNK3_tbiLACnV71HyO3mpntQ6nd6-it-whvptN_u1qmyF4M2N5kr-t0NctnTbqGo7xnd2=e14-rw-lo-sc0xffffff-w1502)(Image taken from https://cloud.google.com/tpu). 

Let's look at some of the speed of TPU comparison with GPUs. We will only compare memory bandwidth and compute speed since they are the two most important factors. We will also list the about of memory (called *High Bandwidth Memory* on TPU while on GPU it depends, but we will just call is GPU RAM generally). 

| Device | Memory Bandwidth (GBit/s) | Compute speed (TFLOPs) | RAM( GB) | 
| ------ | ------------------------- | ---------------------- | --- |
| NVIDIA P100 | 732 (16GB) <br> 549 (12GB) | 4.7 (FP64) <br> 9.3 (FP32) <br> 18.7 (FP16) | 16 <br> 12 (unknown??) |
| NVIDIA V100* | 900 | 7 or 7.8 (FP64) <br> 14 or 15.7 (FP32) <br> 112 or 125 (TC) | 32 <br> 16 HBM2 |
| NVIDIA A100 | 1555 (40GB) <br> 1935 or 2039 (80GB) | 9.7 or 19.5 (TC) FP64 <br> 19.5 FP32 <br> 156 or 312 (sparsity) TF32 <br> 312 or 624 (sparsity) BFLOAT16 TC <br> 312 or 624 (sparsity) FP16 TC <br> 624 TOPS or 1248 TOPS (sparsity) INT8 | 40 HBM2 <br> 80 HBM2e |
| TPU v2 | 700 per chip | 180 (bfloat16) <br> 46 (max per chip) | 64 HBM total |
| TPU v3 | 900 per chip | 420 (bfloat16) <br> 123 (max per chip) | 128 HBM total |

* P100 specs check [here](https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-PCIe-datasheet.pdf)
* (GPU only) When we use something "or" something, (unless otherwise specified) it means "PCIe specs" or "SXM specs". If no "or" is used, it either means both result in same performance, or only PCIe is available. 
* Note that V100 have PCIe and SXM2 type. Check [V100 specs](https://images.nvidia.com/content/technologies/volta/pdf/volta-v100-datasheet-update-us-1165301-r5.pdf) for more information. We did not include V100S PCIe here. TC means *Tensor Cores*.
* [A100](https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/a100/pdf/nvidia-a100-datasheet-us-nvidia-1758950-r4-web.pdf): TC means *Tensor Cores*. TF stands for *Tensor Float*. **TF32 does not equals FP32**. TOPS instead of TFLOPS because INT8 is not a floating number. 
* TPU comes with **8 chips**, running in parallel to each other. We are giving information **for 8 chips in total** unless otherwise specified (per chip). Check [here](https://dl.acm.org/doi/pdf/10.1145/3360307) for most of the information on TPU. Check [here](https://cloud.google.com/tpu) for basic TPU information. 

Difference between TPU and GPU is GPU calculation can be done with FP16, FP32, FP64 (and in the near future, might have support for INT8 on PyTorch Quantization. Unsure about TensorFlow quantization support for GPU). TPU uses `bfloat16` (Brain Floating Point Format) instead. You will have to be slightly more careful of BFP16 usage. For example, if inside the training code you make conversion to FP16 instead of FP32, *an exception will be raised*. (solution is convert to FP32 instead). One is unsure how bfloat16 represents its mantissa and exponent but you can check it out yourself. 

Note: TPU v4 just came out on May 20, 2021 [here](https://www.hpcwire.com/2021/05/20/google-launches-tpu-v4-ai-chips/) and one is unsure whether it is available for rent yet on Google Cloud Platform (GCP). However, Colab and Kaggle have not yet made it available. In particular, Colab Free mostly get TPU v2 while Kaggle certainly gets TPU v3. 

## Using TPU on Kaggle
Currently our program only supports Kaggle. In particular, Colab and Kaggle difference is their setup is different. Change the `setup_tpu()` code for Colab support. 

TPU works more like multiprocessing rather than a single unit. In fact, TPU comes in a group of 8 cores as a single device, yet you requires to use multiprocessing to coordinate with the 8 cores (much like multiprocessing in pure python, and like [DDP](https://pytorch.org/docs/stable/notes/ddp.html) in PyTorch with multiple GPUs); or just use 1 core. There is no such thing as 2 cores or 4 cores. Either you use 1, or you use all 8 cores (and multiples of 8 for multiple TPU devices if you rent a "pod"). 

Talking about our program. First start with important thing to note. Just like usual multiple GPUs, if you are to use multiple TPUs, learning rate and batch size will be multiplied by the number of cores (called `xm.xrt_world_size()`). So if you define too large a batch size (for one's example, 64, with total batch size 64 * 8 = 512), you would reach Out Of Memory. Similarly, learning rate requires you to tweak a bit more. 

There aren't yet many examples, but those names starting with `test-*.ipynb` are examples. Example, [`test-tpu-utility.ipynb`](https://github.com/Wabinab/TPU_utility/blob/main/test-tpu-utility.ipynb) demonstrates how to use the one cycle policy with cached dataset. (**More examples to come**, particularly, how to use learning rate finder, and how to cache your dataset). 

Currently, the *one cycle policy* supports multi-class label (the example one tested with). It is unsure whether it supports other types of problems. (**to be updated** Will update to allow ML Engineers to create their own train and test loop function, as `self.train_loop_fn` and `self.test_loop_fn` in the future by assigning of function to class). 

### Tips and Tricks
During experimentation phase, small dataset is always useful for testing. Additionally, setting up multiple TPU cores takes quite a lot of overhead time, hence single TPU cores is the way to go. Moreover, single TPU cores result in much less changes in code (just install `pytorch_xla` and import required modules, change device from `torch.device("cuda if torch.cuda.is_available() else "cpu")` to `xm.xla_device()` (alternatively specifying which TPU cores if required by passing in kwargs), and in the training loop change `opt.step()` to `xm.optimizer_step(opt, barrier=True)` (`barrier=True` is required for single TPU core. This **should be removed** to use multiple TPU cores)). Voilà! You should now run on single TPU core. 

With kaggle and colab, you never have sufficient vCPUs to fully utilize TPUs. One suspects, unless you have at least 16 vCPUs (ideally 24 vCPUs), data would not be fetched fast enough to the TPUs to be used. And ideally you have a larger RAM for larger batch size supports as well. On Kaggle, you have 16GB of RAM, which seriously speaking is sufficient for most situations, but sometimes you will need to presize the images before putting them on RAM. 

Because vCPUs are such precious resources on fetching data, (and RAM for storing batches of data) it is encouraged you first: presize your image beforehand. This means you did the presizing of your images on another Kaggle notebook, and make a new Kaggle Dataset out of that, and use that instead of the original dataset. This is especially important if you have many files, because presizing on the whole batch per se might takes *more than 1 hour*, and you would add 1 hour to each epoch if you did not presize (unless you have sufficient caching done, most likely on disk if your RAM isn't large enough). 

The above step is useful to push Kaggle GPU usage from 30% to 70%, but not for TPU. Thing is, looking at the table above, you can see how fast is TPU v3 compared to a single P100. Hence, you still use "zero percent" MXU even with the above steps. Most likely data augmentation takes place on CPU (in the dataset I used, 2 - 2.5 seconds per image (about 1.2-1.5 minutes per batch)). So you would see TPU process for (less than) 1 seconds and wait 1.5 minutes for CPU to process before process another seconds. 99% idle time. 

As an extra steps, it is recommended to **cache your dataset** beforehand. Caching here not only cache presized image, but all the augmentations you've done as well. Due to seeding and caching, disadvantages is your dataset is not randomly augmented each time you call upon the cached dataset. Advantage is, you finally manage to push MXU utilization to 5% and idle time to 75% on average. (Unfortunately, insufficient vCPUs on fetching data is still the bottleneck, though). This also means speeding up, in one's case, from 7.5 minutes per training epoch (excluding validation epoch) to about 2 minutes. 

Caching dataset can be done by running `tpu_cache_ds_utils.py`. It will then run `warmup` to do the caching. This **will take quite a lot of disk space** depending on your original dataset size, and how much augmentation you performs. In one's case, the original dataset is about 15GB, and the augmented dataset 11GB. But remember, augmented dataset resize to 224x224 images while original are much larger, with the smallest size about 1500x1500, usually around 3000x2000 ish. 

Caching **can take quite an amount of time** depending on your dataset. In one's case, it takes more than half an hour to finish warming up. 
