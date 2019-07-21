# Bootable macOS USB

```
hdiutil convert -format UDRW -o ~/Path-to-IMG-file ~/Path-to-ISO-file
hdiutil convert -format UDRW -o ~/Downloads/ubuntu-14.10-desktop-amd64 ~/Downloads/ubuntu-14.10-desktop-amd64.iso

diskutil list

diskutil unmountDisk /dev/diskN
diskutil unmountDisk /dev/disk2

sudo dd if=/Path-to-IMG-DMG-file of=/dev/rdiskN bs=1m
sudo dd if=~/Downloads/ubuntu-14.10-desktop-amd64.dmg of=/dev/rdisk2 bs=1m

diskutil eject /dev/diskN
diskutil eject /dev/disk2
```

Then boot your Mac while holding the `Option` key.
