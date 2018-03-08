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

  var petName = "";
  var petAge = 0;
  var petDateLost = 0;
  var contactName = "";
  var phoneNumber = 0;
  var email = "";
  var petDateLost= 0;
  var breed = "";
  var comment = "";

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

      // full list of items to the well
      $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().breed +
        " </span><span class='member-email'> " + childSnapshot.val().petName +
        " </span><span class='member-age'> " + childSnapshot.val().petAge + " </span><span class='member-age'> " + childSnapshot.val().petDateLost +
        " </span><span class='member-comment'> " +  childSnapshot.val().comment + " </span></div>");

      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      // Change the HTML to reflect
      $("#petBreedDisplay").text(snapshot.val().breed);
      $("#petNameDisplay").text(snapshot.val().petName);
      $("#petAgeDisplay").text(snapshot.val().petAge);
      $("#petDateLostDisplay").text(snapshot.val().petDateLost);
      $("#ownerNameDisplay").text(snapshot.val().contactName);
      $("#ownerPhoneDisplay").text(snapshot.val().phoneNumber);
      $("#ownerEmailDisplay").text(snapshot.val().email);
      $("#commentDisplay").text(snapshot.val().comment);
  });

  // var config = {
  //   apiKey: "AIzaSyAWGMdRh9ilJ6IqAM2fp4pU6pA9JoYKibE",
  //   authDomain: "comehome-22679.firebaseapp.com",
  //   databaseURL: "https://comehome-22679.firebaseio.com",
  //     projectId: "comehome-22679",
  //   storageBucket: "",
  //   messagingSenderId: "458156685398" 
  // };
  // firebase.initializeApp(config);

 //  $(document).ready(function(){
 //   $('.collapsible').collapsible();
 // });

