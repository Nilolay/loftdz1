var friendslist = document.getElementsByClassName('vk-friends')[0];
var mylist1 = document.getElementsByClassName('selected-friends')[0];
var vkinput = document.getElementById('vk-filter');
var myinput = document.getElementById('my-filter');
var friendlist = [];
var mylist = [];

function isMatching(full, chunk) { 
if (full.indexOf(chunk)+1) { 
return true; 
}
return false; 
}

function drawVK(namevk, photovk, friendvk) {
	var friendli = document.createElement('li');
    var photo = document.createElement('img');
    var nameSpan = document.createElement('span');
    var addbutton = document.createElement('button');
    nameSpan.textContent = namevk;
    photo.src = photovk;
    friendli.classList.add('friend');
    friendli.appendChild(photo);
    friendli.appendChild(nameSpan);
    friendli.appendChild(addbutton);
    friendslist.appendChild(friendli);
    addbutton.textContent = 'add';
    addbutton.addEventListener('click', function() {
    	mylist.push(friendvk);
    	for (var i = 0; i < friendlist.length; i++) {
    		if(friendlist[i].name == namevk) {
    			friendlist.splice(i, 1);
    		}
    	}
        draw();
    })
}

function drawMY(namemy, photomy, friendmy) {
	var friendli = document.createElement('li');
    var photo = document.createElement('img');
    var nameSpan = document.createElement('span');
    var removebutton = document.createElement('button');
    nameSpan.textContent = namemy;
    photo.src = photomy;
    friendli.classList.add('friend');
    friendli.appendChild(photo);
    friendli.appendChild(nameSpan);
    friendli.appendChild(removebutton);
    mylist1.appendChild(friendli);
    removebutton.textContent = 'remove';
    removebutton.addEventListener('click', function() {
        friendlist.push(friendmy);
        for (var i = 0; i < mylist.length; i++) {
    		if(mylist[i].name == namemy) {
    			mylist.splice(i, 1);
    		}
    	}
        draw();
    })
}

function draw() {
    mylist1.innerHTML = '';
    friendslist.innerHTML = '';
	for (var i = 0; i < mylist.length; i++) {
    	if (isMatching(mylist[i].name, myinput.value) || myinput.value == '') {
    	    drawMY(mylist[i].name, mylist[i].photo, mylist[i]);
    	}
    }
    for (var i = 0; i < friendlist.length; i++) {
    	if (isMatching(friendlist[i].name, vkinput.value) || vkinput.value == '') {
    	    drawVK(friendlist[i].name, friendlist[i].photo, friendlist[i]);
    	}
    }
}

new Promise(function(resolve){
	window.addEventListener('load', function(){
		resolve();
	})
})
    .then(function() {
    	return new Promise(function(resolve, reject) {
            VK.init({
            	apiId: 6079703
            });

            VK.Auth.login(function(response) {
            	if (response.session) {
            		resolve(response);
            	} else {
                    console.log(response);
            		reject(new Error('Ты не пройдешь!'));
            	}
            }, 2);
    	});
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            VK.api( 'friends.get', {v: '5,65', fields: 'photo_50' }, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response);
                }
            });
        });
    })
    .then(function(response) {
        response.response.items.forEach(friend => {
        	var b = {};
        	b.name = friend.first_name + ' ' + friend.last_name;
        	b.photo = friend.photo_50;
        	friendlist.push(b);  
        })
    })
    .then(function() {
        draw();
        vkinput.addEventListener('keyup', function() { 
            draw(); 
        });
        myinput.addEventListener('keyup', function() { 
            draw(); 
        });	
    })
