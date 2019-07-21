# Docker Deep Dive
by: Nigel Poulton (@nigelpoulton)  
5th Edition (Feb 2018)  

<!-- TOC -->

- [Docker Deep Dive](#docker-deep-dive)
- [Intro](#intro)
- [PART I: The Big Picture](#part-i-the-big-picture)
    - [1: Containers from 30.000 feet](#1-containers-from-30000-feet)
        - [The old days](#the-old-days)
        - [VMWare](#vmware)
        - [Containers](#containers)
            - [Linux containers](#linux-containers)
    - [Docker and storage drivers](#docker-and-storage-drivers)

# Intro
* *From Zero to Docker in a single book!*
* Docker released its first professional certification in the fall of 2017. It's the *Docker Certified Associate (DCA)*.
* The book is more up-to-date and cover additional material then the corresponding courses at *Plural Sight*.
* 2 major sections of this book: *big picture* and *technical stuff*.
* Sections divided into:
    - TLDR;
    - Deep Dive;
    - Commands;

* Kindle edition gets updated at no extra cost! Access Amazon > Your Account > Content and Devices > Select the book title and hit the update button.

# PART I: The Big Picture
## 1: Containers from 30.000 feet
### The old days
* One application per server (OS)
* Purchase of new hardware for every new app.
* Guessing hardware requirements for every new app. Servers operated at about 5-10% of their capacity

### VMWare
* Virtualization makes it possible to compartimentalize OS's on the same hardware.
* Downside: Every VM is usually underused as well as it requires a full OS to run. Lots of CPU/RAM and other resources go to waste to run the OS.
* OS's need patching and monitoring (sometimes also a license).

### Containers
* Analogous to VM, but run on top of a shared OS. Less OS Patching overhead.
* More portable (small sized): easy to move from laptops to cloud to VM's or base metal in data centers.

#### Linux containers
This is where modern containers started.  
Enabling technologies:
* kernel namespaces;
* control groups;
* union filesystems

## Docker and storage drivers
Every container gets its own storage area in the machine it is running on. historically this has been managed by the *storage driver* (aka *graphdriver*). Docker on Linux supports different drivers and this can have an impact on both performance and stability.

## The Ops View
After installing Docker, you get:
* Docker client
* Docker deamon (aka server or engine)

The daemon implements the *Docker Engine API*.

# Commands Reference

``` docker
docker ps

# Run container into terminal
docker container run -it <image>

# Quit container terminal without terminating it
CTRL-PQ

# Attach to running container
docker exec -it <container> bash
```