function populateStats(bookList) {
    var total_pages_read = 0;
    var books_with_no_pages = 0;
    var longest_book_read;
    var last_book_read = bookList[0];
    var total_review_score = 0;
    
    bookList.forEach(book => {
        total_pages_read += book.pages
        if (book.pages == 0) books_with_no_pages++;
        if (longest_book_read === undefined || longest_book_read.pages < book.pages) longest_book_read = book;
        total_review_score += book.reviewRating;
    });
    
    console.log("Number of books read:", bookList.length);
    console.log("Number of ERR books:", books_with_no_pages);
    $('#books-read').text(bookList.length);

    console.log("Number of pages read:", total_pages_read);
    $('#pages-read').text(total_pages_read);

    console.log("Longest book read:", longest_book_read);
    console.log("Last book read:", last_book_read);

    var avg_review_score = total_review_score / bookList.length
    console.log("Average review score:", avg_review_score);

    var avg_pages_in_book = total_pages_read / bookList.length - books_with_no_pages;
    console.log("Average pages in book:", avg_pages_in_book);
    $('#avg-pages').text(avg_pages_in_book.toFixed(0));
    
    var allGenres = [];
    setTimeout(() => {
        bookList.forEach(book => {
            if (book.genres) {
                book.genres.forEach(genre => allGenres.push(genre));
            }
        })
        var modeGenre = mode(allGenres).replace('-', ' ');
        console.log("Most Common Genre:", modeGenre);
    }, 2000);

    loadPieChart(avg_review_score.toFixed(1));
}