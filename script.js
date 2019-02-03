cnt = 0;
document.querySelector(".loading").addEventListener("click", displayMore);

function statLoader() {
  fetch("https://codeforces.com/api/user.ratedList?activeOnly=true")
    .then(result => result.json())
    .then(result => displayMore(cnt, result))
    .catch(error => console.log(error));
  // console.log("Entered");
  // // setTimeout()
  // setTimeout(populate.bind(this), 1000);
}

function populate(res) {
  // console.log(res["result"][0]);

  displayMore(cnt, res);
}

function displayMore(count, res) {
  document
    .querySelector(".loading")
    .parentNode.removeChild(document.querySelector(".loading"));

  let loading =
    "<tr class='tabrow loading'><td></td><td>Loading...</td><td></td></tr>";

  let result = "";
  let rankingclass = "";
  let ratingclass = "";
  let tabclass = "";

  let rating = 0;
  let rank = 0;
  let name = "";

  let limit = count + 10;
  let i = count;
  while (i < limit) {
    if (i % 2 == 0) {
      tabclass = "tabrow-nth";
      rankingclass = "ranking-nth";
      ratingclass = "rating-nth";
    } else {
      tabclass = "";
      rankingclass = "";
      ratingclass = "";
    }

    rank = i + 1;
    rating = res["result"][i]["rating"];
    name = res["result"][i]["handle"];
    result = `<tr class='tabrow ${tabclass}'><td class='ranking ${rankingclass}'>${rank}</td><td class='player'>${name}</td><td class='rating ${ratingclass}'>${rating}</td></tr>`;

    document.querySelector(".tab").insertAdjacentHTML("beforeend", result);

    i++;
  }
  cnt = i;
  document.querySelector(".tab").insertAdjacentHTML("beforeend", loading);
  document
    .querySelector(".loading")
    .addEventListener("click", displayMore.bind(this, cnt, res));
}
statLoader();

console.log("log");
