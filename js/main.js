const bookTitle = document.getElementById('book_title');
const bookSubtitle = document.getElementById('book_subtitle');
const bookAuthor = document.getElementById('book_author');
const bookEdition = document.getElementById('book_edition');
const pages = document.getElementById('book_pages');
const releaseDate = document.getElementById('book_releaseDate');


const submit = document.getElementById('submitForm');
const form = document.getElementById('details');
const newBook = document.getElementById('addBook');
const container = document.getElementById('booksContainer');



// main array of book objects
let myLibrary = [];


// constructor Function
function Book() {
    this.title = bookTitle.value;
    this.subTitle = bookSubtitle.value;
    this.author = bookAuthor.value;
    this.edition = bookEdition.value;
    this.pages = pages.value;
    this.release = releaseDate.value;
}

// displays the added book in the DOM
Book.prototype.displayNewBook = function () {

    const newBook = document.createElement('div');
    newBook.classList.add('book');
    // data attribute to associate dom element with the corresponding book object in the array
    newBook.dataset.index = this.indexNumber;

    const edition = document.createElement('h4');
    let ordinal;
    if (this.edition == 11 || this.edition == 12 || this.edition == 13){
        ordinal = "th"
        }
    else 
        switch (Number((this.edition)%10)) {
            case 1:
            ordinal = "st";
            break;
        
            case 2:
            ordinal = "nd";
            break;
        
            case 3:
            ordinal = "rd";
            break;
             
            default:
            ordinal = "th";
            break;
        }   
        
    edition.innerText = this.edition ? `${this.edition}${ordinal} Edition` : '1st Edition' ;
    edition.classList.add('edition')

    const title = document.createElement('h2');
    title.innerText = this.title;
    title.classList.add('book-name-main');

    const subTitle = document.createElement('h3');
    subTitle.innerText =  this.subTitle;
    subTitle.classList.add('book-name-sub');

    const author = document.createElement('h3');
    author.innerText = this.author;
    author.classList.add('book-author');

    const options = document.createElement('div');
    options.classList.add('options');

    // read status event listener
    const img = document.createElement('img');
    img.setAttribute('src', "./assets/visibility_black_24dp.svg");
    img.classList.add('readStatus')
    img.addEventListener('click', applyRead)

    // delete book event listener
    const img2 = document.createElement('img');
    img2.setAttribute('src', "./assets/delete_black_24dp.svg");
    img2.classList.add('delete')
    img2.addEventListener('click', deleteBook)

    options.appendChild(img);
    options.appendChild(img2);

    newBook.appendChild(edition)
    newBook.appendChild(title);
    newBook.appendChild(subTitle);
    newBook.appendChild(author);
    newBook.appendChild(options);

    container.prepend(newBook);

}

// sets index property on the book object. This index value is used by displayNewBook function to remove the associated "book" div from the DOM.
Book.prototype.applyIndex = function () {
    this.indexNumber = myLibrary.length - 1;
    
}

// adds new book to the array
function addBook () {
    const newBook = new Book();
    myLibrary.push(newBook);   
}

// applies read/unread status
function applyRead(e) {
    e.target.parentNode.parentNode.classList.toggle('read');
}

// hides submission form after submission
function hideForm (){
    form.style.visibility= "hidden";
}

// deletes the book from the DOM and the array
function deleteBook (e) {
   container.removeChild(e.target.parentNode.parentNode);
   delete myLibrary[e.target.parentNode.parentNode.dataset.index]; 
} 


// MAIN 

submit.addEventListener('click', () => {
    // creates a new book object and pushes it to the myLibrary array
    addBook();
    // applies the index property to the newly created book opject
    myLibrary[myLibrary.length - 1].applyIndex();
    // hides the form again
    hideForm();
    // resets the form for subsequent entries 
    form.children[0].reset();
    // displays the LAST book that was pushed to the myLibrary array
    myLibrary[myLibrary.length - 1].displayNewBook();  


})

newBook.addEventListener('click',() => {
   form.style.visibility= "visible";
})


