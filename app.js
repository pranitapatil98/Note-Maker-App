
displayNotes();
//local storage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function(e) {
  //console.log("button clicked");
  let title=document.getElementById("title");
  let addTxt = document.getElementById("addTxt");
  let now = new Date();
	let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} | ${now.toLocaleString('en-US', { hour:'numeric',minute:'numeric', hour12: true })}`;

  if((title.value && addTxt.value))
 {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];

  } else {
    notesObj = JSON.parse(notes);
  }
  let tempObj = { title: title.value, addTxt:addTxt.value,time:dateTime };

  notesObj.push(tempObj);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  title.value="";
  displayNotes();
}
else   {
alert("take note");
}
});

// Function to show elements from localStorage
function displayNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;background-color:#ffc642;">
                    <div class="card-body" id="card">
                    <div class="card-header"style="background-color:#fcb714;" >
  
  
                        <h5 class="card-title ";  > ${index + 1} ${element.title}</h5>    
                           <hr/>
                        <p class="card-text"> ${element.addTxt}</p>
                         <h6 class="card-footer-right">${element.time}</h6>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                        </div>
                        </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<span class="alert alert-danger" role="alert" style="text-align: center; color:black;"><b>Your notes are empty...</b></span>`;
  }
}

// delete 
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  displayNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
   // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle=element.getElementsByTagName("h5")[0].innerText;
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
         //console.log(cardTxt);
    })
})



