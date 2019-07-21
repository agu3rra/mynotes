Bash command to split large files:
```bash
$ split —lines 500000 —numeric-suffixes --suffix-length=3 largefile.txt subfilename
```