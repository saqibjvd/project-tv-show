
import { fetchEpisodes, fetchShows } from "./script/Api.js";
import { searchEpisode } from "./script/search-input.js";
import { htmlElements } from "./script/htmlElements.js";
import {renderEpisode} from "./script/render.js"
import { selectedShow } from "./script/search-input.js";

async function setup() {
  const allShows = await fetchShows()
  htmlElements(allShows);
  const showsId = allShows[0].id
  const allEpisodes = await fetchEpisodes(showsId);
  renderEpisode(allEpisodes)
  searchEpisode(allEpisodes);
  selectedShow()
}



window.onload = setup;
