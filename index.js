showNotes();

let addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
    let addTxt = document.getElementById('add-txt');
    let addTitle = document.getElementById('add-title');
    let important = document.getElementById('important');
    if (addTxt.value.length != 0 && addTitle.value.length != 0) {
        let notesArray = localStorage.getItem('notes');
        notesObj = {};
        if (notesArray == null) {
            notesArray = [];
        }
        else {
            notesArray = JSON.parse(notesArray);
        }
        notesObj.title = addTitle.value;
        notesObj.text = addTxt.value;
        notesObj.date = new Date().toLocaleDateString();
        notesObj.important = important.checked;
        notesArray.push(notesObj);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        addTxt.value = "";
        addTitle.value = "";
    }
    showNotes();
})

function showNotes() {
    let notes = JSON.parse(localStorage.getItem('notes'));
    let html = "";
    notesElement = document.getElementById('notes');
    if (notes == null) {
        notesElement.innerHTML = "OOPS!! You Do Not have notes. Click on ADD NOTES";
    }
    else {
        notes.forEach((note, index) => {
            html += `<div class="my-2 mx-2 note-card card" id="note-card" style="width: 18rem;">
             <div class="card-body">
                <div class="heading d-flex justify-content-between">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="fs-6">${note.date}</p>
                </div>
                <p class="card-text">${note.text}</p>
                <button class="btn btn-dark btn-sm" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
             </div>
         </div>`;
         if(note.important){
            html += `<div class="my-2 mx-2 note-card card" id="note-card" style="width: 18rem;">
            <div class="card-body">
               <div class="heading d-flex justify-content-between">
                   <h5 class="card-title">${note.title}<i class="bi bi-info-circle-fill ms-2"></i></h5>
                   <p class="fs-6">${note.date}</p>
               </div>
               <p class="card-text">${note.text}</p>
               <button class="btn btn-dark btn-sm" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
            </div>
        </div>`;
         }
        });
        notesElement.innerHTML = html;
    }
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    if (notes.length == 0)
        localStorage.clear();
    showNotes();
}

let search = document.getElementById('search-text');
search.addEventListener('input', () => {
    inputValue = search.value;
    noteCard = document.getElementsByClassName('note-card');
    Array.from(noteCard).forEach((element) => {
        let cardText = element.getElementsByTagName("p")[0];
        if (cardText.innerText.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
})
