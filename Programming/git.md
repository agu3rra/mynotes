# Version Control with Git
Reading notes  
Authors:  
Jon Loeliger &   
Matthew McCullough

<!-- TOC depthTo:2 -->

- [Version Control with Git](#version-control-with-git)
- [Chapter 1 - Introduction](#chapter-1---introduction)
- [Chapter 3 - Getting Started](#chapter-3---getting-started)
    - [Double Bare Dash](#double-bare-dash)
    - [Repository initialization](#repository-initialization)
    - [Why stage files](#why-stage-files)
    - [Mutli line commit messages](#mutli-line-commit-messages)
    - [Inspecting logs](#inspecting-logs)
    - [Viewing differences](#viewing-differences)
    - [Removing and renaming files](#removing-and-renaming-files)
    - [Config files](#config-files)
    - [Configuring Aliases](#configuring-aliases)
- [Chapter 4 - Basic Git concepts](#chapter-4---basic-git-concepts)
    - [Git Tracks Content](#git-tracks-content)
    - [Pack files](#pack-files)
    - [The Hash](#the-hash)

<!-- /TOC -->

# Chapter 1 - Introduction
*Git* was created by Linus Torvalds to aid in the development of the Linux Kernel. The existing *Version Control System (VCS)* at the time (BitKeeper - VCS) had a few set backs Linus wanted solved:
1. Facilitate distributed development
  - parallel and independent work streams;
  - no need to always sync to a central repo
1. Scale to thousands of developers
1. Quick and Efficient
  - Delta techniques
1. Integrity and Trust
  - Cryptographic hash function names and identifies objects.
1. Enforce accountability
  - logs
1. Immutability
  - Once created, objects cannot be altered (immutable) but only changed.
1. Atomic transactions
  - ensures database cannot be partially changed or corrupted.
1. Branches of development

# Chapter 3 - Getting Started
These are some of the items I found most interesting:
## Double Bare Dash
Use this to separate options from a list of arguments (e.g.: file):
```
git diff -w master origin -- tools/Makefile
```

## Repository initialization
This is achieved via a simple `git init` command, which creates a `.git` directory in the repo. All git repositories are initialized empty. To manage content, you must explicitly `git add files` to your repo. This keeps temporary files from actual project files. `git add .` adds all files in the current working directory to Git. This is known as **staging** the file, a step before **commit**.

## Why stage files
To avoid having to update the repository every time you add, change or remove a file.

## Mutli line commit messages
Point environment variable `GIT_EDITOR` to your favorite editor and call `git commit`. It will open your text editor and once you save and close it, the message will be part of your git history when you `git log`.

## Inspecting logs
When you do `git log` to display the repo's change history, you can additionally do `git show [some commit hash]` to display additional info on a particular commit. `git show` without any specific hash will show you the last commit.

`show=branch --more=10` will show you the one line summaries of the current branch.

## Viewing differences
`git diff [hash old] [hash new]`

## Removing and renaming files
```
$ git rm poem.html
$ git commit -m "removed a poem"
$ git mv foo.html bar.html
```

`git rm` will also remove the file from the local file system once it is committed.

## Config files
There are 3 sets and they take precedence on the following order:
* --file: local repository
* --global: user specific
* --system: system wide

Inspect configs by `git config --list --show-origin`. You can also inspect the local repo by `cat .git/config`.

Use the `--unset` option to remove a setting. E.g.: `git config --unset --global user.name`.

## Configuring Aliases
These are for commands with multiple options that you don't want to keep typing. E.g.:
```
git config --global alias.show-graph \
'log --graph --abbrev-commit --pretty=oneline'`
```

Once the above command is sent, one can start using `git show-graph` instead of typing everything required for it.

# Chapter 4 - Basic Git concepts
*\"A Git Repository is simply a database containing all the information needed to retain and manage the revisions and history of a project.\"*

Within a repository, Git maintains two primary data structures:
* **The Object store**: designed for efficient copying during the clone operation.
* **The Index**: transitory information, private to a repo.

These are kept in the hidden `.git` file that gets created when you `git init`.

The object store has 4 types of basic objects that comprise Git's foundation to its higher level structures:
* *Blob* (Binary Large OBject): a variables that contains data and whose structure is ignored by the program.
* *Trees*: one level of directory information.
* *Commits*: holds metadata for each change to the repo. Each commit points to a tree object that captures the repo state.
* *Tags*: assigns a human-readable label to an object (usually a commit). So commit *9da581d910c9c4ac93557ca4859e767f5caf5169* may be tagged with *Ver-1.0-Alpha*.

blob > tree > commit

## Git Tracks Content
Git tracks content instead of files. It will not store two separate copies of the exact same file if these are in different directories since both will generate the same corresponding SHA1 hash value.

Git's internal DB stores every version of every file, not their differences. This feature allows certain tasks to be performed with more ease.

Git records each pathname of the files that it stores.

## Pack files
That's Git's storage mechanism that allows it to efficiently keep all versions of the same file. It sort of stores a file and all its deltas that comprise differences into a *pack*.

Note that it does this with any files that look similar in the entire repo, regardless of their paths of names. This yields good *data compression*.

## The Hash
2^160 bits  
40 hex chars  
Allows comparison of 2 huge files without the need to transmit either in full.
