(function(){
  var signInClickHandler = function(event){
      
      var url = "https://accounts.google.com/o/oauth2/v2/auth?";
      var clientId = "407427159114-f6gdtjvsnrmlnru7kmhlq5quke128a3i.apps.googleusercontent.com";
      var scope = "https://www.googleapis.com/auth/tasks";
      var state = "oauthcallback";
      var redirect_uri = "http://akshayscu.github.io/homepage.html";

      window.location = url + 
                        "scope=" + scope + 
                        "&state=" + state +
                        "&redirect_uri=" + redirect_uri +
                        "&client_id=" + clientId +
                        "&response_type=token";    
  };

  signUpApp.handleSignInClick = signInClickHandler;
})();
