Installing
==========

Make sure you're booting via UEFI, motherboards like to be coy about this so maybe disable legacy booting if it's an issue.
If you're booting via BIOS (legacy) then GRUB can have issues finding other operating systems.

I only tested on the non-graphical install, it's likely this can be done with the graphical installer.
Continue through the installer entering time zones, usernames, and passwords until you reach the partitioner.

Partitioning
------------

In my tests I wanted a clean slate so I wrote new partition tables for my drive `sda`,
if you have data or your partitions are already split you should likely avoid doing that.

UEFI
----

UEFI requires a special `system EFI` partition, it can be very small the norm seems to be 512MB.
When selecting `system EFI` as the partition type everything will be automatically set up.

Create a small 512MB `ext2` partition for `/boot`, this cannot be encrypted and will hold more Debian boot data.

dm-crypt
--------

Make a partition for the Debian operating system; if you intend to put some personal files on here maybe 100GB will do,
otherwise 40GB is more than enough for just the system and apt-installed applications.
This partition will be set to "Physical volume for `dm-crypt`" type, if you had data previously on this drive make sure "Erase drive" is "yes".
The single encrypted partition will use an LVM for many reasons,
I feel most importantly so that we only have to decrypt the drive once for multiple volumes/swap space.

This process sort of mounts the encrypted partition; if you want to resize your encrypted volume you can NOT do it after setting up encryption.
Restarting the installation is your only way back from here.
Now that you have a crypto partition select "Set up encryption" and in the selection area pick the drive marked crypto or find it by partition size.
This will ask for the passphrase and erase the disk with random data, if selected come back in a fat minute, cancelling the erasure is perfectly safe.
Afterwards it will give the same screen to "choose encrypted partition" or "finish" though there is little feedback, pick finish.

LVM
---

Now you should see the partitioner page expanded with a `dm-crypt` section, select the 40-100GB partition in that section.
You should select the type "Physical volume for LVM", and hit done but we're not done yet, back in the partitioner screen select "Configure LVM".
Now selecting the `/dev/mapper/crypto` drive or by partition size.
Create a volume group, I believe the standard naming convention is `hostname--vg` could be literally anything, don't let nerds weigh you down.

It's up to you how you'd like to divy up the partitions, if you're worried about space just a root and swap partition is perfectly fine.
If you're worried about stability then I'd recommend making separate `/var`, `/tmp`, and root.
Either way you want to start making logical volumes from smallest to largest,
the names of these volumes is also made up, typically `var`, `tmp`, `root`, and `swap_1`.

Create the volumes in this order (assuming 40GB)
Root will be the largest, remaining data for the volume group.

|	size	|	name	|
|	----	|	----	|
|	2GB		|	tmp		|
|	10GB	|	var		|
|	8GB		|	swap_1	|
|	20GB	|	root	|

Finish lvm configuration, we still need to use these volumes as mount points and set partitions for them.

You'll notice the partitioner has grown in subsections for your drive.
For each logical volume set the partition type and mount point; since these are all system points they'll be listed in the menu.
You can change the partition type of `tmp` and `var` to any file system; setting `tmp` to `ext2` can help SSD health.

|	name	|	partition	|	mount	|
|	----	|	---------	|	-----	|
|	root	|	ext4		|	/		|
|	var		|	ext4		|	/var	|
|	tmp		|	ext4		|	/tmp	|
|	swap_1	|	swap space	|	N/A		|

Once the logical volumes are set and you have both a root, and a unencrypted `/boot` partition you shouldn't have any errors finalizing this partition scheme.

Free Space
----------

I don't believe any installer partitioner comes with NTFS, you can leave the space unallocated for Windows or `apt install ntfs-3g` to partition the shared section.
You will have to install `ntfs-3g` to read the partition on Debian.
