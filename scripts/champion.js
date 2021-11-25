let state = {
    selectedChamp:{
        id:""
    },
    abilitySelected:{
        
    }
}

async function setInitialState(){
    await fetch("http://localhost:3000/state")
    .then(resp => resp.json())
    .then(newState => {
        console.log(newState);
        state = {...state, ...newState}
    })
    addNameNavItemContent();
    renderChampSection();
    renderAbilityIcons();
}

function capitaliseFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}


function renderChampSection(number = 0){
    const leftChampSectionEl = document.querySelector(".left-champ-section");
    const champTitleEl = document.querySelector(".title");
    const loreTextEl = document.querySelector(".lore-text");
    leftChampSectionEl.style.backgroundImage = `url(/images/champion/centered/${state.selectedChamp.id}_${number}.jpg)`
    champTitleEl.innerText = capitaliseFirstLetter(state.selectedChamp.title);
    loreTextEl.innerText = state.selectedChamp.lore;
}

function renderAbilityIcons(){
    const champ = state.selectedChamp;
    const abilityIconsContainer = document.querySelector(".ability-icons-container");
    const abilityElements = abilityIconsContainer.querySelectorAll(".ability");
    const passive = abilityIconsContainer.querySelector(".passive");
    console.log(passive);
    passive.src = `/images/champion/passive/${champ.passive.image.full}`
    for(let i = 0; i < champ.spells.length; i++){
            abilityElements[i].src = `/images/champion/spell/${champ.spells[i].image.full}`
     
    }
}

function addNameNavItemContent(){
    console.log(state);
    const navItem = document.querySelector(".name-of-champ");
    const link = document.createElement("a");
    link.innerText = state.selectedChamp.id;
    navItem.appendChild(link);
}

function clickAbilityEventListener(){
    const abilityEl = document.querySelector(".text-ability-icon-container");
    abilityEl.addEventListener("click", () => {
        
    });
}

setInitialState();
