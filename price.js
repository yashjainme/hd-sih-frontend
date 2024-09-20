document.addEventListener('DOMContentLoaded', function() {
    const predictButton = document.getElementById('predict-button');
    const resultDiv = document.querySelector('.result');
    const priceResult = document.getElementById('price-result');

    predictButton.addEventListener('click', async function() {
        // Collect data from input fields
        const year = document.getElementById('year').value;
        const cropName = document.getElementById('cropName').value;
        const prod = document.getElementById('prod').value;
        const demand = document.getElementById('demand').value;

        // Prepare data for POST request
        const requestData = {
            year: parseInt(year, 10),
            cropName: cropName,
            prod: parseInt(prod, 10),
            demand: parseInt(demand, 10),
        };

        try {
            // Send POST request to backend
            const response = await fetch('https://yashjainme-hd-sih-backend.hf.space/predict-price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            // Handle response
            const data = await response.json();
            if (data.error) {
                // Display error if any
                priceResult.textContent = `Error: ${data.error}`;
            } else {
                // Update the predicted price and show the result section
                priceResult.textContent = data.predicted_price.toFixed(2);
                resultDiv.style.display = 'block'; // Show the result section
            }
        } catch (error) {
            // Handle network or other errors
            priceResult.textContent = `Error: ${error.message}`;
            resultDiv.style.display = 'block'; // Show the result section even if there is an error
        }
    });
});