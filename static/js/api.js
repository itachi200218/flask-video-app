// Function to fetch recipe details from the backend
async function fetchdata(media) {
    try {
        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: media }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return { error: "Failed to fetch recipe details. Please try again later." };
    }
}

