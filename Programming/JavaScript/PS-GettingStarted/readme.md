# JavaScript: Getting Started
Course notes from PluralSight course  
Start date: Jul 27th 2019

<!-- TOC -->

- [JavaScript: Getting Started](#javascript-getting-started)
- [The Beginning](#the-beginning)
- [Types and Arrays](#types-and-arrays)
    - [Types](#types)
    - [Array](#array)
- [Program Flow](#program-flow)
    - [Falsy conditions](#falsy-conditions)
    - [Switch case](#switch-case)
    - [Loops](#loops)
- [JavaScript built-in objects](#javascript-built-in-objects)
- [Programming for Web Pages](#programming-for-web-pages)

<!-- /TOC -->

# The Beginning
* Hello World: `console.log('Hello World!')`
* Variable names in JS are usually typed in *camelCasing*.

```javascript
let productName = 'Hammer',
    productId = 'H123';

console.log(productName, productId);
// a comment

/*
    a block of comment
*/
```

* The semi-colon (;) seems to be optional
* Do not use *reserved keywords*. Look them up in Google.
* escape strings with \\.
* concatename strings with +.

# Types and Arrays
Determine type of a variable by `typeof(variableName)`.

## Types
* String
* Number
    * Infinity
    * NaN
* undefined
* null

## Array
```javascript
let values = [1, 2, 3];
console.log(values[0]);
values.push(33);
values.pop(); // pops up the last element on the array
values.shift() //remove the first and shift left
values.splice(3, 1) // remove one element starting at index 3
values.splice(3, 1, 34, 12, 44) // remove one element starting at index 3 and add 3 others.
```

# Program Flow
## Falsy conditions
* false
* 0
* "" or '' (empty strings)
* null
* undefined
* NaN

## Switch case
```javascript
let state = 'TX';
switch(state){
    case 'NY':
        console.log('New York');
        break;
    case 'TX':
        console.log('Texas');
        break;
    default:
        console.log('Dunno');
        break;
}
```

## Loops
```javascript
for (let i=0; i<3; i++){
    console.log(i);
}

let count = 1
while(count < 5) {
    console.log(count)
    count++
}
```

# JavaScript built-in objects
* Math
* Date
* String
* Number

# Programming for Web Pages
*DOM: Document Object Model*: defines how the data of a web page is organized and manipulated.

