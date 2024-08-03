const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    try {
        const response = await fetch(`https://www.minecraft.net/bin/minecraft/productmanagement.autosuggest.json?locale=en-us&term=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        const results = data.slice(0, 2).map(item => {
            const title = item.Title['en-us'];
            const prices = item.Prices.map(price => price.listPrice).join(', ');
            const description = item.Description['en-us'];
            const creatorName = item.DisplayProperties.creatorName;
            const image = item.Images.map(image => image.url).join('\n');

            return `
                <div class="result">
                    <img src="${image}" alt="${title}">
                    <h2>${title}</h2>
                    <p>Price: ${prices}</p>
                    <p>Creator: ${creatorName}</p>
                    <p>${description}</p>
                </div>
            `;
        }).join('');

        resultsContainer.innerHTML = results;
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = 'Error: Unable to fetch data';
    }
});
