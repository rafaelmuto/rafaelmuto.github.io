const INPUT = document.getElementById('input')
const CMD_LINE = document.getElementById('cmd_line')
const PRINT_OUT = document.getElementById('print')
let LN = 0
const PRINT_SPEED = 20

const FILES_LIST = {
    cv: {
        mockName: 'rafaelmuto_CV.pdf',
        link: 'Files/rafaelmuto_CV.pdf',
        isHidden: false
    },
    ring: {
        mockName: 'color_ring.html',
        link: 'HTML/ring.html',
        isHidden: false
    },
    fire: {
        mockName: 'fire.html',
        link: 'HTML/fire.html',
        isHidden: false
    },
    cannon: {
        mockName: 'cannon.game',
        link: 'cannon/index.html',
        isHidden: false
    }
}

const COMMANDS_LIST = {
    test: {
        description: 'description of the command goes here as a string',
        isHidden: true,
        isText: true,
        return: [
            'if isText is set to TRUE return is an array of strings to printout',
            'if isText is set to FALSE return ia a function that may or maynot return an array of strings to printout and may or maynot recive parameters',
            'if isHidden is set to TRUE this command will not appear in HELP command',
        ],
    },
    ls: {
        description: 'lists all files available',
        isHidden: false,
        isText: false,
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
    help: {
        description: 'prints list of commands',
        isHidden: true,
        isText: false,
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
    time: {
        description: 'prints time in miliseconds since UNIX time zero',
        isHidden: false,
        isText: false,
        return: () => {
            let d = new Date();
            let time = d.getTime();
            return [`Its been ${time}ms since midnight January 1, 1970.`]
        }
    },
    clear: {
        description: 'clear screen',
        isHidden: false,
        isText: false,
        return: () => {
            PRINT_OUT.innerHTML = ''
            LN = 0
            return
        }
    },
    reset: {
        description: 'reset system',
        isHidden: false,
        isText: false,
        return: () => {
            location.reload()
        }
    },
    ln: {
        description: 'print line number',
        isHidden: false,
        isText: false,
        return: () => {
            return ['LN' + (LN + 1)]
        }
    },
    lorem: {
        description: 'prints lorem ipsum',
        isHidden: false,
        isText: true,
        return: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']
    },
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
        if (COMMANDS_LIST[command].isText) {
            output = COMMANDS_LIST[command].return
        } else {
            output = COMMANDS_LIST[command].return(parameter) ?? []
        }
    }
    arrayPrinter(output)
}

const commandParser = (command) => {

    const commandArray = command.split(' ')
    const commandToRun = commandArray.shift()
    const parameters = commandArray

    // paser the command lookin for extendend commands
    // like OPEN somefile or DELETE somefile
    // list of possible commands:
    // OPEN
    // DELETE
    // SPEED

    commandLoader(commandToRun, parameters)
}


window.onload = () => {
    document.addEventListener('keydown', () => {
        CMD_LINE.focus();
    })

    CMD_LINE.addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            cmd = CMD_LINE.value;
            showExecutedLine(cmd);
            CMD_LINE.value = '';
            commandParser(cmd);
            window.scrollTo(0, document.body.scrollHeight);
        }
    })
}