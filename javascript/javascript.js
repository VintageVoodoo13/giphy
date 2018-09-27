$(document).ready(function() {

    var topics = ["Lemmy Kilmister", "Jimmy Page", "Jim Morrison", "Tobias Forge", "John Lennon", "Janis Joplin", "Prince", "David Bowie"];

    function displaymusician() {

        var x = $(this).data("search");
        console.log(x);
        var api_key = "ikusOTxKvFNvmBXYh36QhcFRsSwKLtrx"
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=ikusOTxKvFNvmBXYh36QhcFRsSwKLtrx&limit=10"

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var musicianDiv = $("<div>").addClass("img-responsive col-md-4");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_small_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
                var showDiv = $('#gifArea');

                showImage.attr("src", staticSrc);
                showImage.addClass("img-responsive");
                showImage.attr("data-animate", "animate");
                showImage.attr("data-animate", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(musicianDiv);

            }
        });
    }


    $("#addmusician").on("click", function(event) {
        event.preventDefault();
        var newmusician = $("#musicianInput").val().trim();
        topics.push(newmusician);
        console.log(topics);
        $("#musicianInput").val('');
        displayButtons();
    });



    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "show");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();


    $(document).on('click', '#show', displaymusician);


    $(document).on("click", ".musicianGiphy", pausePlayGifs);


    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }
    }

});