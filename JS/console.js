const INPUT = document.getElementById('input')
const CMD_LINE = document.getElementById('cmd_line')
const PRINT_OUT = document.getElementById('print')
let LN = 0
const PRINT_SPEED = 20


const COMMAND_LIST = {
    test: {
        description: 'description of the command goes here as a string',
        hidden: true,
        textReturn: true,
        return: [
            'if textReturn is set to TRUE: return of the command goes here as an array of strings to printout',
            'if textReturn is set to FALSE: a function that may or maynot return an array of strings to printout',
        ],
    },
    help: {
        description: 'prints list of commands',
        hidden: true,
        textReturn: false,
        return: () => {
            let command_list = []
            for (let [key, value] of Object.entries(COMMAND_LIST)) {
                if (value.hidden) {
                    continue
                }
                command_list.push(`${key} => ${value.description}`)
            }
            return command_list
        }
    },
    time: {
        description: 'prints time in miliseconds since UNIX time zero',
        hidden: false,
        textReturn: false,
        return: () => {
            let d = new Date();
            let time = d.getTime();
            return [`Its been ${time}ms since midnight January 1, 1970.`]
        }
    },
    lorem: {
        description: 'prints lorem ipsum',
        hidden: false,
        textReturn: true,
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

const commandLoader = (command) => {
    let output = []
    if (!COMMAND_LIST[command]) {
        output = [`ERROR: ${command} is not a command.`]
    } else {
        if (COMMAND_LIST[command].textReturn) {
            output = COMMAND_LIST[command].return
        } else {
            output = COMMAND_LIST[command].return() ?? []
        }
    }
    arrayPrinter(output)
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
            commandLoader(cmd);
            window.scrollTo(0, document.body.scrollHeight);
        }
    })
}