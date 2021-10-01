/* В HTML есть разметка формы. Напиши скрипт который будет сохранять 
значения полей в локальное хранилище когда пользователь что-то печатает. */

/* Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. 
Разбей его на несколько подзадач:

+ Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище 
объект с полями email и password, в которых сохраняй текущие значения полей формы. 
Пусть ключом для хранилища будет строка "feedback-form-state".

+ При загрузке страницы проверяй состояние хранилища, и если там есть 
сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.

+ При сабмите формы очищай хранилище и поля формы, а также выводи объект
с полями email, password и текущими их значениями в консоль.

+ Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. 
Для этого добавь в проект и используй библиотеку lodash.throttle. 
*/

import _ from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputForm = document.querySelector('.feedback-form input');

let objData;

const toFillForm = function ({ email, message }) {
  form.querySelector('input').value = email;
  form.querySelector('textarea').value = message;
};

try {
  objData =
    localStorage.getItem('feedback-form-state') === null
      ? { email: '', message: '' }
      : JSON.parse(localStorage.getItem('feedback-form-state'));
  toFillForm(objData);
} catch (parsingError) {
  console.log('Error in Parsing from storage', parsingError);
}

try {
  const handleInputForm = form.addEventListener(
    'input',
    _(() => {
      objData.email = form.querySelector('input').value;
      objData.message = form.querySelector('textarea').value;
      localStorage.setItem('feedback-form-state', JSON.stringify(objData));
      /*       console.log('stored', objData); */
    }, 500),
  );
} catch (stringifyError) {
  console.log('Error in stringifying to storage', stringifyError);
}
const handleSubmiyForm = form.addEventListener('submit', e => {
  e.preventDefault();
  form.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(objData);
});
