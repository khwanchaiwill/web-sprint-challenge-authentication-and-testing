const db = require("../database/dbConfig");


module.exports = {
    find,
    findBy,
    findById,
    add, 
    update,
    remove,
}

function find() {
    return db('users')
}
function findBy(user) {
    return db("users").where(user).orderBy("id");
  }
function findById(id) {
    let query = db('users')
    
    if(id){
        return query
            .where({id})
            .first();
    }else {
        return null;
    }
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        
}

function update(changes, id) {
    return db('users')
        .where({id})
        .update(changes)
        .then(count => count > 0 ? findById(id) : null)
}
function remove(id) {
    return db('users')
        .where('id', id)
        .del();
}
