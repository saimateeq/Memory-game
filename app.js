let cardsArray = ["apple", 'apple', "arrow-through-heart-fill", "arrow-through-heart-fill",
    "bluetooth", "bluetooth", "camera-fill", "camera-fill",
    "cake-fill", "cake-fill", "coin", "coin",
    "dice-6", "dice-6", "lock-fill", "lock-fill"]
let shuffle;
let moveArray = [
    card1 = {
        value: "",
        index: "",
    },
    card2 = {
        value: "",
        index: "",
    }
]
let array = new Array(16)
function CardShuffule() {
    for (i = 0; i < array.length; i++) {
        let cards = document.querySelector(`.c-${i + 1}`)
        cards.setAttribute("style", "transform:rotateY(0deg); transition:transform 0.5s")
        shuffle = false
        while (shuffle == false) {
            let num = Math.random()
            num = Math.round(num * 15)
            if (array[num] == undefined) {
                array[num] = cardsArray[i]
                let back = document.querySelector(`.b-${num + 1}`)
                back.innerHTML = ` <i class="bi bi-${cardsArray[i]}"></i>`
                shuffle = true
                break;
            }
        }
    }
}
function move(num) {
    let front = document.querySelector(`.f-${num}`)
    let back = document.querySelector(`.b-${num}`)
    back.setAttribute(`style`, `transform:rotateY(0deg); transition: transform 1.2s;`)
    front.setAttribute(`style`, `transform:rotateY(-180deg); transition: transform 1.2s;`)
    setTimeout(CardCheck, 1500, num)
}
function CardCheck(num) {
    if (moveArray[0].value === "") {
        moveArray[0].value = array[num - 1]
        moveArray[0].index = num - 1
    } else {
        moveArray[1].value = array[num - 1]
        moveArray[1].index = num - 1
        if (moveArray[0].value === moveArray[1].value && moveArray[0].index !== moveArray[1].index) {
            let cardOne = document.querySelector(`.c-${moveArray[0].index + 1}`)
            let cardTwo = document.querySelector(`.c-${moveArray[1].index + 1}`)
            ntListener("click", move(moveArray[1].index + 1))
            cardsArray[moveArray[0].index] = ""
            cardsArray[moveArray[1].index] = ""
            let result = cardsArray.some((element) => {
                return (element !== "")
            })
            if (result === false) {
                let body = document.querySelector("body")
                let WinPage = document.createElement("div")
                let heading = document.createElement("h1")
                let btn = document.createElement("button")
                btn.innerHTML = "Play Again"
                heading.innerHTML = "YOU WIN"
                WinPage.appendChild(heading)
                WinPage.appendChild(btn)
                body.appendChild(WinPage)
                btn.addEventListener("click", () => {
                    window.location.reload()
                })
            }
        } else {
            let cardOneFront = document.querySelector(`.f-${moveArray[0].index + 1}`)
            let cardOneBack = document.querySelector(`.b-${moveArray[0].index + 1}`)
            let cardTwoFront = document.querySelector(`.f-${moveArray[1].index + 1}`)
            let cardTwoBack = document.querySelector(`.b-${moveArray[1].index + 1}`)
            cardOneBack.classList.add("shake")
            cardTwoBack.classList.add("shake")
            setTimeout(() => {
                cardOneBack.classList.remove("shake")
                cardTwoBack.classList.remove("shake")
                cardOneBack.setAttribute("style", " trasform:rotateY(-180deg); transition: transform 1.2s;")
                cardOneFront.setAttribute("style", " trasform:rotateY(0deg); transition: transform 1.2s;")
                cardTwoBack.setAttribute("style", " trasform:rotateY(-180deg); transition: transform 1.2s;")
                cardTwoFront.setAttribute("style", " trasform:rotateY(0deg); transition: transform 1.2s;")
            }, 400)
        }
        moveArray[0].index = ""
        moveArray[1].index = ""
        moveArray[0].value = ""
        moveArray[1].value = ""
    }
}
CardShuffule()

