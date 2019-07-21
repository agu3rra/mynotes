# Unix in a Nutshell
Reading notes.

## Installing softwares from source
1st make sure you have a compiler in C and C++ like the GNU Compiler Collection:
```
$ sudo apt install gcc
```

Building software:
* Download using `wget` or `curl`.
* Decompress
* Run `configure`.
* Run `make`.
* Optional: run the program’s test suite.
* Run `make install` as *root*.

Example:
```
$ wget ftp://ftp.gnu.org/....
$ gzip -d < somepackage.tag.gz | tar -xpvf -
$ cd package...
$ .configure && make
$ make check
$ sudo su
$ make install
```