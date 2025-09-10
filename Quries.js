
db.books.find({ genre: "Fiction" });


db.books.find({ published_year: { $gt: 2010 } });

// Find books by a specific author
db.books.find({ author: "Yuval Noah Harari" });

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 20 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "The Great Gatsby" });


// --- Advanced Queries ---
// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// show only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sorting by price ascending
db.books.find().sort({ price: 1 });

// Sorting by price descending
db.books.find().sort({ price: -1 });

// Pagination (5 books per page)
db.books.find().limit(5);      // Page 1
db.books.find().skip(5).limit(5);  // Page 2

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by decade
db.books.aggregate([
  {
    $group: {
      _id: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);
// Index on title
db.books.createIndex({ title: 1 });

// Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Show query performance
db.books.find({ title: "Clean Code" }).explain("executionStats");
