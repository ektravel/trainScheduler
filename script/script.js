 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC8YJMfv1Frto_-5l9qKfhL9wt_EwYm2Rk",
    authDomain: "trainscheduler-65199.firebaseapp.com",
    databaseURL: "https://trainscheduler-65199.firebaseio.com",
    projectId: "trainscheduler-65199",
    storageBucket: "",
    messagingSenderId: "140767438022"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var trainFrequency; 

    //Button for adding trains
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //Record user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainStartTime = moment($("#train-start-input").val().trim(),"HH:mm").format("X");
    var trainFrequency = $("#train-frequency-input").val().trim();

    //Upload train data to database
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        start: trainStartTime,
        frequency: trainFrequency
    });
    console.log(trainName.name);
    console.log(trainDestination.destination);
    console.log(trainStartTime.start);
    console.log(trainFrequency.frequency);

    //Clear the intake form
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-start-input").val("");
    $("#train-frequency-input").val("");

  });

  //Create a database event for adding trains
  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
    
    //Change start time from military time to AM/PM
    var startTimeAmPm = moment($("#train-start-input").val().trim(),"HH:mm").format("hh:mm A");

    //Difference between current time and train start time
    var timeDifference = moment().diff(moment(startTimeAmPm), "minutes");

    //Time remaining
    var timeRemaining = timeDifference % trainFrequency;

    //Calculate Next Arrival
    var nextArrival = moment().add(timeRemaining, "minutes");

    //Calculate Minutes Away
    var minutesAway = trainFrequency - timeRemaining;

    //Add train's data to the timetable 
    $("#maintable").append("<tr><td>" + (childSnapshot.val().name) + "<tr><td>" + (childSnapshot.val().destination) + "<tr><td>" + (childSnapshot.val().frequency) + "<tr><td>" + nextArrival + "<tr><td>" + minutesAway + "<tr><td>");


  });


  //var now = moment(); - records current date and time
  //To change from military time to AM/PM
  //console.log(moment("13:00", 'HH:mm').format('hh:mm a'));
  //moment("02:00 PM", "h:mm A").format("HH:mm")