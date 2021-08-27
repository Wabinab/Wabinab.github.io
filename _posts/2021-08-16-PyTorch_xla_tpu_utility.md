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
| NVIDIA RTX 3090 | 936.2 | (Theoretical) 0.556 (FP64), 35.58 (FP32, FP16) | 24 GDDR6X |
| TPU v2 | 700 per chip | 180 (bfloat16) <br> 46 (max per chip) | 64 HBM total |
| TPU v3 | 900 per chip | 420 (bfloat16) <br> 123 (max per chip) | 128 HBM total |

* P100 specs check [here](https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-PCIe-datasheet.pdf)
* (GPU only) When we use something "or" something, (unless otherwise specified) it means "PCIe specs" or "SXM specs". If no "or" is used, it either means both result in same performance, or only PCIe is available. 
* Note that V100 have PCIe and SXM2 type. Check [V100 specs](https://images.nvidia.com/content/technologies/volta/pdf/volta-v100-datasheet-update-us-1165301-r5.pdf) for more information. We did not include V100S PCIe here. TC means *Tensor Cores*.
* [A100](https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/a100/pdf/nvidia-a100-datasheet-us-nvidia-1758950-r4-web.pdf): TC means *Tensor Cores*. TF stands for *Tensor Float*. **TF32 does not equals FP32**. TOPS instead of TFLOPS because INT8 is not a floating number. 
* [GTX 3090 datasheet taken from here](https://www.techpowerup.com/gpu-specs/geforce-rtx-3090.c3622)
* TPU comes with **8 chips**, running in parallel to each other. We are giving information **for 8 chips in total** unless otherwise specified (per chip). Check [here](https://dl.acm.org/doi/pdf/10.1145/3360307) for most of the information on TPU. Check [here](https://cloud.google.com/tpu) for basic TPU information. 
* Here are more information on TPU's [system architecture](https://cloud.google.com/tpu/docs/system-architecture-tpu-vm). 

Difference between TPU and GPU is GPU calculation can be done with FP16, FP32, FP64 (and in the near future, might have support for INT8 on PyTorch Quantization. Unsure about TensorFlow quantization support for GPU). TPU uses `bfloat16` (Brain Floating Point Format) instead. You will have to be slightly more careful of BFP16 usage. For example, if inside the training code you make conversion to FP16 instead of FP32, *an exception will be raised*. (solution is convert to FP32 instead). One is unsure how bfloat16 represents its mantissa and exponent but you can check it out yourself. 

Note: TPU v4 just came out on May 20, 2021 [here](https://www.hpcwire.com/2021/05/20/google-launches-tpu-v4-ai-chips/) and one is unsure whether it is available for rent yet on Google Cloud Platform (GCP). However, Colab and Kaggle have not yet made it available. In particular, Colab Free mostly get TPU v2 while Kaggle certainly gets TPU v3. 

## Using TPU on Kaggle
Currently our program only supports Kaggle. In particular, Colab and Kaggle difference is their setup is different. Change the `setup_tpu()` code for Colab support. 

TPU works more like multiprocessing rather than a single unit. In fact, TPU comes in a group of 8 cores as a single device, yet you requires to use multiprocessing to coordinate with the 8 cores (much like multiprocessing in pure python, and like [DDP](https://pytorch.org/docs/stable/notes/ddp.html) in PyTorch with multiple GPUs); or just use 1 core. There is no such thing as 2 cores or 4 cores. Either you use 1, or you use all 8 cores (and multiples of 8 for multiple TPU devices if you rent a "pod"). 

Talking about our program. First start with important thing to note. Just like usual multiple GPUs, if you are to use multiple TPUs, learning rate and batch size will be multiplied by the number of cores (called `xm.xrt_world_size()`). So if you define too large a batch size (for one's example, 64, with total batch size 64 * 8 = 512), you would reach Out Of Memory. Similarly, learning rate requires you to tweak a bit more. 

There aren't yet many examples, but those names starting with `test-*.ipynb` are examples. Example, [`test-tpu-utility.ipynb`](https://nbviewer.jupyter.org/github/Wabinab/TPU_utility/blob/main/test-tpu-utility.ipynb) demonstrates how to use the one cycle policy with cached dataset and [`test_create_dataset.ipynb`](https://nbviewer.jupyter.org/github/Wabinab/TPU_utility/blob/main/test_create_dataset.ipynb) demonstrating how to create a `xcd.CachedDataset`. Also, check out [this kaggle notebook](https://www.kaggle.com/wabinab/test-tpu-training) on how to do vanilla training (without using One cycle policy). 

Currently, the *one cycle policy* supports multi-class label (the example one tested with). It is unsure whether it supports other types of problems. (**to be updated** Will update to allow ML Engineers to create their own train and test loop function, as `self.train_loop_fn` and `self.test_loop_fn` in the future by assigning of function to class). 

### Tips and Tricks
During experimentation phase, small dataset is always useful for testing. Additionally, setting up multiple TPU cores takes quite a lot of overhead time, hence single TPU cores is the way to go. Moreover, single TPU cores result in much less changes in code (just install `pytorch_xla` and import required modules, change device from `torch.device("cuda if torch.cuda.is_available() else "cpu")` to `xm.xla_device()` (alternatively specifying which TPU cores if required by passing in kwargs), and in the training loop change `opt.step()` to `xm.optimizer_step(opt, barrier=True)` (`barrier=True` is required for single TPU core. This **should be removed** to use multiple TPU cores)). Voilà! You should now run on single TPU core. 

With kaggle and colab, you never have sufficient vCPUs to fully utilize TPUs. One suspects, unless you have at least 16 vCPUs (ideally 24 vCPUs), data would not be fetched fast enough to the TPUs to be used. And ideally you have a larger RAM for larger batch size supports as well. On Kaggle, you have 16GB of RAM, which seriously speaking is sufficient for most situations, but sometimes you will need to presize the images before putting them on RAM. 

Because vCPUs are such precious resources on fetching data, (and RAM for storing batches of data) it is encouraged you first: presize your image beforehand. This means you did the presizing of your images on another Kaggle notebook, and make a new Kaggle Dataset out of that, and use that instead of the original dataset. This is especially important if you have many files, because presizing on the whole batch per se might takes *more than 1 hour*, and you would add 1 hour to each epoch if you did not presize (unless you have sufficient caching done, most likely on disk if your RAM isn't large enough). 

The above step is useful to push Kaggle GPU usage from 30% to 70%, but not for TPU. Thing is, looking at the table above, you can see how fast is TPU v3 compared to a single P100. Hence, you still use "zero percent" MXU even with the above steps. Most likely data augmentation takes place on CPU (in the dataset I used, 2 - 2.5 seconds per image (about 1.2-1.5 minutes per batch)). So you would see TPU process for (less than) 1 seconds and wait 1.5 minutes for CPU to process before process another seconds. 99% idle time. 

As an extra steps, it is recommended to **cache your dataset** beforehand. Caching here not only cache presized image, but all the augmentations you've done as well. Due to seeding and caching, disadvantages is your dataset is not randomly augmented each time you call upon the cached dataset. Advantage is, you finally manage to push MXU utilization to 5% and idle time to 75% on average. (Unfortunately, insufficient vCPUs on fetching data is still the bottleneck, though). This also means speeding up, in one's case, from 7.5 minutes per training epoch (excluding validation epoch) to about 2 minutes. 

Caching dataset can be done by running `tpu_cache_ds_utils.py`. It will then run `warmup` to do the caching. This **will take quite a lot of disk space** depending on your original dataset size, and how much augmentation you performs. In one's case, the original dataset is about 15GB, and the augmented dataset 11GB. But remember, augmented dataset resize to 224x224 images while original are much larger, with the smallest size about 1500x1500, usually around 3000x2000 ish. 

On another case, one tries to apply normalization only to the transformations, yet it gets out of space in Kaggle. Without the transformation, it has sufficient space (even without compression since compression requires additional disk space to save compressed folder before deleting original). Also, in that case, one is using 560000 jpeg images, which the uncompressed takes 1.1GB +- 0.1 GB; while the compressed takes more than 10GB with equal amount of files. 

So caching dataset seems to lead to same number of files (requires checking). This isn't really ideal in Kaggle because less-used datasets requires mounting to docker from disk backup, which takes quite a considerable amount of time (this mostly depends on how many "small" files you have rather than how many "large" files you have, provided the number of large files are very very small). Explaining more clearly, copying 100 files totaled 10GB is far far more faster than copying 560000 files totaled 10GB. 

Caching **can take quite an amount of time** depending on your dataset. In one's case, it takes more than half an hour to finish warming up. Ideally, set it to warm up on Kaggle or on Colab and autosave the output would be great so you could not worry about it in the meantime. *Unfortunately, you cannot cache your dataset if you don't have a TPU instance running. It is unsure whether TPU are used when caching dataset: at least on Kaggle it shows 0.0%*. Unless PyTorch XLA update this, one doesn't know how to write directly to not use TPU when caching. 

Here is the link to the [official performance guideline from google](https://cloud.google.com/tpu/docs/performance-guide), although this performance guideline describes in TensorFlow, and it's applicable to PyTorch functionals as well. 

## What's for the future? 
### Colab support
Support for Colab will be out for the future when one writes extra code for `setup_colab()`. Sometimes we requires Colab rather than Kaggle especially if your dataset isn't just "readily available" in Kaggle, this could take advantage. For example, you may have a dataset in GCS Bucket which you could mount onto Colab. 

Why Colab? **What one is going to mention is not certain. Make sure you research further into how this works**. If you are connecting to a TPU instance on colab, **you might get 40 vCPUs**. This allow you to do preprocessing sufficiently fast before fetching to the TPU, fully utilizing TPU to max. However, it's not certainly sure whether by just switching to TPU instance you will definitely get it, or you might get a usual 2 vCPUs instance sometimes. *You might want to perform "Runtime -> Factory Reset Runtime" several times and check it out*.

Second, **you might get 36 GB of RAM** (it's actually 40GB, but useable is only 36094 MB) (not TPU RAM, but usual CPU RAM). That's sufficient to run larger batch size. TPU ideally runs at batch size multiples of 64, but due to RAM on Kaggle you might only be able to run with 32, under-utilizing TPU. 

Third, more disk space. Provided the original data is mounted, you can save more output onto the temporary disk on Colab. Moreover, you could also save output onto mounted disk space (though data exchange rate for GCS isn't very beautiful, seriously speaking, especially via mounting. The API for calling GCS might work better, though everything as of April 2021 runs serially: meaning you cannot fetch them in parallel, though this might update in the future). 

Then why not Colab? Well, Colab uses TPU v2 which is slower compared to TPU v3 (used in Kaggle). But said back, you cannot even fully utilize TPU v3 on Kaggle, so there's no reason not to prefer Colab than Kaggle. 

Second, your dataset is more readily available on Kaggle. Downloading the dataset onto Colab isn't feasible due to disk space limitations. You might need to save the dataset onto GCS before mounting onto Colab to deal against this, especially if your data is larger than the available disk space. 

Third, though the chances are slim, you might be not granted a TPU. There is an underlying mechanism to calculate how much you use Colab (which you cannot see, and one isn't sure how to check it either), and you have a quota meter as well (just like Kaggle). The more you use Colab, the more likely you will exhaust this quota and you might not be granted a TPU. Ideally, it is thought that you have "unlimited" CPU usage so write your code with CPU kernel before switching to TPU when you want to run it. 

**Edit:** It is experimented that usually you would get a 2vCPUs and 12GB instance on colab. You will requires to switch to a high-RAM instance by purposefully crashing Colab (search online for the tutorial, one forgot where it mentions, or [the first code cell here](https://colab.research.google.com/github/patil-suraj/exploring-T5/blob/master/T5_on_TPU.ipynb#scrollTo=coOmS2s_xDBy)) and there'll be a popup telling you to be able to switch instance. Otherwise, choose a colab already having a 40vCPUs 40GB instance (which is available in some tutorials like [T5 on TPU](https://colab.research.google.com/github/patil-suraj/exploring-T5/blob/master/T5_on_TPU.ipynb#scrollTo=coOmS2s_xDBy) and delete the cells and add your own cells might also work). 
