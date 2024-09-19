document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form elements
    const areaInput = document.getElementById('area');
    const productionInput = document.getElementById('production');
    const annualRainfallInput = document.getElementById('annual_rainfall');
    const fertilizerInput = document.getElementById('fertilizer');
    const seasonSelect = document.getElementById('season');
    const stateSelect = document.getElementById('state');
    const cropSelect = document.getElementById('crop');
    const predictButton = document.getElementById('predict-button');
    const yieldResult = document.getElementById('yield-result');
    const guidelinesTips = document.getElementById('guidelines-tips');
    const suggestionsTips = document.getElementById('suggestions-tips');
    const resultDiv = document.querySelector('.result');
    const tipsDiv = document.querySelector('.tips');

    // Handle the click event on the predict button
    predictButton.addEventListener('click', function() {
        // Gather input values
        const area = areaInput.value;
        const production = productionInput.value;
        const annualRainfall = annualRainfallInput.value;
        const fertilizer = fertilizerInput.value;
        const season = seasonSelect.value;
        const state = stateSelect.value;
        const crop = cropSelect.value;

        // Check if all fields are filled
        if (!area || !production || !annualRainfall || !fertilizer || !season || !state || !crop) {
            yieldResult.textContent = "Please fill in all fields.";
            resultDiv.style.display = 'none'; // Hide the result div if any field is empty
            tipsDiv.style.display = 'none'; // Hide the tips div if any field is empty
            return;
        }

        // Prepare the data to be sent to the backend
        const data = {
            area: area,
            production: production,
            annual_rainfall: annualRainfall,
            fertilizer: fertilizer,
            season: season,
            state: state,
            crop: crop
        };

        // Send a POST request to the backend
        fetch('http://127.0.0.1:8000/predict-yield', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                // Handle the error case
                yieldResult.textContent = `Error: ${result.error}`;
                tipsDiv.style.display = 'none'; // Hide the tips div on error
            } else {
                // Display the predicted yield
                yieldResult.textContent = `Predicted Yield: ${result.predicted_yield}`;

                // Display guidelines and suggestions
                const guidelines = [
                    "Use high-quality seeds.",
                    "Optimize soil health through proper fertilization.",
                    "Implement effective irrigation techniques."
                ];

                const suggestions = [
                    "Control pests and diseases proactively.",
                    "Use crop rotation to maintain soil fertility.",
                    "Ensure proper spacing and planting depth."
                ];

                // Clear any existing tips
                guidelinesTips.innerHTML = '';
                suggestionsTips.innerHTML = '';

                // Append each guideline as a list item
                guidelines.forEach(guideline => {
                    const li = document.createElement('li');
                    li.textContent = guideline;
                    guidelinesTips.appendChild(li);
                });

                // Append each suggestion as a list item
                suggestions.forEach(suggestion => {
                    const li = document.createElement('li');
                    li.textContent = suggestion;
                    suggestionsTips.appendChild(li);
                });

                resultDiv.style.display = 'block'; // Show the result div
                tipsDiv.style.display = 'block'; // Show the tips div
            }
        })
        .catch(error => {
            // Handle network errors
            yieldResult.textContent = `Network Error: ${error.message}`;
            resultDiv.style.display = 'block'; // Show the result div even on error
            tipsDiv.style.display = 'none'; // Hide the tips div on error
        });
    });
});
