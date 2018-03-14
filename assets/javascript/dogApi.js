$('document').ready(function () {
  var address = 'https://dog.ceo/api/breeds/list'

  $.ajax({
    url: address,
    //on callback response...
    success: function (response) {
      // for every iteration...
      for (i = 0; i < response.message.length; i++) {
        //...assign a new breed...
        breed = response.message[i];
        //..call a new function...
        CreateBreedList(breed, i)
      }
    }
  })
});
// ...store the information of each iteration num & each breed...
function CreateBreedList(breed, i) {
  var picture;
  //...build a url for the new breed...
  var address2 = "https://dog.ceo/api/breed/" + breed + "/images";
  $.ajax({
    //...call the new breed picture...
    url: address2,
    success: function (response) {
      //...find picture of the new breed...
      picture = response.message[0];
      //...build structure...
      var spawnBreedRow = "<div class='dogData col s12 m6 l3'>" +
        "<img class='responsive-img importImg' src='" + picture + "' alt='Photo" + i + "'>" +
        "<p class='dogDataName light-green darken-3 center white-text'>" + breed + "</p>" +
        "</div>";
      //..and finally apppend each breed...
      div = document.getElementById('breedContainer');
      div.insertAdjacentHTML('beforeend', spawnBreedRow);
    }
  })
}