document.addEventListener('DOMContentLoaded', function() {
    const userImage = document.getElementById('user');
    const userOptions = document.getElementById('userOptions');
  
    userImage.addEventListener('click', function() {
      if (userOptions.style.display === 'block') {
        userOptions.style.display = 'none';
      } else {
        userOptions.style.display = 'block';
      }
    });
  });
  