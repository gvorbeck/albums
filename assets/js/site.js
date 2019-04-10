let buttons = document.querySelectorAll(".album-list__button");
const logo = '<svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 -144 512 512" width="512"><path d="m400 224h-272c-8.8 0-16-7.2-16-16s7.2-16 16-16h272c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 0"/><path d="m112 224c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.3 112 112-50.2 112-112 112zm0-192c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 0"/><path d="m400 224c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.3 112 112-50.2 112-112 112zm0-192c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 0"/></svg>';

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

    ThisProjector.innerHTML = logo;
    ThisProjector.appendChild(ProjectorSprite);
    ThisProjector.appendChild(ProjectorInfo);

    console.log(ProjectorSprite);
  });
}
