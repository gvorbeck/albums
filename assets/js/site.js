let buttons = document.querySelectorAll(".album-list__button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    let ThisProjector   = this.parentElement.parentElement.parentElement.querySelector('.year-block__spotlight'),
        thisPosition    = (100 / (10 - 1)) * this.dataset.position,
        ProjectorSprite = document.createElement("DIV"),
        ProjectorInfo   = document.createElement("P"),
        artistTextNode  = document.createTextNode(" by " + this.dataset.artist),
        ProjectorAlbum  = document.createElement("SPAN"),
        albumTextNode   = document.createTextNode(this.dataset.album);

    ProjectorSprite.setAttribute("class", "sprite-slice");
    ProjectorSprite.setAttribute("style", "background-image:" + this.style["backgroundImage"] + ";background-position: 0% " + thisPosition + "%;");

    ProjectorAlbum.appendChild(albumTextNode);
    ProjectorInfo.setAttribute("class", "sprite-info");
    ProjectorInfo.appendChild(ProjectorAlbum);
    ProjectorInfo.appendChild(artistTextNode);

    ThisProjector.innerHTML = "<span class=\"site-logo\"></span>";
    ThisProjector.appendChild(ProjectorSprite);
    ThisProjector.appendChild(ProjectorInfo);

    console.log(ProjectorSprite);
  });
}
