# Mastering Git
Course notes from PluralSight  
Start date: Jul 28th 2019

<!-- TOC -->

- [Mastering Git](#mastering-git)
- [Introduction](#introduction)
    - [The Four Areas](#the-four-areas)
        - [The Two Questions:](#the-two-questions)
    - [The Working Area](#the-working-area)
    - [The Repository](#the-repository)
    - [The Index](#the-index)

<!-- /TOC -->

# Introduction
* The Four Areas where git moves data in/out.
* Focus on *The Way Git Thinks*.
* This training is about how git cooks the onion from the previous training.
* The command line is your friend! :)

## The Four Areas
1. Stash
1. Working Area
1. Index (where you place your files before commiting)
1. Repository

![4areas](add-ons/4areas.png)

### The Two Questions:
1. How does this command move information across the 4 areas?
1. How does this command change the repository?

## The Working Area
* The project directory in your file system.
* It is only important to you, not Git.

## The Repository
* It is in the `.git` folder.
* The objects folder.
* Commits may share the same objects.
* Each commit is like a snapshot in time.
* A *branch* is a reference to a *commit*.
* The can be only one *HEAD* which points to a commit (headless) or branch.
* Garbage collection when commits cannot be referenced by any branch.

## The Index
* Unique to Git.
* Aka the *staging area*.
* YOu can modify it directly.
* clean status: working area and *the current commit* in the repository are in sync.
* the index is like a launchpad.
* when you get the *nothing to commit, working area clean* message, it's actually a statement that the index and the working area contain the same data.
* `git diff`compares working area with index.
* `git diff --cache`compares index with repository.
