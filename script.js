// Get the modal element
const modal = document.getElementById("myModal");

// Get the contact link element
const contactLink = document.getElementById("contact");

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName("close")[0];

// Show modal
contactLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default anchor behavior
  modal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAh3HtmS6uhLTzZrh3LVYwKNMiII0Z_nUI",
  authDomain: "contact-form-modal.firebaseapp.com",
  databaseURL: "https://contact-form-modal-default-rtdb.firebaseio.com",
  projectId: "contact-form-modal",
  storageBucket: "contact-form-modal.appspot.com",
  messagingSenderId: "59568320919",
  appId: "1:59568320919:web:144a059dde8fd68650d4d2",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var message = getElementVal("message");

  saveMessages(name, email, message);

  // enable alert
  document.querySelector(".alert").style.display = "block";

  // remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, email, message) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    email: email,
    message: message,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Slide animation

var slideContainers = document.querySelectorAll(
  "#description, #slideContainer, #portfolio-section"
);

function handleSlide(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("slide-in");
      observer.unobserve(entry.target);
    }
  });
}

var options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

var observer = new IntersectionObserver(handleSlide, options);
slideContainers.forEach(function (container) {
  observer.observe(container);
});
