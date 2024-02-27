# Tips and Tricks with sending jobs to Azure ML Compute Clusters
technology

Recently, especially when trying out new things, one feels frustrated when things just don't go smoothly. Especially with sending jobs to Azure ML Clusters, or perhaps other providers as well where you don't have control over each and every step (i.e. you will need to simulate how the steps will go over by compiling them inside your brain or pen and paper, theoretically) hence they take longer before something works. The errors that arise include environment setup problems, incompatibility issue with packages, how to set up installation with .yml file especially when one don't really understand the whole command of conda installation such as `conda create -n rapids-21.06 -c rapidsai -c nvidia -c conda-forge rapids-blazing=21.06 python=3.7 cudatoolkit=11.0 --yes` (how to put the -c inside a yaml file, and one can tell you now one didn't manage to figure it out and still don't understand what it means as one haven't search about it), and own program errors. 

Today, one is going to share some tips and tricks on how to speed up the cycle of testing, after failing 24 times (which is, not a lot, considering Thomas Edison failed 999 times inventing the light bulb). 

First, whenever you can, **use the curated environments provided**. They not only directly skip (docker) environment building, which can takes up to 30 minutes (or even worse) (although on average around 10-20 minutes depending on build and luck. One have to say that, the totally same environment, depending on your luck, might takes just 7-8 minutes to build on a lucky day and 19-20 minutes on an unlucky day). With curated environment you skip this building and directly went into "queue" state and viola, wait for resizing, and you can now use the node. **If you need extra packages** (and they do not need to "restart the kernel" after pip install), you can do within your .py file at the top, 
```python
import os
os.system("pip install ...")
```
and that would do fine. Although if you want to keep your code clean, it is not recommend to do it this way, and during testing and debugging this would speed up so it's fine. Just remove it and put it in a yaml or requirements.txt file after sending the job to train. 

If you really need custom environment, you could use the .yaml file, or you can use `azureml.core.Environment.from_pip_requirements` with pip files (although one haven't tested how this works yet, hence no suggestions), or other methods which you could check out [here](https://docs.microsoft.com/en-us/azure/machine-learning/how-to-use-environments) or some sample notebooks are also available if you have an ML Studio workspace, which mostly are useful although some are older notebooks and give deprecation warnings on running them. 

More preferably, create your custom environment from dockerfile. Clicking into curated environment actually shows you a dockerfile configuration on the right hand side

![](assets/images/AzureML1.png "Curated environment DockerFile configuration")

and on the main page of the Environment you can see a Custom Environments tab at the top and you could copy this configuration and create your own configuration, and change them accordingly, such as exclude Horovod (if you don't need multi GPU, multi machine training), include additional packages, install different version of python, choose a different docker image [here](https://hub.docker.com/_/microsoft-azureml) that may use a different version of CUDA (example, PyTorch is compatible, at least mention on their home page where installation is available, with CUDA 10.2 and 11.1, but nothing on 11.0, so you might want to use CUDA 10.2 image). For example: 
```dockerfile
FROM mcr.microsoft.com/azureml/openmpi3.1.2-cuda10.2-cudnn8-ubuntu18.04

ENV AZUREML_CONDA_ENVIRONMENT_PATH /azureml-envs/pytorch-1.9

# Create conda environment
RUN conda create -p $AZUREML_CONDA_ENVIRONMENT_PATH \
    python=3.8 \
    pip=20.2.4 \
    pytorch=1.9.0 \
    torchvision \
    torchaudio \
    cudatoolkit=10.2 \
    nvidia-apex=0.1.0 \
    -c anaconda -c pytorch -c conda-forge

# Prepend path to AzureML conda environment
ENV PATH $AZUREML_CONDA_ENVIRONMENT_PATH/bin:$PATH

# Install pip dependencies
RUN pip install 'matplotlib>=3.3,<3.4' \
                'psutil>=5.8,<5.9' \
                'tqdm>=4.59,<4.60' \
                'pandas>=1.1,<1.2' \
                'scipy>=1.5,<1.6' \
                'numpy>=1.10,<1.20' \
                'azureml-core==1.31.0' \
                'azureml-defaults==1.31.0' \
                'azureml-mlflow==1.31.0' \
                'azureml-telemetry==1.31.0' \
                'azureml-dataprep[pandas]==2.18.0' \
                'tensorboard==2.4.0' \
                'tensorflow-gpu==2.4.1' \
                'onnxruntime-gpu>=1.7,<1.8' \
                'future==0.17.1' \
                'efficientnet_pytorch' \
                'Pillow' \
                'pathlib' \
                'torchsummary' \
                'torchtext==0.10.0' \
                'scikit-learn==0.24.1'

# This is needed for mpi to locate libpython
ENV LD_LIBRARY_PATH $AZUREML_CONDA_ENVIRONMENT_PATH/lib:$LD_LIBRARY_PATH
```
works with [this](https://pytorch.org/tutorials/beginner/transformer_tutorial.html) tutorial from PyTorch. 

Another thing is, during testing phase it's easy to get fired up, and one cannot deny one does gets more aggressive when things doesn't want to run your way, and one can't really talk about how to put out the fire, and on the programming side, be sure to check the error message. Sometimes it might be programming error from your side in which if you notice that error doesn't seems to come from yaml file or other reasons (by checking the log files for your experiment, available after clicking into your environment, in the **Outputs + logs** tab, then if you manage to get to the phase of where your program error is the reason, all the print statement, tqdm, and their outputs will be under **azureml-logs/70_driver_logs.txt**. Ensure the error is from the programming side and not others is slightly trickier than running directly on a dedicated instance with jupyter notebook. Reason is, because the curated environment uses Horovod and is specialized for multiprocessing, at least for pytorch, you might need to add a line `torch.multiprocessing.set_start_method('spawn')` to ensure it is running. Although, this might just as well be a case of unluckiness and perhaps it is not needed after all. Try and see if it runs. 

Also, with the yaml file, when installing pytorch, you might want to ensure it is installed with GPU, though one could not give useful suggestion on how to do this as one haven't figure out how to do this as well. One have to say, though, that although cudatoolkit is installed in the conda.yaml file, pytorch ends up only compiling with CPU and this can be tested by forcing to use CUDA and it fails. Or if you see you are training very slow with a GPU instance (expected few minutes per epoch but showing 5 hours per epoch), you will know why. 

What about GPU instance? Choosing a GPU instance also have a trick. With sending jobs to Azure you most likely want to use **low priority** instance, but since it is "low priority", then consider what instance are popular and what aren't. For example, if you choose a P100-backed or V100-backed instance, most probably your experience will be hell (trying to wait for an unused GPU might be a nightmare), and it is just not worth choosing that kind of instance when everyone is using it. Instead, choose other less stronger instance, and you might have a better experience. And sometimes you might want to test if GPU really speed up your training, if not, perhaps running on a CPU instance (albeit a many-cores one, like 16 cores or above) might suffice. Although in this case you might as well reserve a dedicated instance when you finished writing the code and rent it immediately, run it directly on Azure notebook (or VSCode or Jupyter notebook or R studio, etc whatever they let you to connect to their instance) might be a better choice, with more control and faster testing. 

### And last but not least
Remember to save your model to "outputs" folder or you would not have it for inference or continue training later when you need it! 

And that's all one have to say for today. Thank you for your time reading and I hope you have a nice day! 
