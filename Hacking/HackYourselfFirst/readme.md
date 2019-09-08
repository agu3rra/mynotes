# Hack Yourself First Course
Instructor: Troy Hunt  
Course notes from PluralSight

**Summary**
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Hack Yourself First Course](#hack-yourself-first-course)
- [Cookies](#cookies)
	- [Secure flag](#secure-flag)
	- [Path](#path)
	- [Expiration](#expiration)
- [Probing Risk on WebApp](#probing-risk-on-webapp)
	- [HTTP Fingerprinting](#http-fingerprinting)
	- [robots.txt](#robotstxt)
	- [Leaking to built-in loggers](#leaking-to-built-in-loggers)
- [Parameter Tempering](#parameter-tempering)
	- [Request headers](#request-headers)
	- [Client Vs. Server side validation](#client-vs-server-side-validation)
	- [Mass Assignment Vulnerability](#mass-assignment-vulnerability)
	- [HTTP Verb Tempering](#http-verb-tempering)
- [SQL Injection](#sql-injection)
	- [Types](#types)
		- [Explicit](#explicit)
		- [Implicit (blind)](#implicit-blind)
	- [Havij](#havij)

<!-- /TOC -->

# Cookies
Def.: text in the browser;
Set via:
- server responses;
- JavaScript in the DOM (also for reading)

Automatically passed in the header of subsequent requests.

## Secure flag
Since cookies get sent with every HTTP request, if a cookie is set as secure and your app makes a plain text HTTP request to load an image (for example), it will not get sent with this request.

## Path
Can restrict scope so that a cookie is not passed along with every request to your app. With this, an XSS in one path does not expose cookies in another path.

## Expiration
- Use it on authentication cookies to reduce the potential hijack window.
- If you set the cookie as a session cookie, then it expires as soon as the browser expires.

# Probing Risk on WebApp

It’s like robing a bank on Ocean’s Eleven: see points of weaknesses to understand how you can attack.

Interesting points:
* points of untrusted data entry;
* sanitization in use? which method?
* Framework
* Code comments (HTML or JS code)
* 500 messages disclosing too much info.

Common CVE databases: https://nvd.nist.gov

## HTTP Fingerprinting
Locates tell tale signs that are typical of certain web servers and frameworks.

Examples:
1. by default, some web servers return date before server version on the headers.
2. Some 400 responses are typical from certain web servers. Consider customizing one for defense.

## robots.txt
Implements a list of which items should be kept out of index by crawlers

## Leaking to built-in loggers  
Some frameworks have built-in loggers that may contain useful information. E.g. elmah  
Google for: `inurl:elmah.axd “error log for”`

# Parameter Tempering

## Request headers
- Try injecting a different referrer to have the app behave differently.
- Try adding SQLi to the Accept-Language if the app does language selection based on it.
- Hidden fields are sometimes vulnerable to SQLi

## Client Vs. Server side validation
Test if requests are validated only on the client side.

## Mass Assignment Vulnerability
- Take advantage of the model binding (ORM)
- Failure to properly check incoming form parameters
- Consists of passing along a known model parameter even when the front-end does not normally send it.
- E.g.: `FirstName=Troy&LastName=Hunt&IsAdmin=true`

## HTTP Verb Tempering
Some checks apply sanitization and output encoding to one HTTP verb but not all. E.g.: GET validates an input parameter, but POST does not when the data is send via parameter, for example. Changing to POST and sending data via POST body circumvents all validation.

# SQL Injection
Flow:
1. Probe for risks
2. Discover DB structure
3. Harvest

Usually can be combined with 500 message to disclose interesting information when app is vulnerable. So SQLi can be harvested despite HTTP responses not being 200's.

## Types
### Explicit
* Union based: append result set displayed in the markup
* Error based: disclose info in 500 messages

### Implicit (blind)
* Boolean-based: test if condition is true
* Time-based: cause a response delay.

## Havij
Script kiddie friendly application to pull DB, tables and information.
