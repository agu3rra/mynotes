# Enabling HTTPS on Apache Tomcat
This quick tutorial will walk you step-by-step on the setup of HTTPS in the Apache Tomcat web server. It’s based on my scavenger hunt reading through documentation available Apache.org as well as my learning experience to even understand how and why I needed a certificate for such. This article’s main audience is sysadmins that need to enable HTTPS for web servers hosted inside a corporation’s intranet, where there is an internal department that issues certificates and is therefore considered to be the company’s Certificate Authority (CA).

## Process Overview

## Why?
A corporate intranet can’t be considered a fully safe environment where IT security can be taken lightly. IT Security is about layers. The more layers of security you have, the harder it will be to have computer systems compromised. Encryption is one of these layers and it is very straightforward to implement. Let’s get to it:

## Obtaining a certificate
Your company’s CA will require a Certificate Request File (.crf) in order to generate your certificate (.cer or .p7b file). That certificate will be the private key of the asymmetric encryption handshake process to establish HTTPS communication. To generate

Subject Alternate Name (SAN)

## Importing your certificate
Tomcat’s keystore
Java cacerts

## Setting up your connector

## Resources
