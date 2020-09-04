const qs = (selector) => document.querySelector(selector)
const ce = (element) => document.createElement(element)

const rocks = []
const gameDiv = qs('#game-div')

document.addEventListener('keydown', e => {
    if (e.which === 32) {
        let rock = ce('div')
        rock.className = "rock"

        rock.style.right = 0 + "px";
        rock.style.left = "auto"

        gameDiv.append(rock)
        rocks.push(rock)

        moveRock(rock)
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

function positionToInteger(p) {
    return parseInt(p.split('px')[0]) || 0
}
