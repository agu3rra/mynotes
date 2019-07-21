# DAST Tool Evaluation: Arachni
*Feb 23rd 2019 - by Andre Guerra*

The purpose of this report is archive my findings around the Arachni DAST scanner and its fit for being used in a CICD software development pipeline. Items to evaluate initially (not limited to):
* Project updates
* CLI interface completeness
* False positives
* Authentication Methods available.

# Test environment setup
I'll use a docker container to run a vulnerable application and test it against the following (at a minimum):
* SQLi
* XSS
* CSRF
* Header Security parameters
* Supported encryption protocols (TLS 1.2 or above allowed)
* Using components with known vulnerabilities

# Arachni
Last updated on Git on Mar 29th 2017 (2 years ago)  
Effective scanning capabilities regarding 0% false positives for a few test cases.  
Main developer used to work for Rapid7.  
0% false positives in:
* SQLi
* Reflected XSS
* Local file inclusion
* Remote file inclusion
* Unvalidated redirect
* Backup files

## Features
http://www.arachni-scanner.com/features/framework/ 
* Authentication: SSL-based, form based, Cookie-Jar, Basic-Digest, NTLM, Kerberos and others.
* Integrated Browser Environment: this ensures efficiency even against SPA's.
* Distributed architecture: one can program multiple scans at a time.
* REST API: Over HTTP, JSON
* Header auditing
* Modularized
* Platform fingerprinting: OS, WebServer, languages, Frameworks
* Checks: Active and Passive. 
    * Active: SQLi, Blind SQLi (differential and timed), NoSQLi, Blind NoSQL, CSRF, Code injection, Blind code injection (timed), LDAP injection, Path traversal, File inclusion, XSS.
    * Passive: allowed VERBS, header security
* Reporting: HTML, XML, Text, JSON, Marchal, YAML, AFR.
* Trainer Subsystem: incorporate knowledge as the scan progresses. Usually not required.

## Install
Simply decompress the `tar.gz` file and call it from the CLI.

## SSO
Found this link posted by the main developer (Tasos Laskos):
* http://support.arachni-scanner.com/discussions/questions/11594-single-sign-on
* http://support.arachni-scanner.com/kb/general-use/logging-in-and-maintaining-a-valid-session

## Remote Automation
`arachni_rest_server` can be put to run in an environment and it can be interacted with via its API. Documentation can be found here: https://github.com/Arachni/arachni/wiki/REST-API

## Reporting
`arachni_reporter`

# Q&A:
1. What is a DOM tree and why should I care how deep the scanner goes into it?  
A:

# Log
Opening `./arachni -h`, I got bombarded by a very extensive set of options on the CLI tool. That's not really a bad thing, but before we dig into the particulars of the tool, I'll try the demo, then I'll launch the UI and check how well a scan against DVWA does.

Spinning up a docker container for DVWA:  
`docker run -d -p 5000:80 citizenstig/dvwa`  
Now accessible at `http://localhost:5000`

## 1st scan at DVWA
Loopback scan is not supported. I'll need to create a docker container in a VM to get it done.

## 2nd scan at DVWA
* Main URL given and default profile selected
* 18 issues identified, including header security
* Security set to *impossible*.

## 3rd scan at DVWA
* Security set to low
* Same scan settings as before
* 18 issues identified.
* I believe since the authentication is missing, there's little that could be identified.

## 4th scan at DVWA
* Lookup at *Profile* settings in Arachni. Find if there's any place to define authentication.
* Profiles have indeed all the details I'd require to properly setup a scan during its onboarding phase. I need to understand what all of these mean.
* Idea for later: deploy the main app in the Cloud and containarize remote workers. All they require is a base linux image and the main remote app to run.
* Useful information on scoping: https://github.com/Arachni/arachni/wiki/Command-line-user-interface#scope
* http://support.arachni-scanner.com/discussions/questions/13045-how-to-configure-arachni-to-be-able-to-scan-pages-which-contains-navigation-based-on-tab-paths
* So the scan has been running for about 1.5 hour now. I see 303 timed out responses. Given that I set it up to 5 seconds and the average request takes about 0.138 seconds to complete, it is evident how important this config is.
* The scan for about 12 hours without completion, so I aborted it. Important take aways:
    1. Choose active audits more carefully, so the scan can complete timely.
    2. Assumming passive audits will be faster, so I'll keep them all.
    3. Analyse results after finished scan, so that the meta analysis run and eliminates false positives.

