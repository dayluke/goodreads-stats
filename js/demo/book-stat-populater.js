function populateStats(bookList) {
    var total_pages_read = 0;
    var books_with_no_pages = 0;
    var longest_book_read;
    var last_book_read = bookList[0];
    var total_review_score = 0;
    
    bookList.forEach(book => {
        total_pages_read += book.pages
        if (book.pageCount == 0) books_with_no_pages++;
        if (longest_book_read === undefined || longest_book_read.pageCount < book.pages) longest_book_read = book;
        total_review_score += book.reviewRating;
    });
    
    console.log("Number of books read:", bookList.length);
    console.log("Number of ERR books:", books_with_no_pages);
    $('#books-read').text(bookList.length);
    console.log("Number of pages read:", total_pages_read);
    $('#pages-read').text(total_pages_read);
    console.log("Longest book read:", longest_book_read);
    console.log("Last book read:", last_book_read);
    console.log("Average review score:", total_review_score / bookList.length);
    console.log("Average pages in book:", total_pages_read / bookList.length - books_with_no_pages);
    $('#avg-pages').text(total_pages_read / bookList.length - books_with_no_pages);
    
    var allGenres = [];
    setTimeout(() => {
        bookList.forEach(book => {
            if (book.genres) {
                book.genres.forEach(genre => allGenres.push(genre));
            }
        })
        console.log(allGenres);
        var modeGenre = mode(allGenres).replace('-', ' ');
        console.log("Most Common Genre:", modeGenre);
    }, 2000);

    loadPieChart(total_review_score / bookList.length);
}