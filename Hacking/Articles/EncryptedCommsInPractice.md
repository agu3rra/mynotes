# Encrypted Communications In Practice (draft)
A recurring subject in the corporate world is how to secure web applications' communications, namely how to enable [*HTTPS*](https://en.wikipedia.org/wiki/HTTPS). The process is very straightforward and it gives us an opportunity to grasp a better understanding of how encrypted communications work.

# Summary
<!-- TOC -->

- [Encrypted Communications In Practice (draft)](#encrypted-communications-in-practice-draft)
- [Summary](#summary)
- [Why Encrypt](#why-encrypt)
- [What is not protected under HTTPS](#what-is-not-protected-under-https)
- [Components](#components)
- [Asymmetric Encryption (Public-key encryption)](#asymmetric-encryption-public-key-encryption)
- [How to generate a pair of asymmetric keys](#how-to-generate-a-pair-of-asymmetric-keys)
- [Requesting client-side certificate](#requesting-client-side-certificate)

<!-- /TOC -->

# Why Encrypt
* attackers

# What is not protected under HTTPS
* headers
* CSRF attacks
* Privacy (use a VPN for that)

# Components
* Web Application
* Web Server
* Certificate Signing Request
* Key storage (.keystore, .key)
* Certificate Authority (CA)
* Certificate (.cer, .pem, .crt, p7b)
* Pair of asymmetric encryption keys (server side)
* Symmetric encryption key (client)

# Asymmetric Encryption (Public-key encryption)

# How to generate a pair of asymmetric keys

# Requesting client-side certificate