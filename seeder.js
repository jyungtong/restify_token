(function () {
  // naming
  var firstname = ['tan', 'tong', 'wong', 'lee', 'ng'];
  var lastname = ['yong','foo','bar','test','mei','boh'];
  var emailHost = ['gmail.com','yahoo.com','hotmail.com','msn.com','live.com'];

  // required model
  var User = require('./server/models/User');
  var counter = 0;

  for(var i = 0; i < firstname.length; i++) {
    for(var j = 0; j < lastname.length; j++) {
      var name = firstname[i] + lastname[j];
      var max = emailHost.length, min = 0;
      var pickedEmail = Math.floor(Math.random() * (max - min + min));

      var user = {
        username: name,
        password: name,
        email: name + '@' + emailHost[pickedEmail]
      };
      
      User.create(user, function (err) {
        if (err) console.log(err);
        console.log(counter++);
      }); 
    }
  }
})();
