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

    Generate_Day_Hash(f_day, year, month)

    Resset_disabled_tiles()
    displayCurrentDate(date);
    Generate_tile_numbers(now_year, now_month);
}

function Click_Event(id){
    Add_Outline(id);
    Generate_Day_Hash(id, year, month);
}

function Add_Outline(id){
    
    document.getElementById(window.old_value).classList.remove('active_tile');
    document.getElementById(window.old_value).classList.add('tile');
    document.getElementById(id).classList.remove('tile');
    document.getElementById(id).classList.add('active_tile');
    window.old_value = id;
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
    Generate_Day_Hash(f_day, now_year, now_month);

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
    Generate_Day_Hash(f_day, year, month);
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
    hash = 'y'.concat(now_year,'m', now_month+1,'d', id);
    document.getElementById('first_tab').innerHTML = hash;
}