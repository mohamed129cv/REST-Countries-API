const containerCauntry = document.getElementsByClassName("container")[0];
let filterCauntry = document.querySelector("nav select ");
let searchInput = document.querySelector("nav input");
let arrOfCauntrys = [];
async function ititCauntry() {
  try {
    let api = await fetch("./data.json");
    let data = await api.json();
    arrOfCauntrys = data;
    displayCauntry(arrOfCauntrys);
  } catch (error) {
    console.log("error when fecth file ", error);
  }
}
function displayCauntry(cauntrys) {
  let data = ``;
  for (let i = 0; i < cauntrys.length; i++) {
    data += `
         <article class="cauntry hidden" data-name='${cauntrys[i].name}' data-region='${cauntrys[i].region}'>
           <img  loading="lazy" src="${cauntrys[i].flags.png}" alt='flage ${cauntrys[i].name}'>
           <div class="cauntry-informtion">
             <h3>${cauntrys[i].name}</h3>
             <p><span>Population : </span>${cauntrys[i].population}</p>
             <p><span>Region : </span>${cauntrys[i].region}</p>
             <p><span>Capital : </span>${cauntrys[i].capital}</p>
            </div>
          </article>
        `;
  }
  containerCauntry.innerHTML = data;
  requestAnimationFrame(() => {
    document.querySelectorAll(".cauntry").forEach((e) => {
      e.classList.remove("hidden");
      e.classList.add("show");
    });
  }, 500);
}

filterCauntry.addEventListener("click", () => {
  let cauntrys = arrOfCauntrys.filter((cauntry) => {
    return filterCauntry.value == "all"
      ? cauntry
      : cauntry.region.trim().toLocaleLowerCase() ==
          filterCauntry.value.trim().toLocaleLowerCase();
  });
  displayCauntry(cauntrys);
});

function searchCauntry(word) {
  let cantrys = arrOfCauntrys.filter(
    (cauntry) =>
      cauntry.name
        .trim()
        .toLocaleLowerCase()
        .includes(word.trim().toLocaleLowerCase()) &&
      cauntry.region == filterCauntry.value
  );
  displayCauntry(cantrys);
}

searchInput.addEventListener("keyup", () => {
  searchCauntry(searchInput.value);
});
let cauntry = "";
let indexOfCauntry;
containerCauntry.addEventListener("click", (event) => {
  if (event.target.closest(".cauntry")) {
    let cauntryName = event.target.closest(".cauntry").getAttribute("data-name");
    indexOfCauntry = arrOfCauntrys.findIndex((e) => {
      return e.name == cauntryName;
    });
    localStorage.setItem(
      "cauntry",
      JSON.stringify(arrOfCauntrys[indexOfCauntry])
    );
    location.assign("./cauntry-informtion.html");
  }
});
let btnDarkMode = document.getElementById("btnDarkMode");
if (localStorage.getItem("background") == "darkMode") {
  document.body.classList.add("dark-mode");
}
btnDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "background",
    document.body.classList.contains("dark-mode") ? "darkMode" : "ligthMode"
  );
});

document.addEventListener("DOMContentLoaded", ititCauntry);
