// Counter for generating unique IDs
var commentCounter = 0;

// Function to upload image, description, and username
function uploadImage() {
  var username = document.getElementById('username').value;
  var imageUrl = document.getElementById('image-url').value;
  var imageDescription = document.getElementById('image-description').value;
  
  // Add the new post to the feed with username
  addPost(username, imageUrl, imageDescription);
  
  // Save posts to local storage
  savePosts();
  
  // Clear input fields after uploading
  document.getElementById('username').value = '';
  document.getElementById('image-url').value = '';
  document.getElementById('image-description').value = '';
}

// Function to add a new post to the feed
function addPost(username, imageUrl, description) {
  var postList = document.getElementById('post-list');
  var postItem = document.createElement('div');
  postItem.classList.add('post-item');
  postItem.innerHTML = `
    <div class="post">
      <img src="${imageUrl}" alt="Post Image">
      <p>${description}</p>
      <p>Uploaded by: ${username}</p>
    </div>
    <div class="comments-section">
      <input type="text" id="comment-user" placeholder="Your Name">
      <input type="text" placeholder="Add a comment">
      <button onclick="addComment(this)">Add Comment</button>
      <div class="comments">
        <!-- Comments will be dynamically added here -->
      </div>
    </div>
  `;
  postList.appendChild(postItem);
}

// Function to add a comment to a post
function addComment(button) {
  var inputField = button.previousElementSibling;
  var commentText = inputField.value.trim();
  var commentUserInput = inputField.parentElement.querySelector("#comment-user");
  var commentUser = commentUserInput ? commentUserInput.value.trim() : '';
  
  if (commentText !== '' && commentUser !== '') {
    var commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
    // Generate unique IDs for comment elements
    var commentId = 'comment-' + commentCounter++;
    var commentTextId = 'comment-text-' + commentId;
    var editButtonId = 'edit-button-' + commentId;
    var deleteButtonId = 'delete-button-' + commentId;

    // Create span for comment text
    var commentSpan = document.createElement('span');
    commentSpan.textContent = commentUser + ': ' + commentText;

    // Create edit button
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.id = editButtonId;
    editButton.onclick = function() {
      var newText = prompt('Enter new comment:', commentText);
      if (newText !== null) {
        commentSpan.textContent = commentUser + ': ' + newText.trim();
        savePosts();
      }
    };

    // Create delete button
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.id = deleteButtonId;
    deleteButton.onclick = function() {
      if (confirm('Are you sure you want to delete this comment?')) {
        commentDiv.remove();
        savePosts();
      }
    };

    // Append comment text and buttons to comment div
    commentDiv.appendChild(commentSpan);
    commentDiv.appendChild(editButton);
    commentDiv.appendChild(deleteButton);

    button.nextElementSibling.appendChild(commentDiv);

    // Save comments to local storage
    savePosts();

    // Clear input field after adding comment
    inputField.value = '';
  }
}

// Function to save posts and comments to local storage
function savePosts() {
  var postList = document.getElementById('post-list').innerHTML;
  localStorage.setItem('posts', postList);
}

// Function to load posts and comments from local storage
function loadPosts() {
  var savedPosts = localStorage.getItem('posts');
  if (savedPosts) {
    document.getElementById('post-list').innerHTML = savedPosts;
    var comments = document.querySelectorAll('.comment');
    comments.forEach(function(comment) {
      attachCommentFunctionality(comment);
    });
  }
}

// Attach delete and edit functionality to specified comment
function attachCommentFunctionality(comment) {
  // Remove existing edit and delete buttons, if any
  var existingButtons = comment.querySelectorAll('button');
  existingButtons.forEach(function(button) {
    button.remove();
  });

  // Create edit button
  var editButton = document.createElement('button');
  editButton.textContent = 'Edit';

  // Attach click handler for edit button
  editButton.addEventListener('click', function() {
    var newText = prompt('Enter new comment:', comment.textContent.split(': ')[1]);
    if (newText !== null) {
      comment.textContent = comment.textContent.split(': ')[0] + ': ' + newText.trim();
      savePosts();
    }
  });

  // Create delete button
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  // Attach click handler for delete button
  deleteButton.addEventListener('click', function() {
    if (confirm('Are you sure you want to delete this comment?')) {
      comment.remove();
      savePosts();
    }
  });

  // Append buttons to comment div
  comment.appendChild(editButton);
  comment.appendChild(deleteButton);
}

// Load posts and comments from local storage when the page loads
window.onload = function() {
  loadPosts();
};
