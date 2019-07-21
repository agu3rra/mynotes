/*
Bean Counting
*/
let countBs = function(text) {
    //Returns how many uppercase B's there are in text.
    size = text.length;
    total = 0
    for (let i = 0; i < size; i++){
        if (text[i] === "B") {
            total++;
        }
    }
    return total;
}
const sample1 = "BicaBubitu"; //should return 2
const sample2 = "Yabadabadu"; // zero
const sample3 = "BigBrotherBrasil"; //yuk; returns 3
countBs(sample1);
countBs(sample2);
countBs(sample3);

let countChar = function(text, char){
    total = 0;
    for (let i = 0; i < text.length; i++){
        text[i] === char ? total++ : null;
    }
    return total
}
countChar(sample1, "i");

let countBsV2 = function(text) {
    //Returns how many uppercase B's there are in text.
    return countChar(text, "B");
}