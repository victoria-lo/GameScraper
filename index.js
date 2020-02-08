//loads the scraped data to HTML
const table = document.getElementById('game-data');

function loadJSON(){
    const request = new XMLHttpRequest();
    request.open('get', './data.json');

    request.onload = () =>{
        try{
            const json = JSON.parse(request.responseText);
            populateTable(json);
        }catch(e){
            console.error(e);
        }
    }
    request.send();
}

function populateTable(json){

    //clears table
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }

    //populates table
    json.forEach((row)=>{
        const tr = document.createElement("tr");
        row.forEach((cell)=>{
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        })

        table.appendChild(tr);
    })

}

document.addEventListener('DOMContentLoaded', loadJSON());