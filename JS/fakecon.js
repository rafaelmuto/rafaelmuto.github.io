console.log('fakeCon online...')

export default class FakeCon {

    constructor() {
        this.LN = 0
        this.PRINT_SPEED = 10
    }

    init() {
        // get container element
        // create internal elements
        return this
    }

    setCommands(commands) {
        // create commands array

        return this
    }

    setFiles(files) {
        // create files array

        return this
    }

    start() {
        // add event listener onkey down focus on command line
        // add event listenert capture ENTER key to run command.
    }
}


class Command {
    constructor(name, description, isHidden, callback) {
        this.name = name
        this.description = description
        this.isHidden = isHidden
        this.callback = callback
    }
}

class File {
    constructor(name, displayName, isHidden, link) {
        this.name = name
        this.displayName = displayName
        this.isHidden = isHidden
        this.link = link
    }
}
