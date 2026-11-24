// A tiny "expense tracker" built ONLY from things you've already practiced:
// basic types, object types, arrays, union types, typeof narrowing, functions.
//
// Run it:   node src/hello.ts
// Check it: npx tsc --noEmit

// 1. An object type (like your `car`), but given a name so we can reuse it.
type Expense = {
    title: string;
    amount: number;
    paid: boolean;
    category?:string;
};

// 2. An array of that object type.
const expenses: Expense[] = [
    { title: "Rent", amount: 1200, paid: true },
    { title: "Groceries", amount: 85.5, paid: false, category:'entertainment' },
    { title: "Internet", amount: 40, paid: true },
];

// 3. A function with typed parameters and a typed return value (like your `add`).
function total(list: Expense[]): number {
    let sum: number = 0;
    for (const e of list) {
        sum += e.amount;
    }
    return sum;
}

// 4. A union type + typeof narrowing (like your `printStatusCode`).
function formatAmount(value: number | string): string {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    }
    return value.toUpperCase();
}

// 5. A function that adds to the array. TypeScript forces the right shape.
function addExpense(title: string, amount: number): void {
    expenses.push({ title, amount, paid: false });
}

addExpense("Coffee", 4.25);

// Print a report
for (const e of expenses) {
    const status: string = e.paid ? "paid" : "UNPAID";
    console.log(`${e.title.padEnd(10)} ${formatAmount(e.amount).padStart(10)}  ${status}`);
}
console.log("Total:", formatAmount(total(expenses)));
console.log(formatAmount("done"));

// ---------------------------------------------------------------------------
// YOUR TURN: try each one, then run `npx tsc --noEmit`
//
// Challenge 1: Uncomment the line below. What error does TypeScript give, and why?
// addExpense("Gym", "thirty");
//
// Challenge 2: Write a function `unpaidTotal(list: Expense[]): number`
//              that adds up only the expenses where paid is false.

function  unpaidTotal(list: Expense[]): number{
    let totalUnpaid: number = 0;
    for(const u of list){
       totalUnpaid += u.paid ? 0 : u.amount;
    }
    return totalUnpaid;
}

console.log(`Unpaid is ${unpaidTotal(expenses)}`);

// Challenge 3: Add an optional `category` to the Expense type, e.g. `category?: string`.
//              Does the existing code still compile? Why?
//
// Challenge 4: Make `paid` a union instead: `status: "paid" | "unpaid" | "overdue"`.
//              Follow the red errors to fix everything that breaks.
// ---------------------------------------------------------------------------
