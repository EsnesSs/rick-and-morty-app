const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

let itemsArray = [];
let itemsLocation = [];
let itemsRandom= [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home");
});

app.get("/characters", function(req, res){
  res.render("characters",{itemsArray:itemsArray});
});
app.get("/results", function(req, res){
  res.render("results",{itemsArray:itemsArray});
});
app.get("/location", function(req, res){
  res.render("location",{itemsLocation:itemsLocation});
});
app.get("/resultsLocation", function(req, res){
  res.render("resultsLocation",{itemsLocation:itemsLocation});
});


app.post("/results", function(req, res){

  const nameCh = req.body.characterName;
  // const status = req.body.statusID;
  // const species = req.body.speciesID;
  // const gender = req.body.genderID;

  const url = "https://rickandmortyapi.com/api/character/?name="+nameCh;
  // +"&status="+status+"&species="+species+"&gender="+gender;
  https.get(url, function(response){
    response.on("data", function(data){
      const characterData= JSON.parse(data);
      let itemsArray = characterData.results
      res.render("results", {itemsArray:itemsArray});

    });
  });


});
app.post("/resultsLocation", function(req, res){

  const nameL = req.body.locationName;

  const url = "https://rickandmortyapi.com/api/location/?name="+nameL;
  // +"&status="+status+"&species="+species+"&gender="+gender;
  https.get(url, function(response){
    response.on("data", function(data){
      const characterData= JSON.parse(data);
      let itemsLocation = characterData.results
      res.render("resultsLocation", {itemsLocation:itemsLocation});

    });
  });



});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})

// .map(e =>e.image);
