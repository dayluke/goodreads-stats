var books = [];
var key = config.apiKey;
window.onload = retrieveBooks();

function retrieveBooks(pageIndex = 1) {

    return fetch("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/" + user.id + ".xml?key=" + key + "&v=2&shelf=read&sort=date_read&per_page=100&page=" + pageIndex)
    .then(res => res.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(function (data) {

        var xmlResponse = $.parseXML(new XMLSerializer().serializeToString(data));
        var $xml = $(xmlResponse);

        var $books = $xml.find("review");

        $books.each(function() {
            books.push( new Book($(this)) );
        })

        console.log("Books:", books);
        
        // determine which page/if there are more books here
        var reviews = $xml.find("reviews")[0];
        if (reviews.attributes.end.value < reviews.attributes.total.value) {
            console.log(parseInt(pageIndex));
            pageIndex++;
            retrieveBooks(pageIndex);
            return;
        }
        
        books = books.sort((a,b) => moment(a.dateFinished).diff(b.dateFinished))
        console.log("Sorted Books:", books);

        populateStats(books);
        loadAreaChart(books);
        loadTimeChart(books);
    });
}

function mode(array) {
    if (array.length == 0) return null;

    var modeMap = {};
    var maxEl = array[0], maxCount = 1;

    for (var i = 0; i < array.length; i++) {
        var el = array[i];

        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;  

        if(modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }

    return maxEl;
}

class Book {

    constructor (elem) {
        this.reviewRating = parseInt($(elem).children('rating').text()) || 0;
        this.dateStarted = this.formatDate($(elem).children('started_at')?.text()) || this.formatDate($(elem).children('date_added').text());
        this.dateFinished = this.formatDate($(elem).children('read_at')?.text()) || this.formatDate($(elem).children('date_updated').text());
        var book = $(elem).children('book')[0];
        this.title = $(book).children('title').text();
        this.pages = parseInt($(book).children('num_pages').text()) || 0;
        this.imageUrl = $(book).children('image_url').text();
        this.isbn = $(book).children('isbn').text();
        this.genres = [];
        if (this.isbn == '') return;
        this.getGenres().then(response => this.genres = response);
    }

    formatDate(jumbledDate) {
        // e.g. Mon Aug 17 15:10:29 -0700 2020
        if (!jumbledDate) return;
        var segments = jumbledDate.split(' ');
        return [segments[2], segments[1], segments[5], segments[3]].join(' ');
    }

    getGenres() {
        return fetch("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/isbn/" + this.isbn + "?key=" + key)
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(function (data) {

            var xmlResponse = $.parseXML(new XMLSerializer().serializeToString(data));
            var $xml = $(xmlResponse);
            var $shelves = $xml.find('shelf');
            
            var count = 0;
            var genreList = [];
            var genreExceptions = [
                'to-read', 'currently-reading', 'owned', 'default', 'favorites', 'books-i-own',
                'ebook', 'kindle', 'library', 'audiobook', 'owned-books', 'audiobooks', 'my-books',
                'ebooks', 'to-buy', 'english', 'calibre', 'books', 'british', 'audio', 'my-library',
                'favourites', 're-read', 'general', 'e-books'
            ];

            $shelves.each(function () {
                var shelfName = $(this).attr("name");
                if (genreExceptions.includes(shelfName)) return;
                genreList.push(shelfName);
                count++;
                if (count >= 5) return false;
            });

            return genreList;
        });
    }
}