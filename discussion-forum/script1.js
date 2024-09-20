document.addEventListener('DOMContentLoaded', () => {
    // Get the discussion ID from the URL
    const params = new URLSearchParams(window.location.search);
    const discussionId = params.get('discussionId'); // Get the 'discussionId' from the URL
    console.log(discussionId)
    // Fetch discussion details from the backend using the discussion ID
    fetch(`http://localhost:8000/api/discussions/get-discussion-by-id/${discussionId}`,
        {
            credentials:"include"
        }
    )
        .then(response => response.json())
        .then(discussion => {
            // Display the discussion details
            displayDiscussion(discussion.data);

            // Fetch and display the comments
            fetchComments(discussionId);
        })
        .catch(error => console.log('Error fetching discussion details:', error));

    // Handle comment form submission
    const commentForm = document.getElementById('commentForm');
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the comment from the textarea
        const comment = document.getElementById('comment').value;

        // Call function to post the comment
        postComment(discussionId, comment);
    });
});

// Function to display the discussion details
function displayDiscussion(discussion) {
    const discussionFull = document.querySelector('.discussion-full');
    
    // Update the HTML with the discussion details
    discussionFull.innerHTML = `
        <h2>${discussion.title}</h2>
        <p class="discussion-body">${discussion.content}</p>
        <span class="author">Posted by ${discussion.owner.username}</span>
    `;
}

// Function to fetch and display comments
function fetchComments(discussionId) {
    // Fetch comments from the backend for the specific discussion
    fetch(`http://localhost:8000/api/comments/get-discussion-comments/${discussionId}`)
        .then(response => response.json())
        .then(comments => {
            displayComments(comments.data);
            console.log(comments)
        })
        .catch(error => console.error('Error fetching comments:', error));
}

// Function to display comments
function displayComments(comments) {
    const commentsSection = document.querySelector('.comments-section');

    // Clear any existing comments
    commentsSection.innerHTML = '<h3>Comments</h3>';

    // Loop through the comments and create the HTML for each comment card
    comments.forEach(comment => {
        const commentCard = document.createElement('div');
        commentCard.classList.add('comment-card');
        commentCard.innerHTML = `
            <p class="comment-author">${comment.owner.username}:</p>
            <p class="comment-text">${comment.content}</p>
        `;
        commentsSection.appendChild(commentCard);
    });
}

// Function to post a comment
function postComment(discussionId, commentText) {
    const commentData = {
        comment: commentText,
        discussionId:discussionId
    };

    // Send a POST request to the backend to add the comment
    fetch(`http://localhost:8000/api/comments/add-comment`, {
        method: 'POST',
        credentials:"include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData) // Convert comment data to JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Comment posted successfully, refresh the comments list
            fetchComments(discussionId);
            document.getElementById('comment').value = ''; // Clear the textarea
        } else {
            alert('Error posting comment: ' + data.message);
        }
    })
    .catch(error => console.error('Error posting comment:', error));
}
