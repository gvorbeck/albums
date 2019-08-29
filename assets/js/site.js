let getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
},
    YearList = document.getElementsByClassName("favorites")[0],
    getCovers = function() {
        for (let i = 0; i < YearList.children.length; i++) {
            if (YearList.children[i].firstElementChild.classList.contains("year--open")) {
                for (let x = 0; x < YearList.children[i].getElementsByClassName("album-list__item").length; x++) {
                    let thisArtist = YearList.children[i].getElementsByClassName("album-list__item")[x].dataset.artist,
                        thisAlbum  = YearList.children[i].getElementsByClassName("album-list__item")[x].dataset.album;

                    // if (!YearList.children[i].getElementsByClassName("album-list__item")[x].getElementsByClassName("album__button")[0].style.backgroundImage) {
                    //     getJSON("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=6a163345d35cda2e6eefb42202119d35&artist=" + thisArtist + "&album=" + thisAlbum + "&format=json",
                    //     function(err, data) {
                    //       if (err !== null) {
                    //         console.log('Something went wrong: ' + err);
                    //       } else {
                    //         let albumCoverLarge = data.album.image[3]["#text"];
                    //         YearList.children[i].getElementsByClassName("album-list__item")[x].getElementsByClassName("album__button")[0].style.backgroundImage = "url('" + albumCoverLarge + "')";
                    //       }
                    //     });
                    // }
                }
            }
        }
    },
    YearButtons = document.getElementsByClassName("year__button"),
    AlbumButtons = document.getElementsByClassName("album__button"),
    SpotlightClose = document.getElementsByClassName("spotlight__close")[0];

for (let i = 0; i < YearButtons.length; i++) {
    YearButtons[i].addEventListener("click", function(){
        this.parentElement.parentElement.parentElement.classList.toggle("year--open");
        let ThisAlbumButtons = this.parentElement.parentElement.parentElement.getElementsByClassName("album__button");
        for (let x = 0; x < ThisAlbumButtons.length; x++) {
            if (ThisAlbumButtons[x].getAttribute("tabindex")) {
                ThisAlbumButtons[x].removeAttribute("tabindex");
            } else {
                ThisAlbumButtons[x].setAttribute("tabindex", -1);
            }
        }
        // this.parentElement.parentElement.parentElement.getElementsByClassName("album__button")
        getCovers();
    });
}

for (let i = 0; i < AlbumButtons.length; i++) {
    AlbumButtons[i].addEventListener("click", function() {
        document.body.classList.add("spotlight--open");
    })
}

SpotlightClose.addEventListener("click", function() {
    document.body.classList.remove("spotlight--open");
});

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        document.body.classList.remove("spotlight--open");
    }
};

getCovers();


// getJSON('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=6a163345d35cda2e6eefb42202119d35&artist=King+Gizzard+%26+The+Lizard+Wizard&format=json',
// function(err, data) {
//   if (err !== null) {
//     console.log('Something went wrong: ' + err);
//   } else {
//     console.log(data);
//   }
// });

// SPRITE LAZY LOAD
// function isScrolledIntoView(el) {
//     var rect = el.getBoundingClientRect();
//     var elemTop = rect.top;
//     var elemBottom = rect.bottom;
//
//     // Only completely visible elements return true:
//     // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//     // Partially visible elements return true:
//     isVisible = elemTop < window.innerHeight && elemBottom >= 0;
//     return isVisible;
// }
// function showVisible() {
//     for (let img of document.querySelectorAll(".favorites-list__item button")) {
//         let realSrc = img.dataset.src;
//         if (!realSrc) continue;
//
//         if (isScrolledIntoView(img.parentElement.parentElement.parentElement.parentElement)) {
//             // disable caching
//             // this line should be removed in production code
//             // realSrc += '?nocache=' + Math.random();
//
//             img.setAttribute("style", "background-image: url(" + realSrc + ");" + img.getAttribute("style"));
//
//             img.dataset.src = '';
//         }
//     }
// }
// window.addEventListener('scroll', showVisible);
// showVisible();
//
// // BUTTON BEHAVIOR
// let Buttons = document.querySelectorAll(".album-list__button");
// const logo = '<svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 -144 512 512" width="512"><path d="m400 224h-272c-8.8 0-16-7.2-16-16s7.2-16 16-16h272c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 0"/><path d="m112 224c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.3 112 112-50.2 112-112 112zm0-192c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 0"/><path d="m400 224c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.3 112 112-50.2 112-112 112zm0-192c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 0"/></svg>';
//
// for (let i = 0; i < Buttons.length; i++) {
//     // Add event listener to album lists.
//     Buttons[i].addEventListener("click", function() {
//         if (!this.parentElement.classList.contains("album-list__item--active")) {
//
//             // Remove/Add "active" class on selected album for the relevant year
//             let ThisYearsAlbums = this.parentElement.parentElement.querySelectorAll(".album-list__button");
//             for (let i = 0; i < ThisYearsAlbums.length; i++) {
//                 ThisYearsAlbums[i].parentElement.classList.remove("album-list__item--active");
//             }
//             this.parentElement.classList.add("album-list__item--active");
//
//                 // Album projector element for the clicked album
//             let ThisProjector        = this.parentElement.parentElement.parentElement.querySelector('.year-block__spotlight'),
//                 // Album cover image
//                 ProjectorSprite      = document.createElement("DIV"),
//                 // Album info container
//                 ProjectorAlbumInfo   = document.createElement("H4"),
//                 // Album name container
//                 ProjectorAlbumName   = document.createElement("SPAN"),
//                 // Album text
//                 ProjectorReview        = document.createElement("DIV"),
//                 // Position of album cover in sprite
//                 thisPosition         = (100 / (10 - 1)) * this.dataset.position,
//                 // Album artist name text
//                 artistTextNode       = document.createTextNode(" by " + this.dataset.artist),
//                 // Album name text
//                 albumNameTextNode    = document.createTextNode(this.dataset.album);
//
//             // Add class to image container
//             ProjectorSprite.setAttribute("class", "sprite-slice");
//             // Add class to album info container
//             ProjectorAlbumInfo.setAttribute("class", "sprite-info");
//             // Add class to album review text container
//             ProjectorReview.setAttribute("class", "sprite-review")
//
//             // Set album cover as bg-image on container
//             ProjectorSprite.setAttribute("style", "background-image:" + this.style["backgroundImage"] + ";background-position: 0% " + thisPosition + "%;");
//
//             // If Spotify link exists
//             if (this.dataset.spotify) {
//                 let SpotifyLink = document.createElement("A");
//                 SpotifyLink.setAttribute("class", "sprite-spotify");
//                 SpotifyLink.setAttribute("title", "Listen to " + this.dataset.album + " on Spotify");
//                 SpotifyLink.setAttribute("href", this.dataset.spotify);
//                 ProjectorSprite.appendChild(SpotifyLink);
//             }
//
//             // If album has review text
//             if (this.dataset.text) {
//                 ProjectorReview.innerHTML = this.dataset.text;
//             }
//
//             // Add album name text to container
//             ProjectorAlbumName.appendChild(albumNameTextNode);
//             // Add album name container to album info container
//             ProjectorAlbumInfo.appendChild(ProjectorAlbumName);
//             // Add album artist name text to album info container
//             ProjectorAlbumInfo.appendChild(artistTextNode);
//
//             // Clear projector and replace the logo icon
//             ThisProjector.innerHTML = logo;
//             // Add album info container to the projector
//             ThisProjector.appendChild(ProjectorAlbumInfo);
//             // Add album cover image to the projector
//             ThisProjector.appendChild(ProjectorSprite);
//             // Add album review text to the projector
//             ThisProjector.appendChild(ProjectorReview);
//         }
//     });
// }
