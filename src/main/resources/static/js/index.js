$(document).ready(function () {

    $("#bth-search").click(function (event) {
        event.preventDefault();
        showSearchResult();
        $('nav').show();
    });

});

function showSearchResult(currentPage = 0) {
    const searchField = $("#search-field");
    const booksUrl = "/books/";
    const size = 12;
    let cards = "";

    $('#result-block').empty();
    $.ajax({
        type: "GET",
        url: "/api/books?query=" + searchField.val() + "&page=" + currentPage + "&size=" + size,
        beforeSend: function () {
            $('#result-block').html(
                '<div class="col-12">' +
                    '<div class="text-center lds-facebook">' +
                        '<div></div><div></div><div></div>' +
                    '</div>' +
                '</div>'
            );
        },
        complete: function() {
            $('#result-block').html();
        },
        success: function (data) {
          $('#total-found span').text("About " + data.totalItems + " results");

          data.items.forEach((item) => {
            let imageLink =  item.volumeInfo.imageLinks != undefined
                ? item.volumeInfo.imageLinks.smallThumbnail
                : '/img/missing-book.png';

            cards += "<div class='col-auto col-md-3 col-lg-3 mb-4'>" +
                        "<div class='index-content'>" +
                            "<div class='card' style='min-height: 555px;'>" +
                                "<div class='row no-gutters'>" +
                                    "<div  class='col-sm-12'>" +
                                        "<img  height='250' class='card-img-top' src='" + imageLink  +"'>" +
                                    "</div>" +
                                    "<div class='col-sm-12'>" +
                                        "<div class='card-body'>" +
                                            "<h5 class='card-title'>" + item.volumeInfo.title + "</h5>" +
                                            "<p class='card-text'>" + item.volumeInfo.authors + "</p>" +
                                            "<p class='card-text'>" + item.volumeInfo.publishedDate + "</p>" +
                                            "<a href='" + booksUrl + item.id + "' target='_blank' class='btn btn-outline-primary btn-sm'>More </a>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                     "</div>";
          });

          $('#result-block').html(cards);
          $('#currentPage').val(currentPage);
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $('#result-block').html(
                "<div class='col-12'>" +
                        "<h2 class='text-center'>No Results Found</h2>" +
                "</div>"
            );
        }
    });
}

function previousPage() {
    let previousPage = $("#currentPage").val();
    if (previousPage != 0) {
        previousPage--;
    }
    showSearchResult(previousPage);
}

function nextPage() {
    let nextPage = $("#currentPage").val();
    showSearchResult(++nextPage);
}