# What Every Developer Should Know About HTTPS
Notes based out of PluralSight's course by Troy Hunt.

<!-- TOC -->

- [What Every Developer Should Know About HTTPS](#what-every-developer-should-know-about-https)
- [Generating a certificate (Self-Signed)](#generating-a-certificate-self-signed)
- [Secure cookie](#secure-cookie)
- [HSTS](#hsts)

<!-- /TOC -->

# Generating a certificate (Self-Signed)
```powershell
New-SelfSignedCertificate -certStoreLocation cert:\localmachine\my -dnsname example.me.com

$pwd = Convert-SecureString -String "dlakjffdw4lnflds35" -Force -AsPlainText

Export-PfxCertificate -cert:\localMachine\my\<Thumprint_fromCert> -FilePath C:\DEV\cert.pfx -Password $pwd
```

The same is possible using `openssl`.

# Secure cookie
It's an added layer of security. If application is accessed via HTTP, secure cookies don't get sent.

# HSTS
* TOFU: Trust of First Use.
