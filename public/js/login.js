
//import axios from 'axios';
const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      alert('Logged in successfully! bewakoof');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1500);
    }
  } catch (err) {
    alert("Invalid username or password");
  }
};



const signup = async (email, password,secret) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/signup',
      data: {
        email,
        password,
        secret
      },
    });
    if (res.data.status === 'success') {
      alert('signup  successful!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert("Invalid data");
  }
};
const loginForm=document.querySelector('.login-form');
if(loginForm){
    
    loginForm.addEventListener('submit', (e) => {
        
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        //console.log(email + password);
        login(email, password);
      });
}
const signupForm=document.querySelector('.signup-form');
if(signupForm){
    
    signupForm.addEventListener('submit', (e) => {
        
        e.preventDefault();
        const email = document.getElementById('Email1').value;
        const password = document.getElementById('Password1').value;
        const secret=document.getElementById('secret').value;
        console.log(email + password+secret);
       signup(email, password,secret);
      });
}