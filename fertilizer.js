document.getElementById('predict').addEventListener('click', async () => {
  // Gather user input
  const temperature = document.getElementById('temperature').value;
  const humidity = document.getElementById('humidity').value;
  const moisture = document.getElementById('moisture').value;
  const soilType = document.getElementById('soil-type').value;
  const cropType = document.getElementById('crop-type').value;
  const nitrogen = document.getElementById('nitrogen').value;
  const potassium = document.getElementById('potassium').value;
  const phosphorous = document.getElementById('phosphorous').value;

  // Validate inputs
  if (!temperature || !humidity || !moisture || !soilType || !cropType || !nitrogen || !potassium || !phosphorous) {
      alert('Please fill in all fields.');
      return;
  }

  // Prepare data to send to the backend
  const data = {
      Temparature: parseFloat(temperature),
      Humidity: parseFloat(humidity),
      Moisture: parseFloat(moisture),
      Soil_Type: soilType,
      Crop_Type: cropType,
      Nitrogen: parseFloat(nitrogen),
      Potassium: parseFloat(potassium),
      Phosphorous: parseFloat(phosphorous)
  };

  try {
      // Make POST request to backend API
      const response = await fetch('http://127.0.0.1:8000/predict-fertilizer', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      // Check if response is okay
      if (!response.ok) {
          const errorText = await response.text(); // Get raw response text for debugging
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }

      // Parse the JSON response
      const result = await response.json();
      console.log(result)
      // Display the result container and update text
      const resultContainer = document.getElementById('result');
      resultContainer.style.display = 'block';
      document.getElementById('fertilizer-output').textContent = result.Predicted_Fertilizer || 'No recommendation available';
  } catch (error) {
      console.error('Error:', error);
      // Display the result container with an error message
      const resultContainer = document.getElementById('result');
      resultContainer.style.display = 'block';
      document.getElementById('fertilizer-output').textContent = 'An error occurred. Please try again later.';
  }
});
