
let data =[]
function addRowToTable(firstName, lastName, email,phone){
    // find the tbody tag at the first index - 0 
    const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0]; 

    //add tr to the find tbody tag
    const newRow = table.insertRow(); // inserts a new row ( <tr> ) in a given <table> , and returns a reference to the new row.


    //inserts a cell (td) into a table row (tr) and add textContent as data
    newRow.insertCell(0).textContent = firstName;
    newRow.insertCell(1).textContent = lastName;
    newRow.insertCell(2).textContent = email;
    newRow.insertCell(3).textContent = phone;

}


let fileInput = document.getElementById("fileInput");
//The change event (below) is fired for <input>, <select>, and <textarea> elements when the user modifies the element's value. 
fileInput.addEventListener('change', (event)=>{ //change when input is clicked
//console.log(event);
    const file = event.target.files[0];
    console.log(fileInput.files.length);

   //check if the any file has been uplaoded or not, and also check if the file type is text/plain
    if(!file || file.type !== 'text/plain')
    {
        alert("Please select a text file")
        throw new Error('No file found');
    
    }

if(fileInput.files.length!==0){
    let card = document.querySelector(".card")
    let btn = document.createElement("button")
    btn.appendChild(document.createTextNode("Save"))
    card.appendChild(btn)
    btn.classList.add("btn")
}
    //The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    const reader = new FileReader();
    //console.log(reader);
    reader.onload = (e)=>{
        const contents = e.target.result;
     
        const lines = contents.split('\n');
      // console.log(lines);
        lines.forEach(line => {
            const [firstName, lastName, email, phone] = line.split(',')
           // console.log(firstName, lastName, email,phone);
            addRowToTable(firstName, lastName, email, phone)
           // postData({firstName: firstName, lastName: lastName, email: email, phone: phone})
          let object={firstName: firstName, lastName: lastName, email: email, phone: phone}
          data.push(object)
        });


    }


    //The readAsText() method of the FileReader interface is used to read the contents of the specified Blob or File. When the read operation is complete, the readyState is changed to DONE, the loadend event is triggered, and the result property contains the contents of the file as a text string. 
reader.readAsText(file);



document.querySelector(".btn")?.addEventListener("click", async function(){
    console.log(document.querySelector(".btn"));
    
 await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(() => {
          alert("Data has been added successfully to the JSON Server")
        })
        .catch((err) => console.error(err.message));
    })
})





