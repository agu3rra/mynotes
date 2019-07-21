# Vim Editor
Notes taken based on read out from Unix in a Nutshell.

There are 2 main modes in the VI editor: *command* and *insert*

## Starting a session:
```
$ vi [options] file
$ vi [options] +num file
$ vi [options] +/pattern file
```

## Command line options
-b: edit in binary mode  
-d: run in diff mode. Works like vimdiff  
-D debugging mode  

## Exiting
:x  Save changes and quit  
:q! Quit without saving  

## Editing operations
c: begin a change  
d: begin a deletion  
y: begin a yank (copy)  

To apply the above in the current line: cc, dd, yy

Examples:  
2cw: change the next 2 words  
d} delete up to next paragraph  
d^ delete back to beginning of line  
5yy copy the next 5 lines  
y]] copy up to next section  

## Status line commands
/ search forward for a pattern  
? Search backward for a pattern

## Save to file and exit:
:w filename
