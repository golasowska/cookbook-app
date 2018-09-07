import axios from "axios";

async function getResults(query) {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const key = "272e37bd3898774dc0094f44a53df99c";
  const res = await axios(
    `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
  );
  console.log(res);
}

getResults();
