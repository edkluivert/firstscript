// CHALLENGE: Library Book Tracker
// Fill in the 4 functions marked TODO. Don't change the tests at the bottom.
//
// Run it:   node src/challenge.ts
// Check it: npx tsc --noEmit
//
// Goal: every test line prints ✅

// New idea #1: a "literal union". `status` can ONLY be one of these 3 strings.
type BookStatus = "available" | "borrowed" | "lost";

type Book = {
    id: number;
    title: string;
    author: string;
    status: BookStatus;
    borrowedBy?: string; // New idea #2: the `?` means this property is optional
};

const books: Book[] = [
    { id: 1, title: "The Hobbit", author: "Tolkien", status: "available" },
    { id: 2, title: "Dune", author: "Herbert", status: "borrowed", borrowedBy: "Sara" },
    { id: 3, title: "1984", author: "Orwell", status: "lost" },
    { id: 4, title: "The Silmarillion", author: "Tolkien", status: "available" },
];

// TODO 1: Return how many books have the given status.
function countByStatus(list: Book[], status: BookStatus): number {
    let bStatus  = 0;
    for(const e of list) {
       if(e.status === status){
           bStatus++;
       }
    }
    return bStatus;
}

// TODO 2: Return the titles of all books by the given author.
// Hint: the return type is string[], an array of titles, not of books.
function titlesByAuthor(list: Book[], author: string): string[] {
    let bTitles: string[] = [];
    for(const e of list){
        if(e.author === author){
            bTitles.push(e.title);
        }
    }
    return bTitles; // replace this
}

// TODO 3: Find a book by id. If no book has that id, return undefined.
// Think about why the return type is `Book | undefined`.
function findBook(list: Book[], id: number): Book | undefined {
    for (const e of list) {
        if (e.id === id) {
            return e;
        }
    }
    return undefined; // replace this
}

// TODO 4: Borrow a book.
//  - If the book doesn't exist, return "Book not found"
//  - If its status isn't "available", return "Not available"
//  - Otherwise set status to "borrowed", set borrowedBy to the person,
//    and return "<person> borrowed <title>"
function borrowBook(list: Book[], id: number, person: string): string {

    for (const e of list) {

        if (e.id === id) {

            if (e.status !== "available") {
                return "Not available";
            }

            e.status = "borrowed";
            e.borrowedBy = person;

            return `${person} borrowed ${e.title}`;
        }
    }

    return "Book not found";
}

// BONUS: Uncomment this line. Why does TypeScript reject it?
// books[0]!.status = "on fire";

// ------------------------- TESTS (don't edit) -------------------------
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${ok ? "✅" : "❌"} ${label}` + (ok ? "" : `  got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`));
}

check("count available", countByStatus(books, "available"), 2);
check("count lost", countByStatus(books, "lost"), 1);
check("titles by Tolkien", titlesByAuthor(books, "Tolkien"), ["The Hobbit", "The Silmarillion"]);
check("titles by nobody", titlesByAuthor(books, "Nobody"), []);
check("find book 2", findBook(books, 2)?.title, "Dune");
check("find missing book", findBook(books, 99), undefined);
check("borrow missing", borrowBook(books, 99, "Ali"), "Book not found");
check("borrow lost book", borrowBook(books, 3, "Ali"), "Not available");
check("borrow hobbit", borrowBook(books, 1, "Ali"), "Ali borrowed The Hobbit");
check("hobbit now borrowed", findBook(books, 1)?.borrowedBy, "Ali");
check("borrow hobbit again", borrowBook(books, 1, "Sara"), "Not available");
