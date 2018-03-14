
// On Ready...
$(function () {
  $('.collapsible').collapsible();
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAWGMdRh9ilJ6IqAM2fp4pU6pA9JoYKibE",
  authDomain: "comehome-22679.firebaseapp.com",
  databaseURL: "https://comehome-22679.firebaseio.com",
  projectId: "comehome-22679",
  storageBucket: "",
  messagingSenderId: "458156685398"
};

firebase.initializeApp(config);
var dataRef = firebase.database();
var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dnp117saf/upload";
var CLOUDINARY_UPLOAD_PRESET = 'btj61uny';
var isPageFoundLostPet;
var fileUpLoad = $("#fileInput");
var imgURL;
var json;

fileUpLoad.on('change', function (event) {
  var file = event.target.files[0];
  console.log(file);
  var formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then(function (response) {
    imgURL = response.data.url;
    console.log(response);
  }).catch(function (error) {
    console.error(error);
  });


  console.log(fileUpLoad);
  fileUpLoad.addEventListener('change', function (event) {
    console.log(event);
  });
});




// This function updates a localy stored info in JSON and updates whenever anything changes
function UpdateSnapshot(snapshot) {
  json = snapshot.toJSON();
}

$(document).on("submit", "#entireForm", function (event) {
  event.preventDefault();

  

  var breed = $("#petBreedInput").val();
  var petName = $("#petNameInput").val().trim();
  var petAge = $("#petAgeInput").val();
  var petDateLost = $("#petDateLostInput").val().trim();
  var firstName = $("#first_name").val().trim();
  var lastName = $("#last_name").val().trim();
  var phoneNumber = $("#icon_telephone").val().trim();
  var email = $("#ownerEmailInput").val().trim();
  var comment = $("#comment").val();
  var houseNum = $("#lostNumAddInput").val().trim();
  var streetName = $("#lostNameAddInput").val().trim();
  var city = $("#lostCityAddInput").val().trim();
  var state = $("#lostStateAddInput").val().trim();
  var zipcode = $("#lostZipAddInput").val().trim();
  var latLng;
  //call previous sleeping function
  FormApiPull(houseNum, streetName, city, zipcode);
  //ajax call to built URL
  $.ajax({
    url: address,
    //on callback response...
    success: function (response) {
      //...save coordinates to address
      latLng = response.results[0].geometry.location;
      console.log(latLng);;
      // Code for the push
      dataRef.ref().push({

        imgURL: imgURL,
        breed: breed,
        petName: petName,
        petAge: petAge,
        petDateLost: petDateLost,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        comment: comment,
        houseNum: houseNum,
        streetName: streetName,
        city: city,
        state: state,
        zipcode: zipcode,
        latLng: latLng,

        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    }
  })
})


dataRef.ref().on("child_added", function (childSnapshot) {
  if (isPageFoundLostPet) {


    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().petName);
    console.log(childSnapshot.val().imgURL);
    console.log(childSnapshot.val().breed);
    console.log(childSnapshot.val().petName);
    console.log(childSnapshot.val().petAge);
    console.log(childSnapshot.val().petDateLost);
    console.log(childSnapshot.val().firstName);
    console.log(childSnapshot.val().lastName);
    console.log(childSnapshot.val().phoneNumber);
    console.log(childSnapshot.val().email);
    console.log(childSnapshot.val().comment);
    console.log(childSnapshot.val().houseNum);
    console.log(childSnapshot.val().streetName);
    console.log(childSnapshot.val().city);
    console.log(childSnapshot.val().state);
    console.log(childSnapshot.val().zipcode);


        var petDisplay =
            `<li>
        <div class="collapsible-header row z-depth-5 no-margin">

          <img class="boldListElement responsive-img col s2 lostDogImage z-depth-5" src="${childSnapshot.val().imgURL}"/>
          <div class="boldListElement petName-ld col s1">${childSnapshot.val().petName}</div>
          <div class="boldListElement breed-ld col s1">${childSnapshot.val().breed}</div>
          <div class="boldListElement petAge-ld col s2">${childSnapshot.val().petAge} years old</div> 
          <div class="boldListElement petDateLost-ld col s2"><span>Date last seen: </span></br>${childSnapshot.val().petDateLost}</div>
          <div class="boldListElement comment-ld col s2">${childSnapshot.val().comment}</div>
          <div class= "boldListElement lostDogMap col s2"><button class="light-green darken-3 white-text">Location</button></div>

        </div>
        <div class="collapsible-body row no-border">

          <div class="boldListElement contactFirstName-ld col s3">${childSnapshot.val().firstName}</div>
          <div class="boldListElement contactLastName-ld col s3">${childSnapshot.val().lastName}</div>
          <div class="boldListElement phoneNumber-ld col s3">${childSnapshot.val().phoneNumber}</div>
          <div class="boldListElement email-ld col s3">${childSnapshot.val().email}</div>

        </div>
      </li>`


    // full list of items to the well
    $("#petList").prepend(petDisplay);

    // Handle the errors
  }
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

//     // Change the HTML to reflect
//     $(".lostDogImage").text(snapshot.val().imgURL);
//     $(".breed-ld").text(snapshot.val().breed);
//     $(".petName-ld").text(snapshot.val().petName);
//     $(".petAge-ld").text(snapshot.val().petAge);
//     $(".petDateLost-ld").text(snapshot.val().petDateLost);
//     $(".contactFirstName-ld").text(snapshot.val().firstName);
//     $(".contactLastName-ld").text(snapshot.val().lastName);
//     $(".phoneNumber-ld").text(snapshot.val().phoneNumber);
//     $(".email-ld").text(snapshot.val().email);
//     $(".comment-ld").text(snapshot.val().comment);



//   } // Handle the errors
//   ,
//   function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
//   });

//Pulls info from form in order to build an apicall URL
function FormApiPull(number, name, city, zipcode) {
  var numSet = number.trim().split(" ").join("+") + ',';
  var nameSet = name.trim().split(" ").join("+") + ',+';
  var citySet = city.trim().split(" ").join("+") + ',+';
  var zipSet = zipcode.trim().split(" ").join("+");
  address = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    numSet +
    nameSet +
    citySet +
    'NC+' +
    zipSet +
    '&key=AIzaSyCF_LnSPL7yY5VIDbPCbBo9e03StuCuTTs';
  console.log(address);
  return address;
}
