$(document).ready(function() {
  var colorThief = new ColorThief(),
      yearList = $("#year-list");

  // Go through each LI and determine the dominant color of the IMG and apply it to the DIV.
  yearList.children("li").each(function(i) {
    var img = $(this).find("header").find("img")[0],
        palette = colorThief.getPalette(img, 4),
        dir = 'left';

    // Fade color/direction.
    if (i % 2 === 0) {
      dir = 'right';
    }
    $(this).find(".fade").css('background',  'linear-gradient(to ' + dir + ', rgba(0,0,0,0) 0%, rgba(' + palette[0].join() + ',1) 100%)');

    // Year colors.
    if ((palette[1][0]*.299 + palette[1][1]*.587 + palette[1][2]*.114) > 186) {
      $(this).find("h2").find("span").css("color", "rgba(0,0,0,.7)");
    }
    $(this).find("h2").find("span").css('background', 'rgb(' + palette[1].join() + ')');

    // Fill color.
    $(this).find("article").css('background-color', 'rgb(' + palette[0].join() + ')');

    // Text color.
    if ((palette[0][0]*.299 + palette[0][1]*.587 + palette[0][2]*.114) > 186) {
      $(this).find("article").children("div").css("color", "#000000");
    }
  });

  // Expand Favorites List.
  yearList.children("li").on("click", function() {
    var favoritesList = $(this).find(".favorites-list");
    // Only create markup if the LI is empty.
    if (favoritesList.find("li:first-child").is(":empty")) {
      favoritesList.children("li").each( function() {
        // Create album markup from data-attributes in LI.
        var $img = $("<img>", {alt: $(this).data("artist") + ' - ' + $(this).data("album"), src: favoritesList.data("src") + $(this).data("cover")}),
            $h3 = $("<h3>").text($(this).data("album")),
            $h4 = $("<h4>").text("by " + $(this).data("artist")),
            $div = $("<div>").append($h3, $h4);
        $(this).append($img, $div);

        // Color the background of each album.
        // Wait for image to load so Color Thief can use it.
        $(this).find("img").on("load", function() {
          var palette = colorThief.getPalette(this, 4);
          $(this).parent().css("background-color", 'rgb(' + palette[0].join() + ')');

          // Text color.
          if ((palette[0][0]*.299 + palette[0][1]*.587 + palette[0][2]*.114) > 186) {
            $(this).parent().css("color", "#000000");
          }
        });
      });
    }
    // Slide list.
    $(this).find(".favorites-list").slideToggle("fast", function() {});
  });
});
