# Compute vs Memory Bound
gpu cuda ai

Yesterday, one had a dream about how a compute and memory bound job actually works. And one think it's worth sharing it. 

Imagine you have the memory living below you, the compute core, and then the models have to be loaded to you to process the data. Let's say the model, because it's huge, cannot hold its whole in the cache, so the GPU splits it into 100 layers (models are made of layers), or 100 batches, to run them through. Holding your history in the compute core, the model first pull layer 1 into the core, and then run through it once. Now, it needs to run through layer 2, so it detach layer 1 and retrieve layer 2. While this is happening, the data is sitting there waiting. 

But GPU are not having "just one compute core." They can have multiple compute cores to work in parallel -- or in sequential. Imagine, now, the model is still split into 100 layers, and then there are now 10 cores. Now, each core would pull layer 1 to 10 respectively, and so the core only need to pass the output from one core to another core, and it repeats in a loop until it had run through all cores. 

Now, once the output move to the 2nd compute, layer 1 starts to move back to memory while compute 1 fetches layer 11. When the result from compute 2 left, compute 2 does the same thing -- detaching layer 2 and fetch layer 12. In a perfect GPU, when the data reaches the 10th core, compute 1 would "just in time" pulled the layer 11 and so would process the data "just in time."

But what if that's not perfect? Consider that, by the time the output is chunked out of compute 10, and the data move back to compute 1, the layer isn't yet loaded. So it has to sit there and wait for the layer to load. It asks, "hey, have you finish already?" 

And compute 1 replies, "patience, patience!" 

Time is wasted without the compute processing anything, and the output waiting for layer 11 sighed, "Well, I wish you can pull your layers faster!" 

And that's what we call **memory-bound.** It's dependent on how fast data can move between VRAM and your compute core. 

Now, imagine the same scenario, but by the time compute 1 had loaded layer 11, it looked out at compute 10 and asked, "Hey, do you know where the guy is?"

Compute 10 took out a binocular and looked afar, shrugged and reply, "Oh, still at post no. 8." i.e. compute 8. 

And compute 1 replies, "Oh man, so we're sitting here waiting for him? I wish those people doing the processing are doing their work more efficiently!"

And that's what we call **compute-bound.** The compute cores aren't fast enough to process the data, at least not as fast as offloading and pulling layers from VRAM. 

Now, what about parallelism? What's with multi-GPU setup? At least as far as one's aware, llama.cpp only supports **layer parallelism**, which means offloading layers onto the VRAM of other GPUs. So when the output is sitting at compute 1 and asking it, "Hey, are you ready to load it up yet?"

And compute 1 replies, "Ah, no, the layer is in Europe, just let me call them to get it, yeah?" That's because moving data from one GPU to another, especially via PCIE, is far more slower than moving data from the VRAM to the compute. It's not only further away from each other, but it's also limited by the slower bandwidth too. 

As for tensor parallelism, it's slightly better in that the layers don't have to move between the GPUs. When the output is done in one GPU, they move the output to the other GPU. There, the output is processed while the subsequent layers load in the first GPU again (assuming there are only 2 GPUs). Then, when it's complete, the output is move again back to the first GPU, and repeat itself. Moving the output is always faster than moving the layers because, even at 100k context, the output size is small as compared to the model's size. 