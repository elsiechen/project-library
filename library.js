let myLibrary = [];

const table = document.querySelector('.table')
const tbody = document.querySelector('.tbody');
const form = document.querySelector('form');
const head = document.querySelector('.head');
const addBtn = document.querySelector('#addBtn');
const editBtn = document.querySelector('#editBtn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

// Default: show add btn, hide edit btn
editBtn.style.display = 'none';

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

// removeBtn event
const removeBtns = document.querySelectorAll('.removeBtn');
removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let index = btn.getAttribute('data-item');
        console.log(`index: ${index}`);
        // Associate DOM element with book object using data- attribute
        let tr = document.querySelector(`tr[data-item='${index}']`);
        console.log(`tr:${tr}`);
        tbody.removeChild(tr);
    });
});

// editBtn event
const editBtns = document.querySelectorAll('.editBtn');
editBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        head.innerHTML = 'Edit the Book';
        addBtn.style.display = 'none';
        editBtn.style.display = 'block';

        let index = btn.getAttribute('data-item');
        title.value = myLibrary[index].title;
        author.value = myLibrary[index].author;
        pages.value = myLibrary[index].pages;
        let ifChecked = myLibrary[index].read;
        // Important: if finish reading, set checkbox as checked
        // else, remove checked from checkbox
        ifChecked?read.setAttribute('checked', 'true'):
                  read.removeAttribute('checked');
    });
});


// Change read status toggle button event
const toggleBtns = document.querySelectorAll('.toggleBtn');
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let index = btn.getAttribute('data-item');
        myLibrary[index].toggle();
        // console.log(myLibrary[index]);
        btn.textContent = myLibrary[index].read?'V':'X';
    });
});

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggle = function(){
    this.read = !this.read;
  };
  this.edit = function(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };
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
        let index = myLibrary.indexOf(book);
        // console.log(`book index: ${index}`);
        tr.setAttribute('data-item', index);
        
        let td1 = document.createElement('td');
        td1.textContent = book.title;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = book.author;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = book.pages;
        tr.appendChild(td3);

        // read button
        let td4 = document.createElement('td');
        let toggleBtn = document.createElement('button');
        toggleBtn.classList.add('toggleBtn');
        toggleBtn.textContent = book.read?'V':'X';
        toggleBtn.style.color = book.read?'green':'red';
        toggleBtn.setAttribute('data-item', index);

        td4.appendChild(toggleBtn);
        tr.appendChild(td4);

        // remove button
        let remove = document.createElement('td');
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBtn');

        let img = document.createElement('img');
        img.setAttribute('src', 'trash-can.png');
        img.setAttribute('alt', 'Trash Can');
        img.setAttribute('width', '20px');
        img.setAttribute('height', '20px');

        removeBtn.appendChild(img);
        removeBtn.setAttribute('data-item', index);
        console.log(`removeBtn: ${removeBtn}`);
        remove.appendChild(removeBtn);
        tr.appendChild(remove);
        
        // edit button
        let edit = document.createElement('td');
        let editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');

        let editImg = document.createElement('img');
        editImg.setAttribute('src', 'edit.png');
        editImg.setAttribute('alt', 'Square Edit Outline');
        editImg.setAttribute('width', '20px');
        editImg.setAttribute('height', '20px');

        editBtn.appendChild(editImg);
        editBtn.setAttribute('data-item', index);
        console.log(`editBtn: ${editBtn}`);
        edit.appendChild(editBtn);
        tr.appendChild(edit);

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
