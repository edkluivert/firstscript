let username: string = 'John';
let points: number = 32;
let active: boolean = true;
let age: number = 40;

const user = {
    name: "Alice",
    age: 30,
    isAdmin: true
};

let people: readonly string[] = ['james, peter'];

// TypeScript knows these properties exist
console.log(people);

const uniqueKey: symbol = Symbol('description');
const obj = {
    [uniqueKey]: 'This is a unique property'
};
console.log(obj[uniqueKey]);

function add(x: number, y: number): number {
    return x + y;
}

console.log(add(50, 80));

console.log(username, points, active, age);


let ourTuple: [number, boolean, string];
// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');
console.log(ourTuple);

const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};

let book:  {
    name:'lord of the rings',
    year:2000,
}

function printStatusCode(code: string | number) {
    if (typeof code === "string") {
        console.log(`My status code is ${code.toUpperCase()}.`);
    } else {
        console.log(`My status code is ${code}.`);
    }
}
function getTime(): number {
    return new Date().getTime();
}
console.log(getTime());

function applyLoad({name}:{ name: string, value:number } ){
    return console.log()
}