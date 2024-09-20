// Function to handle the form submission
function signup(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get all the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const state = document.getElementById('state').value;
    const occupation = document.getElementById('occupation').value;

    // Create an object with the form data
    const formData = {
        username: name,
        email: email,
        password: password,
        state: state,
        occupation: occupation
    };

    // Send a POST request to the backend with the form data
    fetch('http://localhost:8000/api/users/register', { // Replace this with your actual backend URL
        method: 'POST', // HTTP method
        headers: {
            'Content-Type': 'application/json' // Sending the data as JSON
        },
        body: JSON.stringify(formData) // Convert the form data to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
        console.log('Success:', data); // Handle success response
        // You can add further actions here, like redirecting the user or showing a success message
    })
    .catch(error => {
        console.error('Error:', error); // Handle any errors
        // You can add further error handling here, like showing an error message to the user
    });

    return false; // Prevent form from submitting the default way
}

// Attach the function to the form submission event
document.querySelector('form').addEventListener('submit', signup);
