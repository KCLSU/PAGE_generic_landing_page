document.addEventListener('DOMContentLoaded', function(){

//MAKE EACH SECTION THE SIZE OF THE VIEWPORT MINUS THE NAVBAR
function setSectionHeight(){
  const navbar = document.querySelectorAll('.navbar-inverse')[0];
  let navbarHeight = navbar.offsetHeight;
  let windowHeight = window.innerHeight;
  let sectionHeight = windowHeight - navbarHeight + 'px';
  let intro = document.getElementById('#intro')
  console.log(sectionHeight)
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => section.style.height = sectionHeight);
}

setSectionHeight();

const cards = document.querySelectorAll('.event_item');
const eventsContainer = document.getElementById('events-container');
const eventsUpcoming = document.getElementById('events-upcoming');
const eventsNumber = document.getElementById('events-number');

const eventObjects = [];
let eventDivs = [];
let nextEvents = [];

if (cards.length > 0){
cards.forEach((card, i) => {
    let image = card.querySelectorAll('.msl_event_image > img')[0].src;
    let title = card.getElementsByClassName('msl_event_name')[0].innerHTML;
    let location = card.getElementsByClassName('msl_event_location')[0].innerHTML;
    let time = card.getElementsByClassName('msl_event_time')[0].innerHTML;
    let link = card.querySelectorAll('dt > a')[0];


    //CREATE OBJECT
    let eventObj = {
      title, time, image, location, link
    }
    //PUSH OBJECT INTO ARRAY
    eventObjects.push(eventObj);

})


// LOOP THROUGH AND CREATE DIV

eventObjects.forEach(event => {
  let longSrc = `${event.image}`
  let eventSrc = trimSrc(longSrc);
  console.log(eventSrc)
  var divSlider = document.createElement('div')
  divSlider.innerHTML = `
    <div class="event-flex event-div">
     <div class="event-image">
      <img src= ${eventSrc}></img>
      </div>
    <div class="event-info">
      <a href=${event.link}><span class="event-title">${event.title}</span></a>
      <span class="event-time">${event.time}</span>
      <a href=${event.link}> Go to the event </a>
    </div>
   </div>
  </div>`

  var divUpcoming = document.createElement('div')
  divUpcoming.classList.add('next-event');
  divUpcoming.classList.add('flex-center-center');
  divUpcoming.innerHTML = `<a href=${event.link} <span> ${event.title} </span></a>
  `
  eventsContainer.appendChild(divSlider)
  nextEvents.push(divUpcoming);
})

//ADD UPCOMING EVENTS INTO AN ARRAY, AND SHOW TOTAL NUMBER OF EVENTS
for (let x = 0; x <= 2; x++){
let upcoming = nextEvents[x];
if (upcoming) eventsUpcoming.appendChild(upcoming)
}

eventsNumber.innerHTML = nextEvents.length;
}

//IF NO EVENTS
else {
eventsContainer.innerHTML = `<p style="margin: 2em; font-size: 1.2em; text-align: center;">There are currently no events </p>`;
}


//REMOVE QUEIRES FROM URL
function trimSrc(src){
  let srcArray = src.split('');
  let newSrc = [];

  for(let i = 0; i < srcArray.length; i++){
    if (srcArray[i] === '?'){
      // console.log("? found")
      // console.log(newSrc)
      break;
    }
    else {
      newSrc.push(srcArray[i]);
    }
  }


  let trimmedSrc = newSrc.join('');
  console.log(trimmedSrc)
  return trimmedSrc;
};





//BTX SLIDER FOR EVENTS
// $('#events-container').bxSlider( { randomStart: false, auto : true, pager : false , minSlides : 1 , maxSlides : 5 , speed : 2000, pause: 6000});

});
