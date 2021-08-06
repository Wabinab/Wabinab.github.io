# Playing with CNN Quantization

Quantization of models have been a fad and research focused topic nowadays, particularly with INT8 as weights, it could speed up model inference and also create more lightweight models. Some APIs provide introduction to quantization such as [PyTorch](https://pytorch.org/blog/introduction-to-quantization-on-pytorch/) and [TensorFlow](https://www.tensorflow.org/lite/performance/post_training_quantization) and maybe others. And irregardless whether there are proper implementations of quantization for CNN (As far as one is aware of, CNN may have static quantization for PyTorch but certainly not yet for dynamic quantization, which PyTorch only supports LSTM and Linear layers nowadays. For TensorFlow, one have no idea as one haven't look at it yet). 

Irregardless, let's play around with quantization and see if we can create some quantization for CNN layer only. 

First, we define the quantization code. 

```python
def quantization(model):
    keys = model.state_dict().keys()
    
    for key in keys:
        model.state_dict()[key][:] = torch.div(
            torch.clamp(model.state_dict[key] * 128, min=-128, max=127),
            len(keys), 
            rounding_mode="floor"
        )
        
    return model
```

Then the plotting code. 

```python
def new_figure(x, y, save_loc):
    plt.figure()
    plt.plot(x, y)
    plt.grid()
    plt.savefig(f"figures/{save_loc}.png", dpi=500)
```

Then the experimental code. 

```python
import torch
import torch.nn as nn
import cv2
import copy
import matplotlib.pyplot as plt
import numpy as np

vc = cv2.VideoCapture(0)
if vc.isOpened(): rval, frame = vc.read()
vc.release()

# Normalized frame from range (0-255) to (0-1)
norm_frame = frame / 255
norm_frame = torch.from_numpy(norm_frame).type(torch.float32)  # convert to Tensor, type Float32. 
norm_frame = norm_frame.permute(2, 0, 1).unsqueeze(0)  # convert HWC --> CHW then NCHW (expected PyTorch input)
# the above permute can be skipped if we use channel last in PyTorch, but let's not do that and make things simple. 

conv_model = nn.Sequential(nn.Conv2d(3, 10, 1))
conv_model_orig = copy.deepcopy(conv_model)

# Quantization
conv_model = quantization(conv_model)

# Find normalization factor for max value
x = torch.arange(58, 66, 0.1)
y = [(conv_model_orig(norm_frame) - (conv_model(norm_frame) / norm_factor)).max()
     for norm_factor in our_range]

new_figure(x, y, "frame_max")

# Repeat for min value
y = [(conv_model_orig(norm_frame) - (conv_model(norm_frame) / norm_factor)).min()
     for norm_factor in our_range]

new_figure(x, y, "frame_min")
```

We take in an image of size 640x480x3 and then try to find the maximum and minimum of their difference. These are the images: 

