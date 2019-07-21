#Check file Hash in PowerShell

```PowerShell
$algorithm = [Security.Cryptography.HashAlgorithm]::Create("SHA256")
$vboxinstaller = 'C\Users\w4sp\Downloads\VirtualBox-5.0.4-102546Win.exe'
$fileBytes = [io.File]::ReadAllBytes($vboxinstaller)
$bytes = $algorithm.ComputeHash($fileBytes) -Join ($bytes | ForEach {"{0:x2}" -f $_})
```
