// BASICS DRILLS: small, one idea at a time, getting slightly harder.
// Do them in order. Replace each placeholder `return` with real code.
//
// Run it:   node src/drills.ts
// Check it: npx tsc --noEmit
//
// Tip: if you're stuck for more than 10 minutes, read the HINT, then move on
// and come back later. That's normal.

// ===================== LEVEL 1: functions & basic types =====================

// D1: Return the number doubled.  double(4) -> 8
function double(n: number): number {
    return n * 2;
}

// D2: Return a greeting.  greet("Sam") -> "Hello, Sam!"
// HINT: template string with backticks: `Hello, ${...}!`
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// D3: Return true if the number is even.  isEven(4) -> true, isEven(7) -> false
// HINT: n % 2 gives the remainder after dividing by 2
function isEven(n: number): boolean {
    return n % 2 === 0;
}

// D4: Return the bigger of two numbers.  bigger(3, 9) -> 9
function bigger(a: number, b: number): number {
    return a > b ? a : b;
}

// ===================== LEVEL 2: loops over arrays =====================

// D5: Add up all numbers in the array.  sum([1, 2, 3]) -> 6
// HINT: same pattern as countByStatus: start at 0, loop, add
function sum(nums: number[]): number {
    let sum : number = 0;
    for(const e of nums){
        sum+= e;
    }
    return sum;
}

// D6: Return only the numbers greater than 10.  over10([5, 12, 30, 1]) -> [12, 30]
// HINT: same pattern as titlesByAuthor: empty array, loop, if, push
function over10(nums: number[]): number[] {
    let nG : number[] = [];
    for(const e of nums){
        if(e > 10){
           nG.push(e);
        }
    }
    return nG;
}

// D7: Return every name in uppercase.  shout(["a", "b"]) -> ["A", "B"]
function shout(names: string[]): string[] {
    let pName : string[] = [];
    for(const e of names){
        pName.push(e.toUpperCase());
    }
    return pName;
}

// D8: Return the longest word. If the array is empty, return "".
// longest(["hi", "hello", "hey"]) -> "hello"
// HINT: keep a variable `best`, replace it when you find a longer word
function longest(words: string[]): string {
    let longest : string = '';
    for(const e of words){
        if(e.length > longest.length){
            longest = e;
        }
    }
    return longest;
}

// ===================== LEVEL 3: objects =====================

type Student = {
    name: string;
    score: number;
};

const students: Student[] = [
    { name: "Ama", score: 72 },
    { name: "Ben", score: 45 },
    { name: "Chidi", score: 88 },
    { name: "Dara", score: 59 },
];

// D9: Create and return a Student object.
// makeStudent("Eve", 90) -> { name: "Eve", score: 90 }
function makeStudent(name: string, score: number): Student {
    return { name: name, score: score };
}

// D10: Return the names of students who passed (score 50 or more).
// passedNames(students) -> ["Ama", "Chidi", "Dara"]
function passedNames(list: Student[]): string[] {
    let names : string [] = [];
    for(const e of list){
        if(e.score > 50){
            names.push(e.name);
        }
    }
    return names;
}

// D11: Return the average score.  average(students) -> 66
// HINT: total / list.length. You already wrote something like `sum`!
function average(list: Student[]): number {
    let score: number = 0;
    const total = list.reduce((p,c)=> p + c.score, 0);
    return total/list.length;
}

// ===================== LEVEL 4: union types =====================

// D12: Turn a score into a grade.
//  80 or more -> "A", 60 or more -> "B", 50 or more -> "C", otherwise -> "F"
type Grade = "A" | "B" | "C" | "F";
// function toGrade(score: number): Grade {
//     switch (true) {
//         case score >= 80: return "A";
//         case score >= 60: return "B";
//         case score >= 50: return "C";
//         default: return "F";
//     }
// }
function toGrade(score: number): Grade {
    if (score >= 80) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    return "F";
}
// D13: Accept a number OR a string. Return its "length":
//  for a string, its number of characters; for a number, the number of digits.
//  size("hello") -> 5, size(1234) -> 4
// HINT: typeof value === "string" ... and String(1234) turns a number into "1234"
function size(value: string | number): number {
    if(typeof value === 'number'){
        return  value.toString().length;
    }else{
        return value.length;
    }
}

// D14 (boss level): Return the student with the highest score,
// or undefined if the list is empty.
// top(students)?.name -> "Chidi"
function top(list: Student[]): Student | undefined {

    let best: Student | undefined;
    for(const e of list){
        if (!best || e.score > best.score) {
            best = e;
        }
    }
    return best;
}

// ------------------------- TESTS (don't edit) -------------------------
let passed = 0;
let totalTests = 0;
function check(label: string, actual: unknown, expected: unknown): void {
    totalTests++;
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) passed++;
    console.log(`${ok ? "✅" : "❌"} ${label}` + (ok ? "" : `  got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`));
}

console.log("--- Level 1 ---");
check("D1 double(4)", double(4), 8);
check("D1 double(-3)", double(-3), -6);
check("D2 greet", greet("Sam"), "Hello, Sam!");
check("D3 isEven(4)", isEven(4), true);
check("D3 isEven(7)", isEven(7), false);
check("D4 bigger(3, 9)", bigger(3, 9), 9);
check("D4 bigger(10, 2)", bigger(10, 2), 10);

console.log("--- Level 2 ---");
check("D5 sum", sum([1, 2, 3]), 6);
check("D5 sum empty", sum([]), 0);
check("D6 over10", over10([5, 12, 30, 1]), [12, 30]);
check("D7 shout", shout(["ada", "bo"]), ["ADA", "BO"]);
check("D8 longest", longest(["hi", "hello", "hey"]), "hello");
check("D8 longest empty", longest([]), "");

console.log("--- Level 3 ---");
check("D9 makeStudent", makeStudent("Eve", 90), { name: "Eve", score: 90 });
check("D10 passedNames", passedNames(students), ["Ama", "Chidi", "Dara"]);
check("D11 average", average(students), 66);

console.log("--- Level 4 ---");
check("D12 toGrade(85)", toGrade(85), "A");
check("D12 toGrade(60)", toGrade(60), "B");
check("D12 toGrade(50)", toGrade(50), "C");
check("D12 toGrade(10)", toGrade(10), "F");
check("D13 size('hello')", size("hello"), 5);
check("D13 size(1234)", size(1234), 4);
check("D14 top", top(students)?.name, "Chidi");
check("D14 top empty", top([]), undefined);

console.log(`\nScore: ${passed}/${totalTests}`);
