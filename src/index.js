const qs = (selector) => document.querySelector(selector)
const ce = (element) => document.createElement(element)


const rocks = []
const gameDiv = qs('#game-div')

const treeMan = ce('div')
treeMan.id = "tree-man"
treeMan.style.right = "75%";
treeMan.style.bottom = "0px";
gameDiv.append(treeMan)


document.addEventListener('keydown', e => {
    if (e.which === 32) {
        const createRock = setInterval(function () {
            let rock = ce('div')
            rock.className = "rock"

            rock.style.right = 0 + "px";
            rock.style.left = "auto"

            gameDiv.append(rock)
            rocks.push(rock)

            moveRock(rock)

            if (rocks.length === 20) {
                clearInterval(createRock)
            }
            createRock
        }, 1500)

    }
    if (e.key === 'ArrowUp') {
        treeMan.style.bottom = "40px";
    }
})

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowUp') {
        treeMan.style.bottom = "0px";
    }
})

const checkCollision = (treeMan, rock) => {
    const bottom = positionToInteger(treeMan.style.bottom)
    const treeRight = parseInt(treeMan.style.right)
    const treeLeft = parseInt(treeMan.style.right) + 20
    const rockRight = calculatePositionRight(rock)
    const rockLeft = calculatePositionLeft(rock)

    if (bottom === 0) {
        if (treeLeft > rockLeft && treeRight < rockRight) {
            console.log('game over')
            gameDiv.innerHTML = `<h1>GAME OVER</h1>`
        }
    }

}

const calculatePositionRight = (rock) => {
    let position = (positionToInteger(rock.style.right) / gameDiv.offsetWidth) * 100
    return position
}

const calculatePositionLeft = (rock) => {
    let position = ((positionToInteger(rock.style.right) + 20) / gameDiv.offsetWidth) * 100
    return position
}

const moveRock = (rock) => {
    const movement = setInterval(function () {
        let position = positionToInteger(rock.style.right)
        position += 20
        rock.style.right = position + "px"
        if (rock.style.right == "560px") {
            clearInterval(movement)
            rock.remove()
        }
        checkCollision(treeMan, rock)
    }, 250)

}

const randomTime = () => {
    return (Math.floor(Math.random() * 11) * 100)
}

const positionToInteger = (p) => {
    return parseInt(p.split('px')[0]) || 0
}
