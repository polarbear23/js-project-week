const state = {
    selectedChampId: "",
    selectedChamp:{},
    usingSearch: false,
}




function createIcon(champion){
    const iconLiEl = document.createElement("li");
    const iconAEl = document.createElement("a");
    const iconImgEl = document.createElement("img");
    iconImgEl.className = "icon";
    if(champion.id === "Aatrox"){
        iconImgEl.classList.add("active");
    }
    iconImgEl.src = `../images/champion/icons/${champion.image.full}`
    iconImgEl.alt = `${champion.name}`
    iconLiEl.id = `${champion.id}`;
    //iconAEl.href = ""
    iconAEl.append(iconImgEl);
    iconLiEl.append(iconAEl);
    iconLiEl.addEventListener("click", (e)=> {
        renderMainSection(e,champion);
        console.log(champion.name);
    })
    const iconsContainer = document.querySelector(".icons-container")
    iconsContainer.append(iconLiEl);
}

async function renderIcons(){
    const getResp = await fetch("http://localhost:3000/data");
    console.log(getResp);
    const champions = await getResp.json();
    console.log(champions);
    for(let i = 0; i < champions.length; i++){
        createIcon(champions[i]);
    } 
}

function renderMainSection(e,champion){
    const splashArtEl = document.querySelector(".splash-container");
    const li = document.querySelector(".search-icon");
    console.log(li);
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
    activeEl.classList.remove("active");
    e.target.classList.add("active");
    newSplashArtEl.style.backgroundImage = `url(../images/champion/centered/${champion.id}_0.jpg)`
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
    console.log(searchLiEl);

    searchLiEl.addEventListener("click", () => {
        document.querySelector('input').focus()
    });
    
    searchLiEl.addEventListener("mouseenter", (e)=>{
        createSearchBar();
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
    searchForm.append(searchBarInput);
    searchBarParent.append(searchForm);
}


function capitaliseFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}


renderIcons();
searchIconMouseOver();