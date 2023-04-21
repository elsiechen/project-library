let myLibrary = [];

const table = document.querySelector('.table')
const tbody = document.querySelector('.tbody');
const form = document.querySelector('form');
const addBtn = document.querySelector('#addBtn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

// Create book instances manually
const harryPotter = new Book('Harry Potter And The Half Blood Prince', 'J.K. Rowling', 652, false);
const peppaPig = new Book('Peppa Pig and the Day at Snow Mountain','Nevil Astley and Mark Baker',36, true);
const olivia = new Book('Dinner with Olivia', 'Emily Sollinger', 18, false);
const panda = new Book('Please, Mr. Panda', 'Steve Antony', 22, true);
const splat = new Book('Splat the Cat Twice the Mice', 'Rob Scotton', 28, true);

// Add book to library manually
addBookToLibrary(harryPotter);
addBookToLibrary(peppaPig);
addBookToLibrary(olivia);
addBookToLibrary(panda);
addBookToLibrary(splat);

display();

// Add book to library event
// Important: hook submit event to form instead of button
form.addEventListener('submit', addToLibrary, true);

// Check if pages is more than 
function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add book to library manually
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Add book to library by form
function addToLibrary(event){
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    
    let checkRead = read.checked?true:false;
    let book = new Book(
        title.value, 
        author.value,
        pages.value,
        checkRead);
    myLibrary.push(book);
    console.log(myLibrary);
    // clear inputs
    clear();
    // display myLibrary 
    display();
}

function display(){
    tbody.innerHTML = '';555
    for(let book of myLibrary){
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = book.title;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = book.author;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = book.pages;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = book.read;
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}

// Clear form inputs
function clear(){
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}
