var user = {
    id: '100043725' //26167094
}

retrieveUserData();

function retrieveUserData() {
    return fetch("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/user/show/" + user.id + ".xml?key=" + config.apiKey)
    .then(res => res.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(function (data) {

        console.log(data);

        var xmlResponse = $.parseXML(new XMLSerializer().serializeToString(data));
        var $xml = $(xmlResponse);
        var $user = $xml.find("user");

        var user = new User($user);
        console.log("User:", user.User());
        $('.user-name').text(user.name);
        $('#user-picture').attr('src', user.imageUrl);
        $('#user-picture').css('object-fit', 'cover');
    });
}

class User {

    constructor(elem) {
        this.name = $(elem).children('name').text();
        this.imageUrl = $(elem).children('image_url').text();
    }

    User() {
        return this.name + ", " + this.imageUrl;
    }
}