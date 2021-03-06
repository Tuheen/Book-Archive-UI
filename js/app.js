const searchField = document.getElementById('search-field');
const resultInfo = document.getElementById('result-info');
const searchResult = document.getElementById('search-result');

/*  search function */
const searchBooks = () => {
    const searchText = searchField.value;

    if (searchText === '') {
        // removing previous result
        searchResult.textContent = '';
        resultInfo.textContent = '';

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<h3 class="text-center">Please, write something to search.</h3>`;
        searchResult.appendChild(div);
    }
    else {
        // clear search field
        searchField.value = '';

        // loading data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }
}


/* search result display function*/
const displayBooks = data => {
    // removing previous result (if any)
    searchResult.textContent = '';
    resultInfo.innerText = '';


    const totalFound = data.numFound;
    const allbooks = data.docs;

    if (allbooks.length !== 0) {

        const books = allbooks.slice(0, 20); // we will show maximum 30

        // displaying the number of books found and the number of books shown. 
        resultInfo.innerText = `Total found: ${totalFound}; Showing: ${books.length}`;

        //Displaying Books
        books.forEach(book => {
            // creating a div for displaying each book 
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <div class="p-5">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" width="100%" alt="">
                </div>
                <div class="card-body px-5">
                    <h4 class="card-title">${book.title}</h4>
                    <h5>Author: ${book.author_name}</h5>
                    <p class="card-text">
                    Publisher: ${book.publisher ? book.publisher : 'Not Available'} <br>
                    First Published: ${book.first_publish_year ? book.first_publish_year : 'Not Available'}
                    </p>
                </div>
            </div >
            `
            searchResult.appendChild(div);
        });
    }

    else {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<h3 class="text-center text-secondary">No result found</h3>`;
        searchResult.appendChild(div);
    }
}