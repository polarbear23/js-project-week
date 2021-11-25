const state = {
    selectedChampId: "",
    selectedChamp:{
        id:"",
    },
    usingSearch: false,
}


async function updateStateJson(stateObject){
   return await fetch("http://localhost:3000/state", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(stateObject)
    })
}


function createIcon(champion){
    const iconLiEl = document.createElement("li");
    const iconAEl = document.createElement("a");
    const iconImgEl = document.createElement("img");
    iconImgEl.className = "icon";
    if(champion.id === "Aatrox"){
        iconImgEl.classList.add("active");
    }
    iconImgEl.src = `/images/champion/icons/${champion.image.full}`
    iconImgEl.alt = `${champion.name}`
    iconLiEl.id = `${champion.id}`;
    iconAEl.append(iconImgEl);
    iconLiEl.append(iconAEl);
    iconLiEl.addEventListener("click", (e)=> {
        if(state.selectedChampId !== champion.id){
            state.selectedChampId = champion.id;
            state.selectedChamp = champion;
            updateStateJson(state);
            //console.log("event",state.selectedChampId);
            renderMainSection(e.target,champion);
            //console.log(champion.name);
        }
    })
    const iconsContainer = document.querySelector(".icons-container")
    iconsContainer.append(iconLiEl);
}

async function renderIcons(){
    const getResp = await fetch("http://localhost:3000/data");
    //console.log(getResp);
    const champions = await getResp.json();
    //console.log(champions);
    for(let i = 0; i < champions.length; i++){
        createIcon(champions[i]);
    } 
}

function renderMainSection(target,champion,searched = false){
    const splashArtEl = document.querySelector(".splash-container");
    const li = document.querySelector(".search-icon");
    //console.log(li);
    splashArtEl.remove(); //remove previous artwork
    const newSplashArtEl = document.createElement("main");
    const mainSection = document.querySelector(".main-section");
    newSplashArtEl.className = "splash-container";
    const activeEl = document.querySelector(".active");
    const championName = document.createElement("h1");
    const championTitle = document.createElement("h2");
    const championBlurb = document.createElement("p");
    const champInfoContainer = document.createElement("section");
    const champMoreInfoArrow = document.createElement("img");
    const arrowContainer = document.createElement("a");
    arrowContainer.className = "arrow-container";
    arrowContainer.href = "/src/champion.html";
    champMoreInfoArrow.className = "champ-more-info-arrow";
    champMoreInfoArrow.src="/images/chevron-right-solid.svg"
    championBlurb.innerText = `${champion.blurb}`;
    championBlurb.className = "champ-blurb";
    champInfoContainer.className = "champ-info";
    championName.innerText = `${champion.name.toUpperCase()}`;
    championName.className = "champ-name";
    arrowContainer.append(champMoreInfoArrow);
    const titleCapitalised = capitaliseFirstLetter(champion.title);
   // improveVisibility(championName,championTitle,championBlurb, champion);
    championTitle.innerText = `${titleCapitalised}`
    championTitle.className = "champ-title";
    champInfoContainer.append(championName, championTitle, championBlurb, arrowContainer);
    newSplashArtEl.append(champInfoContainer);
    mainSection.append(newSplashArtEl);
    if(searched === false){
        activeEl.classList.remove("active");
        target.classList.add("active");
    }
    newSplashArtEl.style.backgroundImage = `url(../images/champion/centered/${champion.id}_0.jpg)`
    createSearchBar();
}
/*
function improveVisibility(championName, championTitle,championBlurb, champion){
    if(champion.name === "Caitlyn"){
        championName.style.color = "pink";
        championTitle.style.color = "pink";
        championBlurb.style.color = "pink";
    }
    const nameArray = ["Anivia","Blitzcrank","Kennen","Lux","Wukong","Morgana","Rakan", "Rumble", "Pantheon", "Galio", "Garen", "Janna","Malphite", "Tryndamere"];
    if(nameArray.includes(champion.name)){
        championName.style.color = "black";
        championTitle.style.color = "black";
        championBlurb.style.color = "black";
        championTitle.style.color = "black";
        championBlurb.style.color = "black";
    }
}
<img class="search-icon-image" src="/images/search-solid.svg" alt=""> 
<form action="" class="search-container"> 
<input type="text">
</form>
*/
function searchIconMouseOver(){
    const searchLiEl = document.querySelector(".search-icon");
    //console.log(searchLiEl);

    searchLiEl.addEventListener("click", () => {
        document.querySelector('input').focus()
    });
    
    searchLiEl.addEventListener("mouseenter", (e)=>{
        const searchBar = document.querySelector(".search-container");
        searchBar.classList.add("slideright");
    });
    searchLiEl.addEventListener("mouseleave", (e)=>{
        if(state.usingSearch === false){ 
            const searchBar = document.querySelector(".search-container");

            searchBar.classList.remove("slideright");
        }
    });
}

function createSearchBar(){
    const searchForm = document.createElement("form");
    const searchBarInput = document.createElement("input");
    const searchBarParent = document.querySelector(".champ-info");

    searchForm.className = "search-container";
    searchBarInput.type = "text";
    searchBarInput.placeholder = "Search";
    searchBarInput.addEventListener('focus', (e) => {
        state.usingSearch = true;
        const searchBar = document.querySelector(".search-container");
        searchBar.classList.add("slideright");
    })
    searchBarInput.addEventListener('focusout', (e) => {
        state.usingSearch = false;
        const searchBar = document.querySelector(".search-container");
        searchBar.classList.remove("slideright");
    })

    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const input = searchForm.querySelector("input");
       // console.log("input",input.value);
        state.selectedChampId = input.value;
        //console.log("id",state.selectedChampId);
        let idForTarget = capitaliseFirstLetter(state.selectedChampId);
        if(idForTarget === "Wukong"){
            idForTarget = "MonkeyKing"
        }
        const elementOfId = document.getElementById(idForTarget);
        //console.log("elementOfid",elementOfId);
        state.selectedChamp = await getChamp(idForTarget);
        updateStateJson(state);
        //console.log("champ", state.selectedChamp);
        let targetEl = document.getElementById(state.selectedChamp.id);
        //console.log("target", targetEl)
        //console.log(state.selectedChamp);
        if(targetEl !== null){
            const oldActiveEl = document.querySelector(".active");
            oldActiveEl.classList.remove("active");
            const imageTarget = targetEl.querySelector(".icon");
            //console.log("imgtarget", imageTarget)
            imageTarget.classList.add("active");
            renderMainSection(targetEl, state.selectedChamp, true);
            elementOfId.scrollIntoView({
                behavior: 'smooth'
              });
        }
        else{
            renderErrorScreen();
        }
    });
    searchForm.append(searchBarInput);
    searchBarParent.append(searchForm);
}

function renderErrorScreen(){
    const splashArtEl = document.querySelector(".splash-container");
    const champInfoContainer = document.createElement("section");
    splashArtEl.remove(); //remove previous artwork
    const newSplashArtEl = document.createElement("main");
    const mainSection = document.querySelector(".main-section");
    const title = document.createElement("h1");
    const doesNotExistText = document.createElement("p");
    title.innerText = "Where do you think you are going?!!!";
    title.className = "champ-title";
    doesNotExistText.className = "champ-blurb";
    doesNotExistText.innerText = "The champion you searched for does not exist! Now you are in trouble!";
    newSplashArtEl.className = "splash-container";
    champInfoContainer.className = "champ-info";
    champInfoContainer.append(title,doesNotExistText);
    newSplashArtEl.append(champInfoContainer);
    mainSection.append(newSplashArtEl);
    newSplashArtEl.style.backgroundImage = `url(../images/658989.jpg)`
}


function capitaliseFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

async function getChamp(id){
    const capitalId = capitaliseFirstLetter(id);
    return fetch(`http://localhost:3000/data/${capitalId}`)
    .then(resp => resp.json())
    .then(champ => {
        return champ;
    })
    .catch((error) => {
        return Promise.reject();
      })
}
function setInitialSplashScreen(){
    const splashArtEl = document.querySelector(".splash-container");
    fetch(`http://localhost:3000/data/`)
    .then(resp => resp.json())
    .then(data => {
        const index = randomIndex(data.length,0);
        const numberOfImage = randomIndex(data[index].skins.length, 0);
        const srcNum = data[index].skins[numberOfImage].num;
        const partOfSrc = data[index].id;
        if(partOfSrc === "Wukong"){
            partOfSrc = "MonkeyKing"
        }
        if(partOfSrc === "Fiddlesticks"){
            partOfSrc = "FiddleSticks"
        }
        //console.log(partOfSrc);
        splashArtEl.style.backgroundImage = `url(/images/champion/splash/${partOfSrc}_${srcNum}.jpg)`;
    })
}

function randomIndex(topNumber,botNumber){
   return Math.floor(Math.random() * topNumber) + botNumber;
}
setInitialSplashScreen();
renderIcons();
searchIconMouseOver();