var Task = require('./task.js')
var repoFactory = require('./repoFactory.js')

var task1 = new Task(repoFactory.task.get(1))
var task2 = new Task(repoFactory.task.get(2))

var user = repoFactory.user.get(1)
var project = repoFactory.project.get(1)

task1.user = user
task1.project = project

task1.save()
