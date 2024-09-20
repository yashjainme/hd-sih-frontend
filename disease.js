document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const fileUpload = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const showImageButton = document.getElementById('show-image');
    const uploadedImage = document.getElementById('uploaded-image');
    const imagePreview = document.querySelector('.image-preview');
    const form = document.getElementById('riskForm');
    const resultsDiv = document.querySelector('.results');
    const predictionDiv = document.querySelector('.prediction');
    const jsonContentDiv = document.getElementById('json-content');
    const downloadSection = document.getElementById('download-section');

    if (!fileUpload || !fileNameDisplay || !showImageButton || !uploadedImage || !imagePreview || !form || !resultsDiv || !predictionDiv || !jsonContentDiv || !downloadSection) {
        console.error("One or more required elements are missing from the DOM");
        return;
    }


    // Update the file name display when a file is selected
    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        fileNameDisplay.textContent = file ? file.name : 'No file selected';
    });

    // Show the uploaded image when "Show Image" button is clicked
    showImageButton.addEventListener('click', () => {
        const file = fileUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file first.');
        }
    });

    // Form submission for uploading image and receiving results
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const file = fileUpload.files[0];
        const cityInput = document.getElementById('city');

        if (!file) {
            alert('Please upload an image file.');
            return;
        }

        if (!cityInput || !cityInput.value.trim()) {
            alert('Please enter a city name.');
            return;
        }

        formData.append('file', file);
        formData.append('city', cityInput.value.trim());

        try {
            const response = await fetch('https://yashjainme-hd-sih-backend.hf.space/combined_risk/', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const zip = await JSZip.loadAsync(blob);

                // Extract response.json and disease_predicted.pdf
                const jsonFile = zip.file('response.json');

                // Clear previous results
                resultsDiv.style.display = 'block';
                predictionDiv.innerHTML = '';
                jsonContentDiv.innerHTML = '';
                downloadSection.innerHTML = '';
               
                if (jsonFile) {
                    const jsonContent = await jsonFile.async('text');
                    const data = JSON.parse(jsonContent);
                    const pdfFile = zip.file(`${data.disease}.pdf`);
                    
                    // Update the prediction div with new data
                    predictionDiv.innerHTML = `
                        <p>Disease: ${data.disease || 'N/A'}</p>
                        <p>Temperature: ${data.temperature || 'N/A'} °C</p>
                        <p>Humidity: ${data.humidity || 'N/A'}%</p>
                        <p>Outbreak Risk: ${data.outbreak_risk || 'N/A'}</p>
                    `;

                   

                    if (pdfFile) {
                        const pdfBlob = await pdfFile.async('blob');
                        const url = window.URL.createObjectURL(pdfBlob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${data.disease}.pdf`;
                        a.textContent = 'Download PDF Report';
                        a.className = 'download-btn';
                        downloadSection.appendChild(a);
                    } else {
                        downloadSection.innerHTML = '<p>PDF report not found in ZIP file.</p>';
                    }
                } else {
                    predictionDiv.innerHTML = '<p>Response data not found in ZIP file.</p>';
                }
            } else {
                const errorData = await response.json();
                predictionDiv.innerHTML = `<p>Error: ${errorData.error}</p>`;
            }
        } catch (error) {
            predictionDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});