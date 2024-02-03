document.addEventListener('DOMContentLoaded', () => {
    const tweetForm = document.getElementById('tweetForm');
    const tweetInput = document.getElementById('tweetInput');
    const tweetsContainer = document.getElementById('tweets');
  
    function createTweetElement(tweet) {
      const tweetElement = document.createElement('div');
      tweetElement.classList.add('card');
  
      const tweetTextElement = document.createElement('p');
      tweetTextElement.textContent = tweet.text;
      tweetElement.appendChild(tweetTextElement);
  
      const actionsElement = document.createElement('div');
      actionsElement.classList.add('actions');
  
      const likeButton = document.createElement('button');
      likeButton.textContent = 'Like';
      likeButton.addEventListener('click', () => {
        handleLikeClick(tweet, likeButton);
      });
      actionsElement.appendChild(likeButton);
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        handleEditClick(tweet);
      });
      actionsElement.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        handleDeleteClick(tweetElement);
      });
      actionsElement.appendChild(deleteButton);
  
      tweetElement.appendChild(actionsElement);
  
      const commentsElement = document.createElement('div');
      commentsElement.classList.add('comments');
      tweetElement.appendChild(commentsElement);
  
      return tweetElement;
    }
  
    function addTweetToPage(tweet) {
      const tweetElement = createTweetElement(tweet);
      tweetsContainer.appendChild(tweetElement);
    }
  
    function addTweetToStorage(tweet) {
      const storedTweets = JSON.parse(localStorage.getItem('tweets')) || [];
      storedTweets.push(tweet);
      localStorage.setItem('tweets', JSON.stringify(storedTweets));
    }
  
    function handleLikeClick(tweet, likeButton) {
      tweet.liked = !tweet.liked;
      if (tweet.liked) {
        likeButton.textContent = 'Unlike';
      } else {
        likeButton.textContent = 'Like';
      }
    }
  
    function handleEditClick(tweet) {
      const newText = prompt('Enter the new tweet text:');
      if (newText) {
        tweet.text = newText;
        const tweetTextElement = tweet.parentElement.querySelector('p');
        tweetTextElement.textContent = newText;
      }
    }
  
    function handleDeleteClick(tweetElement) {
      const confirmDelete = confirm('Are you sure you want to delete this tweet?');
      if (confirmDelete) {
        const storedTweets = JSON.parse(localStorage.getItem('tweets')) || [];
        const index = storedTweets.findIndex(tweet => tweet.text === tweetElement.querySelector('p').textContent);
        storedTweets.splice(index, 1);
        localStorage.setItem('tweets', JSON.stringify(storedTweets));
        tweetsContainer.removeChild(tweetElement);
      }
    }
  
    function handleFormSubmit(event) {
      event.preventDefault();
      const tweetText = tweetInput.value.trim();
      if (tweetText) {
        const tweet = {
          text: tweetText,
          liked: false,
          comments: []
        };
        addTweetToPage(createTweetElement(tweet));
        addTweetToStorage(tweet);
        tweetInput.value = '';
      }
    }
  
    tweetForm.addEventListener('submit', handleFormSubmit);
  
    const storedTweets = JSON.parse(localStorage.getItem('tweets')) || [];
    storedTweets.forEach(tweet => addTweetToPage(createTweetElement(tweet)));
});