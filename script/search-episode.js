import { renderEpisodes } from "./render.js";
import { fetchEpisodes } from "./api.js";
import {filterAndRender} from "./helperFnc.js";

export const searchContent = (items, renderFunction, placeholder) => {
  const container =  document.querySelector(".episodes-container") ||  document.querySelector(".search-results");
  const searchResults = document.querySelector(".search-results");
  const showSelector = document.getElementById("show-selector");
  const backButton = document.getElementById("back-button");


  const markup = `
  <input
  type="text"
  id="search-input"
  placeholder="${placeholder}"

  />
  <p id="result-count"></p>
  `;
  searchResults.innerHTML = markup;
  const searchInput = document.getElementById("search-input");
  const resultCount = document.getElementById("result-count");

  const newSearchInput = searchInput.cloneNode(true);
  searchInput.parentNode.replaceChild(newSearchInput, searchInput);

  newSearchInput.addEventListener("input", async (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if(renderFunction.name === "renderShows"){
      if(!searchTerm){
        backButton.style.display = "none";
        showSelector.style.display = "block";
        resultCount.textContent = "";
        renderFunction(items)
      } else {
        backButton.style.display = "block";
        showSelector.style.display = "none";
        filterAndRender(searchTerm, items, renderFunction, resultCount, container)
      }
    } else {
      showSelector.style.display = "none";
      filterAndRender(searchTerm, items, renderFunction, resultCount, container)
    }

    
  });
};

export const selectedShow = (allShows) => {
  const showSelector = document.getElementById("show-selector");

  const resultCount = document.getElementById("result-count");
  const showContainer = document.getElementById("shows-container");
  const episodesContainer = document.querySelector(".episodes-container");
  const backButton = document.getElementById("back-button");

  showSelector.addEventListener("change", async (e) => {
    const selectedShowId = e.target.value;
    if(selectedShowId) {
      const selectedShow = allShows.find((show) => show.id === parseInt(selectedShowId));
      const searchInput = document.getElementById("search-input");

      if(searchInput && selectedShow) {
        searchInput.value = selectedShow.name
        searchInput.dispatchEvent(new Event("input"))
      }
      episodesContainer.style.display = "none";
      showContainer.style.display = "block";
      showSelector.style.display = "none";
      backButton.style.display = "block";
    } else {
      const searchInput = document.getElementById("search-input");
      if(searchInput){
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"))
      }
    }
   
  });
};


export const backToShowsButton = (allShows, renderShows) =>{
  const showSelector = document.getElementById("show-selector");
 
  const showContainer = document.getElementById("shows-container");
  const episodesContainer = document.querySelector(".episodes-container");
  const backButton = document.getElementById("back-button");
  const searchInput = document.getElementById("search-input");

  backButton.addEventListener("click", () =>{
    episodesContainer.style.display = "none";
    showContainer.style.display = "block";
    const searchInput = document.getElementById("search-input");
    const resultCount = document.getElementById("result-count");
    if(searchInput){
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);
    newSearchInput.value = ""
    }
    if(resultCount){
      resultCount.textContent = "";
    }
    if(showSelector){
      showSelector.value = "";
      showSelector.style.display = "block";
    }
    renderShows(allShows);
    searchContent(allShows, renderShows, "search shows...");
    backButton.style.display = "none"
  })
}