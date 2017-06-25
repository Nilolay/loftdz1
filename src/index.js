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
            		reject(new Error('Ты не пройдешь!'));
            	}
            }, 2 | 4 );
    	});
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            VK.api( 'friends.get', {v: '5,64', fields: 'photo_100' }, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response);
                }
            });
        });
    })
    .then(function(response) {
        response.items.forEach(friend => {
            var friendli = document.createElement('li');
            friendli.classList.add('friend');
//            список друзей .appendChild(friendli);
        })
    })