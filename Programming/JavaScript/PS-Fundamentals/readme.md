# JavaScript Fundamentals
Course notes from PluralSight  
Start date: Jul 28th 2019

<!-- TOC -->

- [JavaScript Fundamentals](#javascript-fundamentals)
- [Introduction](#introduction)
    - [Setup](#setup)
- [Language Features](#language-features)
    - [Constants](#constants)
    - [let and var](#let-and-var)
    - [Rest parameters](#rest-parameters)
    - [Destructuring Array](#destructuring-array)
    - [Destructuring Objects](#destructuring-objects)
    - [Spread Syntax](#spread-syntax)
    - [Common Type Conversions](#common-type-conversions)
    - [Controlling loops](#controlling-loops)
- [Operators](#operators)
    - [Conditional operator](#conditional-operator)
- [Functions and Scope](#functions-and-scope)
    - [Block scope](#block-scope)
    - [IIFE Pattern](#iife-pattern)
    - [Closures](#closures)
    - [this keyword](#this-keyword)
    - [call and apply](#call-and-apply)
    - [bind](#bind)
    - [Arrow Function](#arrow-function)
    - [Default parameters](#default-parameters)

<!-- /TOC -->

# Introduction
* 1995 - JS created
* 1997 - ECMA Standard, ECMAScript
* 1999 - ECMAScript3 (ES3)
* 2009 - ES5
* 2015 - ES6
* \> 2015 - yearly updates
* Webpack - https://webpack.js.org - A module bundler.

## Setup
1. Clone from https://github.com/wbkd/webpack-starter
1. `npm install`
1. `npm start`

# Language Features
* Constants
* let and var
* Rest parameters
* Destructuring
* Spread Syntax
* typeof()
* Type conversions
* Controlling loops

## Constants
* Symbols that will not change across the program;
* Cannot be changed, only initialized.

## let and var
* *let* has block scoping, *var* does not.
* Try to use let most of the time.

## Rest parameters
* Allows a function to store multiple arguments in a single array.
```javascript
function sendCars(day, ...allCarIds) {
    carIds.forEach( id => console.log(id));
}
sendCars('Monday', 1, 2, 3);
```

## Destructuring Array
* Easily assign values from an array into variables
```javascript
let carIds = [1, 2, 3]
let [car1, car2, car3] = carIds
let [carx, ...remainingCars] = carIds
let [, ...remainingCars] = carIds // skips first element
```

## Destructuring Objects
```javascript
let car = {
    id: 5000, 
    style: 'convertible'
}
let {id, style} = car
```
## Spread Syntax
* Opposite of rest
```javascript
function startCars(car1, car2, car3) {
    console.log(car1, car2, car3)
}
let carIds = [100, 200, 400];
startCars(...carIds);
```

## Common Type Conversions
```javascript
foo.toString();

Number.parseInt('55');
Number.parseFloat('55.99')
Number.parseFloat('55.99ABC') // ignores the trailing ABC and successfully converts
```

## Controlling loops
* `break` forces exiting a loop
* `continue` skips to next iteration

# Operators
* Simple mathematical operators.
* JS attempts to do type conversion when using `==`.
* Best practice is to use `===` to override type conversion.
* Unary operators: `++1967` and `1967++`;
* Logical operators:
    - &&
    - ||
    - !
    - These can be used outside of a conditional statement:
```javascript
let userSettings = {name: 'Joe'}
let defaultSettings = {name: 'Default'}
console.log(userSettings || defaultSettings)
```
* careful when comparing strings. Uppercase letters come before lowercase letters.

## Conditional operator
```javascript
var result = (foo > 5) ? true : false
```

# Functions and Scope
* Function and Block Scope
* IIFE's
* Closures
* *this*
* Arrow functions

## Block scope
* Scoping is not just for funcitions. It also applies to code blocks inside `if` and `for` statements.

## IIFE Pattern
* Immediately Invoked Function Expression
```javascript
let app = ( function() {
    let carId = 123;
    console.log('in function')
    return {};
})();
```
* Its real value is when it is used as a closure.

## Closures
* When you want an executed function scope to hang around.

## this keyword
```javascript
let obj = {
    carId: 123,
    getId: function() {
        return this.carId;
    }
};
console.log(obj.getId()); // 123
```

## call and apply
* These can change the value of *this*.
```javascript
let obj = {
    carId: 123,
    getId: function() {
        return this.carId;
    }
};
let newCar = { carId: 456};
console.log(obj.getId.call(newCar)); //456
```
* In the above example, you call the getId function from *obj*, but you give it a new context for *this*, so *this.carId* actually refers to *newCar*.
* `apply` is similar to `call`, but you can give it an array of arguments:
```javascript
let o = {
    carId: 123,
    getId: function(prefix) {
        return prefix + this.carId;
    }
};

let newCar = {carId: 456};
console.log(o.getId.apply(newCar, ['ID: ']));
//ID: 456
```

## bind
* Copies an existing function and gives it a context.
```javascript
let obj = {
    carId: 123,
    getId: function() {
        return this.carId;
    }
};
let newCar = { carId: 456};
let newFn = obj.getId.bind(newCar);
console.log(newFn()); //456
```

## Arrow Function
* as of ES2015
* parameters => return values
* Arrow function do not have their own *this* value.
```javascript
let getId = () => 123;
console.log(getId()); //123

let getId = prefix => prefix + 123;
console.log(getId('ID :'))
// ID: 123

let getId = (prefix, suffix) => prefix + 123 + suffix;
console.log(getId('ID: ', '!')); //ID: 123!
//OR
let getId = (prefix, suffix) => {
    return prefix + 123 + suffix;
};
console.log(getId('ID: ', '!')); //ID: 123!
```

## Default parameters
* It is about giving a default value to a parameter in case it is not given in the function call.
```javascript
let trackCard = function(carId, city='NY'){
    console.log(`Tracking ${carId} in ${city}.`);
}
```
