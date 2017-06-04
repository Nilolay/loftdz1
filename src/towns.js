/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
	return new Promise(function(resolve,reject) {
         var xhr = new XMLHttpRequest();
         xhr.open('GET','https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
         xhr.send();
         xhr.addEventListener('load', function() {
         var c = xhr.responseText; 
         var d = JSON.parse(c); 
         var s = d.sort(function(a,b) { 
         if (a['name'] < b['name']) { 
         return -1; 
         } 
         if (a['name'] > b['name']) { 
         return 1; 
         } 
         return 0; 
         })
         if(xhr.status < 400) { 
         resolve(s);
         } else {
            reject();
         }
         });
	});
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    var fu = full.toLowerCase();
    var ch = chunk.toLowerCase();
    if (fu.indexOf(ch)+1) {
      return true;
     } 
     return false;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;
loadingBlock.textContent = "Загрузка...";
filterBlock.style.display = 'none';
var u = loadTowns();
var h;
u.then( function(value) { 
	h = value; 
}, 
function() { 
	var c = document.createElement('button');
	c.textContent = "Повторить";
    loadingBlock.taxtContent = "Не удалось загрузить города";
    loadingBlock.appendChild(c);
    c.addEventListener('click', function(){
    	loadTowns();
    })
} );
u.then(function() { 
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    });
filterInput.addEventListener('keyup', function() {
    filterResult.innerHTML = '';
    if (filterInput.value == '') {
        return;
    }
    for (var i = 0; i < h.length; i++) {
       if (isMatching(h[i].name, filterInput.value)) {
        var b = document.createElement('div')
        b.textContent = h[i].name;
        filterResult.appendChild(b);
       }
    }
});

export {
    loadTowns,
    isMatching
};
