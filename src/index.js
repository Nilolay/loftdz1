var friendslist = document.getElementsByClassName('vk-friends')[0];
var vkinput = document.getElementById('vk-filter');
var myinput = document.getElementById('my-filter');
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
            var friendli = document.createElement('li');
            var photo = document.createElement('img');
            var nameSpan = document.createElement('span');
            nameSpan.textContent = friend.first_name + ' ' + friend.last_name;
            photo.src = friend.photo_50;
            friendli.classList.add('friend');
            friendli.appendChild(photo);
            friendli.appendChild(nameSpan);
            friendslist.appendChild(friendli);
        })
    })