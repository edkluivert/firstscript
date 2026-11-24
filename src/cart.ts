// PROJECT: Shopping Cart
// ---------------------------------------------------------------------------
// This time YOU write everything: the types, the functions and the output.
// Build it one step at a time. After each step, run it and make sure it works
// before moving on.
//
// Run it:   node src/cart.ts
// Check it: npx tsc --noEmit
//
// STEP 1: Types
//   - Make a type `Product` with: id (number), name (string), price (number)
//   - Make a type `CartItem` with: product (a Product), quantity (number)
//     (yes, a type can contain another type!)
//
// STEP 2: Data
//   - Create an array of at least 4 Products (your shop's stock)
//   - Create an empty cart: an array of CartItem
//
// STEP 3: addToCart(productId, quantity)
//   - Find the product by id (you've written this before!)
//   - If it doesn't exist, print "Product <id> not found" and stop
//   - If it's ALREADY in the cart, increase its quantity instead of adding a
//     second line
//   - Otherwise, push a new CartItem
//
// STEP 4: removeFromCart(productId)
//   - Remove that product's line from the cart
//   - HINT: build a new array without it, OR look up `.filter()`
//
// STEP 5: cartTotal(): number
//   - Price × quantity for each line, added together
//
// STEP 6: printReceipt()
//   - Print something like this:
//
//       Apple      x3   $1.50
//       Bread      x1   $2.20
//       --------------------
//       TOTAL           $3.70
//
//   - If the cart is empty, print "Cart is empty" instead
//   - HINT: .toFixed(2) and .padEnd() from hello.ts
//
// STEP 7: Discounts (union types!)
//   - Make a type: `Discount = "none" | "student" | "black-friday"`
//   - Write applyDiscount(total, discount): number
//       none         -> no change
//       student      -> 10% off
//       black-friday -> 25% off, but only if total is over $20
//   - Show the discount on the receipt
//
// TEST IT YOURSELF at the bottom of the file. Try the edge cases:
//   - add a product that doesn't exist
//   - add the same product twice (does the quantity go up?)
//   - remove something, then print the receipt
//   - print a receipt for an empty cart
//   - black-friday with a total under $20 and over $20
// ---------------------------------------------------------------------------

// Start writing here 👇

type Product = {
    id: number;
    name: string;
    price: number;
};

type CartItem = {
    product: Product;
    quantity: number;
};

type Discount = "none" | "student" | "black-friday";

let products: Product[] = [
    { id: 1, name: "SmartPhone", price: 200 },
    { id: 20, name: "Bread", price: 50 },
    { id: 5, name: "Egg", price: 20 },
    { id: 9, name: "Carrots", price: 30 },
];

let cartList: CartItem[] = [];

function addToCart(id: number, quantity: number): void {
    if (quantity <= 0) {
        console.log("Quantity must be greater than zero");
        return;
    }

    const product = products.find(e => e.id === id);

    if (!product) {
        console.log(`Product ${id} not found`);
        return;
    }

    const existing = cartList.find(f => f.product.id === id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cartList.push({
            product: product,
            quantity: quantity
        });
    }
}

function removeFromCart(id: number): void {
    const index = cartList.findIndex(f => f.product.id === id);

    if (index !== -1) {
        cartList.splice(index, 1);
    }
}

function cartTotal(): number {
    let total: number = 0;

    for (const e of cartList) {
        total += e.quantity * e.product.price;
    }

    return total;
}

function formatAmount(value: number | string): string {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    }

    return value.toUpperCase();
}

function applyDiscount(total: number, discount: Discount): number {
    switch (discount) {
        case "none":
            return total;

        case "student":
            return total * 0.90;

        case "black-friday":
            if (total > 20) {
                return total * 0.75;
            }
            return total;

        default:
            const check: never = discount;
            return total;
    }
}

function printReceipt(discount: Discount = "none"): void {
    if (cartList.length === 0) {
        console.log("Cart is empty");
        return;
    }

    console.log("\n========== RECEIPT ==========");

    for (const e of cartList) {
        const subtotal = e.product.price * e.quantity;

        console.log(
            `${e.product.name.padEnd(12)} x${e.quantity} ${formatAmount(subtotal)}`
        );
    }

    const total = cartTotal();
    const finalTotal = applyDiscount(total, discount);

    console.log("-----------------------------");
    console.log(`SUBTOTAL:     ${formatAmount(total)}`);

    if (finalTotal < total) {
        console.log(`DISCOUNT:     -${formatAmount(total - finalTotal)}`);
    }

    console.log(`TOTAL:        ${formatAmount(finalTotal)}`);
    console.log("=============================\n");
}

console.log("TEST 1: Adding products");
addToCart(1, 2);
addToCart(20, 3);
addToCart(5, 1);
printReceipt();

console.log("TEST 2: Adding an existing product");
addToCart(20, 2);
printReceipt();

console.log("TEST 3: Invalid product");
addToCart(999, 1);

console.log("TEST 4: Invalid quantity");
addToCart(1, -2);

console.log("TEST 5: Removing a product");
removeFromCart(5);
printReceipt();

console.log("TEST 6: Student discount");
printReceipt("student");

console.log("TEST 7: Black Friday discount");
printReceipt("black-friday");

console.log("TEST 8: Black Friday under $20");
cartList = [];
addToCart(5, 1);
printReceipt("black-friday");

console.log("TEST 9: Empty cart");
cartList = [];
printReceipt();