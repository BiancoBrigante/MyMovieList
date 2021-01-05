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
    defaultRating(); //ставим дефолтный рейтинг
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



  //работаем с модальным окном
  const modalTrigger = document.querySelector('[data-modal]'), //получаем модальный аттрибут
    modal = document.querySelector('.addFilmModal'),
    modalCloseBtn = document.querySelector('[data-close]');

  function openModal() { //показываем или убираем модальное окно
    modal.classList.toggle('show'); //тогглим класс
    document.body.style.overflow = 'hidden'; //убираем прокрутку страницы
  }

  modalTrigger.addEventListener('click', openModal); //по клику запускаем функцию

  //делаем функцию для закрытия модального окна
  function closeModal() {
    modal.classList.toggle('show'); //снова тогглим
    document.body.style.overflow = ''; //добавляем прокрутку страницы
  }

  //по клику убираем окно
  modalCloseBtn.addEventListener('click', closeModal);

  //закрываем модальное окно по клику вне этого окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) { //если клик совпадает с модальным окном, то
      closeModal();
    }
  });

  //закрываем окно по нажатии ESC
  //событием keydown отслеживаем нажатые клавиши
  document.addEventListener('keydown', (e) => {
    //если нажали Esc и окно открыто, то...
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });



  //делаем ползунок рейтинга
  const ratingSlider = addForm.querySelector(".modalInputRating"),
    ratingOutput = addForm.querySelector(".modalRating");

  //дефолтный рейтинг
  function defaultRating() {
    ratingOutput.innerHTML = parent.innerHTML = `
  <div class="modalRating">
  Ваша оценка: ${ratingSlider.value}
  </div>
  `;
  }

  //обновление слайдера
  ratingSlider.oninput = function () {
    ratingOutput.innerHTML = `
    <div class="modalRating">
    Ваша оценка: ${this.value}
    </div>
    `;
  };

  defaultRating(); //ставим дефолтный рейтинг
});