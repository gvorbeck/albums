let albumButtons = document.getElementsByClassName("album__button"),
    yearButtons  = document.getElementsByClassName("year-block__button"),
    btnInContext = 0;

const SpotlightNav = document.getElementsByClassName("spotlight__nav")[0],
      SpotlightLinks = document.getElementsByClassName("spotlight__links")[0],
      SpotlightTags = document.getElementsByClassName("spotlight__tags")[0],
      SpotlightTrack = document.getElementsByClassName("spotlight__track")[0],
      SpotlightReview = document.getElementsByClassName("spotlight__review")[0],
      SpotlightInfo = document.getElementsByClassName("spotlight__info")[0],
      SpotlightCover = document.getElementsByClassName("spotlight__cover")[0],
      navButtons = SpotlightNav.getElementsByClassName("spotlight__nav-button");

// Function to find closest parent/child element.
function getClosest(elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) {
            return elem;
        }
    }
}

// Convert RGB color values to hex.
function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return r + g + b;
}

// Lighten or darken hex colors.
function LightenDarkenColor(col, amt) {
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00FF) + amt;
  let g = (num & 0x0000FF) + amt;
  let newColor = g | (b << 8) | (r << 16);
  return newColor.toString(16);
}

// Function to get JSON from API source.
function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
        let status   = xhr.status,
            response = xhr.response;
        if (status === 200) {
            callback(null, response);
        } else {
            callback(status, response);
        }
    };
    xhr.send();
}

function closeSpotlight() {
    document.body.classList.remove("spotlight--open");
}

function clearSpotlight() {
    document.getElementsByClassName("spotlight__album")[0].innerHTML = "";
    document.getElementsByClassName("spotlight__artist")[0].innerHTML = "";
    SpotlightCover.getElementsByTagName("IMG")[0].setAttribute("src", "");
    SpotlightTags.getElementsByTagName("DIV")[0].innerHTML = "";
    SpotlightTrack.getElementsByTagName("DIV")[0].innerHTML = "";
    SpotlightReview.getElementsByTagName("DIV")[0].innerHTML = "";
}

function populateSpotlight(data, color) {
    clearSpotlight();

    // Navigate Buttons behavior
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
    document.getElementsByClassName("spotlight__box")[0].style.backgroundColor = "#" + color;
    // document.getElementsByClassName("spotlight__box")[0].style.backgroundColor = "#" + LightenDarkenColor(color, -40);
    // document.getElementsByClassName("spotlight__box")[0].style.color = colors[1];
    //
    // document.getElementsByClassName("spotlight__quick")[0].style.backgroundColor = colors[1];
    // document.getElementsByClassName("spotlight__quick")[0].style.color = colors[2];
    //
    // for (let i = 0; i < SpotlightNav.getElementsByTagName("BUTTON").length; i++) {
    //     SpotlightNav.getElementsByTagName("BUTTON")[i].style.backgroundColor = colors[2];
    // }
    // for (let i = 0; i < SpotlightNav.getElementsByTagName("DIV").length; i++) {
    //     SpotlightNav.getElementsByTagName("DIV")[i].style.backgroundColor = colors[0];
    // }
    // for (let i = 0; i < SpotlightLinks.getElementsByTagName("LI").length; i++) {
    //     SpotlightLinks.getElementsByTagName("A")[i].firstElementChild.style.fill = colors[0];
    // }

    // Album title and artist (headline)
    document.getElementsByClassName("spotlight__album")[0].appendChild(document.createTextNode(data.album));
    document.getElementsByClassName("spotlight__artist")[0].appendChild(document.createTextNode(data.artist));
    // Album cover
    if (data.thumb) {
        SpotlightCover.getElementsByTagName("IMG")[0].setAttribute("src", data.thumb);
    }
    // External links
    if (data.lastfm || data.genius || data.spotify) {
        let thisAlbumLinks = { lastfm: data.lastfm, genius: data.genius, spotify: data.spotify };

        for (let i in thisAlbumLinks) {
            let link = SpotlightLinks.getElementsByClassName(i)[0];
            if (thisAlbumLinks[i] === undefined || thisAlbumLinks[i].length <= 1) {
                link.parentNode.style.display = "none";
            } else {
                link.parentNode.style.display = "block";
                link.setAttribute("href", thisAlbumLinks[i]);
                link.setAttribute("title", i);
            }
        }
    }
    // Tags
    if (data.tags) {
        SpotlightTags.style.display = "block";
        SpotlightTags.getElementsByTagName("DIV")[0].appendChild(document.createTextNode(data.tags));
    } else {
        SpotlightTags.style.display = "none";
    }
    // Add favorite track.
    if (data.track) {
        SpotlightTrack.style.display = "block";
        SpotlightTrack.getElementsByTagName("DIV")[0].appendChild(document.createTextNode(data.track));
    } else {
        SpotlightTrack.style.display = "none";
    }
    // Add review.
    if (data.review.length > 1) {
        SpotlightReview.style.display = "block";
        SpotlightReview.getElementsByTagName("DIV")[0].innerHTML = data.review;
    } else {
        SpotlightReview.style.display = "none";
    }
    // Add wiki info.
    if (data.wiki) {
        SpotlightInfo.style.display = "block";
        SpotlightInfo.getElementsByTagName("DIV")[0].innerHTML = data.wiki;
    } else {
        SpotlightInfo.style.display = "none";
    }
}

function searchForEmptyOpenYears() {
    for (let i = 0; i < document.getElementsByClassName("year-list")[0].children.length; i++) {
        if (document.getElementsByClassName("year-list")[0].children[i].classList.contains("year-list__item--open") && !document.getElementsByClassName("year-list")[0].children[i].classList.contains("year-list__item--populated")) {
            getAPIData(document.getElementsByClassName("year-list")[0].children[i]);
        }
    }
}

function getAPIData(yearBlock) {
    let ThisAlbumList = yearBlock.getElementsByClassName("album-list")[0];
    for (let i = 0; i < ThisAlbumList.children.length; i++) {
        let apiRequest = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=6a163345d35cda2e6eefb42202119d35&artist=" + ThisAlbumList.children[i].getElementsByTagName("BUTTON")[0].dataset.artistUrl + "&album=" + ThisAlbumList.children[i].getElementsByTagName("BUTTON")[0].dataset.albumUrl + "&format=json";

        getJSON(apiRequest, function(err, data) {
            // Check for request errors.
            if (err !== null) {
                console.log("Something went wrong: " + err);
            } else {
                getAlbumData(data.album, ThisAlbumList.children[i].getElementsByTagName("BUTTON")[0]);
            }
        });
    }
    yearBlock.classList.add("year-list__item--populated");
}

function getAlbumData(data, btn) {
    if (data) {
        if (!btn.dataset.thumb) {
            btn.setAttribute("data-thumb", data.image[3]["#text"]);
        }
        if (data.url) {
            btn.setAttribute("data-lastfm", data.url);
        }
        if (data.wiki && data.wiki.summary) {
            btn.setAttribute("data-wiki", data.wiki.summary);
        }
    }
    btn.style.backgroundImage = "url(" + btn.dataset.thumb + ")";
}

// Album button behavior
for (let i = 0; i < albumButtons.length; i++) {
    albumButtons[i].addEventListener("click", function() {
        // Allows user to navigate spotlight.
        btnInContext = this;

        let colorDataContainer = window.getComputedStyle(getClosest(this, ".year-list__item")).getPropertyValue("background-image").split(","),
            color = RGBToHex(parseInt(colorDataContainer[1].slice(5)), parseInt(colorDataContainer[2].slice(1)), parseInt(colorDataContainer[3].slice(1).slice(0, -1)));

        populateSpotlight(this.dataset, color);
        document.body.classList.add("spotlight--open");
    });
}

// Year button behavior
for (let i = 0; i < yearButtons.length; i++) {
    yearButtons[i].addEventListener("click", function() {
        getClosest(this, ".year-list__item").classList.toggle("year-list__item--open");
        searchForEmptyOpenYears();
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

// If the site loaded with a populated ul.year-list
if (document.getElementsByClassName("year-list")[0].children.length) {
    searchForEmptyOpenYears();
}
