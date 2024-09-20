
// function login() {
//     var uname = document.getElementById('user').value;
//     var password = document.getElementById('pass').value;
//     if (uname == "Pratham" && password == '12345678') {
//         alert('Successfully Verified');
//         return true;
//     } else {
//         alert('Enter Your Details');
//         return false;
//     }
// }

// var showPasswordIcon = document.getElementById('show-password');
// var passwordField = document.getElementById('pass');

// showPasswordIcon.addEventListener('click', function () {
//     if (passwordField.type === 'password') {
//         passwordField.type = 'text';
//     } else {
//         passwordField.type = 'password';
//     }
//     // Add blinking class to the icon for animation
//     showPasswordIcon.classList.add('blinking');

//     // Remove blinking class after 1 second (1000 milliseconds)
//     setTimeout(function() {
//         showPasswordIcon.classList.remove('blinking');
//     }, 1000);
// });
// Function to handle the login form submission
function login(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values of the email and password fields
    const email = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    // Create an object to hold the login data
    const loginData = {
        email: email,
        password: password
    };

    // Send a POST request to the backend with the login data
    fetch('http://localhost:8000/api/users/login', { // Replace with your backend URL
        method: 'POST', 
        credentials:"include" ,// HTTP method for login
        headers: {
            'Content-Type': 'application/json' // Send data as JSON
        },
        body: JSON.stringify(loginData) // Convert loginData object to JSON string
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
        console.log( data.data.user);
        localStorage.setItem("user",JSON.stringify(data.data.user))
        // localStorage.clear()
        // Handle the success response

        if (data.success) {
            // If login is successful, redirect the user or perform another action
            alert("Login successful!");
            // Example: redirect to a dashboard or home page
           // Change the URL to your dashboard
        } else {
            // Handle login failure (e.g., display error message)
            alert("Login failed: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error); // Handle any errors during the request
        alert("An error occurred during login. Please try again.");
    });

    return false; // Prevent form from submitting the default way
}
