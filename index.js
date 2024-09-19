let currentIndex = 0;
const slides = document.querySelectorAll('.slide2');
const slider = document.querySelector('.slider2');

function showSlide(index) {
  if (index >= slides.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = slides.length - 1;
  } else {
    currentIndex = index;
  }
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

// Initialize the slider
showSlide(currentIndex);


// Optional: Auto-slide feature
setInterval(nextSlide, 5000); // Change slide every 5 seconds

document.getElementById('predict-button').addEventListener('click', function() {
  const yieldResult = document.getElementById('yield-result');
  yieldResult.textContent = 'Calculating...';
  
  setTimeout(() => {
      yieldResult.textContent = '47,419.0'; // Replace with your calculation logic
      yieldResult.style.transform = 'scale(1.2)';
      
      setTimeout(() => {
          yieldResult.style.transform = 'scale(1)';
      }, 500);
  }, 1000);
});

document.getElementById('predict-button').addEventListener('click', function() {
  const yieldResult = document.getElementById('yield-result');
  yieldResult.textContent = 'Calculating...';
  
  setTimeout(() => {
      yieldResult.textContent = '47,419.0'; // Replace with your calculation logic
      yieldResult.style.transform = 'scale(1.2)';
      
      setTimeout(() => {
          yieldResult.style.transform = 'scale(1)';
      }, 500);
  }, 1000);
});
document.getElementById('imageUpload').addEventListener('change', function() {
  const fileName = this.files[0] ? this.files[0].name : 'No file selected';
  document.getElementById('file-name').textContent = fileName;
});


