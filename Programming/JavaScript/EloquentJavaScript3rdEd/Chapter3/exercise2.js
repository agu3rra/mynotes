/*
Recursion
Define a recursive function that returns whether a number N is even given that:
1. Zero is even;
2. One is odd;
3. Any other number N, has its evenness to be same as N-2
*/
let isEven = function(N) {
    // Returns true when number is even
    if (N < 0) {
        return isEven(-N);
    }
    if (N > 1) {
        N = N - 2;
        return isEven(N);
    }
    else {
        return N==1 ? false : true
    }
}