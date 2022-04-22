# Azure VM with VSCode Re-setup

Sometimes, using React can destroy the connectivity to your Azure VM. Hence, we need to re-setup the VM if you can never SSH back in, plus you don't set up GUI/RDP connection to the VM. Here's how we quickly get it back up. 

## Setup `create` command
We forever lost `create_rb.sh` file, which we'll have to figure out that. However, the other `create` command is still here. 

In `~/.my_custom_commands.sh` (which we have to make ourselves), put this function in. (Later, we could also put `create_rb.sh` data in after we manage to get back what we need. 

```bash
#!/bin/bash

# touch and open in VSCode
function create() {
  touch $1 && code $1
}
```

Then, we link it to `~/my_init_script.sh`: 

```
#!/bin/bash

source ~/.bashrc
source ~/.my_custom_commands.sh
# binaryen wasm-opt here also via export PATH=...
```

