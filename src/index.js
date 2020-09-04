const qs = (selector) => document.querySelector(selector)
const ce = (element) => document.createElement(element)


const rocks = []
const GAME_CANVAS = qs('#game-canvas')
const CANVAS_HEIGHT = GAME_CANVAS.height
const CANVAS_WIDTH = GAME_CANVAS.width
const CTX = GAME_CANVAS.getContext("2d");
const FPS = 60
let COUNTER = 0
const treeMan = new Player("Ryan", 200, 270)


function gameLoop() {

    CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    treeMan.draw()


    document.addEventListener('keydown', e => {
        if (e.which === 32) {
            COUNTER = 1
            const treeJump = setInterval(function () {
                treeMan.update()
                treeMan.draw()
                if (COUNTER === 0) {
                    clearInterval(treeJump)
                }
            }, 1000 / FPS)
        }

        if (e.which === 13) {
            setInterval(function () {
                let rock = new Rock(950, 270)
                rocks.push(rock)
            }, 1500)
            rocks.forEach(rock => {
                setInterval(function () {
                    console.log(rock)
                    rock.x -= 10
                    rock.draw()
                }, 1000)
            })
        }
    });
    window.setInterval(gameLoop, 1000 / FPS);
}

gameLoop();

//So we need to redraw our canvas every frame, and draw everyhting in the position it should be every frame

// document.addEventListener('keydown', e => {
//     if (e.which === 32) {
//         const createRock = setInterval(function () {
//             let rock = ce('div')
//             rock.className = "rock"

//             rock.style.right = 0 + "px";

//             gameDiv.append(rock)
//             rocks.push(rock)

//             moveRock(rock)

//             if (rocks.length === 20) {
//                 clearInterval(createRock)
//             }
//             createRock
//         }, 1500)

//     }
//     if (e.key === 'ArrowUp') {
//         treeMan.style.bottom = "40px";
//     }
// })

// document.addEventListener('keyup', e => {
//     if (e.key === 'ArrowUp') {
//         treeMan.style.bottom = "0px";
//     }
// })

// const checkCollision = (treeMan, rock) => {
//     const treeBottom = positionToInteger(treeMan.style.bottom)
//     const treeRight = parseInt(treeMan.style.right)
//     const treeLeft = parseInt(treeMan.style.right) + 20
//     const rockRight = calculatePositionRight(rock)
//     const rockLeft = calculatePositionLeft(rock)

//     if (treeBottom === 0 && (treeLeft > rockLeft && treeRight < rockRight)) {
//         // if (treeLeft > rockLeft && treeRight < rockRight) {
//         console.log('game over')
//         gameDiv.innerHTML = `<h1>GAME OVER</h1>`
//         // }
//     }
// }

// const calculatePositionRight = (rock) => {
//     let position = (positionToInteger(rock.style.right) / gameDiv.offsetWidth) * 100
//     return position
// }

// const calculatePositionLeft = (rock) => {
//     let position = ((positionToInteger(rock.style.right) + 20) / gameDiv.offsetWidth) * 100
//     return position
// }

// const moveRock = (rock) => {
//     const movement = setInterval(function () {
//         let position = positionToInteger(rock.style.right)
//         position += 20
//         rock.style.right = position + "px"
//         if (rock.style.right == "1000px") {
//             clearInterval(movement)
//             rock.remove()
//         }
//         checkCollision(treeMan, rock)
//     }, 250)

// }

// const randomTime = () => {
//     return (Math.floor(Math.random() * 11) * 100)
// }

// const positionToInteger = (p) => {
//     return parseInt(p.split('px')[0]) || 0
// }
