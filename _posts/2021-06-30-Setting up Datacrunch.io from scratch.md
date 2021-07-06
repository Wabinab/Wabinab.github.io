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

## Setup
To proceed on, it is assumed that you had already set up everything shown [here](https://datacrunch.io/docs/creating-ssh-key/), and
[here](https://datacrunch.io/docs/connecting-via-ssh/). Accuse me if I am going a little to basic as this assumes one is not familiar with using Terminal. Nobody says one should be familiar with Terminal if they are familiar with Machine Learning, right? Also, if you *did not choose the image with CUDA setup already*, then you would also want to consider looking into the other docs unless you are using a CPU, which just isn't the right choice to be here as there are lots of other platforms that are comparable and perhaps better. 

So, currently if you're not using the fast.ai image after reserving an instance, then everything will have to set up "from scratch". 

Login as **root**. 

The first thing that would make things easy is not a Terminal in front of your screen but a GUI platform. For one reason: most people
are not specialist in using a Terminal console and key in command to control every step the computer does. So we will start by 
installing a GUI. You could install any GUI you like or are experienced with, or follow through with the guide to install
Chrome Remote Desktop by google that is originally targeted for their Cloud Compute Engine [here](https://cloud.google.com/architecture/chrome-desktop-remote-on-compute-engine). 

For completeness sake, I would copy and paste their installation here, with a few omissions for cinnamon. If you prefer xfce
(more lightweight) environment, you could change the code according to the web page. 
- No installation of task-cinnamon-desktop (or task-xfce-desktop if you prefer so) because an Ubuntu installation was not found and perhaps you might consider googling for more information. If you are using Debian instead, the package should be readily available. 
- Skip `sudo systemctl disable ligthdm.service` because the service wasn't found. It is unsure of why this is the case. And since we are disabling it anyways, whether it exist or not is not important here, so we can safely skip it. 

Optional installation that is included in the script below: 
- Chrome browser installation. 

Run the script: (for Linux installation) (Depending on internet speed, this might takes a while to download. Up till now it wasn't too slow to download these files and set them up on datacrunch. The exact time wasn't recorded). 
```bash
sudo apt update
sudo apt-get install --assume-yes wget
wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
sudo dpkg --install chrome-remote-desktop_current_amd64.deb
sudo apt install --assume-yes --fix-broken
sudo DEBIAN_FRONTEND=noninteractive \
    apt install --assume-yes cinnamon-core desktop-base
sudo bash -c 'echo "exec /etc/X11/Xsession /usr/bin/cinnamon-session-cinnamon2d" > /etc/chrome-remote-desktop-session'

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg --install google-chrome-stable_current_amd64.deb
sudo apt install --assume-yes --fix-broken
```

Next, create a new user. **You will need a user because the next step that follows fails to install on root**. 

There is a doc [here](https://datacrunch.io/docs/adding-a-new-user/) by datacrunch made ready for you. Make sure to grant higher
privileges to your new user account. 

**Set a password (Make sure you do this before you log out)**. It is not known of what would happen if you didn't, and you could 
try experimenting with it if you wish. The code is as below. Replace `username` with your username. 

```bash
passwd username
```

Now **log out**. This means close your Terminal window and reconnect, but make sure this time **log in as username** (replacing 
`username` with your username), enter your password (if you are using PuTTY, it fails to use ssh private key, so 
the password you set will be used to login here. 

Then, continue the step on [Configuring and starting the Chrome Remote Desktop service](https://cloud.google.com/architecture/chrome-desktop-remote-on-compute-engine#configuring_and_starting_the_chrome_remote_desktop_service) by following the instruction, go through the *Connecting to the VM instance* section, and *Improving the remote desktop experience* section (except the setting the password section as you already set your password). Check out the other sections if you wish to, for now, this is sufficient for us to continue.

Now you can either continue here on your new GUI, or you could continue from the Terminal console. Regardless of where you are continuing, the following step still uses a Terminal console. Hence, either continue from the Terminal console of PuTTY, or you can open up a Terminal console directly inside. The icon should look like this for those not familiar with it. 

![](/images/terminal_icon_131942.svg "terminal logo taken from https://icon-icons.com/icon/Terminal/131942")

Or sometimes you might not get a terminal but other Terminal emulator such as XTerm (try searching for it in the menu page). 

This includes installing Conda. Here we will use [Anaconda](https://www.anaconda.com/), however if you are more familiar with other Condas such as [Miniconda](https://docs.conda.io/en/latest/miniconda.html) you can go ahead and skip the Conda installation section. 

Copy the bash script and run them, read the installation terms and conditions, and type "yes" to continue. When ask for default
location, Conda [suggests] accepting the defaults if you are unsure about any setting. Also, run the conda init when prompt so you 
could activate the environments (if you want to use them). 
```bash
wget -P /tmp https://repo.anaconda.com/archive/Anaconda3-2021.05-Linux-x86_64.sh
bash /tmp/Anaconda3-2021.05-Linux-x86_64.sh
```

You might find it useful to search Anaconda for the latest package available. 

When finish, run the following line:
```bash
source ~/.bashrc
```

Then you can install what you want, such as RAPIDS, like this: 
```bash
conda create -n rapids-21.06 -c rapidsai -c nvidia -c conda-forge \
    rapids-blazing=21.06 python=3.8 cudatoolkit=11.2
```
Be sure to check out [RAPIDS](https://rapids.ai/start.html) page for the latest installation update and also whether the image
you chosen matches the correct Python and CUDA version. 

### X-Session or Ubuntu (Edit: 03 July 2021)
This wasn't encountered with frequent use of Chrome Remote Desktop until yesterday, where without knowing why, the first thing you login you will see a page asking whether to render using XSession (default) or Ubuntu. By default, choosing XSession could work, but it ends up not. Choosing XSession seems to disconnect instead of rendering graphics. Hence, the choice left is Ubuntu, which successful render, however with an Ubuntu interface instead (which might run slower since 3D rendering is on and one wasn't sure how to disable 3D rendering in Ubuntu). Also, it comes with no app install, including the Chrome Browser above is also not installed, so the caveat is to re-install everything you need in Ubuntu, **including Firefox, File Manager** (yes there's no GUI file manager), and **other tools you need** (such as VSCode or other IDEs). 

Install GUI file manager Nautilus: 
```bash
sudo apt install nautilus-admin
```
(if doesn't work, then)
```bash
sudo apt install nautilus
```

Firefox installation guide can be found [here](https://linuxconfig.org/how-to-install-uninstall-and-update-firefox-on-ubuntu-20-04-focal-fossa-linux)

### Conclusion
That concludes setting up Datacrunch.io for it to work. 

Of course, there comes with one major drawback of datacrunch.io, which is that using NVMe as storage (which is the default storage) has an expensive upkeep, and it is encouraged to keep your volume small, just sufficient to install the required packages. It is unsure of whether you could connect two different Volume (one OS volume and another non-OS volume) to the same instance. If this works, you might consider letting the OS storage stays as using NVMe for fast bootup and storing other larger files on a hard disk (which is a quarter of NVMe cost in datacrunch.io). Otherwise, consider hosting your data somewhere else where it might be much more cheaper like Google Cloud Bucket, Azure Blob Storage, or AWS S3 bucket, and "flow" them (download them into memory) during ML training. 

Other drawback outline by above is everytime you want to remote desktop in, it requires you allow access again after the first time you have set it (as your instance will change name to the OS volume). Afterwards, everytime you start up the server, you won't have to set it up. The underlying mechanism of it cannot detect the old setup is unknown. Just start from **configuring and starting the Chrome remote desktop service** (i.e. go to [here](https://remotedesktop.google.com/headless) and setup from there, ssh into your vm with non-root account, set it up, then connect). This is **only true if you are using the same instance name every time**, so make sure to change the instance name since datacrunch make your instance name different depending on the instance type you chose. 

Happy learning! 

### Edit 06 July 2021
Connection of second hard drive proven not working. Although it can be discovered as a partition (albeit not a clean partition, and perhaps you might need to wipe it out and make it useable before able to discover it through `df -h`). Hence, the best way is to have a SSH hard drive hosted somewhere else and connect to it via username **and password** (not sure if without password connection can work or not, requires you to try it yourself). This can be done if you have a cinnamon XSession, go to File, click "connect to server" and select SSH. You might want to change the folder (absolute path) to mount. 

If you get the choice to choose XSession and Ubuntu (which is very rare, encountered once and un-replicable thereafter) after you install the file manager you can click on Other location and type "ssh://<your-public-ip-address>" which would redirect you to the login screen to enter username and password. By default, this would mount the main folder. Direct yourself to "home" to find the usual directory from there. 
