let isDarkMode = false;

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '☀️'; // Light mode icon
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '🌙'; // Dark mode icon
    }
});

// Form submission handler
document.getElementById('promptForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const prompt = document.getElementById('prompt').value;
    const errorMessage = document.getElementById('error-message');
    const resultDiv = document.getElementById('result');
    const loadingSpinner = document.getElementById('loading-spinner');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBar = document.getElementById('progress-bar');

    errorMessage.classList.add('hidden');
    resultDiv.innerHTML = '';
    loadingSpinner.style.display = 'block';
    progressBarContainer.style.display = 'block';

    try {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) clearInterval(interval);
        }, 100);

        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        if (response.ok) {
            resultDiv.innerHTML = `<h2>${data.result}</h2>`;
        } else {
            throw new Error(data.error || 'An unexpected error occurred.');
        }
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    } finally {
        loadingSpinner.style.display = 'none';
        progressBarContainer.style.display = 'none';
    }
});

// Clear Form Function
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('prompt').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('error-message').classList.add('hidden');
    document.querySelector('.progress-bar').style.width = '0%';
    document.getElementById('loading-spinner').style.display = 'none';
});


