//import login from './login.mjs';

// const loginForm=document.querySelector('.login-form');
// if(loginForm){
    
//     loginForm.addEventListener('submit', (e) => {
        
//         e.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         console.log(email + password);
//         login(email, password);
//       });
// }

const addContact = async (name, email,phone) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/contacts/',
      data: {
        name,
        phone,
        email
      },
    });
    if (res.data.status === 'success') {
     alert("contact saved");
     window.setTimeout(() => {
      location.assign('/home');
    }, );
    }
  } catch (err) {
    alert("Invalid data");
  }
};

const contactForm=document.querySelector('.add-contact');
if(contactForm){
  contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
 const email = document.getElementById('contact-email').value;
 const phone = document.getElementById('contact-phone').value;
 //console.log(name+email+phone);
 addContact(name,email,phone);

  })
}