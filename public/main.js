console.log("Loading 1");


//declaring some global variables which will be needed
var iss_latitude;
var iss_longitude;
var earth;
var marker;

//we need to give some values to the marker in the beginning, otherwise it does not appear on the map at all
iss_latitude = 51.5;
iss_longitude =  -0.09;

//this is the WebGL function which creates the earth environment, sky parameter adds some really nice star background
earth = new WE.map('earth_div', {
	sky: true
});

//we need to add the marker to the map in the beginning, otherwise the marker does not appear at all (WebGL bug)
marker = WE.marker([iss_latitude, iss_longitude]).addTo(earth);
marker.bindPopup("<b>International Space Station Current Position</b>", {maxWidth: 150, closeButton: true}).openPopup();

//to update the current coordinates, we use makeHTML function with a simple jQuery command
function makeHTML(){
	console.log("Making HTML...");
	var htmlStr = "";
	
	htmlStr += "ISS Coordinates: ";
	htmlStr += "<br>Latitude: ";
	htmlStr += iss_latitude;
	htmlStr += "<br>Longitude: ";
	htmlStr += iss_longitude;
	
	$('#ISS_info').html(htmlStr);
	
}

//the core of the prgram - this functions retrieves coordinates from ISS API, then saves is as longitude and latitude and susequently removes the previous marker and adds the new marker with the new coordinates 
function issPosition(){
	console.log("Getting the ISS position...");
	
	var positionURL = "http://api.open-notify.org/iss-now.json";
	
	
	
	$.ajax({
		url: positionURL,
		type: 'GET',
		dataType: 'json',
		cache: false,
		error: function(err){
			console.log("Oh no...");
			console.log("Could not retrieve ISS position...");
			console.log(err);
		},
		success: function(data){
			console.log("Position retrieved successfully!");
			console.log(data);
			//here, when we recieve the data, we save it as a variable
			iss_latitude = data.iss_position.latitude;
			iss_longitude = data.iss_position.longitude;
			
			console.log("Coordinates: ");
			console.log(iss_latitude);
			console.log(iss_longitude);
			console.log("coordinates saved, ready to move on");
			
			//updating the displayed coordinates on the page
			makeHTML();
			//removing the old marker
			marker.removeFrom(earth);
			//adding the new marker with some label
			marker.bindPopup("<b>International Space Station Current Position</b>", {maxWidth: 150, closeButton: true}).openPopup();
			marker = WE.marker([iss_latitude, iss_longitude]).addTo(earth);
			marker.bindPopup("<b>International Space Station Current Position</b>", {maxWidth: 150, closeButton: true}).openPopup();
						
			
		}
	});

	

}
//this function refreshes issPosition function every second, so we can get the latest position of the ISS and update the marker every second
setInterval(issPosition, 1000);


//the initialize function is a WebGL function which creates the earth and adds a certain layer to it
function initialize() {
	
	WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
	console.log("printing coordinates: ");
	console.log(iss_latitude);
	console.log(iss_longitude);

	
	issPosition();
	earth.setView([51.505, 0], 1);
	}




//waiting for everything to load, then action

$(document).ready(function(){  
	console.log("Loading 2");
	//when everything is ready, we call the initialize function which loads the 3D earth and then call issPosition() function every second
	initialize();
	
	console.log("Check check check....");

	

		

		   

});					   



console.log("Loading 3");