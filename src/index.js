function dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('Text', e.target.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, 240, 50);
    return true;
}

function dragEnter(e) {
    e.preventDefault();
    return true;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    var data = e.dataTransfer.getData("Text");
    for (var i = 0; i < NewModule.friendlist.length; i++) {
            if(NewModule.friendlist[i].name == data) {
                NewModule.mylist.push(NewModule.friendlist[i]);
                NewModule.friendlist.splice(i, 1);
            }
        }
    NewModule.draw();
    e.stopPropagation();
    return false;
}

var NewModule = {
    friendslist: document.getElementsByClassName('vk-friends')[0],
    mylist1: document.getElementsByClassName('selected-friends')[0],
    lists: document.getElementsByClassName('lists')[0],
    vkinput: document.getElementById('vk-filter'),
    myinput: document.getElementById('my-filter'),
    save: document.getElementById('save'),
    friendlist: [],
    mylist: [],
    isMatching: function (full, chunk) { 
                    if (full.indexOf(chunk)+1) { 
                        return true; 
                    }
                return false; 
                },
    drawVK: function (namevk, photovk, friendvk) {
            var friendli = document.createElement('li');
            var photo = document.createElement('img');
            var nameSpan = document.createElement('span');
            var addbutton = document.createElement('button');
            friendli.draggable = 'true';
            friendli.setAttribute("ondragstart", "return dragStart(event)");
            nameSpan.textContent = namevk;
            photo.src = photovk;
            friendli.classList.add('friend');
            friendli.id = namevk;
            friendli.appendChild(photo);
            friendli.appendChild(nameSpan);
            friendli.appendChild(addbutton);
            NewModule.friendslist.appendChild(friendli);
            addbutton.textContent = 'add';
            addbutton.addEventListener('click', function() {
                NewModule.mylist.push(friendvk);
                for (var i = 0; i < NewModule.friendlist.length; i++) {
                    if (NewModule.friendlist[i].name == namevk) {
                        NewModule.friendlist.splice(i, 1);
                    }
                }
                NewModule.draw();
            })
            },
    drawMY: function (namemy, photomy, friendmy) {
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
            NewModule.mylist1.appendChild(friendli);
            removebutton.textContent = 'remove';
            removebutton.addEventListener('click', function() {
                NewModule.friendlist.push(friendmy);
                for (var i = 0; i < NewModule.mylist.length; i++) {
                    if(NewModule.mylist[i].name == namemy) {
                        NewModule.mylist.splice(i, 1);
                    }
                }
                NewModule.draw();
            })
            },
    draw: function () {
          NewModule.mylist1.innerHTML = '';
          NewModule.friendslist.innerHTML = '';
          for (var i = 0; i < NewModule.mylist.length; i++) {
              if (NewModule.isMatching(NewModule.mylist[i].name, NewModule.myinput.value) || NewModule.myinput.value == '') {
                  NewModule.drawMY(NewModule.mylist[i].name, NewModule.mylist[i].photo, NewModule.mylist[i]);
              }
          }
          for (var i = 0; i < NewModule.friendlist.length; i++) {
              if (NewModule.isMatching(NewModule.friendlist[i].name, NewModule.vkinput.value) || NewModule.vkinput.value == '') {
                  NewModule.drawVK(NewModule.friendlist[i].name, NewModule.friendlist[i].photo, NewModule.friendlist[i]);
              }
          }
          },
    Main: function () { 
          new Promise(function(resolve, reject) {
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
              if(!(localStorage.data)) {
              response.response.items.forEach(friend => {
                  var b = {};
                  b.name = friend.first_name + ' ' + friend.last_name;
                  b.photo = friend.photo_50;
                  NewModule.friendlist.push(b);  
              })
              } else {
                  var load = localStorage.data.split('[разделитель]');
                  NewModule.friendlist = JSON.parse(load[0]);
                  NewModule.mylist = JSON.parse(load[1]);
              }
          })
          .then(function() {
              NewModule.draw();
              NewModule.vkinput.addEventListener('keyup', function() { 
                  NewModule.draw(); 
              });
              NewModule.myinput.addEventListener('keyup', function() { 
                  NewModule.draw(); 
              }); 
              NewModule.save.addEventListener('click', function() {
                  var s1 = JSON.stringify(NewModule.friendlist);
                  var s2 = JSON.stringify(NewModule.mylist);
                  var s3 = s1 + '[разделитель]' + s2;
                  localStorage.data = s3;
              })
          })
          }
}
window.onload = NewModule.Main();
window.NewModule = NewModule;  