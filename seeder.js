(function () {
  // naming
  var firstname = ['tan', 'tong', 'wong', 'lee', 'ng'];
  var lastname = ['yong','foo','bar','test','mei','boh'];
  var emailHost = ['gmail.com','yahoo.com','hotmail.com','msn.com','live.com'];

  // required model
  var User = require('./server/models/User');
  var maxUserInName = 100;

  for(var i = 0; i < firstname.length; i++) {
    for(var j = 0; j < lastname.length; j++) {
      for(var k = 0; k < maxUserInName; k++) {
        var randomNum = Math.floor(Math.random()*(300-1)+1);
        var name = firstname[i] + lastname[j] + '0' + randomNum;
        var max = emailHost.length, min = 0;
        var pickedEmail = Math.floor(Math.random() * (max - min + min));

        var user = {
          username: name,
          password: name,
          email: name + '@' + emailHost[pickedEmail]
        };
        
        User.create(user, function (err) {
          if (err) console.log(err);
        }); 
      }
    }
  }
})();
