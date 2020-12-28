'use strict';

//грузим скрипты по готовности элементов
document.addEventListener('DOMContentLoaded', () => {

  //создаём базу фильмов
  let movieDB = [];

  const addForm = document.querySelector('form.addForm'), //общая форма
    title = addForm.querySelector('.filmTitle'), //название фильма
    year = addForm.querySelector('.filmYear'), //год
    producer = addForm.querySelector('.filmProducer'), //продолжительность
    time = addForm.querySelector('.filmTime'), //продюсер
    rating = addForm.querySelector('.filmRating'), //рейтинг
    movieList = document.querySelector('.filmList'); //список фильмов

  // Если в local storage что-то есть, выгружаем
  if (localStorage.length > 0) {
    movieDB = JSON.parse(localStorage.getItem('movieDB'));
    createMovieList(movieDB, movieList); //показываем сохранённый список 
  }

  //обработчик событий отслеживает отправку формы
  addForm.addEventListener('submit', (event) => {
    event.preventDefault(); //запрещаем странице перезагружаться

    let newFilm = { //создаём объект с ключевыми пунктами, получаем их значения
      title: title.value,
      year: year.value,
      producer: producer.value,
      time: time.value,
      rating: rating.value
    };

    if (newFilm.title) { //если заголовок не пустой, то...
      movieDB.push(newFilm); //отправляем фильм в базу
      let localStorageDB = JSON.stringify(movieDB); //переводим массив в строку
      localStorage.setItem('movieDB', localStorageDB); //грузим строку в local storage
      createMovieList(movieDB, movieList); //зовём функцию формирования списка
    }

    addForm.reset(); //сбрасываем форму ввода
  });



  function createMovieList(films, parent) { //функция формирования списка
    parent.innerHTML = ''; //очищаем весь список

    films.forEach((film, i) => { //выводим фильм как элемент списка
      parent.innerHTML += `
        <li class="listItem">
        ${i + 1}. ${film.title}<br>
        Год: ${film.year}<br>
        Режиссёр: ${film.producer}<br>
        Продолжительность: ${film.time}<br>
        Рейтинг: ${film.rating} 
        <div class="delete"></div>
        </li>
        `;
    });

    //создаём возможность удаления добавленных фильмов
    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => { //если происходит клик, то...
        btn.parentElement.remove(); //удаляем элемент со страницы
        movieDB.splice(i, 1); //удаляем элемент из массива
        let localStorageDB = JSON.stringify(movieDB); //переводим массив в строку
        localStorage.setItem('movieDB', localStorageDB); //грузим строку в local storage
        createMovieList(films, parent); //сдвигаем список при удалении
      });
    });
  }
});