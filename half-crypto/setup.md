---
pagetitle: Debian single dm-crypt partition
author: Garrett Hale
---

Setup
=====

For my tests I am using [Debian 10.2+nonfree firmware](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/10.2.0+nonfree/);
specifically the [net-installer iso](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/10.2.0+nonfree/amd64/iso-cd/).
To get a wholly free (as in freedom) version of Debian I'd still recommend the net-installer labelled under [Small CDs or USB sticks here](https://www.debian.org/distrib/netinst).

As we're just going over the partitioner I'm confident nearly any version will work.

This half-crypto setup can work on BIOS or UEFI boot modes, but I recommend confirming your bootable media boots UEFI.
If you're having trouble creating a UEFI bootable media you can easily overwrite a USB by first finding it by disk size with `lsblk`
and then overwriting it and it's partitions where `sde` in `/dev/sde` is replaced with the found drive in this command

```bash
dd if=debian-10.2.0-amd64-netinst.iso of=/dev/sde bs=4M
```

Note; appending `bs=4M` will load more of the in file into ram, the only reason not to use this is if you don't have 4M of ram to spare.
Afterwards `lsblk` might look as if the drive has 2 partitions like so

```
NAME                  MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda                     8:0    0 465.8G  0 disk
[TRUNCATED]
sde                     8:64   1    15G  0 disk
├─sde1                  8:65   1   376M  0 part
└─sde2                  8:66   1   2.8M  0 part
sr0                    11:0    1   4.3G  0 rom
```

That's enough setup, I'm sure you've got this among the sea of better tutorials on bootable USBs.
