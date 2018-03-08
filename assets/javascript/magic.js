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

  var fileUpLoad = document.querySelector("#fileInput");

  console.log(fileUpLoad);
  fileUpLoad.addEventListener('change', function(event) {
  console.log(event);
 }); 

  firebase.initializeApp(config);

  var dataRef = firebase.database();

  var petName = "";
  var petAge = 0;
  var petDateLost = 0;
  var contactName = "";
  var phoneNumber = 0;
  var email = "";
  var breed = "";
  var comment = "";
  var houseNum = 0;
  var streetName = "";
  var city = "";
  var state = "";
  var zipcode = 0;



  $("#submit").on("click", function(event) {
      event.preventDefault();


      breed = $("#petBreedInput").val().trim();
      petName = $("#petBreedInput").val().trim();
      petAge = $("#petAgeInput").val().trim();
      petDateLost = $("#lostAddInput").val().trim();
      contactName = $("#ownerNameInput").val().trim();
      phoneNumber = $("#ownerPhoneInput").val().trim();
      email = $("#ownerEmailInput").val().trim();
      comment = $("#petCommentInput").val().trim();
      houseNum = $("#lostNumAddInput").val().trim();
      streetName = $("#lostNameAddInput").val().trim();
      city = $("#lostCityAddInput").val().trim();
      state = $("#lostStateAddInput").val().trim();
      zipcode = $("#lostZipAddInput").val().trim();

      // Code for the push
      dataRef.ref().push({

          breed: breed,
          petName: petName,
          petAge: petAge,
          petDateLost: petDateLost,
          contactName: contactName,
          phoneNumber: phoneNumber,
          email: email,
          comment: comment,
          houseNum: houseNum,
          streetName: streetName,
          city: city,
          state: state,
          zipcode: zipcode,

          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  });

  dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().breed);
      console.log(childSnapshot.val().petName);
      console.log(childSnapshot.val().petAge);
      console.log(childSnapshot.val().petDateLost);
      console.log(childSnapshot.val().contactName);
      console.log(childSnapshot.val().phoneNumber);
      console.log(childSnapshot.val().email);
      console.log(childSnapshot.val().comment);
      console.log(childSnapshot.val().houseNum);
      console.log(childSnapshot.val().streetName);
      console.log(childSnapshot.val().city);
      console.log(childSnapshot.val().state);
      console.log(childSnapshot.val().zipcode);

      // full list of items to the well
      $("#petList").append("" +childSnapshot.val().breed + "" + childSnapshot.val().petName + "" + childSnapshot.val().petAge + ""
        + childSnapshot.val().petDateLost + "" + childSnapshot.val().contactName + "" + childSnapshot.val().phoneNumber + ""
        + childSnapshot.val().email + "" + childSnapshot.val().comment + "" + childSnapshot.val().houseNum + "" +
        childSnapshot.val().streetName + "" + childSnapshot.val().city + "" + childSnapshot.val().state + "" +
        childSnapshot.val().zipcode); 
      // $("#petList").append("<div class='well'><span class='member-name'> " + childSnapshot.val().breed +
      //   " </span><span class='member-email'> " + childSnapshot.val().petName +
      //   " </span><span class='member-age'> " + childSnapshot.val().petAge + " </span><span class='member-age'> " + childSnapshot.val().petDateLost +
      //   " </span><span class='member-comment'> " +  childSnapshot.val().comment + " </span></div>");



    // <li>
    //   <div class="collapsible-header"><img src="assets/images/puppy.jpg" id="petImg" alt="puppy"><i class="material-icons">Dog's name/info</i></div>
    //   <div class="collapsible-body"><span>Owner info goes here</span></div>
    // </li>

      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      // Change the HTML to reflect
      $("#breed-ld").text(snapshot.val().breed);
      $("#petName-ld").text(snapshot.val().petName);
      $("#petAge-ld").text(snapshot.val().petAge);
      $("#petDateLost-ld").text(snapshot.val().petDateLost);
      $("#contactName-ld").text(snapshot.val().contactName);
      $("#phoneNumber-ld").text(snapshot.val().phoneNumber);
      $("#email-ld").text(snapshot.val().email);
      $("#comment-ld").text(snapshot.val().comment);
      $("#houseNumber-ld").text(snapshot.val().houseNum);
      $("#streetName-ld").text(snapshot.val().streetName);
      $("#city-ld").text(snapshot.val().city);
      $("#state-ld").text(snapshot.val().state);
      $("#zipcode-ld").text(snapshot.val().zipcode);

  });


