
import { htmlElements } from "./script/htmlElements.js";

import { fetchShows, fetchEpisodes } from "./script/api.js";
import { renderEpisodes, renderShows } from "./script/render.js";
import { searchContent, selectedShow } from "./script/search-episode.js";
import { backToShowsButton } from "./script/search-episode.js";

async function setup() {
  // Fetch and render shows
  const allShows = await fetchShows();
  htmlElements(allShows);


  // Fetch and render episodes for the default show
  renderShows(allShows)

  // renderEpisodes(allEpisodes);
  searchContent(allShows, renderShows, "search Shows...");
  selectedShow(allShows);
  backToShowsButton(allShows, renderShows); 
}


window.onload = setup;
