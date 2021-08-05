function isNumber(val) {
        // negative or positive
        return /^[-]?\d+$/.test(val);
    }

console.log(isNumber(10));
console.log(isNumber(" 10"));
console.log(isNumber("10"));
console.log(isNumber(" "));
console.log(isNumber(true));
console.log(isNumber(false));
