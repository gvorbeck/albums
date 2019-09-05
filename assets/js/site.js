function getClosest(elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) {
            return elem;
        }
    }
    return null;
}

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
                // for (let x = 0; x < 1; x++) {
                for (let x = 0; x < YearList.children[i].getElementsByClassName("album-list__item").length; x++) {
                    break;
                    let thisArtist = YearList.children[i].getElementsByClassName("album-list__item")[x].dataset.artist,
                        thisAlbum  = YearList.children[i].getElementsByClassName("album-list__item")[x].dataset.album;

                    if (!YearList.children[i].getElementsByClassName("album-list__item")[x].getElementsByClassName("album__button")[0].style.backgroundImage) {
                        getJSON("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=6a163345d35cda2e6eefb42202119d35&artist=" + thisArtist + "&album=" + thisAlbum + "&format=json",
                        function(err, data) {
                          if (err !== null) {
                            console.log('Something went wrong: ' + err);
                          } else {
                            let ThisAlbumButton = YearList.children[i].getElementsByClassName("album-list__item")[x].getElementsByClassName("album__button")[0];

                            if (!data.error) {
                                if (!ThisAlbumButton.dataset.thumb) {
                                    ThisAlbumButton.dataset.thumb = data.album.image[3]["#text"];
                                }
                                if (data.album.wiki) {
                                    ThisAlbumButton.dataset.info = data.album.wiki.content;
                                }
                                ThisAlbumButton.dataset.tags = data.album.tags.tag;
                            } else {
                                console.log(data.message + ": " + thisAlbum);
                                console.log(data);
                            }

                            YearList.children[i].getElementsByClassName("album-list__item")[x].getElementsByClassName("album__button")[0].style.backgroundImage = "url('" + ThisAlbumButton.dataset.thumb + "')";
                          }
                        });
                    }
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
        getCovers();
    });
}

// populate spotlight
for (let i = 0; i < AlbumButtons.length; i++) {
    AlbumButtons[i].addEventListener("click", function() {
        document.body.classList.add("spotlight--open");
        document.getElementsByClassName("spotlight__album")[0].appendChild(document.createTextNode(this.dataset.album));
        document.getElementsByClassName("spotlight__artist")[0].appendChild(document.createTextNode(this.dataset.artist));

        const SpotlightBox     = document.getElementsByClassName("spotlight__box")[0],
              SpotlightContent = document.getElementsByClassName("spotlight__content")[0],
              SpotlightClose   = document.getElementsByClassName("spotlight__close")[0];

        // Get computed background-color and color styles from hidden .album-list__item::before for .spotlight__box.
        let bg    = window.getComputedStyle(getClosest(this, ".album-list__item"), ":before").getPropertyValue('background-color');
        let color = window.getComputedStyle(getClosest(this, ".album-list__item"), ":before").getPropertyValue('color');
        SpotlightBox.style.backgroundColor   = bg;
        SpotlightBox.style.color             = color;
        SpotlightClose.style.backgroundColor = color;
        SpotlightClose.getElementsByTagName("DIV")[0].style.backgroundColor = bg;
        SpotlightClose.getElementsByTagName("DIV")[1].style.backgroundColor = bg;
        if (this.dataset.review) {
            // console.log("foo");
        }
    })
}

// depopulate spotlight
let closeClearSpotlight = function() {
    document.body.classList.remove("spotlight--open");
    document.getElementsByClassName("spotlight__album")[0].innerHTML = "";
    document.getElementsByClassName("spotlight__artist")[0].innerHTML = "";
}

// depopulate spotlight event trigger
SpotlightClose.addEventListener("click", function() {
    closeClearSpotlight();
});

// depopulate spotlight event trigger
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        closeClearSpotlight();
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
