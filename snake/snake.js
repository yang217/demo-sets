/**
 * Created by leonard on 2016/11/7.
 */

let Snake = {}

Snake.game = (function () {
    let canvas = document.getElementById('canvas')
    let deadHint = document.getElementById('dead-hint')
    let score = document.getElementById('score')
    const ctx = canvas.getContext('2d')
    const timeInterval = 100
    const blockSize = 20
    const width = Math.floor(canvas.offsetWidth / blockSize)
    const height = Math.floor(canvas.offsetHeight / blockSize)

    let snake
    let apple
    let dead = false

    function init() {
        snake = Snake.snake(blockSize, height, width)
        apple = Snake.apple(blockSize, height, width)
        bindListener()
        canvas.focus()
        loop()
    }

    function loop() {
        snake.advance()
        if (snake.isDead()) {
            deadHint.style.visibility = 'visible'
            dead = true
        } else {
            let applePosition = apple.getPosition()
            let snakeHeadPosition = snake.getHeadPosition()
            if (snakeHeadPosition[0] === applePosition[0] && snakeHeadPosition[1] === applePosition[1]) {
                console.log('eat an apple')
                apple.init()
                snake.grow()
                score.innerText = snake.getScore()
            }
        }
        if (!dead) {
            deadHint.style.visibility = 'hidden'
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
            apple.draw(ctx)
            snake.draw(ctx)
            setTimeout(loop, timeInterval)
        }
    }

    function bindListener() {
        const keysToSignal = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            32: 'restart'  // space key
        }

        canvas.addEventListener('keydown', function (event) {
            let key = event.which
            let signal = keysToSignal[key]
            if (signal === 'restart') {
                snake.init()
                apple.init()
            } else if (signal) {
                snake.setDirection(signal)
                event.preventDefault()
            }
        })
    }

    return {
        init: init
    }
})()

Snake.apple = function (blockSize, height, width) {
    let position

    init()

    function init() {
        position = generatePosition()
    }

    function generatePosition() {
        let x = Math.floor(Math.random() * width)
        let y = Math.floor(Math.random() * height)
        return [x, y]
    }

    function draw(ctx) {
        ctx.save()
        ctx.fillStyle = '#ff2211'
        ctx.beginPath()
        let radius = blockSize / 2
        let x = position[0] * blockSize + radius
        let y = position[1] * blockSize + radius
        ctx.arc(x, y, radius, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.restore()
    }

    function getPosition() {
        return position
    }

    return {
        init: init,
        draw: draw,
        getPosition: getPosition
    }
}

Snake.snake = function (blockSize, height, width) {
    const initLength = 5
    let posArray = []
    let direction = 'down'
    let nextDirection = direction
    let growSignal = 0

    init()

    function generatePosition() {
        let x = Math.floor(Math.random() * width) - initLength
        let y = Math.floor(Math.random() * height) - initLength
        return [x, y]
    }

    function init() {
        // reset the params
        posArray = []
        direction = 'down'
        nextDirection = direction

        let tailPosition
        do {
            tailPosition = generatePosition()
        } while (tailPosition[0] < 0 || tailPosition[1] < 0)

        posArray[0] = tailPosition
        for (let i = 1; i < initLength; i++) {
            posArray[i] = [posArray[i - 1][0] + 1, posArray[i - 1][1]]
        }
    }

    function drawSection(ctx, position) {
        let x = blockSize * position[0]
        let y = blockSize * position[1]
        ctx.fillRect(x, y, blockSize, blockSize)
    }

    function draw(ctx) {
        ctx.save()
        ctx.fillStyle = '#112233'
        for (let i = 0; i < posArray.length; i++) {
            drawSection(ctx, posArray[i])
        }
        ctx.restore()
    }

    function setDirection(newDirection) {
        let allowedDirection

        // If snake is going up or down, only valid new directions are left or right
        switch (direction) {
            case 'up':
            case 'down':
                allowedDirection = ['left', 'right']
                break
            case 'left':
            case 'right':
                allowedDirection = ['up', 'down']
        }
        if (allowedDirection.indexOf(newDirection) > -1) {
            nextDirection = newDirection
        }
    }

    function advance() {
        let nextPosition = getHeadPosition()
        direction = nextDirection
        switch (direction) {
            case 'left':
                nextPosition[0] -= 1
                break
            case 'right':
                nextPosition[0] += 1
                break
            case 'up':
                nextPosition[1] -= 1
                break
            case 'down':
                nextPosition[1] += 1
                break
        }
        posArray.push(nextPosition)
        if (growSignal > 0) {
            growSignal -= 1
        } else {
            posArray.shift()
        }
    }

    function grow() {
        growSignal += 1
    }

    function getHeadPosition() {
        return posArray[posArray.length - 1].slice()
    }

    function getScore() {
        return posArray.length - initLength + 1
    }

    function isDead() {
        // across the wall
        let headPosition = getHeadPosition()
        if (headPosition[0] < 0 || headPosition[1] < 0 ||
            headPosition[0] > width || headPosition[1] > height) {
            return true
        }

        // across snake itself
        for (let i = 0; i < posArray.length - 2; i++) {
            if (headPosition[0] === posArray[i][0] && headPosition[1] == posArray[i][1]) {
                return true
            }
        }

        return false
    }


    return {
        init: init,
        draw: draw,
        setDirection: setDirection,
        advance: advance,
        isDead: isDead,
        grow: grow,
        getHeadPosition: getHeadPosition,
        getScore: getScore
    }
}