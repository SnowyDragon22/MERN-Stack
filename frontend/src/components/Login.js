import React, {useState} from 'react';

function Login()
{
    var bp = require('./Path.js');
    

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
      {
          event.preventDefault();
  
          var obj = {login:loginName.value,password:loginPassword.value};
          var js = JSON.stringify(obj);
  
          try
          {    
            //const response = await fetch('http://localhost:5000/api/login',
              const response = await fetch(bp.buildPath('api/login') ,
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  
              var res = JSON.parse(await response.text());
  
              if( res.id <= 0 )
              {
                  setMessage('User/Password combination incorrect');
              }
              else
              {
                  var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                  localStorage.setItem('user_data', JSON.stringify(user));
  
                  setMessage('');
                  window.location.href = '/cards';
              }
          }
          catch(e)
          {
              console.log(e.toString());
              return;
          }    
      };
  

    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}></form>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} />
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
