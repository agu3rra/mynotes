# Cross-Site Scripting (XSS)
Allows execution of arbitrary JavaScript code on the client-side.

**Classification:**
- Prevalence: Common +++
- Exploitability: Easy +++
- Impact: Harmful ++

## Use cases
* Worm spreading on social media.
* Session hijacking
* Identity theft
* DoS
* Data theft (passwords)
* Financial fraud.

## Protection

### Escape dynamic content
It’s about making the browser treat HTML input coming from the users as content instead of raw HTML that needs to be rendered. It consists of replacing special characters by their encoded counterpart. Examples: “ == &#34

Modern frameworks do that by default.

### Whitelist values

### Content-security policy
Tell the browser what domains can execute JavaScript.
```
Content-Security-Policy: script-src 'self' https://apis.google.com
```

The above if for inline JavaScript. The below snippet notifies of policy violations:
```
Content-Security-Policy-Report-Only: script-src 'self'; report-uri http://example.com/csr-reports
```

### Sanitize HTML
Use this in case you need to render raw HTML content.

### HTTP-Only cookies
This prevent cookies from being retrieved by scripts.