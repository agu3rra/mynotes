var Task = require('./class.js') // imports task.js
var Repo = require('./taskRepo.js')

var t1 = new Task(Repo.get(1))
var t2 = new Task({name: 'task 2'})
var t3 = new Task({name: 'task 3'})
var t4 = new Task({name: 'task 4'})

t1.complete()
t2.save()
t3.save()
