const boxesParent = document.querySelector('.boxes')
const boxes = document.querySelectorAll('.box')
const result = document.querySelector('.result')
const player1Name = document.querySelector('#player1Name')
const player2Name = document.querySelector('#player2Name')
const playerNames = document.querySelectorAll('.playerNames')
const player1NameTable = document.querySelector('#player1NameTable')
const player2NameTable = document.querySelector('#player2NameTable')
const player1Result = document.querySelector('#player1Result')
const player2Result = document.querySelector('#player2Result')
const changeSign = document.querySelector('.sign')
const alert = document.querySelector('.alert')
const reset = document.querySelector('.reset')
const next = document.querySelector('.next')
const numOfGames = document.querySelector('.numOfGames')
const options = document.querySelectorAll('option')

// window.addEventListener('load',(e)=>{
const setHeightWidth = () => {
    const xxx=boxesParent.clientHeight

    boxesParent.style.width = `${xxx}px`

    const width = window.innerWidth
    const height = window.innerHeight
    if (width < height) {
        boxesParent.style.flexGrow = '0'
        boxesParent.style.width = '100%'
        boxesParent.style.height = `${boxesParent.clientWidth}px`
        if (boxesParent.clientWidth > boxesParent.clientHeight) {
            boxesParent.style.width = `${boxesParent.clientHeight}px`
        }
        // boxes.forEach(box => {
        //     box.style.fontSize=`${(box.clientHeight)*.8}px`
        // })
    } else if (width > height) {
        // boxesParent.style.flexGrow = '1'
        
        boxesParent.style.width = `${boxesParent.clientHeight}px`
        // boxesParent.style.height = `${xxx}px`
        // console.log(boxesParent.clientWidth + ' : ' + boxesParent.clientHeight + ' / ' + window.innerWidth + ' : ' + window.innerHeight);
        boxes.forEach(box => {
            const xxx=box.clientHeight
            const yyy= box.clientWidth
        console.log(xxx+' : '+yyy)

            // box.style.fontSize=`${(box.clientHeight)*.8}px`
        })
    }
    boxes.forEach(box => {
        box.style.fontSize=`${(box.clientHeight)*.8}px`
    })
}



function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
if (detectMobile()) {
    document.querySelector('html').setAttribute('data-hardware', 'mobile')
}

let state = ''
let boxArr = []
player1Result.innerHTML = 0
player2Result.innerHTML = 0
let numberGames = 1
let numberClicks = 0
let gameStarts = 'no'

const changeState = () => {
    if (state == 'x') {
        state = 'o'
    } else if (state == 'o') {
        state = 'x'
    }
}

const setStartGame = () => {
    state = 'x'
    boxArr = [0, 'el1', 'el2', 'el3', 'el4', 'el5', 'el6', 'el7', 'el8', 'el9']
    gameStarts = 'no'
    numberClicks = 0
    boxes.forEach(e => {
        e.innerHTML = ''
        e.style.color = 'black'
    })
    changeSign.checked = false
    result.innerHTML = '<p>Tic Tac Toe</p>'


}
setStartGame()


const checkNumOfGames = () => {
    numberGames--
    if (numberGames == 0) {
        changeSign.disabled = true
        next.disabled = true
        next.style.display = 'none'
        reset.style.color = 'white'
        boxes.forEach(box => {
            box.removeEventListener('click', game);
        })
    }
    if (numOfGames != numberGames) {
        player1Name.disabled = true
        player2Name.disabled = true
        numOfGames.children.disbaled = true
        options.forEach(e => {
            e.disabled = true
        })

    }
}

const checkPlayersNames = () => {
    if (player1Name.value == '' || player2Name.value == '') {
        setStartGame()
        alert.firstElementChild.innerHTML = 'Enter player names !'
        alert.classList.remove('hide')
        alert.addEventListener('click', () => {
            alert.classList.add('hide')
        })
    }
}
const printResult = (e) => {
    if (numberGames == 0) {
        if (player1Result.innerHTML > player2Result.innerHTML) {
            result.innerHTML = `${player1Name.value} won!`
        } else if (player1Result.innerHTML < player2Result.innerHTML) {
            result.innerHTML = `${player2Name.value} won!`
        } else {
            result.innerHTML = `REMIS`
        }

    } else {
        if (e == 'x') {
            result.innerHTML = `${player1Name.value} +1 point!`
        } else if (e == 'o') {
            result.innerHTML = `${player2Name.value} +1 point!`
        } else {

        }
    }
    result.innerHTML = `<p>${result.innerHTML}</p>`
    // result.after(`Pozostało gier: ${numberGames}`)
}


const completeTableResult = (e) => {
    if (e == 'x') {
        player1Result.innerHTML++
    } else {
        player2Result.innerHTML++
    }
}



const game = (e) => {
    gameStarts = 'yes'

    const addClicks = () => {
        if (e.target.innerText == '') {
            numberClicks++
        }
    }
    addClicks()
    checkPlayersNames()


    if (state !== 'end') {
        if (e.target.innerText == '') {
            e.target.innerText = state
            boxArr[e.target.id] = state

            changeState()

            const el1 = boxArr[1]
            const el2 = boxArr[2]
            const el3 = boxArr[3]
            const el4 = boxArr[4]
            const el5 = boxArr[5]
            const el6 = boxArr[6]
            const el7 = boxArr[7]
            const el8 = boxArr[8]
            const el9 = boxArr[9]
            const winGame = (nameBox1Wins, numBox1, numBox2, numBox3) => {
                checkNumOfGames()
                completeTableResult(nameBox1Wins)
                printResult(nameBox1Wins)
                state = 'end'
                boxes.forEach(el => {
                    if (el.id == numBox1 || el.id == numBox2 || el.id == numBox3) {
                        el.style.color = 'red'
                    }
                })


            }
            // if(boxArr[1]===[5] && boxArr[1]===boxArr[9]){
            //     winGame(el5, 1, 5, 9)
            // }
            if (el5 == el1 && el5 == el9) {
                winGame(el5, 1, 5, 9)
            } else if (el5 == el2 && el5 == el8) {
                winGame(el5, 5, 2, 8)
            } else if (el5 == el3 && el5 == el7) {
                winGame(el5, 5, 3, 7)
            } else if (el5 == el4 && el5 == el6) {
                winGame(el5, 5, 4, 6)
            } else if (el1 == el2 && el1 == el3) {
                winGame(el1, 1, 2, 3)
            } else if (el1 == el4 && el1 == el7) {
                winGame(el1, 1, 4, 7)
            } else if (el9 == el8 && el9 == el7) {
                winGame(el9, 9, 8, 7)
            } else if (el9 == el6 && el9 == el3) {
                winGame(el9, 9, 6, 3)
            } else {
                if (numberClicks == 9) {
                    completeTableResult('x')
                    completeTableResult('o')
                    checkNumOfGames()
                    state = 'end'
                    result.innerHTML = `DRAW`
                    numberClicks = 0
                }
            }
        }
    }
    checkPlayersNames()
}

// set draw
const draw = (info, drawFunc) => {
    if (confirm(`${info} If you confirm, the game will be considered a draw. One game will be lost and 1 point will be added to the players`)) {
        setStartGame()
        completeTableResult('x')
        completeTableResult('o')
        checkNumOfGames()

    } else {
        drawFunc()
    }
}


boxes.forEach(box => {
    box.addEventListener('click', game);
})



next.addEventListener('click', () => {
    checkPlayersNames()
    if (state == 'end') {
        setStartGame()
    } else {
        // draw('Czy chcesz włączyć następną grę?', () => {})
    }

})



reset.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the entire game and reset all scores?')) {
        location.reload()
    }

})

//----------------------------------------------------------------
//makes switch who's starts ('x' or 'o')
changeSign.addEventListener('click', (e) => {

    const freezeSignSwitcher = () => {
        if (e.target.checked == true) {
            e.target.checked = false
        } else {
            e.target.checked = true
        }
    }

    if (gameStarts == 'yes') {
        draw('Are you sure you want to change player?', freezeSignSwitcher)

    } else {
        if (e.target.checked == true) {
            state = 'o'
            e.target.checked = true
        } else {
            state = 'x'
            e.target.checked = false
        }
    }
})
//----------------------------------------------------------------

//----------------------------------------------------------------
//Set the names in the table from name inputs and check the name is not too long (< 8 chars)
playerNames.forEach(el => {
    el.addEventListener('keyup', (e) => {
        if (e.target.value.length >= 8) {
            e.target.parentElement.classList.add('playerInfo')
            setTimeout(() => {
                e.target.parentElement.classList.remove('playerInfo')
            }, 1000);
        } else {
            e.target.parentElement.classList.remove('playerInfo')
        }
        if (e.target.id.includes(1)) {
            player1NameTable.innerHTML = e.target.value
        } else {
            player2NameTable.innerHTML = e.target.value
        }
    })
})

numOfGames.addEventListener('input', (e) => {
    numberGames = e.target.value
})
//----------------------------------------------------------------

// })

setHeightWidth()
window.addEventListener('resize', setHeightWidth)