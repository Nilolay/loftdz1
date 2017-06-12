/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

var tab = document.createElement('table');

//listTable.appendChild(tab);

function isMatching(full, chunk) { 
if (full.indexOf(chunk)+1) { 
return true; 
} 

return false; 
}
function deleteCookie(name) {
	var cookie_date = new Date (0);
	document.cookie = name + '=; expires=' + cookie_date.toGMTString() + ';';
}

filterNameInput.addEventListener('keyup', function() {
    if (filterNameInput == '') {
        return;
    }
    listTable.innerHTML = '';
	var x = document.cookie; 
    var arr = x.split('; '); 
	var filt = [];
	for (var i = 0; i < arr.length; i++) {
		if (isMatching(arr[i], filterNameInput.value)) {
			filt.push(arr[i]);
		} 
	}
    for (var i = 0; i < filt.length; i++) { 
    var b = filt[i].split('='); 
    var row = document.createElement('tr'); 
    listTable.appendChild(row); 
    var c1 = document.createElement('td'); 
    var c2 = document.createElement('td'); 
    var but = document.createElement('button'); 
    c1.textContent = b[0]; 
    c2.textContent = b[1]; 
    but.textContent = 'удалить'; 
    row.appendChild(c1); 
    row.appendChild(c2); 
    row.appendChild(but); 
    but.addEventListener('click', function() { 
    deleteCookie(b[0]); 
    }); 
    }
	
});

addButton.addEventListener('click', () => {
	document.cookie = addNameInput.value + '=' + addValueInput.value + ';' ;
    if (filterNameInput == '') {
        return;
    }
    listTable.innerHTML = '';
    var x = document.cookie; 
    var arr = x.split('; '); 
    var filt = [];
    for (var i = 0; i < arr.length; i++) {
        if (isMatching(arr[i], filterNameInput.value)) {
            filt.push(arr[i]);
        } 
    }
    for (var i = 0; i < filt.length; i++) { 
    var b = filt[i].split('='); 
    var row = document.createElement('tr'); 
    listTable.appendChild(row); 
    var c1 = document.createElement('td'); 
    var c2 = document.createElement('td'); 
    var but = document.createElement('button'); 
    c1.textContent = b[0]; 
    c2.textContent = b[1]; 
    but.textContent = 'удалить'; 
    row.appendChild(c1); 
    row.appendChild(c2); 
    row.appendChild(but); 
    but.addEventListener('click', function() { 
    deleteCookie(b[0]); 
    }); 
    }
});