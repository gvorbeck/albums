// Function to find closest parent/child element.
function getClosest(elem, selector, dir="parent") {
    if (dir === "parent") {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) {
                return elem;
            }
        }
    } else if (dir === "child") {
        for (; elem && elem !== document; elem = elem.firstElementChild) {
            if (elem.matches(selector)) {
                return elem;
            }
        }
    } else {
        return null;
    }
};

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
};

// Get information from API source and
function setAlbumData() {
    if (YearList){
        for (let i = 0; i < YearList.children.length; i++) {
            // Determin if this .year element is opened.
            if (YearList.children[i].firstElementChild.classList.contains("year--open")) {
                for (let x = 0; x < YearList.children[i].getElementsByClassName("album-list__item").length; x++) {
                    // break;

                    let ThisAlbumItem   = YearList.children[i].getElementsByClassName("album-list__item")[x],
                        ThisAlbumButton = ThisAlbumItem.getElementsByClassName("album__button")[0],
                        thisAlbumTitle  = ThisAlbumItem.dataset.album,
                        thisAlbumArtist = ThisAlbumItem.dataset.artist,
                        apiRequest      = jsonURL + "?method=album.getinfo" + "&api_key=" + apiKey + "&artist=" + thisAlbumArtist + "&album=" + thisAlbumTitle + "&format=json";

                    // Test if this item has already received API source data, allowing us to skip redundant calls.
                    if (!ThisAlbumItem.classList.contains("album-list__item--applied")) {
                        getJSON(apiRequest,
                        function(err, data) {
                            // Check for request errors.
                            if (err !== null) {
                                console.log("Something went wrong: " + err);
                            } else {
                                // Check for data errors.
                                if (data.error) {
                                    console.log(data.message);
                                    switch (data.error) {
                                        case 6:
                                            console.log("Invalid parameters - Your request is missing a required parameter");
                                            break;
                                        default:
                                            console.log("unknown error");
                                    }
                                } else {
                                    if (!ThisAlbumButton.dataset.thumb && data.album.image[3]["#text"]) {
                                        ThisAlbumButton.dataset.thumb = data.album.image[3]["#text"];
                                    }
                                    if (data.album.wiki) {
                                        ThisAlbumButton.dataset.info = data.album.wiki.summary;
                                        console.log(data.album);
                                    }
                                    if (data.album.tags.tag.length) {
                                        let thisAlbumTags     = data.album.tags.tag,
                                            thisAlbumTagsList = "";

                                        for (a = 0; a < thisAlbumTags.length; a++) {
                                            if (a >= 1) {
                                                thisAlbumTagsList += ", ";
                                            }
                                            thisAlbumTagsList += thisAlbumTags[a].name;
                                        }
                                        ThisAlbumButton.dataset.tags = thisAlbumTagsList;
                                    }
                                    if (data.album.url.length) {
                                        ThisAlbumButton.dataset.lastfm = data.album.url;
                                    }

                                    ThisAlbumButton.style.backgroundImage = "url('" + ThisAlbumButton.dataset.thumb + "')";
                                    ThisAlbumItem.classList.add("album-list__item--applied");
                                }
                            }
                        });
                    }
                }
            }
        }
    }
};

// Depopulate .spotlight.
function closeClearSpotlight() {
    document.body.classList.remove("spotlight--open");
    SpotlightAlbum.innerHTML = "";
    SpotlightArtist.innerHTML = "";
    SpotlightContent.innerHTML = "";
}

function albumLinkBuilder(url, list, service) {
    let listItem = list.appendChild(document.createElement("LI")),
        listItemA = listItem.appendChild(document.createElement("A"));
    listItem.setAttribute("class", "links__item links__item--" + service);
    if (service !== "spotify") {
        listItemA.setAttribute("target", "_blank");
    }
    listItemA.setAttribute("href", url);
    listItemA.setAttribute("title", service);
    listItemA.appendChild(document.createTextNode(service));

    return listItem;
}

const jsonURL          = "https://ws.audioscrobbler.com/2.0/",
      apiKey           = "6a163345d35cda2e6eefb42202119d35",
      YearList         = document.getElementsByClassName("favorites")[0],
      yearButtons      = document.getElementsByClassName("year__button"),
      albumButtons     = document.getElementsByClassName("album__button"),
      SpotlightBox     = document.getElementsByClassName("spotlight__box")[0],
      SpotlightContent = document.getElementsByClassName("spotlight__content")[0],
      SpotlightClose   = document.getElementsByClassName("spotlight__close")[0],
      SpotlightAlbum   = document.getElementsByClassName("spotlight__album")[0],
      SpotlightArtist  = document.getElementsByClassName("spotlight__artist")[0];

// Create event listeners for each .year__button.
for (let i = 0; i < yearButtons.length; i++) {
    yearButtons[i].addEventListener("click", function() {
        let ThisYear             = getClosest(this, ".year", "parent"),
            thisYearAlbumButtons = ThisYear.getElementsByClassName("album__button");

        // Test each button's tabindex so that users cannot tab through a closed year's albums.
        for (let x = 0; x < thisYearAlbumButtons.length; x++) {
            if (thisYearAlbumButtons[x].getAttribute("tabindex")) {
                thisYearAlbumButtons[x].removeAttribute("tabindex");
            } else {
                thisYearAlbumButtons[x].setAttribute("tabindex", -1);
            }
        }

        // Open/close a year of albums.
        ThisYear.classList.toggle("year--open");
        setAlbumData();
    });
}

// Create event listeners for each .album__button in order to open the .spotlight.
for (let i = 0; i < albumButtons.length; i++) {
    albumButtons[i].addEventListener("click", function() {
        // Add album name.
        SpotlightAlbum.appendChild(document.createTextNode(this.dataset.album));
        // Add album artist.
        SpotlightArtist.appendChild(document.createTextNode(this.dataset.artist));
        // Add album cover.
        if (this.dataset.thumb) {
            let AlbumCover      = document.createElement("SECTION"),
                AlbumCoverImage = AlbumCover.appendChild(document.createElement("IMG"));

            AlbumCover.setAttribute("class", "spotlight__cover");
            AlbumCoverImage.setAttribute("src", this.dataset.thumb);
            AlbumCoverImage.setAttribute("alt", this.dataset.album);
            SpotlightContent.appendChild(AlbumCover);
        }
        // Add favorite track.
        if (this.dataset.track) {
            let AlbumTrack   = document.createElement("SECTION"),
                AlbumTrackDL = AlbumTrack.appendChild(document.createElement("DL")),
                AlbumTrackDT = AlbumTrackDL.appendChild(document.createElement("DT")),
                AlbumTrackDD = AlbumTrackDL.appendChild(document.createElement("DD"));

            AlbumTrack.setAttribute("class", "spotlight__track");
            AlbumTrackDT.appendChild(document.createTextNode("Favorite Track"));
            AlbumTrackDD.appendChild(document.createTextNode(this.dataset.track));
            SpotlightContent.appendChild(AlbumTrack);
        }
        // Add tags.
        if (this.dataset.tags) {
            let AlbumTags   = document.createElement("SECTION"),
                AlbumTagsDL = AlbumTags.appendChild(document.createElement("DL")),
                AlbumTagsDT = AlbumTagsDL.appendChild(document.createElement("DT")),
                AlbumTagsDD = AlbumTagsDL.appendChild(document.createElement("DD"));

            AlbumTags.setAttribute("class", "spotlight__tags");
            AlbumTagsDT.appendChild(document.createTextNode("Album Tags"));
            AlbumTagsDD.appendChild(document.createTextNode(this.dataset.tags));
            SpotlightContent.appendChild(AlbumTags);
        }

        // Add last.fm link.
        // Add spotify link.
        // Add genius link.
        if (this.dataset.lastfm || this.dataset.genius || this.dataset.spotify) {
            let AlbumLinks = document.createElement("SECTION"),
                AlbumLinksH2 = AlbumLinks.appendChild(document.createElement("H2")),
                AlbumLinksUL = AlbumLinks.appendChild(document.createElement("UL"));

            if (this.dataset.lastfm) {
                AlbumLinksUL.appendChild(albumLinkBuilder(this.dataset.lastfm, AlbumLinksUL, "lastfm"));
            }
            if (this.dataset.genius) {
                AlbumLinksUL.appendChild(albumLinkBuilder(this.dataset.genius, AlbumLinksUL, "genius"));
            }
            if (this.dataset.spotify) {
                AlbumLinksUL.appendChild(albumLinkBuilder(this.dataset.spotify, AlbumLinksUL, "spotify"));
            }
            AlbumLinksH2.appendChild(document.createTextNode("Links"));
            SpotlightContent.appendChild(AlbumLinks);
        }

        // Add review.
        if (this.dataset.review) {
            let AlbumReview     = document.createElement("SECTION"),
                AlbumReviewH2   = AlbumReview.appendChild(document.createElement("H2")),
                AlbumReviewText = AlbumReview.appendChild(document.createElement("DIV"));

            AlbumReview.setAttribute("class", "spotlight__review");
            AlbumReviewH2.appendChild(document.createTextNode("Why I Like This"));
            AlbumReviewText.innerHTML = this.dataset.review;
            SpotlightContent.appendChild(AlbumReview);
        }
        // Add wiki info.
        if (this.dataset.info) {
            let AlbumInfo = document.createElement("SECTION"),
                AlbumInfoH2 = AlbumInfo.appendChild(document.createElement("H2")),
                AlbumInfoText = AlbumInfo.appendChild(document.createElement("DIV"));

            AlbumInfo.setAttribute("class", "spotlight__info");
            AlbumInfoH2.appendChild(document.createTextNode("Album Info"));
            AlbumInfoText.innerHTML = this.dataset.info;
            SpotlightContent.appendChild(AlbumInfo);
        }

        // Get computed background-color and color styles from hidden .album-list__item::before for .spotlight__box.
        let bg    = window.getComputedStyle(getClosest(this, ".album-list__item", "parent"), ":before").getPropertyValue('background-color');
        let color = window.getComputedStyle(getClosest(this, ".album-list__item", "parent"), ":before").getPropertyValue('color');
        SpotlightBox.style.backgroundColor   = bg;
        SpotlightBox.style.color             = color;
        SpotlightClose.style.backgroundColor = color;
        SpotlightClose.getElementsByTagName("DIV")[0].style.backgroundColor = bg;
        SpotlightClose.getElementsByTagName("DIV")[1].style.backgroundColor = bg;

        document.body.classList.add("spotlight--open");
    });
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

setAlbumData();
