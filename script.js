const passwords = {
    list: []
}
let id = 1;

function createArray(n){
    let arr = [];

    for (let i = 1; i < n*n; i++){
        arr.push(i);
    }

    let randIndex;
    for (let i in arr) {
        let x = arr[i];
        randIndex = Math.floor(Math.random() * arr.length);
        arr[i] = arr[randIndex];
        arr[randIndex] = x;
    }

    return arr;
}

function createField(n) {
    let table = document.getElementById('myTable');
    table.innerHTML = "";
    cells = [];
    let row, cell;
    let counter = 0;
    let initialArr = createArray(n)
    console.log(initialArr);

    for (let i = 0; i < n; i++) {
        row = table.insertRow(i);
        for(let j = 0; j < n; j ++){
            cell = row.insertCell(j);
            cell.addEventListener('dragstart', handleDragStart, false);
            if (counter < initialArr.length)
            {
                cell.innerHTML = '<div class="item" draggable="true"' + ' id="' + initialArr[counter] + '">'+initialArr[counter] + '</div>';
            } else {
                cell.addEventListener('dragover', handleDragOver, false);
                cell.addEventListener('drop', handleDrop, false);
            }
            cells[counter] = initialArr[counter];
            counter++;
        }
    }
    cells[n*n - 1] = 'empty';
    console.log(cells);

}

function handleDragStart(e) {

    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {

    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcEl != this) {

        let x = parseInt(dragSrcEl.innerText);
        let index = cells.indexOf(x);

        cells[cells.indexOf('empty')] = x;
        cells[index] = 'empty';
        if (won(cells)){
            document.getElementById('main').classList.add("hide");
            document.getElementById('passwords').classList.remove("hide");
            console.log( "You won!");
        } else {
            console.log("keep trying");
        }

        dragSrcEl.innerHTML = this.innerHTML;
        dragSrcEl.addEventListener('dragover', handleDragOver, false);
        dragSrcEl.addEventListener('drop', handleDrop, false);

        this.innerHTML = e.dataTransfer.getData('text/html');
        this.removeEventListener('dragover', handleDragOver, false);
        this.removeEventListener('drop', handleDrop, false);
    }
    return false;
}

function won(arr) {
    if (arr[arr.length - 1] !== "empty") return;
    for (let i = 0; i < arr.length - 1; i++){
        if (i + 1 == arr[i]){ continue; }
        else { return false;}
    }

    return true;
}

function getPasswords() {
    return passwords;
}

function setPassword(site, pass) {
    if(!site || !pass){
        document.getElementById('site').classList.add("error");
        document.getElementById('password').classList.add("error");
        return;
    }
    passwords.list.push({ site: site, password: pass });
    let list = document.getElementById('list')
    let siteDiv = document.createElement("div")
    siteDiv.setAttribute("id", id)
    siteDiv.append(site)
    let passDiv = document.createElement("div")
    passDiv.setAttribute("id", id);
    passDiv.append(pass)
    let idDiv = document.createElement("div")
    idDiv.append(id)
    idDiv.setAttribute("id", id)
    list.append(idDiv)
    
    list.append(siteDiv)
    list.append(passDiv)
    let deleteButton = document.createElement("button")
    deleteButton.setAttribute("id", id)
    deleteButton.append("X")
    deleteButton.addEventListener('click', function(){deletePassword(deleteButton.getAttribute("id"))})
    id++;
    list.append(deleteButton)
    document.getElementById('site').value = "";
    document.getElementById('password').value = "";
}

function deletePassword(id) {
    let list = document.querySelector("#list")
    let idDiv = list.querySelectorAll(`[id="${id}"]`)
    Array.prototype.forEach.call( idDiv, function( node ) {
        node.parentNode.removeChild( node );
    });
}

module.exports = {
    createArray, won, getPasswords
}