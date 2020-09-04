const qs = (selector) => document.querySelector(selector)
const ce = (element) => document.createElement(element)

const rocks = []
const gameDiv = qs('#game-div')

const treeMan = ce('div')
treeMan.id = "tree-man"
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
            console.log(rocks)

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

const moveRock = (rock) => {
    const movement = setInterval(function () {
        let position = positionToInteger(rock.style.right)
        position += 20
        rock.style.right = position + "px"
        if (rock.style.right == "560px") {
            clearInterval(movement)
            rock.remove()
        }
    }, 250)

}

const randomTime = () => {
    return (Math.floor(Math.random() * 11) * 100)
}

const positionToInteger = (p) => {
    return parseInt(p.split('px')[0]) || 0
}
