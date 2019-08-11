# Getting Started with NMAP
Course notes from PS  
Start date: Aug 10th 2019

<!-- TOC -->

- [Getting Started with NMAP](#getting-started-with-nmap)
- [Setting up a lab](#setting-up-a-lab)
- [Basic Functions](#basic-functions)
    - [Phases](#phases)
        - [Phase 1](#phase-1)
        - [Port scanning](#port-scanning)
        - [Version detection](#version-detection)
        - [Final](#final)
    - [Command structure](#command-structure)

<!-- /TOC -->

# Setting up a lab
Though the course uses VMs to setup an infrastructure to be tested, I'll go with Docker containers to provide sample machines I can scan in the network:
1. WebServer service running some website
1. A DNS server
1. As a DHCP I'll use my own physical router.
1. I can also target to scan all other devices I have on my network.

# Basic Functions
* How nmap scans.
* How is an nmap command formated.

## Phases
9 sequential phases:
1. Target enumeration
1. Host discovery
1. Reverse-DNS resolution
1. OS detection
1. Version detection
1. Port scanning
1. Traceroute
1. Script scanning
1. Output


### Phase 1
* List of target IPs based on user input
* Determine which hosts are online
* Reverse DNS to determine names of hosts

### Port scanning
* send probes and collect responses
* Classify ports into different states based on responses (OPEN, CLOSED, FILTERED).

### Version detection
* Additional probes that analyse responses to determine OS.

### Final
* nmap contains its own traceroute function
* NSE (Nmap Scripting Engine) can be used to expand on nmap's capabilities
* Results are output to the screen.

## Command structure
`nmap`to 
