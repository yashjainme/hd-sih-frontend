// document.getElementById("send-btn").addEventListener("click", function() {
//     const userInput = document.getElementById("user-input").value;
//     if (userInput) {
//         addMessageToChat("You", userInput, "user-message");

//         // Send request to Flask backend
//         fetch("http://127.0.0.1:8000/get_response", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ message: userInput }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             addMessageToChat("Bot", data.response, "bot-message");
//         });
        
//         // Clear input field
//         document.getElementById("user-input").value = "";
//     }
// });

// function addMessageToChat(role, text, className) {
//     const chatBox = document.getElementById("chat-box");
//     const messageDiv = document.createElement("div");
//     messageDiv.classList.add("message", className);
//     messageDiv.textContent = `${role}: ${text}`;
//     chatBox.appendChild(messageDiv);

//     // Scroll chat box to the bottom
//     chatBox.scrollTop = chatBox.scrollHeight;
// }











document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput) {
        addMessageToChat("You", userInput, "user-message");
        document.getElementById("loading").style.display = "block";

        // Send request to Flask backend
        fetch("https://yashjainme-hd-sih-backend.hf.space/get_response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            addMessageToChat("Agricultural Expert", data.response, "bot-message");
            document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("loading").style.display = "none";
            addMessageToChat("System", "An error occurred. Please try again.", "error-message");
        });
        
        // Clear input field
        document.getElementById("user-input").value = "";
    }
}

function addMessageToChat(role, text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    
    const roleSpan = document.createElement("span");
    roleSpan.classList.add("message-role");
    roleSpan.textContent = role + ":";
    messageDiv.appendChild(roleSpan);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("message-content");
    contentDiv.innerHTML = marked(text);  // Use marked to render markdown
    messageDiv.appendChild(contentDiv);

    chatBox.appendChild(messageDiv);

    // Scroll chat box to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}