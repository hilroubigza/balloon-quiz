const API_URL =
"https://script.google.com/macros/s/AKfycbx95vZv_oWvntl8ozLCbM3uFCIErB37b6YlUOxi9f6uc6DW2rVyOxAaJgoDe5wLBw30/exec";

async function loadQuestions(){

const response =

await fetch(

`${API_URL}?mode=questions`

);

return await response.json();

}

async function saveScore(
name,
score
){

return fetch(

API_URL,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

mode:"saveScore",

name:name,

score:score

})

}

);

}

async function getLeaderboard(){

const response =

await fetch(

`${API_URL}?mode=leaderboard`

);

return await response.json();

}
