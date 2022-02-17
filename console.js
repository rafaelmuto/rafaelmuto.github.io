const INPUT = document.getElementById('input')
const CMD_LINE = document.getElementById('cmd_line')
const PRINT_OUT = document.getElementById('print')
let LN = 0
let PRINT_SPEED = 10

const FILES_LIST = {
    cv: {
        mockName: 'cv',
        link: 'README.md',
        isHidden: false
    },
    github: {
        mockName: 'github',
        link: 'https://github.com/rafaelmuto',
        isHidden: false
    },
    port: {
        mockName: 'portfolio',
        link: 'https://cargocollective.com/rafaelmuto',
        isHidden: false
    },
    ring: {
        mockName: 'color_ring',
        link: 'ring/ring.html',
        isHidden: false
    },
    fire: {
        mockName: 'fire',
        link: 'fire/fire.html',
        isHidden: false
    },
    cannon: {
        mockName: 'game',
        link: 'cannon/index.html',
        isHidden: true
    },
    bruxinha: {
        mockName: 'gigi',
        link: 'gigi/gigi.html',
        isHidden: true
    }
}

const COMMANDS_LIST = {
    help: {
        description: 'prints list of commands',
        isHidden: false,
        return: () => {
            let commands_list = []
            for (let [key, value] of Object.entries(COMMANDS_LIST)) {
                if (value.isHidden || value.isFile) {
                    continue
                }
                commands_list.push(`${key} => ${value.description}`)
            }
            return commands_list
        }
    },
    ls: {
        description: 'lists all files available',
        isHidden: false,
        return: () => {
            let files_list = []
            for (let [key, value] of Object.entries(FILES_LIST)) {
                if (value.isHidden) {
                    continue
                }
                files_list.push(`${value.mockName}`)
            }
            return files_list
        }
    },
    open: {
        description: 'open file_name',
        isHidden: false,
        return: (parameters = []) => {
            for (let [key, value] of Object.entries(FILES_LIST)) {
                if (value.mockName == parameters[0]) {
                    location.assign(value.link)
                    return [`opening file ${parameters[0]}...`]
                }
            }
            return [`file ${parameters[0]} not found`]
        }
    },
    delete: {
        description: 'delete file_name',
        isHidden: false,
        return: (parameters) => {
            for (let [key, value] of Object.entries(FILES_LIST)) {
                if (value.mockName == parameters[0]) {
                    FILES_LIST[key].isHidden = true
                    return [`file ${parameters[0]} deleted`]
                }
            }
            return [`file ${parameters[0]} not found`]
        }
    },
    clear: {
        description: 'clear screen',
        isHidden: false,
        return: () => {
            PRINT_OUT.innerHTML = ''
            LN = 0
            return
        }
    },
    reset: {
        description: 'reset system',
        isHidden: false,
        return: () => {
            location.reload()
        }
    },
    ln: {
        description: 'print line number',
        isHidden: false,
        return: () => {
            return ['LN' + (LN + 1)]
        }
    },
    time: {
        description: 'prints time in miliseconds since UNIX time zero',
        isHidden: false,
        return: () => {
            let d = new Date();
            let time = d.getTime();
            return [`Its been ${time}ms since midnight January 1, 1970.`]
        }
    },
    speed: {
        description: 'set new typing delay in miliseconds',
        isHidden: false,
        return: (parameters) => {
            if (parameters.length == 0) {
                return [`Current printout speed delay is ${PRINT_SPEED}`]
            }
            const newSpeed = parseInt(parameters[0])
            if (newSpeed < 0 || typeof (newSpeed) != 'number') {
                return [`ERROR: ${newSpeed} not a valid speed`]
            }
            PRINT_SPEED = newSpeed
            return [`Printout speed set to ${newSpeed}`]
        }
    },
    lorem: {
        description: 'prints lorem ipsum',
        isHidden: true,
        return: () => {
            return ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']
        }
    },
    contact: {
        description: 'displays my contact info',
        isHidden: false,
        return: () => {
            return ['email: r.nagahama@gmail.com', 'mobile: +55 11 947 256 697', 'GitHub: https://github.com/rafaelmuto', 'portifolio: https://cargocollective.com/rafaelmuto']
        }
    }
}


const showExecutedLine = string => {
    LN++;

    let line = document.createTextNode('>>' + string);
    let new_line = document.createElement('p');
    new_line.appendChild(line);
    new_line.id = 'LN' + LN;

    PRINT_OUT.appendChild(new_line);
};

const stringTyper = (string) => {
    return new Promise(resolve => {
        LN++

        let new_line = document.createElement('p')
        PRINT_OUT.appendChild(new_line).id = 'LN' + LN
        new_line = document.getElementById('LN' + LN)

        let i = 0

        let timer = setInterval(() => {
            new_line.innerHTML = string.slice(0, i)
            i++;
            if (i > string.length) {
                clearInterval(timer)
                resolve()
            }

            window.scrollTo(0, document.body.scrollHeight)
        }, PRINT_SPEED)
    })
}

const arrayPrinter = async (stringsArray) => {
    INPUT.style.display = 'none';

    for (let index = 0; index < stringsArray.length; index++) {
        await stringTyper(stringsArray[index])
    }

    INPUT.style.display = 'grid'
}

const commandLoader = (command, parameter = []) => {
    let output = []
    if (!COMMANDS_LIST[command]) {
        output = [`ERROR: ${command} is not a command.`]
    } else {
        output = COMMANDS_LIST[command].return(parameter) ?? []
    }
    arrayPrinter(output)
}

const commandParser = (command) => {
    const commandArray = command.toLowerCase().split(' ')
    const commandToRun = commandArray.shift()
    const parameters = commandArray

    commandLoader(commandToRun, parameters)
}


window.onload = () => {
    document.addEventListener('keydown', () => {
        CMD_LINE.focus();
    })

    CMD_LINE.addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            let cmd = CMD_LINE.value.toLowerCase()
            showExecutedLine(cmd)
            CMD_LINE.value = ''
            commandParser(cmd)
            window.scrollTo(0, document.body.scrollHeight)
        }
    })
}