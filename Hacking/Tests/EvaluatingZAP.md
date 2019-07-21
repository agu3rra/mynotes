# Evaluating ZAP
Motivation: verify if OWASP ZAP can be used in conjunction with a CI tool. Quality of findings must be top notch and it should scale for any number of simultaneous scans.

Start with simple checks:
* SQLi
* XSS
* HTTP header analysis

Evaluation criterias:
1. Authentication availability options
2. Quality of findings (false positives)
3. Repeatability
4. Speed
5. Automation and integration with CI tool
6. Scalability

For the purposes of this evaluation the CI tool of choice was [Jenkins](https://jenkins.io) given it is open source and easy to deploy using [Docker](https://www.docker.com).

# Table of Contents
<!-- TOC -->

- [Evaluating ZAP](#evaluating-zap)
- [Table of Contents](#table-of-contents)
- [Experiments Roadmap](#experiments-roadmap)
- [Lab setup](#lab-setup)
    - [Installing ZAP](#installing-zap)
    - [Installing Jenkins](#installing-jenkins)
    - [Installing DVWA](#installing-dvwa)
    - [Installing Vulnerable App from source](#installing-vulnerable-app-from-source)
- [Notes](#notes)
    - [My automated scan idea so far](#my-automated-scan-idea-so-far)
    - [ZAP](#zap)
    - [zap2docker](#zap2docker)
    - [Jenkins Plugin](#jenkins-plugin)
    - [Application Onboarding methodology](#application-onboarding-methodology)
    - [Useful ZAP Python API commands](#useful-zap-python-api-commands)
- [Activity Log](#activity-log)
    - [Mar 23rd 2019](#mar-23rd-2019)
        - [Lab time](#lab-time)
    - [Mar 16th 2019](#mar-16th-2019)
    - [ZAP Headless (deamon)](#zap-headless-deamon)
        - [Access it from outside the container by](#access-it-from-outside-the-container-by)

<!-- /TOC -->

# Experiments Roadmap
1. Scan sample application using the Desktop version.
2. Export setting files required to repeat the desktop scan without human intervention
    * Do the findings check out with 1?
    * Possible files: context; scan policy
3. zap2docker
    * Intantiate a container and pass along settings to repeat the scan from step 2.
4. API
    * Repeat the scan using the API. Trigger ZAP in *daemon* mode.
5. Deploy vulnerable app from source using Jenkins
6. Run scanning on it:
    * Manual scan 1st (Onboarding)
    * Repeated scan (using setup files from 1)
    * Plug-in automated scan to CI pipeline.

# Lab setup
The lab was setup by obtaining and installing the following tools:
* OWASP ZAP: Desktop and Docker versions
* Jenkins: running in a docker container
* Vulnerable applications (running in docker)
    - Damn Vulnerable Web App (DVWA)
    - Vulnerable Django app

## Installing ZAP
Simply download and install from https://github.com/zaproxy/zaproxy 

## Installing Jenkins
Full set of instructions here: https://github.com/jenkinsci/docker/blob/master/README.md 
```bash
# Run container with a persistent volume
docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts

# Accessing logs to get initial setup password
docker logs <container_id>
```

## Installing DVWA
```
docker run -d -p 3000:80 citizenstig/dvwa
```

## Installing Vulnerable App from source
The idea is to have a vulnerable application from source in order to test the automation capabilities of the CI tool once code is commited.

Install steps:
* Create a Dockerfile.
* Run the application on Docker to test it.
* Add deployment settings into CI tool.

App options:
* https://github.com/anxolerd/dvpwa
* https://github.com/nVisium/django.nV
* https://github.com/andresriancho/django-moth 

# Notes

## My automated scan idea so far
1. Configure CI tool to pull code from repository (using SSH keys).
2. Build solution.
3. Deploy to *scanning* and *production* areas.
4. Instantiate a docker container running ZAP in daemon mode (headless)
5. Use a script to make all API calls to configure and trigger the scan.
6. Report results.

## ZAP
* SPA scans require a context to determine how the dynamic pages are rendered.
* ZEST scripts allow for very advanced authentication methods.
* Increased thresholds in the scan policy will decrease the number of false positive at the cost of increased number of false negatives.
* Threshold value *OFF* disables specific policy checks.
* There's no need to use the UI to interact with ZAP: see `-deamon`. This is also known as *headless* mode. Since it makes ZAP's API available, all of its endpoints can be interacted with using any programming language to customize a scan via HTTP requests.
* ZAPCLI is a 3rd party CLI wrapper (python one)
* Replacer options (or any options in the menu) seem to be saved for all sessions. They don't get exported with context. The same would hold for upstream proxy rules.

## zap2docker
* ZAP Baseline.
* Running it with `docker run -t owasp/zap2docker-stable zap-baseline.py -t http://dvwa.com:3510 -n DVWA.context`

docker run -t owasp/zap2docker-stable zap-baseline.py -t http://dvwa.com:3510 

docker run -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py -t http://dvwa.com:3510 -n DVWA.context 

-v $(pwd):/zap/wrk/:rw

* It was successful against trello.com. Attempt running DVWA on a VM and see if that solves it.
* Claudio from Google Groups mentioned a successful setup with modification of `baseline.py` on a Bamboo server (CI provided by Atlassian - probably). He uses the UI for getting to the right settings and then exports them to be used in the CI tool. He mentioned a *zest script* for the authentication piece.
* *Zest is a specialized scripting language developed by the Mozilla security team and is intended to be used in web oriented security tools*. Source: https://github.com/mozilla/zest/wiki
* One can create Zest scripts out of ZAP's UI. They allow the repetition of actions made in ZAP
* Custom baseline.py code:
```python
   if not context_file:
        contexts = os.listdir(os.path.expanduser('~/.ZAP_D/contexts'))
        if len(contexts) > 1:
            logging.error('More than 1 context found in .ZAP_D/contexts. Please, use the option -n to specify one')
            sys.exit(3)
        if len(contexts) == 0:
            logging.error('No context found in .ZAP_D/contexts')
            sys.exit(3)
        context_file = contexts[0]
    context_id = zap_import_context(zap, context_file)
    logging.info('Imported context file {}'.format(context_file))

    # Import URLs
    if target_url:
        target_file = os.path.join(os.path.expanduser('~/.ZAP_D'), 'scan-urls')
        f = open(target_file, 'w')
        f.write(target_url)
        f.close()
        logging.info('Adding {} on file {}'.format(target_url, target_file))
    res = zap.importurls.importurls(target_file)
    urls = zap.core.urls()

    logging.info('Imported URLs File {}. Loaded {} urls'.format(target_file, len(urls)))
    for url in urls:
        logging.debug('- {}'.format(url))
    logging.debug('Import warnings: ' + str(res))

    if len(urls) == 0:
        logging.warning('Failed to import any URLs')
        # No point continue, there's nothing to scan.
        raise NoUrlsException()

    # Set up the scan policy
    if not scan_policy:        
        policies = os.listdir(os.path.expanduser('~/.ZAP_D/policies'))
        if len(policies) > 1:
            logging.error('More than 1 policy found in .ZAP_D/policies. Please, use the option -p to specify one')
            sys.exit(3)
        if len(policies) == 0:
            logging.error('No policy found in .ZAP_D/policies')
            sys.exit(3)
        scan_policy = policies[0].rstrip('.policy')       
```
* According to [this](https://www.nearform.com/blog/zed-attack-proxy-in-a-ci-pipeline/), it looks like the docker version of zap doesn't require the corresponding Jenkins plugin to work.

## Jenkins Plugin
* Looking at the way the Official plugin for Jenkins is setup, it does seem to require a running instance of ZAP at a given host:port. I assume since I've pointed the URL to the installer to jenkins and added it as `localhost`, that it will execute ZAP from within Jenkins as oposed to my local computer.
* No need to start ZAP in daemon mode in order for the plugin to work. It only requires ZAP to be installed in the Jenkins machine. *Learned it over a lecture by Simon B.*.

## Application Onboarding methodology
* Fine tunning target application by manual scanning.
* Determine app workflow and functionalities by using it.
* Fire up developer mode and determine technology employed (web server, languages and frameworks)
* Upstream proxy (if required). Under *Tools > Options > Connections*.
* Replacer patterns. If pieces of the HTTP requests need to be tempered with in order for the scan to work. Under *Tools > Options > Replacer*.
* Context. For login and scope definitions.
* Customize scan policy.
* Add-ons: Spider Open API definition. For building API scan trees.
* Recommended Flow:
    1. Experiment with UI
    2. Export settings (policy, context)
    3. Reproduce through API
    4. Convert to script

## Useful ZAP Python API commands
`$ pip install python-owasp-zap-v2.4`

```python
from zapv2 import ZAPv2

target = 'http://dvwa.com'
zap = ZAPv2(apikey='my_api_key',
            proxies={
                'http':'http://localhost:8090',
                'https':'https://localhost:8090',
            })
zap.urlopen(target)

# Spidering
id = zap.spider.scan(target)
time = sleep(5)
while int(zap.spider.status(id)) < 100:
    progress = int(zap.spider.status(id))
    print('Spidering: {}%...'.format(progress))
    time = sleep(5)
print('Spider complete.')

# AJAX Spider
id = zap.ajaxSpider.scan(target)

# Active scanning
id = zap.ascan.scan(target)

# Reporting
zap.core.xmlreport() # this can be writting to a file

# All reporting data - I think it may be a little different than the video
offset = 0
page = 5000
alerts = zap.core.alerts('', offset, page)
while len(alerts) > 0:
    for alert in alerts:
        # Do what you want
        offset += page
    alerts = zap.core.alerts('', offset, page)

# Turning it all off
zap.core.shutdown()
```

**Question to answer by experiment:** Do I need to have ZAP installed if I am running it via its Python API?

# Activity Log

## Mar 23rd 2019
Successfully ran zap2docker in deamon mode and called its api UI:
```bash
docker run -u zap -p 8090:8090 -i owasp/zap2docker-weekly zap.sh -daemon -host 0.0.0.0 -port 8090 -config api.addrs.name=.* -config api.addrs.addr.regex=true -config api.key=fidelio

# This one also worked
docker run -u zap -p 8090:8090 -i owasp/zap2docker-weekly zap.sh -daemon -host 0.0.0.0 -port 8090 -config api.addrs.name=192\.168\.200.* -config api.addrs.addr.regex=true -config api.key=fidelio

# This one also worked. Note: 104 was the IP of the virtual machine running ZAP. 107 was the IP of the caller.
docker run -u zap -p 8090:8090 -i owasp/zap2docker-weekly zap.sh -daemon -host 0.0.0.0 -port 8090 -config api.addrs.name="192\.168\.200.((104)|(107))" -config api.addrs.addr.regex=true -config api.key=fidelio
```

API calls in JSON format:
```python
# Variables
zap_host = "192.168.200.107"
zap_port = "8090"
context_file = "dvwa.context"
policy_file = "high_thres.policy"
api_key = "fidelio"
base_url = 'http://{0}:{1}'.format(zap_host, zap_port)

def view_all_rules():
    endpoint='/JSON/ruleConfig/view/allRuleConfigs/?apikey={0}'.format(api_key)
    url = base_url + endpoint
    return requests.get(url=url)

response = view_all_rules()
import json
print(json.dumps(response.json(), indent=4))
```

### Lab time
1. Generate a scan policy and context for DVWA.  
2. Use the UI to setup all scan settings.
3. Repeat the scan using the context and policy files and customize settings via its API. Have ZAP run in daemon mode.
4. Script the setup of step 3.

**Objective:** determine if results are the same.

## Mar 16th 2019
I have already completed the UI scan for DVWA using ZAP. Checking how well it does when I repeat it fresh simply giving it setup files as input.
* The options menu doesn't seem to be exportable.
* Unable to get them setup from the ZEST recording menu.
* Proxy ZEST script seems to be able to replace whatever I want from a request
* Perhaps it is more efficient doing all the setup from the CLI or API?
* API does seem to be capable of adding Replacer rules

Different ways to run zap2docker:
## ZAP Headless (deamon)
This seems to be a docker container that runs the API. IT THE DEAMON MODE.
```
docker run -u zap -p 8080:8080 -i owasp/zap2docker-stable zap.sh -daemon -host 0.0.0.0 -port 8080 -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true -config api.key=<api-key>`.
```
`-config api.addrs.addr.name=.*` opens the API up for connections from any other host, it is prudent to configure this more specifically for your network/setup.

### Access it from outside the container by
Docker appears to assign 'random' IP addresses, so an approach that appears to work is:

Run ZAP as a daemon listening on "0.0.0.0":
```bash
docker run -p 8090:8090 -i owasp/zap2docker-stable zap.sh -daemon -port 8090 -host 0.0.0.0

docker ps # get container id
docker inspect <CONTAINER ID> | grep IPAddress # get IP address

docker-machine ip <host> #for MACs IP == Docker VM host
```
