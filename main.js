import './style.css'
import dayjs from 'dayjs';

let formInput = document.getElementById("formInput")

let parent = document.getElementById("parent")

function createData(event){
event.preventDefault();

let note = event.target.note.value;

// console.log(note)
// [{"object1"},{"object2"},{"object3"}]

let noteStorage = localStorage.getItem("noteStorage")

if(noteStorage==null){
    localStorage.setItem("noteStorage","[]");
}

//kita dapatkan data dari storage []
noteStorage = localStorage.getItem("noteStorage")
//kita pecahkanatau ubahkan biar stringnya lepas
let noteDataJson = JSON.parse(noteStorage)
//[]

//kita push data objek kedalam array tadi atau ke dalam noteDataJson
noteDataJson.push({
id : dayjs().unix(),
note :  note,
date : dayjs().format()
})

event.target.note.value=" ";

//kita ubah kembali data nya kedalam bentuk string

localStorage.setItem("noteStorage", JSON.stringify(noteDataJson))

alert("data berhasil ditambahkan");

renderToHtml();
}


// componen noteCard
function noteCard(id, content, date){
    let div = document.createElement("div");
    div.setAttribute("id", id)
    div.setAttribute("class", "w-full min-h-[120px] p-2 flex flex-col bg-white shadow-md rounded-md relative")

    //buat elemen p
    let p = document.createElement("p");
    p.setAttribute("class", "font-light")
    p.textContent = content;

    //buat element small
    let small = document.createElement("small");
    small.setAttribute("class", "italic text-slate-500 text-xs mt-auto")
    small.textContent = date;

    // buat element button close
    let buttonClose = document.createElement("button")
    buttonClose.setAttribute("class","w-10 h-10 bg-red-500 flex justify-center items-center rounded-xl absolute right-2 top-2 text-white hover:bg-red-600")
    buttonClose.textContent= "X";
    buttonClose.addEventListener("click", ( )=>{deleteCard(id)});

    //kita masukan elemen p msall dan button kedalam elemen div

    div.appendChild(p);
    div.appendChild(small);
    div.appendChild(buttonClose);

    return div;


}

// function untuk merender data dari localstorage ke html
function renderToHtml(){

    //kita ambil data dari local storage
    let noteStorage = localStorage.getItem("noteStorage");

    //jika tidak ada data di localstorage maka abaikan
if (noteStorage == null){
    return;
}

    // ubah data string dari storage data menjadi json / object 
    let noteDataJson = JSON.parse(noteStorage);

    parent.innerHTML = "";

    // maping data dari storageDataJson ke html
    noteDataJson.reverse().map((e)=>{parent.appendChild(noteCard(e.id, e.note, e.date))})

    

} 

function deleteCard(id) {

    window.confirm("Apakah anda akan delete data?")
    if(!confirm){
        return;
    }

    let noteStorage = localStorage.getItem("noteStorage");

    if (noteStorage == null) {
        return;
    }

    let noteDataJson = JSON.parse(noteStorage);

    let newData = noteDataJson.filter(note => note.id !== id);

    localStorage.setItem("noteStorage", JSON.stringify(newData));

    window.location.reload();
    
    renderToHtml();
}

renderToHtml(); 

formInput.addEventListener("submit", createData)