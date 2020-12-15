var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var today = date.getDate();
var months = ['January', 'February', 'March', 'April', 'May', 'Juny', 'Jully', 'August', 'September', 'October', 'November', 'December'];

var now_year = year;
var now_month = month;

window.onload = function(){
    first_day = new Date(now_year, now_month, 1);
    f_day = first_day.getDay();

    n_id=Continue_last_Visit(f_day, 'r');


    hash = Generate_Day_Hash(f_day, year, month);
    read(hash);

    Resset_disabled_tiles();
    displayCurrentDate(date);
    Generate_tile_numbers(now_year, now_month);

    Click_Event(n_id);
}

function Click_Event(id){
    Add_Outline(id)
    hash = Generate_Day_Hash(id, year, month);
    read(hash);
    //Continue_last_Visit(id, 'w');
}

function Add_Outline(id){
    
    document.getElementById(window.old_value).classList.remove('active_tile');
    document.getElementById(window.old_value).classList.add('tile');
    document.getElementById(id).classList.remove('tile');
    document.getElementById(id).classList.add('active_tile');
    window.old_value = id;
    Continue_last_Visit(id, 'w');


}
function displayCurrentDate(date){    
    document.getElementById('year').innerHTML = year;
    gui_month = months[month];
    document.getElementById('month').innerHTML = gui_month;
}
function Take_Date_Back(){
    month--;
    now_month--;
    if(month<0){
        month = 11;
        now_month = 11;
        year--;
        now_year--;
        
    }
    gui_month = months[month]
    document.getElementById('month').innerHTML = gui_month;
    document.getElementById('year').innerHTML = year;

    f_day = new Date(now_year, now_month, 1).getDay();
    if(f_day==0){
        f_day = 7
    }
    hash = Generate_Day_Hash(f_day, now_year, now_month);
    read(hash);

    Resset_disabled_tiles();
    Generate_tile_numbers(year, month);
}
function Take_Date_Forward(){
    month++;
    now_month++;
    if(month>11){
        month = 0;
        now_month = 0;

        year++;
        now_year++;
    }
    gui_month = months[month]
    document.getElementById('month').innerHTML = gui_month;
    document.getElementById('year').innerHTML = year;

    Resset_disabled_tiles();
    Generate_tile_numbers(year, month);

    f_day = new Date(year, month, 1).getDay();
    if(f_day==0){
        f_day = 7
    }
    hash = Generate_Day_Hash(f_day, year, month);
    read(hash);

}
function Generate_tile_numbers(year, month){
    first_day = new Date(year, month, 1);
    last_day = new Date(year, month + 1, 0);
    
    f_day = first_day.getDay();
    if(f_day==0){
        f_day = 7
    }
    l_day = last_day.getDate();
    if(l_day==0){
        l_day = 7
    }

    document.getElementById(f_day).classList.remove('tile');
    document.getElementById(f_day).classList.add('active_tile');
    
    window.old_value = f_day;
    Continue_last_Visit(window.old_value, 'w');
    
    var x = 0
    for (let i = 1; i < f_day; i++) {
        document.getElementById(i).classList.add('none');
        document.getElementById(i).classList.remove('tile');
        document.getElementById(i).disabled = true;
        x++
        
    }
    for (let i = 42; i > l_day+x; i--) {
        document.getElementById(i).classList.add('none');
        document.getElementById(i).classList.remove('tile');
        document.getElementById(i).disabled = true;
        
    }
    for (let i = 1; i < l_day+1; i++) {
        document.getElementById(f_day).innerHTML = i;
        f_day++
    }
    
}
function Resset_disabled_tiles(){
    for (let i = 1; i < 43; i++) {
        document.getElementById(i).classList.remove('none');
        document.getElementById(i).classList.remove('active_tile');
        document.getElementById(i).classList.add('tile');
        document.getElementById(i).disabled = false;
    }

}
function Generate_Day_Hash(id, now_year, now_month){
    var hash = 'y'.concat(now_year,'m', now_month+1,'d', id);
    document.getElementById('list_content').innerHTML = hash;
    return hash;
}
function Add_New_Item(){
    let formData = new FormData(input_form);
    var n_todo = formData.get('inp_text');
    eel.main(hash, 'w', n_todo);

    return false;

}

async function Continue_last_Visit(hash, action) {
    let n = await eel.last_visit(hash, action)();
    if(action=='r'){
        Click_Event(n);
    }
}

async function read(hash) {
    // Inside a function marked 'async' we can use the 'await' keyword.
      
    let n = await eel.main(hash, 'r', 'None')(); // Must prefix call with 'await', otherwise it's the same syntax
    if(n==false){
        document.getElementById('list_content').innerHTML = 'Nothing planned yet! Click + to add something right now';
    }else{
        stuff = Array.from(n)
        document.getElementById('list_content').innerHTML = stuff[0];
        for (let i = 1; i < stuff.length; i++) {
            var node = document.createElement("P");
            var textnode = document.createTextNode(stuff[i]);
            node.appendChild(textnode);
            document.getElementById('list_content').appendChild(node); 
        }    
    }
}