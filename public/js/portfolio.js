const contactName = document.getElementById('name');
const number = document.getElementById('number');
const email = document.getElementById('email');
const message = document.getElementById('message');
const remainEmpty = document.getElementById('remainEmpty');
const contactSubmit = document.getElementById('contactSubmit');
const errorDiv = document.getElementById('errorDiv');
const typeDiv = document.getElementById('typeDiv');
const cursorDiv = document.getElementById('cursorDiv');
const creationOnePicture = document.getElementById('creationOnePicture');
const creationTwoPicture = document.getElementById('creationTwoPicture');
const creationThreePicture = document.getElementById('creationThreePicture');
const creationFourPicture = document.getElementById('creationFourPicture');
const creationFivePicture = document.getElementById('creationFivePicture');
const aboutPictureCol = document.getElementById('aboutPictureCol');

let cursor = true;
let botCounter = 0;

if(document.documentElement.clientWidth < 700) {
  creationOnePicture.className = 'container';
  creationTwoPicture.className = 'container';
  creationThreePicture.className = 'container';
  creationFourPicture.className = 'container';
  creationFivePicture.className = 'container';
  aboutPictureCol.className = 'container';
}

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



function typewriter(sentence) {
  let myArr = [];
  let sentenceHolder = '';

  setInterval(function() {
    cursorDiv.style.opacity = 0;
    cursor = false;
  }, 500);

  setInterval(()=>{
    if(!cursor) {
      cursorDiv.style.opacity = 1;
      cursor = true;
    }
  }, 1001);

  for(i=0; i<sentence.length; i++) {
    myArr.push(sentence.charAt(i));

  }
  setTimeout(()=> {
    for(j=0; j<myArr.length; j++) {
      let timeToStartWriting = 90*j;
      let count = j;
      setTimeout(function(){ 
        sentenceHolder+=myArr[count];
        // console.log(myArr);
        typeDiv.innerHTML = `
          ${sentenceHolder}
        `;
      }, timeToStartWriting);
    }
  }, 2000);
}

typewriter('Brick By Brick We Will Build It Together');