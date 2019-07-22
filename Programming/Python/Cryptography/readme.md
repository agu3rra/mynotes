# Practical Encryption and Cryptography using Python
Course notes from PluralSight  
Start date: Jul 21st 2019

<!-- TOC -->

- [Practical Encryption and Cryptography using Python](#practical-encryption-and-cryptography-using-python)
- [Introduction](#introduction)
    - [Course Lab](#course-lab)
- [Hashing](#hashing)
    - [Message Digest - MD5](#message-digest---md5)
    - [Secure Hash Algorithm - SHA](#secure-hash-algorithm---sha)

<!-- /TOC -->

# Introduction
Workflow:
* Hashing
* Symmetric Encryption
* Asymmetric Encryption

Areas of action:
* Information Security
* Penetration Tester
* Application Security

People don't believe in weak ciphers.

## Course Lab
* Cracking Machine with 5 GPU's
* http://ethicalhackingblog.com
* hashcat (use it on Kali): `$ docker run -it agu3rra/kali /bin/bash`
    - save container: `docker commit [container_id] agu3rra/kali:mytag`

# Hashing
* One way hash function: h=Hx
    - h - digest
    - Hashing algorithm(H): MD5, SHA-2 etc.
    - x - input

**Requirements:**
1. Applicable to any kind of input
1. Output is of fixed length
1. Output is easy to compute
1. Output is not reversible
1. Hx != Hy (collition resistant)

## Message Digest - MD5
* Outputs 128bits (32 hex)
* Shall not be used to store passwords
* May be used for other applications

Using Python3:
```python
import hashlib
hashlib.md5(b'some byte message here.').hexdigest()
```

## Secure Hash Algorithm - SHA
* SHA1: 160 bits
* SHA2:
    - 224, 256, 384, 512
* SHA3:
    - 224, 256, 384, 512
