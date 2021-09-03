const contactName = document.getElementById('name');
const number = document.getElementById('number');
const email = document.getElementById('email');
const message = document.getElementById('message');
const remainEmpty = document.getElementById('remainEmpty');
const contactSubmit = document.getElementById('contactSubmit');
const errorDiv = document.getElementById('errorDiv');

let botCounter = 0;

contactSubmit.addEventListener('click', function(e) {
  e.preventDefault();

  if(remainEmpty.value !== '') {
    return botStopper();
  } 
  if(contactName.value == '' ||
    number.value == '' ||
    email.value == '' ||
    message.value == '') {
      return errorMessage(errorDiv, 'Please Fill In All Fields');
    }
  if(remainEmpty.value == '') {
    const contact = fetch('/contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        name: contactName.value,
        number: number.value,
        email: email.value,
        message: message.value,
        remainEmpty: remainEmpty.value
      })
    })
    .then(response => {
      if(response.status == 200) {
        window.location.pathname = '/thankyou';
      } else {
        console.log('Something Went Wrong');
      }
    });
    // .then(async response => await response.json())
    // .then(data => console.log(data));
  } else {
    console.log('Something Went Wrong');
  }
})

function botStopper() {
  botCounter++;
  contactSubmit.disabled = true;
  if(botCounter >= 3) {
    botCounter = 0;
    alert('YOU HAVE BEEN BOOTED BOT!');
    window.location.href = "https://www.google.com";
  } else {
    alert('BAD BOT');
    setTimeout(function(){ contactSubmit.disabled = false; }, 10000);
  }
}

function errorMessage(place, msg) {
  place.innerHTML = `<div class="alert alert-danger" role="alert">${msg}</div>`;
}