console.log('%c HI', 'color: firebrick')

let breeds = []

document.addEventListener("DOMContentLoaded", () => {
    loadImages()
    loadBreeds()
    filterBreeds()
});

function loadImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => {
        json.message.forEach(dogImg => {
            const img = document.createElement("img")
            img.src = dogImg
            document.getElementById("dog-image-container").appendChild(img)
        }) 
    })
}

function loadBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(json => {
        breeds = Object.keys(json.message)
        //json.message[breedKeys] gives array of breed adjectives
        for (const breedKeys in json.message) {
            for(breedAdj of json.message[breedKeys]) {
                const li = document.createElement('li')
                li.innerText = breedAdj + " " + breedKeys
                document.querySelector('ul').appendChild(li)
                li.addEventListener("click", () => {
                    li.style.color = "#FF00FF"
                })
            }
            if(json.message[breedKeys].length === 0) {
                const li = document.createElement('li')
                li.innerText = breedKeys
                document.querySelector('ul').appendChild(li)
                li.addEventListener("click", () => {
                    li.style.color = "#FF00FF"
                })
            }
        }
    })
}

function filterBreeds() {
    const select = document.querySelector("select")
    select.addEventListener("change", (e) => {
        console.log(e.target)
        const unorderedList = document.getElementById("dog-breeds")
        unorderedList.innerHTML = ""
        const filteredBreeds = breeds.filter( (breed) => breed.charAt(0) === select.value)
        filteredBreeds.forEach( (breed) => {
          const li = document.createElement("li")
          li.addEventListener("click", () => {
            li.style.color = "#FF00FF"
          })
          li.innerText = breed
          unorderedList.appendChild(li)  
        })
    })
};
