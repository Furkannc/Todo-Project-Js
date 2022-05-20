//Elementlere erisme
const form=document.querySelector("#todo-form");//submit islemi icn
const todoInput=document.querySelector("#todo");//input icin
const todoList=document.querySelector(".list-group");//listeye ekleme icin ul
const firstCardBody=document.querySelectorAll(".card-body")[0];//eklemenin basarili olup olmadigi icin uyari verilcek
const secondCardBody=document.querySelectorAll(".card-body")[1];//eklemenin basarili olup olmadigi icin uyari verilcek
const filter=document.querySelector("#filter");//filtre inputu icin
const clearButton=document.querySelector("#clear-todos");//todosları temzilemek icin

eventListeners();

//Submit olayi ekkleme
function eventListeners(){//event listenerlari ataycak
    form.addEventListener("submit",addTodo);//todoya submit yapınca
    document.addEventListener("DOMContentLoaded",loadAllTodosToUi);//sayfa yuklenince storageden veri alma
    secondCardBody.addEventListener("click",deleteTodo);//silme islemi
    filter.addEventListener("keydown",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(){
    //arayuznde todolari temizleme
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
        // todoList.innerHTML=""; //Yavaş yöntem proje buyuk degilse kullanilabilir
        while(todoList.firstElementChild != null){//li etiketi kalmayana dek
            todoList.removeChild(todoList.firstElementChild);//todolist içinden li elementlerini siler
        }
        localStorage.removeItem("todos");//local storage uzerinden de silindi
    }
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();//input içindeki veriler kucuk harfe cevrilir ve degiskene atılır
    const listItems=document.querySelectorAll(".list-group-item");//butun li ektiletleri secildi
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();//li etkiketi içindeki veriler kucuk harfe cevrilir e degiskene atanır
        if(text.indexOf(filterValue) === -1)
        {
            listItem.setAttribute("style","display : none !important");//eger herhangi bi eslesme yoksa li elementleri gorunmez olur
            //d flex içinde display block oldugu için bizim none zellgini important kılmamız gerekti
        }else{
            listItem.setAttribute("style","display : block");//eger esleme var gorunur olur
        }

    });
}

function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove(); 
        //i elmentine basıldıysa a elementine git ordan li elemenetine git ve sil
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);//todo yu li elementi içinden alcak
        showAlert("success","Todo başarıyla silindi..");
        
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deleteTodo)//listedeki herhangi bir eleman deletetodo ya eşitse
        {
            todos.splic(index,1);//o indexten itibaren 1 tane veri sil
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));//veriyi sildikten sonra tekrar kaydederiz storagea
}

function loadAllTodosToUi(){
    let todos=getTodosFromStorage();
    
    todos.forEach(function(todo){
        addTodoToUi(todo);
    });
}

function addTodo(e){

    const newTodo=todoInput.value.trim();//trim fonk basindaki ve sonundaki bosluklari temizler

    if(newTodo===""){
        showAlert("danger","Lutfen bir todo girin..");
    }
    else{
        showAlert("success","Todo Basariyla eklendi..");
        addTodoToStorage(newTodo);
        addTodoToUi(newTodo);//alinan degeri ekrana yonlendircek

    }

    e.preventDefault();
}

function showAlert(type,message){
// <div class="alert alert-warning" role="alert">
//   This is a warning alert—check it out!
// </div>
const alert=document.createElement("div");
alert.className=`alert alert-${type}`;
alert.textContent=message;
alert.setAttribute("role","alert")
console.log(alert);
firstCardBody.appendChild(alert);

//settimeout /belirli saniye sonra islem yaar
//2deger alır birisi fonk diger, ms cinsinden zaman
setTimeout(function(){
    alert.remove();
},1500);

}

function getTodosFromStorage(){//stoage kontrol eder varsa todos listesine ekler yoksa bos liste doner
    let todos;
    if(localStorage.getItem("todos")===null)
        todos=[];
    else
        todos=JSON.parse(localStorage.getItem("todos"));
    
    return todos;
}

function addTodoToStorage(newTodo){
   let todos=getTodosFromStorage();//todos listesi alınır

   todos.push(newTodo);//listeye yeni todo eklenir

   localStorage.setItem("todos",JSON.stringify(todos));//liste halinde tekrardan storage eklenir

}

function addTodoToUi(newTodo){//string deger list item olarak eklnecenk

//Link olusturma
const link=document.createElement("a");//a elemeti olusturulcaka
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i>";//a elementi icindeki deger bir icon oldugu icin onuda ekliyoruz

//List item olusturma
const listItem=document.createElement("li");    //yeni bir li elementi olusturulacak
listItem.className="list-group-item d-flex justify-content-between bg-dark";//classi verilir
listItem.style.color="white"
listItem.appendChild(document.createTextNode(newTodo));//textnode eklenir(todo)
listItem.appendChild(link);//link etiketinide cocogu olarak ekler

//Todo liste list itemi ekleme
todoList.appendChild(listItem);

//todo inputu temizlme
todoInput.value="";

//  <li class="list-group-item d-flex justify-content-between">
//     Todo 1
//     <a href = "#" class ="delete-item">
//         <i class = "fa fa-remove"></i>
//     </a>
// </li>

}





