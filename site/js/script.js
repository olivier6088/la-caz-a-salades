$(function() {                                              // When the DOM is ready

    // CHECK IF AJAX REQUEST IS SUPPORTED
    $.ajax({                                                // Setup request
        beforeSend: function(xhr) {                         // Before requesting data
            if(xhr.overrideMimeType) {                      // If supported
                xhr.overrideMimeType("application/json");   // set MIME to prevent errors
            }
        }
    });

    // DECLARE SNIPPETS URLS
    var accueilHtml = "snippets/jq-load-accueil.html";

    // CONVENIENT FUNCTIONS
    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    // ON FIRST LOAD SHOW HOME VIEW
    showLoading("#main-content");
    $('#main-content').load(accueilHtml);

    // COLLECT DATA FROM FILES
    var data;                                                       // Declare global variable
    var keys;                                                       // Declare global variable
    // From 'data.json' file
    function loadCategories() {                                     // Declare function
        $.getJSON('data/data.json')                                 // Try to collect JSON data
        .done( function(res) {                                      // If successful
            data = res;                                             // Store it in a variable
            keys = Object.keys(data);                               // Get the keys of object data ("SL", "AM", etc...)
        }).fail( function() {                                       // If a problem: show message
            // Add code
        })
    }
    // Call functions
    loadCategories();                                               // Call the function loadCategories()


    // LOAD CATEGORIES PAGE FROM NAV MENU
    // $("#nav-lacarte a").on('click', function(e) {                        // User clicks on nav link '#lacarte'
    $(document).on('click', "#nav-lacarte a, #lacarte-tile", function(e) {  // User clicks on nav link '#lacarte' or '#lacarte-tile'
        e.preventDefault();                                                 // Prevent loading page
        var newContent = '<h2 class="text-center">La Carte</h2>';           // To build up categories view
        newContent += '<section class="row">';
        for(var i = 0; i < keys.length; i++) {                              // Loop through categories
            // Insert category values
            var name = "" + data[keys[i]].name;
            newContent += '<div class="col-md-3 col-sm-4 col-xs-6 col-xxs-12">';
            newContent += '<a href="" id="' + keys[i] + '">';
            newContent += '<div class="category-tile">';
            //<!--<img width="200" height="200" src="images/menu/{{short_name}}/{{short_name}}.jpg" alt="{{name}}">
            //<span>{{name}}</span>-->'
            newContent += '<img width="200" height="200" src="http://fakeimg.pl/200x200/?text=Photo"><span>' + name + '</span>';
            newContent += '</div>';
            newContent += '</a>';
            newContent += '</div>';
        }
        newContent += "</section>";
        $("#main-content").html(newContent);                                 // Update '#main-content'

    });

    // LOAD ITEMS PAGE
    // Declare function itemsDisplay() with arg 'cat' (value is "SL", "BO", ...) 
    function itemsDisplay(cat) {
        var newContent = '<h2 class="text-center">' + data[cat].name + '</h2>'; // To build up categories view
        newContent += '<div id="category-item-description" class="text-center">' + data[cat].description + '</div>';
        newContent += "<section class='row'>";
        for(var i = 0; i < data[cat].items.length; i++) {
            // Insert selected category items
            newContent += '<div class="menu-item-tile col-md-6">';
            newContent +=   '<div class="row">';
            newContent +=     '<div class="col-sm-5">';
            newContent +=       '<div class="menu-item-photo">';
            newContent +=         '<div>' + data[cat].items[i].id + '</div>';
            // newContent +=           '<img class="img-responsive" width="250" height="150" src="images/menu/' + cat + '/' + data[cat].items[i].id + '.jpg" alt="Item">';
            newContent +=          '<img width="250" height="150" src="http://fakeimg.pl/250x150/?text=Photo">';
            newContent +=        '</div>';
            newContent +=        '<div class="menu-item-price">';
            newContent +=          data[cat].items[i].price.toFixed(2) + '€ ';
            if(data[cat].items[i].price_takeaway != "idem") newContent += '<span>(sur place)</span>';
            if($.isNumeric(data[cat].items[i].price_takeaway)) {
                newContent += '<br>' + data[cat].items[i].price_takeaway.toFixed(2) + '€ ' + '<span>(à emporter)</span>';
            }
            newContent +=        '</div>';
            newContent +=     '</div>';
            newContent +=     '<div class="menu-item-description col-sm-7">';
            newContent +=       '<h3 class="menu-item-title">' + data[cat].items[i].name + '</h3>';
            newContent +=       '<p class="menu-item-details">' + data[cat].items[i].description + '</p>';
            newContent +=     '</div>';
            newContent +=   '</div>';
            newContent +=   '<hr class="visible-xs">';
            newContent += '</div>';
            // Add clearfix after every second menu item
            if (i % 2 != 0) {
                newContent += '<div class="clearfix visible-lg-block visible-md-block"></div>';
            }
        }
        newContent += "</section>";
        return(newContent);
    }

    // Click on a picture in page la carte
    // $('#main-content').on('click', 'section a', function(e) {                // User clicks on nav link '#lacarte'
    $(document).on('click', '#main-content section a', function(e) {            // User clicks on nav link '#lacarte'
        e.preventDefault();                                                     // Prevent loading page
        var cat = this.id;                                                      // Get value of id attr
        var newContent = itemsDisplay(cat);
        $("#main-content").html(newContent);                                    // Update '#main-content'
    });

    // CLICK ON LOGO OR '#nav-accueil'
    $('.navbar-header a, #nav-accueil').on('click', function(e) {         // Click on logo
        e.preventDefault();                                 // Prevent loading page
        $('#main-content').load(accueilHtml);               // Add html snippet in '#main-content'
    });

    // Nota Bene:
    // $(document) allows to bound the click event handler to an element that existed when the page was
    // rendered (document) and specified a selector string to filter the descendants of the selected
    // element that triggers the event.
    // cf. https://www.sitepoint.com/community/t/jquery-code-doesnt-work-on-dynamic-content-loaded-with-ajax/31758/5
    // cf. http://stackoverflow.com/questions/6537323/jquery-function-not-binding-to-newly-added-dom-elements
    
    /*    // CLICK ON PRIMARY NAVIGATION
    $('.nav-menu a').on('click', function(e) {              // Click on nav links
        e.preventDefault();                                 // Prevent loading page
        var url = this.href;                                // Get URL to load

        $('.nav-menu a.active').removeClass('active');      // Update nav
        $(this).addClass('active');

        $('#main-content').load(url);                       // Add html snippet in '#main-content'
    });*/

    // Super lightweight (~600 bytes) jQuery plugin to enable swipe gestures for Bootstrap 3 carousels on iOS and Android.
    $(document).ready(function() {
        $('.carousel').bcSwipe({ threshold: 50 });
    })

});