let state = {
    selectedChamp:{
        id:""
    },
    selectedAbility:{
        
    }
    ,
    abilitySrcCode: ""
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
    clickAbilityEventListener();
    renderAbilitySection();
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
    state.selectedAbility = state.selectedChamp.passive;

    checkAbilityAndUpdateSrc("P");
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
            abilityElements[i].closest("div").id = champ.spells[i].id;
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
    const abilityElArr = document.querySelectorAll(".text-ability-icon-container");
    const abilitiesEl = document.querySelector(".abilities");
    for(let i = 0; i < abilityElArr.length; i++){
        abilityElArr[i].addEventListener("click", (e) => {
            const idOfAbility = abilityElArr[i].id;
            const oldActiveEl = abilitiesEl.querySelector(".active");
            oldActiveEl.classList.remove("active");
            abilityElArr[i].classList.add("active");
            console.log("click", abilityElArr[i]);
            state.selectedAbility = getAbility(idOfAbility);
            const abilityText = abilityElArr[i].querySelector(".ability-key-text").innerText;
            checkAbilityAndUpdateSrc(abilityText);
            renderAbilitySection();
        }
        );
    }
}

function getAbility(id){
    for(let i = 0; i < state.selectedChamp.spells.length; i++){
        if(state.selectedChamp.spells[i].id === id){
            return state.selectedChamp.spells[i];
        }
    }
    return state.selectedChamp.passive;
}
 
function checkAbilityAndUpdateSrc(abilityTextSelected){
    switch(abilityTextSelected) {
        case "P":
            state.abilitySrcCode = "P1"
            break;
        case "Q":
            state.abilitySrcCode = "Q1"
            break;
        case "W":
            state.abilitySrcCode = "W1"
            break;
        case "E":
            state.abilitySrcCode = "E1"
            break;
        case "R":
            state.abilitySrcCode = "R1"
            break;
      }
}

function renderAbilitySection(){
    const abilityDesc = document.querySelector(".ability-text");
    const abilityVideo = document.querySelector(".ability-video");
    const champ = state.selectedChamp;
    let key = champ.key;
    abilityDesc.innerText = state.selectedAbility.description;
    if(key.length === 3){   
        key = `0${key}`;
        console.log(key);
    }
    if(key.length === 2){   
        key = `00${key}`;
        console.log(key);
    }
    else if(key.length === 1){   
        key = `000${key}`;
    }
    abilityVideo.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${state.abilitySrcCode}.webm`;
    abilityVideo.play();
    console.log(abilityVideo.src);
}

setInitialState();
