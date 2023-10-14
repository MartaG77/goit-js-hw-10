import {fetchBreeds, fetchCatByBreed} from "./cat-api";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
const catSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
loader.style.visibility = "hidden";
const error = document.querySelector(".error");
error.style.visibility = "hidden";
window.onload = () => {
  Notiflix.Loading.dots("Loading data, please wait...", {
    backgroundColor: "rgba(0,0,0,0.8)",
  });
  fetchBreeds()
    .then(breeds => {
      Notiflix.Loading.remove();
      let select = new SlimSelect({
        select: catSelect,
        data: breeds.map(breed => ({
          text: breed.name,
          value: breed.id,
        })),
      });
      catSelect.addEventListener("change", event => {
        displayCatInfo(event.target.value);
      });
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        "Oops! Something went wrong! Try reloading the page!"
      );
    });
};

const displayCatInfo = breedId => {
  Notiflix.Loading.dots("Loading data, please wait...", {
    backgroundColor: "rgba(0,0,0,0.8)",
  });
  fetchCatByBreed(breedId)
    .then(cat => {
      Notiflix.Loading.remove();
      catInfo.innerHTML = `<img src="${cat.url}" alt="${cat.breeds[0].name}"/>
        <div class="cat-description">
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p>${cat.breeds[0].temperament}</p>
        </div>`;
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        "Oops! Something went wrong! Try reloading the page!"
      );
    });
};

