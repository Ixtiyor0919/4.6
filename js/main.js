var sortType = 1; //Default o'sish tartibida sortlangsn;
var sortBy = 1; //Id bo'yicha sortlangan;

//Sort movies
var sortButtonsEl = document.querySelector('.boxSelects');

//Functions
const moviesOpts = [
    {value:1, text:'Sort by id'},
    {value:2, text:'Sort by title'},
    {value:3, text:'Sort by year'},
];

let sortBySelectEl = document.querySelector('.moviesOpts');
sortBySelectEl.addEventListener('change', (e) => {
    sortBy = e.target.value - 0;
    sortAndRender(sortType, sortBy);
})

const optsGreaterOrLess = [
    {value:1, text:`O'sish`},
    {value:-1, text:`Kamayish`},
]

let typeSortSelectEl = document.querySelector('.optsGreaterOrLess');
typeSortSelectEl.addEventListener('change', (e) => {
    sortType = e.target.value - 0;
    sortAndRender(sortType, sortBy);
})
var todoForm = document.querySelector('.main-container');
var todoInput = document.querySelector('.form-control');

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = bookmarkedMovie.length > 0 ? bookmarkedMovie[bookmarkedMovie.length-1].id + 1: 1;
    const moviesTodo = {
        id, 
        title: todoInput.value, 
        year: 2022
    } 
    bookmarkedMovie.push(moviesTodo);
    todoInput.value = '';
    renderBookmarkTodos(bookmarkedMovie, todoListEl)
})
var movieContainer = document.querySelector('.movie-container')

var moviesRow = document.querySelector('[data-element=movie-container]');


var todoListEl = document.querySelector('.todo-list');

var bookmarkedMovie = [];

function createCloneTodo(todo) {
    let templateTodoEl = document.querySelector('#todo-item');
    let cloneTodoItem = templateTodoEl.content.cloneNode(true);
    
    cloneTodoItem.querySelector('.todo-id').textContent = 'id: ' + todo.id;
    cloneTodoItem.querySelector('.todo-title').textContent = todo.title;
    cloneTodoItem.querySelector('.todo-year').textContent = todo.year + '-y.';
    
    let deleteBtn = cloneTodoItem.querySelector('.todo-delete-btn');
    deleteBtn.dataset.todoId = todo.id;
    deleteBtn.dataset.task = 'delete';
    return cloneTodoItem;
}
renderBookmarkTodos(bookmarkedMovie, todoListEl)

function cloneAndRender(movie) {
    let singleMovieTemplate = document.querySelector('#movie-item');
    let movieItemElClone = singleMovieTemplate.content.cloneNode(true);
    
    let movieImageEl = movieItemElClone.querySelector('[data-element=movie-img]');
    movieImageEl.src = movie.imageUrl;
    movieImageEl.style.height = '250px';
    movieImageEl.addEventListener('error', () => {
            movieImageEl.src = 'http://picsum.photos/200/200';
        })

    movieItemElClone.querySelector('[data-element=movie-id]').textContent = `id: ` + movie.id;
    movieItemElClone.querySelector('[data-element=movie-title]').textContent = `Title: ` + movie.title;
    // movieItemElClone.querySelector('[data-element=movie-director]').textContent = `Director: ` + movie.director;
    // movieItemElClone.querySelector('[data-element=movie-description]').textContent = `Text: ` + movie.description.split(' ').slice(0, 20).join(' ') + '...';
    movieItemElClone.querySelector('[data-element=movie-year]').textContent = `Year: ` + movie.year;
    let movieBtn = movieItemElClone.querySelector('[data-element=movie-bookmark]');
    movieBtn.textContent = 'Bookmark';
    movieBtn.dataset.todoId = movie.id;
    return movieItemElClone;
}
renderMovies(movies, moviesRow);

var movieBtn = document.querySelector('.movie-btn');
movieContainer.addEventListener("click", (event) => {
    movies.forEach((movie) => {
        if(event.target.dataset.todoId == movie.id) {
            bookmarkedMovie.push(movie);
        };
    });
    renderBookmarkTodos(bookmarkedMovie, todoListEl);
    renderTodos(bookmarkedMovie, todoListEl);
})

todoListEl.addEventListener('click', (event) => {
    if(event.target.dataset.task === 'delete') {
        bookmarkedMovie = bookmarkedMovie.filter(movie => movie.id != event.target.dataset.todoId)
        renderBookmarkTodos(bookmarkedMovie, todoListEl);
    }
})

//Pagination
var itemPerpage = 10;
var currentPage = 1;
   
renderTodos(bookmarkedMovie, todoListEl);
   
var paginationEl = document.querySelector('.todo-pagination');
   
paginationEl.addEventListener('click', (event) => {
    if(event.target.dataset.task == 'page') {
        currentPage = event.target.dataset.pageId;
        renderTodos(bookmarkedMovie, todoListEl)
        renderPagination()
    }
})
   
renderPagination();