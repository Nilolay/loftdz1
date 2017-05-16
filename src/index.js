/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for (var i = 0; i < array.length; i++) {
		fn(array[i],i,array);
	}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
	var a = [];
	for (var i = 0; i < array.length; i++) {
		a[i] = fn(array[i],i,array);
	}
	
	return a;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial = array[0]) {
	if (initial == array[0]) {
		var i = 1;
	}
	else {
		i = 0;
	}
	for ( ; i < array.length; i++) {
		initial = fn(initial,array[i],i,array);
	}
	return initial;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
	delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
	if (obj[prop] != undefined) {
		return true;
	}
	return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
	var keys = Object.keys(obj);
	return keys;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
	var keys = Object.keys(obj);
	var p = [];
	for (var i = 0; i < keys.length; i++) {
		p[i] = keys[i].toUpperCase();
	}
	return p;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
	var a = [];
	for (var i = from; i < to; i++) {
		a.push(array[i]);
	}
	return a;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
	let proxy = new Proxy(obj,{ set(target, prop, value) {
		target[prop] = value*value;
		return true;
	} 
} );
	return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
