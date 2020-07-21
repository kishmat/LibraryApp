const render = function (template, node) {
	node.innerHTML = template;
};

var x = document.querySelector(".form");
x.style.display = "none"

function myFunction() {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

let myLibrary = JSON.parse(localStorage.myLibrary || '[]')

function cleanfn(){
    localStorage.setItem("myLibrary",[])
}

function Book(title,author,pages,read) {
    this.title =title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        return `${this.title}`
    }
}

document.querySelector('.form').addEventListener('submit',function(e){
    e.preventDefault()
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    var pages = document.getElementById('pages').value
    if (document.getElementById('r1').checked) {
      var read = document.getElementById('r1').value;
    }
    if (document.getElementById('r2').checked) {
      var read = document.getElementById('r2').value;
    }
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('pages').value = ''
    const book = new Book(title,author,pages,read)
    addBookToLibrary(book)

function addBookToLibrary(book) {
  myLibrary.push(book)
  localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
  location.reload()
} 
})

if(myLibrary.length === 0){
    var template = '<h1>NO BOOKS</h1> <h2>Library on Maintainance</h2>'
}
else{
    var template = '<h1>List of Books : </h1>';
}
myLibrary.forEach(book => {
  template = `${template}<div class="book"> <h3> Title : <span id="name">${book.title} </span></h3> <h4>Author : ${book.author} </h4> <h4>Number of pages : ${book.pages} </h4>
  <h4> Read status : <span> ${book.read} </span> </h4> <button class="deletebook" >Delete</button> <button class="change">Change read status </button> <hr> </div>`

});
render(template, document.getElementById('main'));

var y = (document.querySelectorAll(".deletebook").length)

for(let i=0;i<y;i++){
document.querySelectorAll(".deletebook")[i].addEventListener('click',function(e){
  const name = (e.target.parentNode.childNodes[1].childNodes[1].textContent).trim()
  const books = JSON.parse(localStorage.myLibrary)
  const newbooks = books.filter(book => book.title !== name)
  myLibrary = JSON.stringify(newbooks)
  localStorage.setItem("myLibrary",myLibrary)
  location.reload()
})
}

var z = document.querySelectorAll('.change').length

for(let j=0;j<z;j++){
  document.querySelectorAll('.change')[j].addEventListener('click',function(e){
    const name = (e.target.parentNode.childNodes[1].childNodes[1].textContent).trim()
    const books = JSON.parse(localStorage.myLibrary)
    const need = books.filter(book => book.title === name)[0]
    const status = need.read
    if(status === 'read'){
      need.read = 'notyet'
      myLibrary = JSON.stringify(books)
      localStorage.setItem('myLibrary',myLibrary)
      location.reload()
    }
    else{
      need.read = 'read'
      myLibrary = JSON.stringify(books)
      localStorage.setItem('myLibrary',myLibrary)
      location.reload()
    }
  })
}






