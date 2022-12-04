const wrapper = document.querySelector('.wrapper');
const searchInput = document.querySelector('input');
const infoText = document.querySelector('.info_text');
const synonyms = document.querySelector('.synonyms .list');
const volumeIcon = document.querySelector('.word i');
const removeIcon = document.getElementById('close');
let audio;


//data function 
function data(result, word) {
    if (result.title) { //if api returns the message of can't find 
        infoText.innerHTML = `Cannot find the meaning of <span>"${word}"</span>. Please search right word.`
    } else {
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        let phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        //let's pass the particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        document.querySelector(".synonyms .list").innerText = result[0].meanings[0].definitions[1].synonyms;
        audio = new Audio( result[0].phonetics[0].audio);//creating new audio obj and passing audio src

        // if (result[0].meanings[0].definitions[1].synonyms == undefined) { //if there is no synonyms then hide the synonyms div
        //     synonyms.parentElement.style.display = "none";
        // } else {
        //     synonyms.parentElement.style.display = "block";
        //     // synonyms.innerHTML = '';
        //     for (let i = 0; i < 5; i++) {  //getting only 5 synonyms out of many synonyms
        //         let tag = `<span onClick = search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
        //         synonyms.insertAdjacentHTML("beforeend", tag) ; //passing 5 synonyms

        //     }
        // }
    }
}


//search synonyms function for
function search(word){
    searchInput.value = word;
    fetchApi(word)
    wrapper.classList.remove('active')
}


//fetch aapi function
function fetchApi(word) {
    wrapper.classList.remove('active')
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`

    //fetching data from api response and returning it with parsing into js obj and in another then method calling data function with passing api response and searched word as an arguement 
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then((res) => res.json()).then(result => data(result, word));
}


searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter' && e.target.value) {
        fetchApi(e.target.value)
    }
})

volumeIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value="";
    searchInput.focus();
    wrapper.classList.remove('active');
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = "";
})




















