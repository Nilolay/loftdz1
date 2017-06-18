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
            }, 2);
    	});
    })