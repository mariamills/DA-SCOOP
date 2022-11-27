//Poll variables
//Fake poll votes
const pollVotes = [3, 7, 6];
const pollHeader = document.getElementById("pollHeader");
const pollItems = document.querySelectorAll(".pollItem");
const cardBody = document.querySelectorAll(".card-body");

//Newsletter variables
const newsBtn = document.getElementById("newsletter");
const inputEmail = document.getElementById("inputEmail");
const emailHelp = document.getElementById("emailHelp");
const formContainer = document.getElementById("formContainer");

//Cart variables
const cartText = document.getElementById("cartText");
const cartItems = document.getElementById("cartItems");
const cartInfo = document.getElementById("cartInfo");
const checkout = document.getElementById("checkoutBtn");
const addToCart = document.querySelectorAll(".cartBtn");
const icecreamTitle = document.querySelectorAll(".icecream-title");

//Functions

//Poll
pollItems.forEach(function (item, index) {
  item.addEventListener("click", function () {
    //If they have not voted yet
    if (!localStorage.getItem("voted")) {
      //Add +1 to the corresponding item that they picked, by using the index
      pollVotes[index] += 1;
      cardBody.forEach(function (item) {
        pollHeader.innerText = "THANK YOU FOR YOUR VOTE!";
        item.remove();
      });
      //Set in localstorage that they have voted
      localStorage.setItem("voted", true);
    } else {
      pollHeader.innerText = "YOU HAVE ALREADY VOTED!";
    }
  });
});

//Newsletter
//Regex for email validation for the newsletter email
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//If the newsletter button exists
if (newsBtn) {
  newsBtn.addEventListener("click", function (e) {
    //To prevent the default button submission
    e.preventDefault();
    //if the input has a value and passes the validation check
    if (inputEmail.value && inputEmail.value.match(validRegex)) {
      emailHelp.innerText = "Thank you for signing up to our newsletter!";
      inputEmail.remove();
    } else {
      //Throw an error letting the user know that they did not enter a valid email
      inputEmail.classList.add("inputError");
      emailHelp.innerText = "Please enter a valid email!";
    }
  });
}

//Cart
//If the add to cart button exists
if (addToCart) {
  addToCart.forEach(function (item, index) {
    item.addEventListener("click", function () {
      //Create an li element
      let li = document.createElement("li");
      //Whatever the user clicks will add the text of the corresponding title
      li.innerText = icecreamTitle[index].innerText;
      //Append the newly made li to the ul
      cartItems.appendChild(li);
      //If the ul has li's...
      if (cartItems.getElementsByTagName("li").length > 0) {
        //Change the cart title to Current Cart instead of Empty
        cartText.innerText = "Current Cart";
        //Display the checkout button
        checkout.classList.remove("d-none");
      }
    });
  });
}

//If the checkout button exists, which it will only exist if there are items in the cart, see above
if (checkout) {
  //Upon checkout button click event, clear the cart and add the set text
  checkout.addEventListener("click", function () {
    cartItems.innerHTML = "";
    cartInfo.innerText = "Thank you! Your order has been placed.";
  });
}

//EmailJS - RESTFUL EmailAPI
const form = document.getElementById("form");
const formBtn = document.getElementById("formBtn");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    formBtn.value = "Sending...";

    const serviceID = "service_uoq0r3t";
    const templateID = "template_gmivhhc";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        formBtn.value = "Send Email";
        form.reset();
        alert(
          "Form has successfully been sent. I'll get back to you shortly, thanks!"
        );
      },
      (err) => {
        formBtn.value = "Send";
        alert(JSON.stringify(err));
      }
    );
  });
}
