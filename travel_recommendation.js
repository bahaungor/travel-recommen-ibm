// Function to handle the search logic
async function fetchTravelData() {
    const response = await fetch('https://raw.githubusercontent.com/bahaungor/travel-recommen-ibm/refs/heads/master/travel_recommendation_api.json');
    return response.json();
}

// Function to handle the search logic
async function searchDestinations() {
    const searchInput = document.querySelector(".search-input").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("results-container");

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Fetch the travel data
    const travelData = await fetchTravelData();

    // Initialize an array to store the results
    let results = [];

    // Check if the search input matches any category (beaches, temples, countries)
    if (searchInput === "beach" || searchInput === "beaches") {
        results = travelData.beaches; // Return all beaches
    } else if (searchInput === "temple" || searchInput === "temples") {
        results = travelData.temples; // Return all temples
    } else if (searchInput === "country" || searchInput === "countries") {
        // Return all countries and their cities
        travelData.countries.forEach(country => {
            results.push(...country.cities); // Add all cities of each country
        });
    } else {
        // Search for specific destinations (cities, beaches, temples) by name
        const allDestinations = [
            ...travelData.beaches,
            ...travelData.temples,
            ...travelData.countries.flatMap(country => country.cities)
        ];

        results = allDestinations.filter(destination =>
            destination.name.toLowerCase().includes(searchInput)
        );
    }

    // Display the results
    if (results.length > 0) {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');

            const title = document.createElement('h3');
            title.textContent = result.name;

            const description = document.createElement('p');
            description.textContent = result.description || "No description available"; // Handle case if no description

            const image = document.createElement('img');
            image.src = result.imageUrl || ""; // Ensure the image URL is correctly assigned
            image.alt = result.name;

            resultElement.appendChild(image);
            resultElement.appendChild(title);
            resultElement.appendChild(description);
            resultsContainer.appendChild(resultElement);
        });
    } else {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = "No results found for your search.";
        resultsContainer.appendChild(noResultsMessage);
    }
}

function clearResults(){
    document.querySelector(".search-input").value = ""
    document.getElementById("results-container").innerHTML = '';
}

// Add event listener to the search button
document.querySelector(".search-btn").addEventListener("click", searchDestinations);
document.querySelector(".clear-btn").addEventListener("click", clearResults)
