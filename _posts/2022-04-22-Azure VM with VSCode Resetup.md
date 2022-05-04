# Azure VM with VSCode Re-setup

Sometimes, Azure VM can lost connectivity. **Most probably the reason is frequently changing the "size" of the VM; as other VM that infrequently or never changes size didn't have this problem.** Hence, we need to re-setup the VM if you can never SSH back in, plus you don't set up GUI/RDP connection to the VM. Here's how we quickly get it back up. 

## Setup `create` command
We forever lost `create_rb.sh` file, which we'll have to figure out that. However, the other `create` command is still here. 

In `~/.my_custom_commands.sh` (which we have to make ourselves), put this function in. (Later, we could also put `create_rb.sh` data in after we manage to get back what we need. 

```bash
#!/bin/bash

# touch and open in VSCode
function create() {
  touch $1 && code $1
}


# create ruby files
function create_rb() {
  git add .
  git commit -m $1
  git push
  bundle gem $1
  code $1/lib/$1.rb
}


# archive to online
function archive() {
  tar -czf $1.tar.gz $1
  rm -rf $1/
  sudo azcopy copy $1.tar.gz $2
  rm $1.tar.gz 
}
```

Then, we link it to `~/my_init_script.sh`: 

```bash
#!/bin/bash

source ~/.bashrc
source ~/.my_custom_commands.sh
# binaryen wasm-opt here also via export PATH=...
```

In VSCode `settings.json`, add this line: 
```bash
"terminal.integrated.profiles.linux": {
  "bash": {
    "path": "bash",
    "args": ["--init-file", "~/my_init_script.sh"]
  }
}
```

## Other installation
Install Rust: Inside VM (so it can detect OS), go to rust-lang.org/tools/install. Otherwise, just use this commands: 

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

If you need librocksdb-sys for `near-sdk-sim` simulation tests, make sure to install it: 

```bash
sudo apt-get install -y clang
```

Then install npm; but we'll use nvm to install npm: 

First, download and **follow the instructions printed** from here: https://github.com/nvm-sh/nvm#installing-and-updating

Next, 

```bash
nvm use 16
node -v
npm install -g npm
```

Then we can use npm to install whatever we want: For example: 

```bash
npm i -g near-cli
```

**or any version number** it's updated to. 

## Install Ruby
Ruby is installed by default, but it's not latest version. Hence, we install RVM from here: https://github.com/rvm/ubuntu_rvm

Just the final line needs specify a version. E.g. currently it's 3.1.1 so we do:

```bash
rvm install ruby-3.1.1
```

## Archiving
Archival to Azure blob storage. This is totally lost; basically, tar gz the folder, upload the blob storage via some link that generates immediately when required, then delete the tar.gz file and the folder equally. This requires checking again and put inside `.my_custom_commands.sh` so we don't lose it next time. 

## Warnings
Remember to setup Chrome Remote Desktop before you can't access it forever! 
