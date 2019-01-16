// Statement syntax
var square = (x) => {
    var result = x * x;
    return result;
};

// Expression syntax
// Parentheses are option when you have 1 argument exactly
//var square2 = x => x * x;
var square2 = (x) => x * x;

console.log(square(9));
console.log(square2(8));



var user = {
    name: 'James',
    sayHi: () => {
        console.log(`Hi. I'm ${this.name}`);
    },
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }
};

user.sayHiAlt(1, 2, 3);
