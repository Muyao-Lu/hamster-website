let hamster = document.getElementById("growing-hamster");
let hamster_bottom = document.getElementById("hamster-bottom");
const hamster_length_indicator = document.getElementById("length");
const hamster_state_indicator = document.getElementById("state");

let hamster_length = 10.56;
let hamster_fullness = 5;
let hamster_food_reserves = 0;
let hamster_segments = 0;
const hamster_fullness_bar = document.getElementById("hunger");
const hamster_reserves_bar = document.getElementById("food-reserves");

function delete_webpage(reason){
    const body = document.getElementById("body");
    if (reason == "starved"){body.innerHTML = "<h1 id='death'>Your hamster starved. Webpage Deleted.</h1>"}
    else if (reason == "full"){body.innerHTML = "<h1 id='death'>Your hamster exploded. Webpage Deleted.</h1>"}
    hamster_segments = 0;
    save_progress();
    
}

function update_hamster_state(){
    if (hamster_fullness <= 1){
        hamster_state_indicator.innerHTML = "Hamster Condition: FEED ME, I'M NOT JOKING HUMAN";
    }
    else if (1 < hamster_fullness && hamster_fullness <= 3){
        hamster_state_indicator.innerHTML = "Hamster Condition: Hungry";
    }
    else if (3 < hamster_fullness && hamster_fullness <= 5){
        hamster_state_indicator.innerHTML = "Hamster Condition: Feelin' Good";
    }
    else if (5 < hamster_fullness && hamster_fullness <= 7){
        hamster_state_indicator.innerHTML = "Hamster Condition: Full";
    }
    else if (7 < hamster_fullness && hamster_fullness <= 10){
        hamster_state_indicator.innerHTML = "Hamster Condition: Stuffed";
    }
    else if (10 < hamster_fullness && hamster_fullness <= 12){
        hamster_state_indicator.innerHTML = "Hamster Condition: AUUUUGH";
    }
    else{
         hamster_state_indicator.innerHTML = "Hamster Condition: DON'T FEED ME, I BEG YOU";
    }
}

function update_progress_bar(){
    hamster_fullness_bar.setAttribute("value", String(hamster_fullness));
    hamster_reserves_bar.setAttribute("value", String(hamster_food_reserves));
}

function increase_hamster_length(){
    if (hamster_fullness <= 13){
        let body_segment = document.createElement("div")
        body_segment.setAttribute("id", "hamster-body-container")
        body_segment.innerHTML = "<img src='hamster_body.png' id='hamster-body' draggable='false'>"
        hamster.insertBefore(body_segment, hamster_bottom)
        
        hamster_segments += 1

        hamster_fullness += 1;
        hamster_length += 8;
        hamster_length_indicator.innerHTML = "Hamster Length: " + String(hamster_length.toFixed(2)) + "cm"

        if (hamster_food_reserves <= 5){
            hamster_food_reserves += 1
        }
        
        
        update_hamster_state();
        update_progress_bar();
    }
    else{
        delete_webpage("full");
    }
}

function remove_body_segment(){
    let hamster_body = document.getElementById("hamster-body-container");
                    hamster_body.remove();
                    hamster_length -= 8;
                    hamster_length_indicator.innerHTML = "Hamster Length: " + String(hamster_length.toFixed(2)) + "cm"
                    hamster_segments -= 1;
}

function digest_food(){
    if (hamster_fullness >= 5){
        hamster_fullness -= 1;
        update_hamster_state();
        update_progress_bar();
    }
    else if (hamster_fullness < 5 && hamster_fullness >= 1){
        let n = Math.round(Math.random(0, 2));
        if (Math.round(Math.random(0, 2)) == 0){
            if (hamster_food_reserves > 0){
                hamster_food_reserves -= 1
            }
            
            else{
                if (Math.round(Math.random(0, 2)) == 0){
                    try{
                    remove_body_segment(); 
                    }  
                    catch{
                        hamster_fullness -= 1}
                    }
                else{
                    hamster_fullness -= 1
                }
            }
            
        }
        else{
            hamster_fullness -= 1
        }
        update_hamster_state();
        update_progress_bar();
    }

    else{
        
        if (hamster_food_reserves >= 1){
            hamster_food_reserves -= 1
        }
        else{
            try{
                remove_body_segment();
            }
            catch{
                delete_webpage("starved");
            }
        }

        update_hamster_state();
        update_progress_bar();
        
    }
    
}
function drop(initiator){
    increase_hamster_length();
}

function dragover(initiator){
    initiator.preventDefault();

}

function print_hamster(){
    let new_window = window.open("download.html");
    new_window.addEventListener("load", configure_new_window(new_window))
    
}

function configure_new_window(new_window){
    new_window.document.write("<div id='growing-hamster'></div>");
    make_hamster(new_window);
    
    new_window.print(); 
    new_window.close();
    make_hamster(window);
}

function make_hamster(window_to_modify){
    
    try{
        const hamster_container = window_to_modify.getElementById("growing-hamster");
        hamster_container.remove();
    }
    catch{

    }
    
    let new_window_growing_hamster = window_to_modify.document.getElementById("growing-hamster");
    new_window_growing_hamster.innerHTML = '<img id="hamster-head" src="hamster_head.png" draggable="false">\
                                            <img id="hamster-bottom" src="hamster_foot.png" draggable="false">';
    
    for (let i=0; i<hamster_segments; i++){
        let body_segment = window_to_modify.document.createElement("div");
    let hamster_bottom_new = window_to_modify.document.getElementById("hamster-bottom");
    body_segment.setAttribute("id", "hamster-body-container");
    body_segment.innerHTML = "<img src='hamster_body.png' id='hamster-body'  draggable='false'>"
        new_window_growing_hamster.insertBefore(body_segment, hamster_bottom_new);
    }
    hamster = window_to_modify.document.getElementById("growing-hamster");
    hamster_bottom = window_to_modify.document.getElementById("hamster-bottom");
}

function save_progress() {
    const d = new Date();
    d.setTime(d.getTime() + (3*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "length" + "=" + String(hamster_segments) + ";" + expires + ";path=/";
    document.cookie = "hunger" + "=" + String(hamster_fullness) + ";" + expires + ";path=/";
    document.cookie = "reserves" + "=" + String(hamster_food_reserves) + ";" + expires + ";path=/";
    console.log(decodeURIComponent(document.cookie));
  }

function decompile_substring(to_process){
    let mode = "waiting";
    let substring = "";
    for (let i=0; i<to_process.length; i++){
        if (mode == "active"){
                substring += to_process[i];
        }
        if (to_process[i] == "="){
            mode = "active";
        }
        else if (to_process[i] == ";"){
            mode = "waiting"
        }
    }
    return substring;
    
}

function load(){
    let cookie_processed = decodeURIComponent(document.cookie);
    let cookie_split = cookie_processed.split(";");
    if (cookie_processed != ""){  
        for (let i=0; i<cookie_split.length; i++){
            console.log(cookie_split);
            console.log(cookie_split[i]);
            console.log(cookie_split[i].includes("length");
            console.log(cookie_split[i].includes("hunger");
            console.log(cookie_split[i].includes("reserves");
            if (cookie_split[i].includes("length") != -1){
                hamster_segments = Number(decompile_substring(cookie_split[i]));
                hamster_length = 10.56 + 8 * hamster_segments;
                console.log(hamster_length);
            }
            else if (cookie_split[i].includes("hunger") != -1){
                hamster_fullness = Number(decompile_substring(cookie_split[i]));
                console.log(hamster_fullness);
            }
            else if (cookie_split[i].includes("reserves") != -1){
                hamster_food_reserves = Number(decompile_substring(cookie_split[i]));
                console.log(hamster_food_reserves);
            }
        }
        
        make_hamster(window);
        update_hamster_state();
        update_progress_bar();
        hamster_length_indicator.innerHTML = "Hamster Length: " + String(hamster_length.toFixed(2)) + "cm";
    }
    else{
    }
}

hamster.addEventListener("drop", drop);
hamster.addEventListener("dragover", dragover);
setInterval(digest_food, 10000);
setInterval(save_progress, 5000)
load()
