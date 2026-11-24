// ARRAY METHODS: shortcuts for the loops you already know how to write.
//
// Run it:   node src/arrays.ts
// Check it: npx tsc --noEmit
//
// Every method below does something you've ALREADY written with a for loop.
// Read the lesson for each one, then do its drills before moving on.

type Item = { name: string; price: number; inStock: boolean };

const shop: Item[] = [
    { name: "Pen", price: 2, inStock: true },
    { name: "Book", price: 15, inStock: false },
    { name: "Bag", price: 40, inStock: true },
    { name: "Ruler", price: 3, inStock: true },
];

// ============================================================================
// LESSON 1: .find(): get the FIRST item that matches (or undefined)
//
//   Loop version (your findBook):        Method version:
//   for (const x of list) {              list.find(x => x.price > 10)
//       if (x.price > 10) return x;
//   }
//   return undefined;
//
//   `x => x.price > 10` is a small function (an "arrow function"). It is called
//   once per item, and the first item where it returns true is the answer.
// ============================================================================

// A1: Return the item with the given name.  findByName(shop, "Bag")?.price -> 40
function findByName(list: Item[], name: string): Item | undefined {
    return list.find(r => r.name === name);
}

// A2: Return the first item that is NOT in stock.  firstOutOfStock(shop)?.name -> "Book"
function firstOutOfStock(list: Item[]): Item | undefined {
  return list.find(r => !r.inStock);
}

// ============================================================================
// LESSON 2: .filter(): get ALL items that match (always returns an array)
//
//   Loop version (your over10):          Method version:
//   const result: number[] = [];         nums.filter(n => n > 10)
//   for (const n of nums) {
//       if (n > 10) result.push(n);
//   }
//   return result;
// ============================================================================

// A3: Return only the numbers that are even.  evens([1, 2, 3, 4]) -> [2, 4]
function evens(nums: number[]): number[] {
    let x : number[] = [];
    for(const e of nums){
        if(e % 2 === 0){
            x.push(e);
        }
    }
    return x;
}

// A4: Return the items that are in stock.  inStock(shop).length -> 3
function inStock(list: Item[]): Item[] {
    let x : Item[] = [];
    for(const e of list){
        if(e.inStock){
            x.push(e);
        }
    }
    return x;
}

// ============================================================================
// LESSON 3: .map(): turn EVERY item into something else (same length array)
//
//   Loop version (your shout):           Method version:
//   const result: string[] = [];         names.map(n => n.toUpperCase())
//   for (const n of names) {
//       result.push(n.toUpperCase());
//   }
//   return result;
// ============================================================================

// A5: Return every number tripled.  triple([1, 2, 3]) -> [3, 6, 9]
function triple(nums: number[]): number[] {
    return nums.map(e => e * 3);
}

// A6: Return just the names.  names(shop) -> ["Pen", "Book", "Bag", "Ruler"]
function names(list: Item[]): string[] {
    return list.map(r => r.name);
}

// A7 (combo!): Return the NAMES of items that cost less than 10.
// cheapNames(shop) -> ["Pen", "Ruler"]
// HINT: you can chain methods: list.filter(...).map(...)
function cheapNames(list: Item[]): string[] {
    return list
        .filter(s => s.price < 10)
        .map(s => s.name);
}

// ============================================================================
// LESSON 4: .some() and .includes(): yes/no questions (return boolean)
//
//   list.some(x => x.price > 30)    -> true if AT LEAST ONE item matches
//   ["a", "b"].includes("b")        -> true if the value is in the array
// ============================================================================

// A8: Is anything more expensive than the given price?
// anyOver(shop, 30) -> true, anyOver(shop, 100) -> false
function anyOver(list: Item[], price: number): boolean {
    return list.some(f => f.price > price);
}

// A9: Is the word in the list?  hasWord(["hi", "yo"], "yo") -> true
function hasWord(words: string[], word: string): boolean {
    return words.includes(word);
}

// ============================================================================
// LESSON 5: .findIndex() + .splice(): remove an item from an array
//
//   const i = list.findIndex(x => x.name === "Bag");  // position, or -1 if not found
//   if (i !== -1) {
//       list.splice(i, 1);   // "at position i, remove 1 item"
//   }
//
//   ⚠️ splice CHANGES the original array. filter does NOT. It makes a new one.
// ============================================================================

// A10: Return the position of the word, or -1.  positionOf(["a", "b", "c"], "c") -> 2
function positionOf(words: string[], word: string): number {
    return words.indexOf(word);
}

// A11: Remove the item with that name FROM the list (change the list itself).
// Return true if something was removed, false if the name wasn't found.
function removeByName(list: Item[], name: string): boolean {
    const index = list.findIndex(e => e.name === name);

    if (index === -1) {
        return false;
    }

    list.splice(index, 1);
    return true;
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

console.log("--- find ---");
check("A1 findByName Bag", findByName(shop, "Bag")?.price, 40);
check("A1 findByName missing", findByName(shop, "Lamp"), undefined);
check("A2 firstOutOfStock", firstOutOfStock(shop)?.name, "Book");

console.log("--- filter ---");
check("A3 evens", evens([1, 2, 3, 4]), [2, 4]);
check("A3 evens none", evens([1, 3]), []);
check("A4 inStock count", inStock(shop).length, 3);

console.log("--- map ---");
check("A5 triple", triple([1, 2, 3]), [3, 6, 9]);
check("A6 names", names(shop), ["Pen", "Book", "Bag", "Ruler"]);
check("A7 cheapNames", cheapNames(shop), ["Pen", "Ruler"]);

console.log("--- some / includes ---");
check("A8 anyOver 30", anyOver(shop, 30), true);
check("A8 anyOver 100", anyOver(shop, 100), false);
check("A9 hasWord yes", hasWord(["hi", "yo"], "yo"), true);
check("A9 hasWord no", hasWord(["hi", "yo"], "hey"), false);

console.log("--- findIndex / splice ---");
check("A10 positionOf c", positionOf(["a", "b", "c"], "c"), 2);
check("A10 positionOf missing", positionOf(["a", "b"], "z"), -1);
const testList: Item[] = [
    { name: "Pen", price: 2, inStock: true },
    { name: "Bag", price: 40, inStock: true },
];
check("A11 remove Bag returns true", removeByName(testList, "Bag"), true);
check("A11 list now has 1 item", testList.length, 1);
check("A11 remove Lamp returns false", removeByName(testList, "Lamp"), false);
check("A11 list still has 1 item", testList.length, 1);

console.log(`\nScore: ${passed}/${totalTests}`);
