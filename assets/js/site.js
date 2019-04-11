// SPRITE LAZY LOAD
function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    // top elem edge is visible OR bottom elem edge is visible
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
}
function showVisible() {
    for (let img of document.querySelectorAll(".favorites-list__item button")) {
        let realSrc = img.dataset.src;
        if (!realSrc) continue;

        if (isVisible(img.parentElement.parentElement.parentElement.parentElement)) {
            // disable caching
            // this line should be removed in production code
            // realSrc += '?nocache=' + Math.random();

            img.setAttribute("style", "background-image: url(" + realSrc + ");" + img.getAttribute("style"));

            img.dataset.src = '';
        }
    }
}
window.addEventListener('scroll', showVisible);
showVisible();

// BUTTON BEHAVIOR
let Buttons = document.querySelectorAll(".album-list__button");
const logo = '<svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 -144 512 512" width="512"><path d="m400 224h-272c-8.8 0-16-7.2-16-16s7.2-16 16-16h272c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 0"/><path d="m112 224c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.3 112 112-50.2 112-112 112zm0-192c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 0"/><path d="m400 224c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.3 112 112-50.2 112-112 112zm0-192c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 0"/></svg>';

for (let i = 0; i < Buttons.length; i++) {
    // Add event listener to album lists.
    Buttons[i].addEventListener("click", function() {
            // Album projector element for the clicked album
        let ThisProjector        = this.parentElement.parentElement.parentElement.querySelector('.year-block__spotlight'),
            // Album cover image
            ProjectorSprite      = document.createElement("DIV"),
            // Album info container
            ProjectorAlbumInfo   = document.createElement("P"),
            // Album name container
            ProjectorAlbumName   = document.createElement("SPAN"),
            // Position of album cover in sprite
            thisPosition         = (100 / (10 - 1)) * this.dataset.position,
            // Album artist name text
            artistTextNode       = document.createTextNode(" by " + this.dataset.artist),
            // Album name text
            albumNameTextNode    = document.createTextNode(this.dataset.album);

        // Add class to image container
        ProjectorSprite.setAttribute("class", "sprite-slice");
        // Add class to album info container
        ProjectorAlbumInfo.setAttribute("class", "sprite-info");

        // Set album cover as bg-image on container
        ProjectorSprite.setAttribute("style", "background-image:" + this.style["backgroundImage"] + ";background-position: 0% " + thisPosition + "%;");

        // If Spotify link exists
        if (this.dataset.spotify) {
            let SpotifyLink = document.createElement("A");
            SpotifyLink.setAttribute("class", "sprite-spotify");
            SpotifyLink.setAttribute("title", "Listen to " + albumNameTextNode + " on Spotify");
            SpotifyLink.setAttribute("href", this.dataset.spotify);
            ProjectorSprite.appendChild(SpotifyLink);
        }

        // Add album name text to container
        ProjectorAlbumName.appendChild(albumNameTextNode);
        // Add album name container to album info container
        ProjectorAlbumInfo.appendChild(ProjectorAlbumName);
        // Add album artist name text to album info container
        ProjectorAlbumInfo.appendChild(artistTextNode);

        // Clear projector and replace the logo icon
        ThisProjector.innerHTML = logo;
        // Add album info container to the projector
        ThisProjector.appendChild(ProjectorAlbumInfo);
        // Add album cover image to the projector
        ThisProjector.appendChild(ProjectorSprite);

        // Remove/Add "active" class on selected album for the relevant year
        let ThisYearsAlbums = this.parentElement.parentElement.querySelectorAll(".album-list__button");
        for (let i = 0; i < ThisYearsAlbums.length; i++) {
            ThisYearsAlbums[i].parentElement.classList.remove("album-list__item--active");
        }
        this.parentElement.classList.add("album-list__item--active")
    });
}
