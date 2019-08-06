// as of ES6 you can use class
class Task {
    constructor(data) {
        this.name = data.name
        this.completed = data.completed
    }
    complete() {
        console.log(`completing task: ${this.name}`)
        this.completed = true
    }
    save() {
        console.log(`saving task: ${this.name}`)
    }
}

module.exports = Task;
