# Practical Design Patterns in JavaScript
Course notes by PluralSight  
Start date: Aug 4th 2019

**Objective**: learn *Design Patterns* to adapt JS to become much more object oriented.

<!-- TOC -->

- [Practical Design Patterns in JavaScript](#practical-design-patterns-in-javascript)
- [Introduction](#introduction)
    - [Design Patterns](#design-patterns)
    - [Physical Design Patterns](#physical-design-patterns)
    - [The Gang Of Four](#the-gang-of-four)
    - [What constitutes a pattern](#what-constitutes-a-pattern)
    - [Types of Patterns](#types-of-patterns)
        - [Creational](#creational)
        - [Structural](#structural)
        - [Behavioral](#behavioral)
- [Objects in JavaScript](#objects-in-javascript)
    - [Demo Task Creation](#demo-task-creation)
- [Creational Patterns](#creational-patterns)
    - [Constructor Pattern](#constructor-pattern)
    - [Module Pattern](#module-pattern)
    - [Factory Pattern](#factory-pattern)

<!-- /TOC -->

# Introduction

It's easy to write bad JavaScript code.

## Design Patterns
* Tried and tested patterns.
* Concept comes from Christopher Alexander, an architect: A Pattern Language (for buildings and construction) - *... each pattern represents our current best guess as to what arrangement of the physical environment will work to solve the problem represented.*
* *"The empirical questions center on the problem - does it occur and is it felt in the way we have described it?"*
* *"and the solution - does the arrangement we propose in fact resolve the problem?"*

## Physical Design Patterns
It comes down to problems and solutions
|Problem|Solution|
|-|-|
|On and Off Traffic Highways|Cloverleaf Interchanges|
|Pedestrian Traffic|Sidewalks|
|Entry and Exit for Public Buildings|Revolving Doors|

## The Gang Of Four
* Christopher's concepts applied to software.
* Book title: *Design Patterns: Elements of Reusable Object-Oriented Software*.

|Problem|Solution|
|-|-|
|Designing Service Layers|Module Pattern|
|Overly Complicated Object Interfaces|Facade Pattern|
|Visibility Into State Changes|Observer Pattern|

## What constitutes a pattern
* It **solves a problem**.
* It is a **proven concept**.
* The solution is **not obvious**.
* It describes a **relationship**.
* Why bother with patterns? To re-apply known solutions. To create common vocabulary amongst developers.

## Types of Patterns
### Creational
Deal with creation of new instances of an object.
1. Constructor
2. Module
3. Factory
4. Singleton

### Structural
Deal with the make up of the actual object themselves
1. Decorator
2. Facade
3. Flyweight

### Behavioral
Deal with object relate and operate with each other
1. Command
2. Mediator
3. Observer

# Objects in JavaScript
The ways to create objects in JS:
```javascript
var obj = {};
var nextObj = Object.create(Object.prototype);
var lastObj = new Object();
```

Assigning keys and values:
```javascript
var obj = {}
obj.param = 'value'
obj['param'] = 'new value' //allows using variables such as:
var val = 'value'
obj[val] = 'another value'
```

## Demo Task Creation
* Run the in the terminal via `$ node yourScript.js`
* Use the `defineProperty` when defining methods inside objects to ensure they are not overwritten.
* Use `configurable` to prevent properties' definitions from being changed.

# Creational Patterns
## Constructor Pattern
* Create new objects with their own object scope
* The *new* keyword.
* JS allows creation of objects from other objects.

## Module Pattern
* A simple way to encapsulate methods
* Creates a *toolbox* of functions to use.
* Generally used when you need **one of something**.

```javascript
var Module = function(){
    var privateVar = 'I am nowhere to be seen'
    return {
        method: function(){},
        nextMethod: function(){}
    }
}
```

## Factory Pattern
* Used to simplify object creation
* Creating different objects based on need
* Repository creation
  