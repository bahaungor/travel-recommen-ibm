// Function to handle the search logic
async function fetchTravelData() {
    const response = await fetch('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json');
    return response.json();
}

// Function to handle the search logic
async function searchDestinations() {
    const searchInput = document.querySelector(".search-input").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("results-container");

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Validate input
    if (searchInput === "") {
        const noInputMessage = document.createElement('p');
        noInputMessage.textContent = "Please enter a search term.";
        resultsContainer.appendChild(noInputMessage);
        return;
    }

    // Fetch data
    const travelData = await fetchTravelData();
    let results = [];

    // Helper function to search within a category
    const searchInCategory = (category, keyword) => {
        return category.filter(item => item.name.toLowerCase().includes(keyword));
    };

    // Search in countries
    travelData.countries.forEach(country => {
        results = results.concat(searchInCategory(country.cities, searchInput));
        if (country.name.toLowerCase().includes(searchInput)) {
            results.push(country);
        }
    });

    // Search in temples
    results = results.concat(searchInCategory(travelData.temples, searchInput));

    // Search in beaches
    results = results.concat(searchInCategory(travelData.beaches, searchInput));

    // Display the results
    if (results.length > 0) {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');

            const title = document.createElement('h3');
            title.textContent = result.name;

            const description = document.createElement('p');
            description.textContent = result.description;

            const image = document.createElement('img');
            image.src = result.imageUrl; // Ensures the image URL is correctly assigned
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

document.querySelector(".search-btn").addEventListener("click", searchDestinations);
