# A quick look at Cross-Site Request Forgery (CSRF)

The goal of this article is to help IT Security professionals to improve their understanding on vulnerabilities research. It’s no attempt to be an exhaustive source of information on CSRF, but to serve as a means to stimulate a healthy discussion on the subject  among interested community members.

**Assumptions**  
This article assumes you are already familiar with the basics of the HTTP ([Hypertext Transfer Protocol]), its most common HTTP verbs (GET/POST) and with what a web application is (e.g.: your bank’s website, Facebook, Gmail, etc).

**DISCLAIMER:**  
The author or hosting service of this article does not condone or encourages the misuse of knowledge gained here. Always be ethical and keep the following in mind:
* Don’t be malicious;
* Don’t attack targets or test systems without explicit written permission to do so;
* Always consider the consequences of your actions.

All the web applications and services mentioned in this article are here for the mere purpose of contextualization. This article does not imply they are vulnerable or encourages testing unless explicitly allowed by the owners.

## What is CSRF?
Cross-Site Request Forgery (CSRF) has a recurrent appearance in the [OWASP Top 10] list of vulnerabilities, which represents a broad consensus in the information security industry about the most critical risks to web applications.

It is a type of attack that causes the victim to execute unintended actions in a web application he/she has access to. This can happen either through a single click on a malicious link (e.g.: [phishing] email) or even by the simple swipe of a legitimate webpage that contains malicious code in the background. 

To illustrate, suppose you’re scrolling through the comments on a web forum (e.g.: Reddit) and that it contains malicious code ready to be passively executed. It could be Inside an image box that did not load and it happens to have the following HTML code:
```
<img scr=https://www.facebook.com/post_on_timeline?text="I am CSRF in action!">
```
Assuming Facebook was vulnerable to CSRF and that the above link was the GET HTTP request that it generated whenever one of its users wanted to post messages to the timeline, the mere fact that you opened the page in your browser would have caused you to post the message “I am CSRF in action!” to your Facebook account.

PICTURE/GIF HERE

## What makes a web application vulnerable to CSRF?
According to the current information available on [BURP’s issue definitions] regarding CSRF, it is an authentication issue. Quoting it:

*”Cross-site request forgery (CSRF) vulnerabilities may arise when applications rely **solely** on HTTP cookies to identify the user that has issued a particular request. Because browsers automatically add cookies to requests regardless of their origin, it may be possible for an attacker to create a malicious web site that forges a cross-domain request to the vulnerable application.”*

Going back to the Facebook example, the link was opened in the context of your user session. So it was executed with your session cookie, which gets automatically added to the HTTP GET request your browser executed while you scrolled through that Reddit page. It is important to realize that the attacker didn't have to know your session token in order for the attack to be successful. Since the request originated from a Reddit forum, it is said to be cross-site. The solution to this problem is to have Facebook require something other than the session cookie in order to allow the *post to timeline action* to take place.

## Remediation 
In one word: **Anti-CSRF token**.

The best way to prevent a web application from being vulnerable to CSRF is to make sure a link cannot be fully crafted to execute an operation in it. The recommendation to achieve this is to use a POST request for critical operations and making sure they include a hidden form field in them which should contain a random number known as *Anti-CSRF token*. 

## Final Thoughts

## Additional Resources
1. OWASP: [www.owasp.org]
2. Wikipedia: 
3. LinkedIn Training: 
4. PortSwigger’s BURP issue definitions: 
