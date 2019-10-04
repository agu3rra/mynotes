# Chapter 4: Mapping

Effective mapping is a valuable skill. Quickly triage whole areas of functionality looking for *classes of vulnerabilities* as opposed to *instances*.

<!-- TOC -->

- [Chapter 4: Mapping](#chapter-4-mapping)
- [Enumerating Content and Functionality](#enumerating-content-and-functionality)
    - [Robots.txt](#robotstxt)
    - [Spidering](#spidering)
    - [Fuzzing and Forced Browsing](#fuzzing-and-forced-browsing)
    - [Response codes](#response-codes)
    - [From Source code](#from-source-code)
    - [Google Hacks and other public sources](#google-hacks-and-other-public-sources)
- [Web server layer vulnerabilities](#web-server-layer-vulnerabilities)
- [Discovering hidden parameters](#discovering-hidden-parameters)
- [Entry points for user input](#entry-points-for-user-input)

<!-- /TOC -->

# Enumerating Content and Functionality

## Robots.txt
This file is usually located in the root directory of the web app. Contains directories and files that the owners do not wish to be indexed by Search Engines so it is a juicy target of information.

## Spidering
Ideally use a mix of manual and automated spidering. Dynamically rendered menus  rendered by JavaScript are not caught by automatic crawlers, but it is by proxy/spider tools such as *BURP Suite* and *OWASP ZAP*.

Automated spiders commonly use URL’s as identifiers of unique content. So in the event an app does multiple stages of say accessing account info thru *account.jsp*, for example, the spider will not be intelligent to complete a single full process request.

Beware of apps that use per-page tokens.

Stay away from administrative content that may cause the app to break if the spider starts clicking on it. We want to map the target, not render it useless. Place these locations in the out of scope section of automated crawlers.

Try browsing with JavaScript enabled and disabled. Same thing with cookies. You may reach different content depending on these settings.

*/auth* directories are of interest for unauthenticated attacks.

## Fuzzing and Forced Browsing
*BURP Intruder* does forced browsing. Use compiled lists of common directories such as Miesler & Haddix’s *SecLists*.

*DirBuster* from OWASP is another ready to use list of known/common content.

Combine fuzzers in different fields. Attempt to deduce new content from the content you already discovered. By doing a pattern analysis.

## Response codes
Do not assume apps always respond 200 when resource exists and 404 otherwise.

302 could mean the content is only accessible to authenticated users.

401 or 403 basically translates that the page you looked for exists. As Haddix said, don’t let these stop you from drilling down into subdirectories. Try UPPER CASE directory names too.

## From Source code
Use client-side code to look for comments that disclose database connection strings and passwords.

Search for temporary files like `.DS_Store`.

## Google Hacks and other public sources

The following searches are of interest:
> site:www.wahh-target.com (every resource within the target site that Google has a reference to)
> site:www.wahh-target.com login (all pages containing the expression login)
> link:www.wahh-target.com (all pages on other websites and apps that contain a link to the target)
> related:www.wahh-target.com

Other tips:
* Remember to search the *News* and *Groups* pages.
* Go to last page on a search and reveal omitted items.
* Old functionality may contain vulnerabilities.
* Search domain names belonging to the same organization.
* Use web archives for clues.
* Lookup developer forums
* Compile a list of email and name from developers. Use Maltego and that LinkedIn tool. Sometimes you can find names on HTML sources.

# Web server layer vulnerabilities
* Sample and diagnostic scripts sometimes contain vulnerabilities and they are not disabled by the developers.
* Use BURP Intruder and lists of known directories.
* Use MindNode to construct a map of the target.
* The logical relationships sometimes do not correspond to the directory structure used within URLs.

May be identifiable by the following:
* Server HTTP header
* Templates
* Custom HTTP headers
* URL query string parameters

Technologies can be identified (usually) by the presence of certain directories:
* servlet
* pls
* cfdocs or cfide
* SilverStream
* WebObjects or {function}.woa
* rails

Token Identification
* JSESSIONID
* ASPSESSIONID
* ASP.NET_SessionId_
* CFID/CFTOKEN
* PHPSESSID

# Discovering hidden parameters
Some applications use parameters to define behavior.  Sometimes it even turns off validation rules.
* Use BURP Intruder > Cluster Bomb to fuzz common debug parameter names (debug, test, hide, source) and values (true, yes, on , 1). Fuzz both query parameters and request bodies on POST requests.

# Entry points for user input
* URL strings up to the parameters
* Parameter strings
* Parameter in body POST
* Cookies
* HTTP Headers:
	- User-Agent (BURP Intruder built-in payload)
	- Referer
	- Accept
	- Accept-Language
	- Host
	- X-Forwarded-For (Injection attacks; usually an IP)

Nonstandard parameter formats; application specific. Examples:
	- /dir/file;foo=bar&foo2=bar2
	- /dir/file?foo=bar$foo2=bar2
	- /dir/file/foo%3dbar%2foo2%3dbar2
	- /dir/foo.bar/file
	- /dir/foo=bar/file
	- /dir/file?param=foo:bar

# Chapter 6 Attacking Authentication

## Bad passwords
1. Discover rules for weak passwords. During a registration process, for example or by changing your own.
2. Client-side controls are not exactly bad since they protect most users. A crafted attacker being able to circumvent it is not itself a vulnerability (assign himself a weak pass).

## Brute Force
1. Test if there are mechanisms that prevent brute forcing.
1. Check for the existence of a `failed logins=1` type cookie. Manipulate it if necessary.
1. Monitor how bad login attempt messages look like (multiple of them). Is there a lockout policy?
1. After account lockout, try submitting the valid password. If the behavior is different than the incorrect pw, brute force may continue for guessing the valid pass.
1. If you detected password rules in place, curate your brute force lists (use a script to clean it).
1. If targeting multiple accounts, do breadth-first. Benefits:
  * Shared passwords between accounts are found sooner.
  * Time delay between login attempts may hinder blocking mechanisms to brute force.

**About subtle differences:**: some responses are only different in the UI. Try comparing HTTP responses in BURP Comparer. Sometimes, the difference lies in the response times. A valid user account takes longer or lesser time to respond.

1. Sometimes login credentials are not exposed in the original request (HTTP POST), but the applications does redirects (302) to another component and it in turn uses them in URL query params.
1. Check if there are any credentials stored in cookies.
