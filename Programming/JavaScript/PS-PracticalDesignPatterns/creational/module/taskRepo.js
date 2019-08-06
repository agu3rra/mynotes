// Does all the DB calls
var repo = function(){

    var db = {}
    
    var get = function(id){
        console.log(`Getting task: ${id}`)
        return {
            name: 'new task from db'
        }
    }

    var save = function(task){
        comsole.log(`saving ${task.name} to the db`)
    }

    // the visible part of this module
    return {
        get: get,
        save: save
    }
}

module.exports = repo();