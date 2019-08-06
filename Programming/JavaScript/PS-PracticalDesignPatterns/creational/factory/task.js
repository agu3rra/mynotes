// as of ES6 you can use class
var Repo = require('./taskRepo.js')

class Task {
    constructor(name) {
        this.name = name
        this.completed = false
    }
    complete() {
        console.log(`completing task: ${this.name}`)
        this.completed = true
    }
    save() {
        console.log(`saving task: ${this.name}`)
        Repo.save(this)
    }
}

module.exports = Task;
