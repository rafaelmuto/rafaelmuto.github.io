console.log('sort.js running...')
const ARRAY_SIZE = 200
const BAR_WIDTH = 5
const GRAPH_WIDTH = ARRAY_SIZE * BAR_WIDTH
const GRAPH_HEIGHT = ARRAY_SIZE


function start() {
    let canvas = document.getElementById('myCanvas')
    canvas.width = GRAPH_WIDTH
    canvas.height = GRAPH_HEIGHT
    let context = canvas.getContext('2d')

    const GRAPH_ARRAY = createRandomArray(ARRAY_SIZE)

    // const GRAPH_ARRAY = createInverseArray(ARRAY_SIZE)

    updateGraph(GRAPH_ARRAY, context)
}

async function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i] < array[j]) {
                array = await swap(array, i, j)
            }
        }
    }

    return array
}

async function swap(array, a, b) {
    let temp = array[a]
    array[a] = array[b]
    array[b] = temp

    await sleep(10)

    return array
}

function updateGraph(array, context) {
    context.fillStyle = "#000"
    context.fillRect(0, 0, GRAPH_WIDTH, GRAPH_HEIGHT)

    printArray(array, context)

    selectionSort(array)

    window.requestAnimationFrame(() => { updateGraph(array, context) })
}

function printArray(array, context) {
    for (let i = 0; i < array.length; i++) {
        context.fillStyle = '#FFF'
        context.fillRect(i * BAR_WIDTH, ARRAY_SIZE - array[i], BAR_WIDTH, array[i])
    }
}

function createRandomArray(size) {
    const array = []

    for (let i = 0; i < size; i++) {
        while (array.length == i) {
            let randomNumber = getRndInteger(1, size + 1)
            if (!array.includes(randomNumber)) {
                array.push(randomNumber)
            }
        }
    }

    return array
}

function createInverseArray(size) {
    const array = []
    for (let i = 0; i < size; i++) {
        array.push(i)
    }

    return array
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

start()
