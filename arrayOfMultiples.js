function arrayOfMultiples(num, length){
    let output = [];
    let multiple = 0;
    for(i = 1; i < length +1; i++){
        multiple = num * i;
        output.push(multiple);
    }
    return output;
}
console.log(arrayOfMultiples(7, 5));
console.log(arrayOfMultiples(12, 10));
console.log(arrayOfMultiples(17, 6));