document.addEventListener('DOMContentLoaded', () => {
    // Fetch discussions from the backend API
    fetch('http://localhost:8000/api/discussions/get-discussions', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(discussions => {
        console.log(discussions.data);
        // Call function to display discussions
        displayDiscussions(discussions.data);
    })
    .catch(error => console.error('Error fetching discussions:', error));

    // Elements for modal and form
    const modal = document.getElementById('discussion-modal');
    const addDiscussionBtn = document.querySelector('.add-discussion-btn');
    const closeBtn = document.querySelector('.close-btn');
    const discussionForm = document.getElementById('discussion-form');

    // Open modal when clicking 'Start a Discussion'
    addDiscussionBtn.addEventListener('click', () => {
        console.log('Opening modal');
        modal.classList.remove('hidden');
    });

    // Close modal when clicking the 'x' button
    closeBtn.addEventListener('click', () => {
        console.log('Closing modal with X button');
        modal.classList.add('hidden');
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            console.log('Closing modal by clicking outside');
            modal.classList.add('hidden');
        }
    });

    // Handle form submission to create a new discussion
    discussionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        console.log('Submitting form', { title, content });

        // Send a POST request to the backend to create a new discussion
        fetch('http://localhost:8000/api/discussions/create-discussion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                title,
                content,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Discussion created:', data);

            // Append the new discussion to the discussion list
            appendNewDiscussion(data.discussion);

            // Close the modal and reset the form
            console.log('Closing modal after form submission');
            modal.classList.add('hidden');  // Close the modal
            discussionForm.reset();  // Reset the form fields
        })
        .catch(error => console.error('Error creating discussion:', error));
    });
});

// Function to append a new discussion to the discussion list
function appendNewDiscussion(discussion) {
    const discussionList = document.querySelector('.discussion-list');

    const discussionCard = document.createElement('div');
    discussionCard.classList.add('discussion-card');

    discussionCard.innerHTML = `
        <a href="discussion.html?discussionId=${discussion._id}">
            <h2 class="discussion-title">${discussion.title}</h2>
            <p class="discussion-description">${discussion.content}</p>
            <span class="author">Posted by ${discussion.owner.username}</span>
        </a>
    `;

    discussionList.appendChild(discussionCard);
}

// Function to display discussions (this part remains the same)
function displayDiscussions(discussions) {
    const discussionList = document.querySelector('.discussion-list');

    // Clear any existing dummy content
    discussionList.innerHTML = '';

    // Loop through the discussions array and create the HTML for each discussion card
    discussions.forEach(discussion => {
        appendNewDiscussion(discussion);
    });
}
