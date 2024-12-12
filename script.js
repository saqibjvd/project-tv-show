//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {
   const {name, summary, image, number, season} = episode
   const code = `S${season.toString().padStart(2, "0")}E${number.toString().padStart(2, "0")}`
   const markUp = `
   <div class="episode">
      <div class="episode-header">
      <h3>${name}</h3>
      <p>${code}</p>
      </div>
      <img src="${image.medium}" alt="${name}">
      <div class="summary">
        ${summary}
      </div>
    </div>
   `
   rootElem.insertAdjacentHTML("beforeend", markUp)
  })
}


window.onload = setup;
