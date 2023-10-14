import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_gg2omrUzVpAVvRPqOLFmN1ZAzv92LAJM023W1kdHVr38NFEGa93pZqCzRbKsfEvL"
function fetchBreeds() {
return axios
.get("https://api.thecatapi.com/v1/breeds")
.then(response => {
return response.data;})
.catch(error => {
Notiflix.Report.failure("Oops! Something went wrong! Try reloading the page!");
throw error;});
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
    Notiflix.Report.failure(
        "Oops! Something went wrong! Try reloading the page!"
      );
      throw error;
    });
}
export {fetchBreeds, fetchCatByBreed};