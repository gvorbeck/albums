let albumButtons = document.getElementsByClassName("album__button"),
    yearButtons  = document.getElementsByClassName("year__button"),
    btnInContext = 0;

const SpotlightNav = document.getElementsByClassName("spotlight__nav")[0],
      navButtons = SpotlightNav.getElementsByClassName("spotlight__nav-button");

// Function to find closest parent/child element.
function getClosest(elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) {
            return elem;
        }
    }
}

function closeSpotlight() {
    document.body.classList.remove("spotlight--open");
}

function clearSpotlight() {
    document.getElementsByClassName("spotlight__album")[0].innerHTML = "";
    document.getElementsByClassName("spotlight__artist")[0].innerHTML = "";
}

function populateSpotlight(data, colors) {
    clearSpotlight();

    let thisAlbumItem = getClosest(btnInContext, ".album-list__item"),
        thisAlbumList = getClosest(thisAlbumItem, ".album-list");
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].disabled = true;
    }
    for (let i = 0; i < thisAlbumList.children.length; i++) {
        if (thisAlbumItem === thisAlbumList.children[i] && thisAlbumList.children.length > 1) {
            if (i === 0) {
                navButtons[i+1].disabled = false;
            } else if (i === thisAlbumList.children.length - 1) {
                navButtons[0].disabled = false;
            } else {
                navButtons[0].disabled = false;
                navButtons[1].disabled = false;
            }
        }
    }

    // Colors!
    document.getElementsByClassName("spotlight__box")[0].style.backgroundColor = colors[0];
    document.getElementsByClassName("spotlight__box")[0].style.color = colors[1];

    document.getElementsByClassName("spotlight__quick")[0].style.backgroundColor = colors[1];
    document.getElementsByClassName("spotlight__quick")[0].style.color = colors[2];

    for (let i = 0; i < SpotlightNav.getElementsByTagName("BUTTON").length; i++) {
        SpotlightNav.getElementsByTagName("BUTTON")[i].style.backgroundColor = colors[2];
    }
    for (let i = 0; i < SpotlightNav.getElementsByTagName("DIV").length; i++) {
        SpotlightNav.getElementsByTagName("DIV")[i].style.backgroundColor = colors[0];
    }

    document.getElementsByClassName("spotlight__album")[0].appendChild(document.createTextNode(data.album));
    document.getElementsByClassName("spotlight__artist")[0].appendChild(document.createTextNode(data.artist));
}

// Album button behavior
for (let i = 0; i < albumButtons.length; i++) {
    albumButtons[i].addEventListener("click", function() {
        // Allows user to navigate spotlight.
        btnInContext = this;

        let colorDataContainer = window.getComputedStyle(getClosest(this, ".favorites__item"), ":before"),
            colors             = [colorDataContainer.getPropertyValue('background-color'),
                                  colorDataContainer.getPropertyValue('color'),
                                  colorDataContainer.getPropertyValue('border-color')];

        populateSpotlight(this.dataset, colors);
        document.body.classList.add("spotlight--open");
    });
}

// Year button behavior
for (let i = 0; i < yearButtons.length; i++) {
    yearButtons[i].addEventListener("click", function() {
        getClosest(this, ".favorites__item").classList.toggle("favorites__item--open");
    })
}

// Spotlight navigation controls.
for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function() {
        let thisAlbumItem = getClosest(btnInContext, ".album-list__item"),
            thisAlbumList = getClosest(thisAlbumItem, ".album-list");
        for (let a = 0; a < thisAlbumList.children.length; a++) {
            if (thisAlbumList.children[a] === thisAlbumItem) {
                if (i === 0) {
                    thisAlbumList.children[a - 1].getElementsByTagName("BUTTON")[0].click();
                } else if (i === 1) {
                    thisAlbumList.children[a + 1].getElementsByTagName("BUTTON")[0].click();
                }
            }
        }
    });
}
// Close controls
document.getElementsByClassName("spotlight__close")[0].addEventListener("click", closeSpotlight);
document.onkeydown = function(event) {
    event = event || window.event;
    if (event.keyCode == 27) {
        closeSpotlight();
    }
};
document.addEventListener("click", function(event) {
    if (event.target == document.getElementsByClassName("spotlight")[0]) {
        closeSpotlight();
    }
});






// // const Spotlight = document.getElementsByClassName("spotlight")[0];
//
// let yearButtons = document.getElementsByClassName("year__button"),
//     yearItems = document.getElementsByClassName("favorites__item"),
//     albumButtons = document.getElementsByClassName("album__button");
//
// // Function to find closest parent/child element.
// function getClosest(elem, selector) {
//     console.log("getClosest");
//     for (; elem && elem !== document; elem = elem.parentNode) {
//         if (elem.matches(selector)) {
//             return elem;
//         }
//     }
// }
//
// function toggleYearList(button) {
//     console.log("toggleYearList");
//     let thisYearListItem = getClosest(button, ".favorites__item");
//     thisYearListItem.classList.toggle("favorites__item--open");
// }
//
// function getYearAlbumData(openYear) {
//     console.log("getYearAlbumData");
//     let albums = openYear.getElementsByClassName("album-list")[0].children;
//     for (let i = 0; i < albums.length; i++) {
//
//         // let button = albums[i].getElementsByTagName("BUTTON")[0];
//         // button.addEventListener("click", function() {
//         //     sendAlbumData(this, this.dataset)
//         // })
//     }
// }
//
// function sendAlbumData(button, data) {
//     console.log("sendAlbumData");
//     document.getElementsByClassName("spotlight__album")[0].appendChild(document.createTextNode(data.album));
// }
//
// for (let i = 0; i < yearButtons.length; i++) {
//     yearButtons[i].addEventListener("click", function() {
//         toggleYearList(this);
//     });
// }
//
// for (let i = 0; i < yearItems.length; i++) {
//     if (yearItems[i].classList.contains("favorites__item--open") && !yearItems[i].classList.contains("favorites__item--populated")) {
//         getYearAlbumData(yearItems[i]);
//     }
// }
//
// for (let i = 0; i < albumButtons.length; i++) {
//     albumButtons[i].addEventListener("click", function() {
//         console.log("barf");
//         showSpotlight();
//     });
// }
//
// document.getElementsByClassName("spotlight__nav")[0].getElementsByTagName("BUTTON")[0].addEventListener("click", function() {
//     console.log("foo");
// })
//
// // const jsonURL   = "https://ws.audioscrobbler.com/2.0/",
// //       apiKey    = "6a163345d35cda2e6eefb42202119d35"
// //       Favorites = document.getElementsByClassName("favorites")[0],
// //       Spotlight = document.getElementsByClassName("spotlight")[0],
// //       SpotlightNav = Spotlight.getElementsByClassName("spotlight__nav")[0];
// //
// // let years = Favorites.children,
// //     yearButtons = Favorites.getElementsByClassName("album__button");
// //
// // // Function to find closest parent/child element.
// // function getClosest(elem, selector) {
// //     for (; elem && elem !== document; elem = elem.parentNode) {
// //         if (elem.matches(selector)) {
// //             return elem;
// //         }
// //     }
// // }
// //
// // // Function to get JSON from API source.
// // function getJSON(url, callback) {
// //     let xhr = new XMLHttpRequest();
// //     xhr.open("GET", url, true);
// //     xhr.responseType = "json";
// //     xhr.onload = function() {
// //         let status   = xhr.status,
// //             response = xhr.response;
// //         if (status === 200) {
// //             callback(null, response);
// //         } else {
// //             callback(status, response);
// //         }
// //     };
// //     xhr.send();
// // }
// //
// // function albumButtonClick(button) {
// //     console.log(button);
// //     clearSpotlight();
// //     // if (this.classList.contains("album__button")) {
// //         let colorDataContainer = window.getComputedStyle(getClosest(button, ".favorites__item"), ":before"),
// //             colorData = [colorDataContainer.getPropertyValue('background-color'),
// //                          colorDataContainer.getPropertyValue('color'),
// //                          colorDataContainer.getPropertyValue('border-color')];
// //         openSpotlight(button, colorData);
// //     // } else {
// //     //     openSpotlight(this);
// //     // }
// // }
// //
// // function clearSpotlight() {
// //     Spotlight.getElementsByClassName("spotlight__album")[0].innerHTML = "";
// //     Spotlight.getElementsByClassName("spotlight__artist")[0].innerHTML = "";
// // }
// //
// // function openSpotlight(album, colors = 0) {
// //     let albumData = album.dataset,
// //         thisIndex = "";
// //
// //     // console.log(album);
// //
// //     // Colors!
// //     Spotlight.getElementsByClassName("spotlight__box")[0].style.backgroundColor = colors[0];
// //     Spotlight.getElementsByClassName("spotlight__box")[0].style.color = colors[1];
// //
// //     Spotlight.getElementsByClassName("spotlight__quick")[0].style.backgroundColor = colors[1];
// //     Spotlight.getElementsByClassName("spotlight__quick")[0].style.color = colors[2];
// //
// //     for (let i = 0; i < SpotlightNav.getElementsByTagName("BUTTON").length; i++) {
// //         SpotlightNav.getElementsByTagName("BUTTON")[i].style.backgroundColor = colors[2];
// //     }
// //     for (let i = 0; i < SpotlightNav.getElementsByTagName("DIV").length; i++) {
// //         SpotlightNav.getElementsByTagName("DIV")[i].style.backgroundColor = colors[0];
// //     }
// //
// //     // Data!
// //     // Get the year's list of albums:
// //     thisList = getClosest(album, ".album-list__item").parentNode.children;
// //     // Find this album place in the year's list of albums:
// //     for (let i = 0; i < thisList.length; i++) {
// //         if (getClosest(album, ".album-list__item") == thisList[i]) {
// //             thisIndex = i;
// //         }
// //     }
// //     // Determine how navigation buttons should work based on the album's place in the year's list of albums:
// //     if (thisIndex === 0) {
// //         SpotlightNav.getElementsByTagName("BUTTON")[1].disabled = false;
// //         SpotlightNav.getElementsByTagName("BUTTON")[0].disabled = true;
// //     } else if (thisIndex === thisList.length - 1) {
// //         SpotlightNav.getElementsByTagName("BUTTON")[0].disabled = false;
// //         SpotlightNav.getElementsByTagName("BUTTON")[1].disabled = true;
// //     } else {
// //         SpotlightNav.getElementsByTagName("BUTTON")[0].disabled = false;
// //         SpotlightNav.getElementsByTagName("BUTTON")[1].disabled = false;
// //     }
// //
// //     // Nav spotlight behavior
// //
// //
// //     Spotlight.getElementsByClassName("spotlight__album")[0].appendChild(document.createTextNode(albumData.album));
// //     Spotlight.getElementsByClassName("spotlight__artist")[0].appendChild(document.createTextNode(albumData.artist));
// //
// //     // Open!
// //     document.body.classList.add("spotlight--open");
// // }
// //
// // function closeSpotlight() {
// //     document.body.classList.remove("spotlight--open");
// //     clearSpotlight();
// // }
// //
// // // If the .favorites block has rendered AND has child elements.
// // if (Favorites && years.length > 0) {
// //     for (let i = 0; i < years.length; i++) {
// //         let ThisYear = years[i];
// //         // Test if this item has already received API source data, allowing us to skip redundant calls.
// //         if (ThisYear.classList.contains("favorites__item--open") && !ThisYear.classList.contains("favorites__item--populated")) {
// //
// //             let thisYearList = ThisYear.getElementsByClassName("album-list")[0].children;
// //
// //             for (let a = 0; a < thisYearList.length; a++) {
// //                 break;
// //                 // console.log(window.getComputedStyle(thisYearList[a]));
// //
// //                 let ThisAlbumBtn = thisYearList[a].getElementsByClassName("album__button")[0],
// //                     thisAlbumData = ThisAlbumBtn.dataset,
// //                     apiRequest    = jsonURL + "?method=album.getinfo" + "&api_key=" + apiKey + "&artist=" + thisAlbumData.artistUrl + "&album=" + thisAlbumData.albumUrl + "&format=json";
// //
// //                 getJSON(apiRequest, function(err, data) {
// //                     // Check for request errors.
// //                     if (err !== null) {
// //                         console.log("Something went wrong: " + err);
// //                     } else {
// //                         // Check for data errors.
// //                         if (data.error) {
// //                             console.log(data.message);
// //                             switch (data.error) {
// //                                 case 6:
// //                                     console.log("Invalid parameters - Your request is missing a required parameter");
// //                                     console.log(apiRequest);
// //                                     break;
// //                                 default:
// //                                     console.log("unknown error");
// //                             }
// //                         } else {
// //                             if (!thisAlbumData.thumb && data.album.image[3]["#text"]) {
// //                                 thisAlbumData.thumb = data.album.image[3]["#text"];
// //                             }
// //                             if (data.album.wiki) {
// //                                 thisAlbumData.info = data.album.wiki.summary;
// //                             }
// //                             if (data.album.url.length) {
// //                                 thisAlbumData.lastfm = data.album.url;
// //                             }
// //                         }
// //
// //                         ThisAlbumBtn.style.backgroundImage = "url('" + thisAlbumData.thumb + "')";
// //                     }
// //                 });
// //             }
// //             ThisYear.classList.add("favorites__item--populated");
// //         }
// //     }
// //
// //     // Album click behavior
// //     for (let i = 0; i < yearButtons.length; i++) {
// //         yearButtons[i].addEventListener("click", function() {
// //             albumButtonClick(this);
// //         });
// //     }
// // }
// //
// // if (Spotlight) {
// //     // Close spotlight behavior
// //     Spotlight.getElementsByClassName("spotlight__close")[0].addEventListener("click", closeSpotlight);
// //     document.onkeydown = function(e) {
// //         e = e || window.event;
// //         if (e.keyCode == 27) {
// //             closeSpotlight();
// //         }
// //     };
// //     document.addEventListener("click", function(event) {
// //         if (event.target == Spotlight) {
// //             closeSpotlight();
// //         }
// //     });
// //
// //     SpotlightNav.getElementsByTagName("BUTTON")[0].addEventListener("click", function() {
// //         console.log(Spotlight.getElementsByClassName("spotlight__album")[0].innerText);
// //         let albumButton =
// //         spotlightNavControls();
// //     })
// // }
// //  function spotlightNavControls() {
// //      console.log("foo");
// //  }
// //
// // // // Function to find closest parent/child element.
// // // function getClosest(elem, selector, dir="parent") {
// // //     if (dir === "parent") {
// // //         for (; elem && elem !== document; elem = elem.parentNode) {
// // //             if (elem.matches(selector)) {
// // //                 return elem;
// // //             }
// // //         }
// // //     } else if (dir === "child") {
// // //         for (; elem && elem !== document; elem = elem.firstElementChild) {
// // //             if (elem.matches(selector)) {
// // //                 return elem;
// // //             }
// // //         }
// // //     } else {
// // //         return null;
// // //     }
// // // }
// // //
// //
// // //
// // // // Get information from API source and
// // // function setAlbumData() {
// // //     if (YearList){
// // //         for (let i = 0; i < YearList.children.length; i++) {
// // //             // Determine if this .year element is opened.
// // //             if (YearList.children[i].firstElementChild.classList.contains("year--open")) {
// // //                 for (let x = 0; x < YearList.children[i].getElementsByClassName("album-list__item").length; x++) {
// // //                     console.log(YearList.children[i].getElementsByClassName("album-list__item")[x].getElementsByTagName("BUTTON")[0].dataset);
// // //                     let thisAlbum = YearList.children[i].getElementsByClassName("album-list__item")[x].getElementsByTagName("BUTTON")[0].dataset;
// // //     //
// // //     //                 let ThisAlbumItem   = YearList.children[i].getElementsByClassName("album-list__item")[x],
// // //     //                     ThisAlbumButton = ThisAlbumItem.getElementsByClassName("album__button")[0],
// // //     //                     thisAlbumTitle  = ThisAlbumItem.dataset.album,
// // //     //                     thisAlbumArtist = ThisAlbumItem.dataset.artist,
// // //     //                     apiRequest      = jsonURL + "?method=album.getinfo" + "&api_key=" + apiKey + "&artist=" + thisAlbumArtist + "&album=" + thisAlbumTitle + "&format=json";
// // //     //
// //
// // //                 }
// // //             }
// // //         }
// // //     }
// // // }
// // //
// // // // Depopulate .spotlight.
// // // function closeClearSpotlight() {
// // //     document.body.classList.remove("spotlight--open");
// // //     SpotlightAlbum.innerHTML = "";
// // //     SpotlightArtist.innerHTML = "";
// // //     SpotlightTags.getElementsByTagName("DIV")[0].innerHTML = "";
// // //     SpotlightTrack.getElementsByTagName("DIV")[0].innerHTML = "";
// // //     SpotlightReview.getElementsByTagName("DIV")[0].innerHTML = "";
// // //     SpotlightInfo.getElementsByTagName("DIV")[0].innerHTML = "";
// // // }
// // //
// // // function openSpotlight(btn) {
// // //     console.log(btn);
// // //     if (getClosest(btn, ".album-list__item", "parent").previousElementSibling) {
// // //         spotlightNavBtns[0].disabled = false;
// // //     } else {
// // //         spotlightNavBtns[0].disabled = true;
// // //     }
// // //     if (getClosest(btn, ".album-list__item", "parent").nextElementSibling) {
// // //         spotlightNavBtns[1].disabled = false;
// // //     } else {
// // //         spotlightNavBtns[1].disabled = true;
// // //     }
// // //     document.body.classList.add("spotlight--open");
// // // }
// // //
// // // function getPrevBtn(btn) {
// // //     return getClosest(btn, ".album-list__item", "parent").previousElementSibling.getElementsByTagName("BUTTON")[0];
// // // }
// // //
// // // const jsonURL          = "https://ws.audioscrobbler.com/2.0/",
// // //       apiKey           = "6a163345d35cda2e6eefb42202119d35",
// // //       YearList         = document.getElementsByClassName("favorites")[0],
// // //       yearButtons      = document.getElementsByClassName("year__button"),
// // //       albumButtons     = document.getElementsByClassName("album__button"),
// // //       SpotlightBox     = document.getElementsByClassName("spotlight__box")[0],
// // //       SpotlightAlbum   = document.getElementsByClassName("spotlight__album")[0],
// // //       SpotlightArtist  = document.getElementsByClassName("spotlight__artist")[0],
// // //       spotlightNavBtns = document.getElementsByClassName("spotlight__nav")[0].getElementsByTagName("BUTTON"),
// // //       SpotlightClose   = document.getElementsByClassName("spotlight__close")[0],
// // //       SpotlightContent = document.getElementsByClassName("spotlight__content")[0],
// // //       SpotlightQuick   = SpotlightContent.getElementsByClassName("spotlight__quick")[0],
// // //       SpotlightLinks   = SpotlightQuick.getElementsByClassName("spotlight__links")[0],
// // //       SpotlightTags    = SpotlightQuick.getElementsByClassName("spotlight__tags")[0],
// // //       SpotlightTrack   = SpotlightQuick.getElementsByClassName("spotlight__track")[0],
// // //       SpotlightReview  = SpotlightContent.getElementsByClassName("spotlight__review")[0],
// // //       SpotlightInfo    = SpotlightContent.getElementsByClassName("spotlight__info")[0];
// // //
// // // let spotlightState = 0;
// // //
// // //
// // // spotlightNavBtns[0].addEventListener("click", function(event) {
// // //   thisBtn = document.getElementsByTagName("BUTTON").querySelectorAll("[data-album='" + SpotlightAlbum.innerHTML + "']")[0];
// // //   // console.log(thisBtn);
// // //   // getPrevBtn(thisBtn).click();
// // //   // thisBtn = getPrevBtn(thisBtn);
// // //   console.log(this);
// // // });
// // //
// // // // Create event listeners for each .year__button.
// // // for (let i = 0; i < yearButtons.length; i++) {
// // //     yearButtons[i].addEventListener("click", function() {
// // //         let ThisYear             = getClosest(this, ".year", "parent"),
// // //             thisYearAlbumButtons = ThisYear.getElementsByClassName("album__button");
// // //
// // //         // Test each button's tabindex so that users cannot tab through a closed year's albums.
// // //         for (let x = 0; x < thisYearAlbumButtons.length; x++) {
// // //             if (thisYearAlbumButtons[x].getAttribute("tabindex")) {
// // //                 thisYearAlbumButtons[x].removeAttribute("tabindex");
// // //             } else {
// // //                 thisYearAlbumButtons[x].setAttribute("tabindex", -1);
// // //             }
// // //         }
// // //
// // //         // Open/close a year of albums.
// // //         ThisYear.classList.toggle("year--open");
// // //         setAlbumData();
// // //     });
// // // }
// // //
// // // // Create event listeners for each .album__button in order to open the .spotlight.
// // // for (let i = 0; i < albumButtons.length; i++) {
// // //     albumButtons[i].addEventListener("click", function() {
// // //     //
// // //     //     // console.log(getClosest(this, ".album-list__item", "parent"));
// // //     //     // console.log(i);
// // //     //     // console.log(getClosest(this, ".album-list", "parent").getElementsByTagName("LI").length - 1);
// // //     //     // let thisYearList = getClosest(this, ".album-list", "parent");
// // //     //     //
// // //     //     // if (i === 0) {
// // //     //     //     spotlightNavBtns[0].disabled = true;
// // //     //     // } else {
// // //     //     //     spotlightNavBtns[0].disabled = false;
// // //     //     // }
// // //     //     //
// // //     //     // if (i === (albumButtons.length - 1)) {
// // //     //     //     spotlightNavBtns[1].disabled = true;
// // //     //     // } else {
// // //     //     //     spotlightNavBtns[1].disabled = false;
// // //     //     // }
// // //     //     // // Assign nav button functions
// // //     //     // let PrevBtn = "",
// // //     //     //     NextBtn = "";
// // //     //     // if (getClosest(this, ".album-list__item", "parent").previousElementSibling) {
// // //     //     //     console.log("foo");
// // //     //     //     spotlightNavBtns[0].disabled = false;
// // //     //     //     PrevBtn = getClosest(this, ".album-list__item", "parent").previousElementSibling.getElementsByTagName("BUTTON")[0];
// // //     //     // } else {
// // //     //     //     spotlightNavBtns[0].disabled = true;
// // //     //     //     PrevBtn = null;
// // //     //     // }
// // //     //     // if (getClosest(this, ".album-list__item", "parent").nextElementSibling) {
// // //     //     //     console.log("bar");
// // //     //     //     spotlightNavBtns[1].disabled = false;
// // //     //     //     NextBtn = getClosest(this, ".album-list__item", "parent").nextElementSibling.getElementsByTagName("BUTTON")[0];
// // //     //     // } else {
// // //     //     //     spotlightNavBtns[1].disabled = true;
// // //     //     //     NextBtn = null;
// // //     //     // }
// // //     //     // spotlightNavBtns[0].addEventListener("click", function() {
// // //     //     //     // if (PrevBtn) {
// // //     //     //     //     closeClearSpotlight();
// // //     //     //     //     PrevBtn.click();
// // //     //     //     // }
// // //     //     // });
// // //     //     // spotlightNavBtns[1].addEventListener("click", function() {
// // //     //     //     // if (NextBtn) {
// // //     //     //     //     closeClearSpotlight();
// // //     //     //     //     NextBtn.click();
// // //     //     //     // }
// // //     //     // });
// // //     //     // Add album name.
// // //     //     SpotlightAlbum.appendChild(document.createTextNode(this.dataset.album));
// // //     //     // Add album artist.
// // //     //     SpotlightArtist.appendChild(document.createTextNode(this.dataset.artist));
// // //     //     // Add album cover.
// // //     //     if (this.dataset.thumb) {
// // //     //         let AlbumCover = SpotlightContent.getElementsByClassName("spotlight__cover")[0],
// // //     //               AlbumCoverImage = AlbumCover.getElementsByTagName("IMG")[0];
// // //     //
// // //     //         AlbumCoverImage.setAttribute("src", this.dataset.thumb);
// // //     //         AlbumCoverImage.setAttribute("alt", this.dataset.album);
// // //     //     }
// // //     //     // Add last.fm link.
// // //     //     // Add spotify link.
// // //     //     // Add genius link.
// // //     //     if (this.dataset.lastfm || this.dataset.genius || this.dataset.spotify) {
// // //     //         const albumLinksServices = {lastfm:this.dataset.lastfm, genius:this.dataset.genius, spotify:this.dataset.spotify};
// // //     //
// // //     //         for (let i in albumLinksServices) {
// // //     //             let link = SpotlightLinks.getElementsByClassName(i)[0];
// // //     //             if (albumLinksServices[i] === undefined) {
// // //     //                 link.parentNode.style.display = "none";
// // //     //             } else {
// // //     //                 link.parentNode.style.display = "block";
// // //     //                 link.setAttribute("href", albumLinksServices[i]);
// // //     //                 link.setAttribute("title", i);
// // //     //             }
// // //     //         }
// // //     //     }
// // //     //     // Add tags.
// // //     //     if (this.dataset.tags) {
// // //     //         SpotlightTags.style.display = "block";
// // //     //         SpotlightTags.getElementsByTagName("DIV")[0].appendChild(document.createTextNode(this.dataset.tags));
// // //     //     } else {
// // //     //         SpotlightTags.style.display = "none";
// // //     //     }
// // //     //     // Add favorite track.
// // //     //     if (this.dataset.track) {
// // //     //         SpotlightTrack.style.display = "block";
// // //     //         SpotlightTrack.getElementsByTagName("DIV")[0].appendChild(document.createTextNode(this.dataset.track));
// // //     //     } else {
// // //     //         SpotlightTrack.style.display = "none";
// // //     //     }
// // //     //     // Add review.
// // //     //     if (this.dataset.review) {
// // //     //         SpotlightReview.style.display = "block";
// // //     //         SpotlightReview.getElementsByTagName("DIV")[0].innerHTML = this.dataset.review;
// // //     //     } else {
// // //     //         SpotlightReview.style.display = "none";
// // //     //     }
// // //     //     // Add wiki info.
// // //     //     if (this.dataset.info) {
// // //     //         SpotlightInfo.style.display = "block";
// // //     //         SpotlightInfo.getElementsByTagName("DIV")[0].innerHTML = this.dataset.info;
// // //     //     } else {
// // //     //         SpotlightInfo.style.display = "none";
// // //     //     }
// // //     //
// // //     //     // COLORS!!!
// // //     //     // Get computed background-color and color styles from hidden .album-list__item::before for .spotlight__box.
// // //     //     let color      = window.getComputedStyle(getClosest(this, ".album-list__item", "parent"), ":before").getPropertyValue('background-color'),
// // //     //         colorLight = window.getComputedStyle(getClosest(this, ".album-list__item", "parent"), ":before").getPropertyValue('color'),
// // //     //         colorDark  = window.getComputedStyle(getClosest(this, ".album-list__item", "parent"), ":after").getPropertyValue('color'),
// // //     //         spotlightQuickStyleString = "background-color: " + colorDark + "; color: " + colorLight + ";",
// // //     //         spotlightBoxStylesString  = "background-color: " + color + "; color: " + colorLight + ";";
// // //     //
// // //     //     SpotlightBox.style.cssText           = spotlightBoxStylesString;
// // //     //     SpotlightQuick.style.cssText         = spotlightQuickStyleString;
// // //     //     for (let x = 0; x < SpotlightLinks.getElementsByTagName("A").length; x++) {
// // //     //         SpotlightLinks.getElementsByTagName("A")[x].firstElementChild.style.fill = color;
// // //     //     }
// // //     //     for (let x = 0; x < spotlightNavBtns.length; x++) {
// // //     //         spotlightNavBtns[x].style.backgroundColor = colorLight;
// // //     //         for (a = 0; a < spotlightNavBtns[x].getElementsByTagName("DIV").length; a++) {
// // //     //             spotlightNavBtns[x].getElementsByTagName("DIV")[a].style.backgroundColor = color;
// // //     //         }
// // //     //     }
// // //
// // //         openSpotlight(this);
// // //     });
// // // }
// // //
// // // // depopulate spotlight event trigger
// // // document.getElementsByClassName("spotlight__close")[0].addEventListener("click", function() {
// // //     closeClearSpotlight();
// // // });
// // // // depopulate spotlight event trigger
// // // document.onkeydown = function(e) {
// // //     e = e || window.event;
// // //     if (e.keyCode == 27) {
// // //         closeClearSpotlight();
// // //     }
// // // };
// // // // depopulate spotlight event trigger
// // // document.addEventListener("click", function(event) {
// // //     if (event.target == document.getElementsByClassName("spotlight")[0]) {
// // //         closeClearSpotlight();
// // //     }
// // // });
// // //
// // // setAlbumData();
