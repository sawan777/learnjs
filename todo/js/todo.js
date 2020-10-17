let serveFile = require('../../serveFile');
let fs = require('fs');
let data_base = {};
let snapshot = {};
let lastGeneratedUniqueId = 0;
let todo_data = {};
let reload = {};
const DATA_FILE = './todo/data/todos.json';

function recoverTodo() {
    // read file and return
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function save_data_base(err_msg,no_err){
    console.log(data_base);
    fs.writeFile(DATA_FILE, JSON.stringify(data_base, null, 2), (err) => {
        // throws an error, you could also catch it here
        if (err) {
            console.log(err_msg);
        }
        else {
            console.log(no_err);
        }
    });
    
}

function add_todo(res, q) {

    if (data_base.todos === undefined) {
        // it seems program/server just statred, try to recover

        data_base = recoverTodo();

    }
    todo_data = q.query;
    todo_data.isDone = false;
    lastGeneratedUniqueId = data_base.lastGeneratedUniqueId;
    lastGeneratedUniqueId++;
    todo_data.Id = lastGeneratedUniqueId;
    let currentdate = new Date();
    let err_msg = 'List NOT saved!';
    let no_err = 'list saved!';
    let date_time = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    todo_data.datetime = date_time;
    // write to file
    data_base.lastGeneratedUniqueId = lastGeneratedUniqueId;
    data_base.todos.push(todo_data);
    save_data_base(err_msg,no_err);
    return res.end();
}


function add_chk_value(res, q) {
    let err_msg = 'check box NOT saved!';
    let no_err = 'check box saved!';
    let chk_arr = q.query;
    unchk_no = chk_arr.unchk_id_no;
    chk_no = chk_arr.chk_id_no;
    u_chk = data_base.todos;
  
    for (let j = 0; j < u_chk.length; j++) {

        if (u_chk[j].Id == chk_no) {
            u_chk[j].isDone = true;
        }
        else if (u_chk[j].Id == unchk_no) {
            u_chk[j].isDone = false;
            
        }
    }
    save_data_base(err_msg,no_err);
    return res.end();
}

function todo_json(res, q) {
    reload = q.query;
    if (data_base.todos === undefined || reload.actions == 'refresh') {
        // it seems program/server just statred, try to recover
        data_base = recoverTodo();
        console.log('todo list = ', data_base.todos);
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(JSON.stringify(data_base.todos)); 
        snapshot = recoverTodo();
    }
    else if (snapshot.todos.length != data_base.todos.length) {
        let incr_arr = [];
        for (k = 0; k < data_base.todos.length; k++) {
            if (JSON.stringify(snapshot.todos[k]) !== JSON.stringify(data_base.todos[k])) {
                incr_arr.push(data_base.todos[k]);
            }
        }
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(JSON.stringify(incr_arr));
        snapshot = recoverTodo();
    }
    
    return res.end();
}

function todo_del(res, q) {
    let del_arr = q.query;
    del_json = del_arr.del_arr_json;
    arr_chk =data_base.todos;
    let err_msg = 'todo not delete!';
    let no_err = 'todo delete!';
    for (let j = 0; j < arr_chk.length; j++) {

        if (arr_chk[j].Id == del_json) {
            arr_chk.splice(j, 1);
            snapshot =  data_base;    
            save_data_base(err_msg,no_err);      
        } 
     
    }
    
    
    return res.end();
}

function route(req, res, q) {
    if (q.pathname.startsWith('/todo/static/')) {
        serveFile.serveFile(res, q);
    }
    else if (q.pathname == '/todo/get_todos') {
        todo_json(res, q);
    }
    else if (q.pathname == '/todo/add_todo') {
        add_todo(res, q);
    }
    else if (q.pathname == '/todo/check_box') {
        add_chk_value(res, q);
    }
    else if (q.pathname == '/todo/todo_del') {
        todo_del(res, q);
    }
    else {
        return serveFile.file_not_found(res);
    }
}
exports.todo_json = todo_json;
exports.route = route;
exports.add_todo = add_todo;
