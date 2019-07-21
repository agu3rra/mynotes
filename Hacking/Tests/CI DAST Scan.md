# DAST scans in a CICD development pipeline

# Summary
<!-- TOC -->

- [DAST scans in a CICD development pipeline](#dast-scans-in-a-cicd-development-pipeline)
- [Summary](#summary)
- [Process idea](#process-idea)
    - [Application Onboarding](#application-onboarding)
    - [Install the DAST tool in the CI tool](#install-the-dast-tool-in-the-ci-tool)
    - [Reporting](#reporting)
- [Initial list of checks](#initial-list-of-checks)
- [Tools to consider:](#tools-to-consider)
- [Learning path](#learning-path)
- [References](#references)

<!-- /TOC -->

# Process idea

## Application Onboarding
This is the *first scan* of the target application. Consider the specifics regarding **technology**, method of **authentication** and **scope**. Ideally reduce scope to yield significant results while reducing the number of false positives.

This is also when you setup the method to store and retrieve credentials for future application deployments.

## Install the DAST tool in the CI tool
Since the scan will be triggered once the application is deployed to at least a staging area, have it installed in the CI tool in use for the project (Jenkins, TFS etc). Idealy the DAST tool should have CLI support.

E.g.: Run Arachni if the build succeeds for XSS vulns only.
```
$ /opt/arachini-1-4.0.5/bin/arachini https://mytarget.com:8443 --checks=xss*
```

Additional CLI info [here](https://github.com/Arachni/arachni/wiki/Command-line-user-interface).

## Reporting
Upon task completion, you should have a way to extract results and report findings. Options to csonsider:
* Using an API to push them to a GIT repository in MarkDown format. Python can read CLI output and you can parse it in order to generat a neat looking report in case it is not possible to have the DAST tool export results.
* Create a Django app running in a container simply to receive JSON's in an endpoint and storing them on a DB. Then create a front end application using JavaScript and related frameworks.
* Output items to TFS/Jira for fixing. Use these systems' API to do so.

# Initial list of checks
Check for the following vulnerabilities at a minimum:
* SQLi
* XSS
* CSRF
* Header Security parameters
* Supported encryption protocols (TLS 1.2 or above allowed)
* Using components with known vulnerabilities

# Tools to consider:
* Arachni
* BURP Enterprise
* OWASP ZAP CLI (this seems to be simply for controlling the ZAP UI desktop version from the command line.)
* ZAP Baseline scan. Runs ZAP spider and does spidering. No actual attacks.
* Detectify (out-of-scope since it's a cloud solution - SaaS)
* Jenkins
* Use a bundle of python tools such as [SQLMAP](http://sqlmap.org) and SSLYZE?

# Learning path
Since there will be a lot of different technologies in use, make sure you master the following at some extent:
* *Docker* containers: these constitute the foundational components of a major container orchestration system like *Kubernetes* or even the more abstracted *OpenShift*. Know how to create them and how to make persistency volumes that don't reset if your container goes momentarialy offline.
* DAST tools: make sure you can trigger a scan with the lowest number of false positivies. No issues in exploring a tool from a UI, but it needs to have a CLI support since you will be calling it from a CI system such as Jenkins.
* CI Tools: especially *Jenkins* since it's open source and easy to install AND it's one of the main tools you need to master for the CST project.

# References
* https://blog.secodis.com/2016/03/17/automated-security-tests-3-jenkins-arachni-threadfix/
* https://github.com/Arachni/arachni/wiki/Command-line-user-interface
* https://www.synopsys.com/blogs/software-security/security-challenges-cicd-workflows/amp/
* https://github.com/Arachni/arachni 
* https://www.we45.com/blog/how-to-integrate-zap-into-jenkins-ci-pipeline-we45-blog 