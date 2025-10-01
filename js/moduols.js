let cauntry = JSON.parse(localStorage.getItem("cauntry"));
let previewCauntryContainer =
  document.getElementsByClassName("preview-cauntry")[0];
let btnBack = document.getElementsByClassName("btn-back")[0];
btnBack.addEventListener("click", () => {
  // localStorage.removeItem('cauntry')
  location.assign("../index.html");
});
function previewCauntry(cauntry) {
  let borderCauntry = ``;
  if (cauntry.borders) {
      for (let i = 0; i < cauntry.borders.length; i++) {
    borderCauntry += `<li>${cauntry.borders[i]}</li>`;
  }
  } else {
    borderCauntry='none' 
  }
  let languages = [];
  if (cauntry.languages) {
    for (let i = 0; i < cauntry.languages.length; i++) {
      languages.push(cauntry.languages[i].nativeName);
    }
  } else {
    languages = "none";
  }

  let currencies = [];
  if (cauntry.currencies) {
    for (let i = 0; i < cauntry.currencies.length; i++) {
      currencies.push(cauntry.currencies[i].name);
    }
  }else{
    currencies= 'none'
  }
  previewCauntryContainer.innerHTML = `
   <img src="${cauntry.flags.png}" alt="${cauntry.name}">
            <article class="cauntry-informtion">
                <h3>${cauntry.name}</h3>
                <div class="cauntry-details">
                  <ul>
                  <li><span>native Name : </span>${cauntry.nativeName}</li>
                    <li><span>region : </span>${cauntry.region}</li>
                    <li><span>population : </span>${cauntry.population}</li>
                    <li><span>Sub Region : </span>${cauntry.subregion}</li>
                    <li><span>capital : </span>${cauntry.capital}</li>
                  </ul>
                  <ul>
                  <li><span>top Level Domain : </span>${cauntry.topLevelDomain}</li>
                  <li><span>currencies</span> : ${currencies}</li>
                  <li><span>languages : </span>${languages}</li>
                  </ul>
                </div>
                <div class="border-cauntry">
                   <h4>border cauntries :</h4> 
                    <ul>
                      ${borderCauntry}
                    </ul>
                </div>
            </article>
  `;
}
previewCauntry(cauntry);

let btnDarkMode=document.getElementById('btnDarkMode')
let icon = btnDarkMode.getElementsByTagName('i')

if(localStorage.getItem('background')=='darkMode'){
  document.body.classList.add('dark-mode')
}
btnDarkMode.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode')
  icon.classList.replace('fa-solid' , 'fa-regular')
  localStorage.setItem('background' , document.body.classList.contains('dark-mode')?'darkMode' :'ligthMode')
})
