const qs = (selector) => document.querySelector(selector)
const ce = (element) => document.createElement(element)


const rocks = []
const GAME_CANVAS = qs('#game-canvas')
const CANVAS_HEIGHT = GAME_CANVAS.height
const CANVAS_WIDTH = GAME_CANVAS.width

const treeMan = new Player("Ryan", 200, 270)
treeMan.draw()
// treeMan.update()
document.addEventListener('keydown', e => {
    if (e.which === 32) {
        treeMan.update()
    }
});



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
