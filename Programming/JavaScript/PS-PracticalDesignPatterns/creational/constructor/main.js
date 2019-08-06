var Task = require('./class.js') // imports task.js

var t1 = new Task('task 1')
var t2 = new Task('task 2')
var t3 = new Task('task 3')
var t4 = new Task('task 4')

t1.complete()
t2.save()
t3.save()
