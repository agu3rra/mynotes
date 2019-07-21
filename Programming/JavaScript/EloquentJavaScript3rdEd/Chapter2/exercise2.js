/*
FizzBuzz
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).

(This is actually an interview question that has been claimed to weed out a significant percentage of programmer candidates. So if you solved it, your labor market value just went up.)
*/

function divCheck(number, n){
    // Returns true if number is divisible by n
    if (number === 0 || number === n){
        return true;
    }
    if (number % n === 0){
        return true;
    }
    return false;
}

for (let i=1; i<=100; i++){
    let div3 = divCheck(i, 3);
    let div5 = divCheck(i, 5);
    if (div3 && div5){
        console.log("FizzBuzz");
    }
    else if (div3) {
        console.log("Fizz");
    }
    else if (div5) {
        console.log("Buzz");
    }
    else {
        console.log(i);
    }
}
