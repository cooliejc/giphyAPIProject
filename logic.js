//Globals
var topics = ["cats", "dog", "fishes", "birds", "frogs", "raccoon", "cows", "pig", "sheep", "horses", "hedgehogs", "hamsters", "dolphin"];

//Buttons
function createButtons(){
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-primary gifButton");
        button.attr("id", topics[i]);
        button.text(topics[i]);
        $("#buttons").append(button);
    };
};

//Execute
createButtons();

//Create a new button
$("#submit").on("click", function(){
    topics.push($("#input").val());
    $("#buttons").empty();
    createButtons();
});

//Giphy API AJAX call on button click
$(document).on("click", ".gifButton", displayGifs);

function displayGifs(){
    $("#display").empty();
    var apiKey = "uKJvlVOpvcC9lZxf8RQNlefCR401Hreb";
    var search = $(this).attr("id");
    var limit = "10"
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=${limit}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < limit; i++) {
            var imageCard = $("<div>");
            imageCard.addClass("d-inline-block imageCard");
            var image = $("<img>");
            image.attr("src", response.data[i].images.fixed_height_still.url);
            image.attr("data-still",  response.data[i].images.fixed_height_still.url);
            image.attr("data-animate",  response.data[i].images.fixed_height.url);
            image.attr("data-state",  "still");
            image.addClass("gif")
            imageCard.append('<p>Rating: ' + response.data[i].rating + '</p>');
            imageCard.append(image);
            $("#display").append(imageCard);
        };
    });
};

//Toggle animation states
$(document).on("click", ".gif", toggleGifs);

function toggleGifs(){
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };
};