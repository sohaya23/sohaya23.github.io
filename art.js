const apiUrl = 'https://api.artic.edu/api/v1/artworks?limit=100';

async function fetchArtworks() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data; // Returns the array of artworks
}

function createBarChart(data) {
    const ctx = document.querySelector('#chart1').getContext('2d');
    // const labels = data.map(item => item.style_title)
    // const counts = data.map(item => item.id)

    const styles = data.map(item => item.style_title);
    const styleCounts = {};

    styles.forEach(style => {
        if(style) {
            styleCounts[style] = (styleCounts[style] || 0) + 1;
        }
    });

    // Step 1 & 2: Convert to array and sort by value (descending)
    const sortedArray = Object.entries(styleCounts).sort(([, a], [, b]) => b - a);

    // Step 3: Convert sorted array back to an object
    const sortedJsonData = Object.fromEntries(sortedArray);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(sortedJsonData).slice(0,5),
            datasets: [{
                label: 'Number of Artworks',
                data: Object.values(sortedJsonData).slice(0,5),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins:{
                title: {
                    display: true,  // Enables the title
                    text: 'Top 5 Art Styles',  // Title text
                    font: {
                        size: 18  // Adjust the font size of the title
                    }
                }
            }
        }
    });
}

function createDoughnutChart(data) {
    const ctx = document.querySelector('#chart2').getContext('2d');
    const mediums = data.map(item => item.medium_display);
    const mediumCounts = {};

    mediums.forEach(medium => {
        if(medium) {
            mediumCounts[medium] = (mediumCounts[medium] || 0) + 1;
        }
    });

    // Step 1 & 2: Convert to array and sort by value (descending)
    const sortedArray = Object.entries(mediumCounts).sort(([, a], [, b]) => b - a);

    // Step 3: Convert sorted array back to an object
    const sortedJsonData = Object.fromEntries(sortedArray);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(sortedJsonData).slice(0,5),
            datasets: [{
                label: 'Number of Artworks',
                data: Object.values(sortedJsonData).slice(0,5),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,  // Enables the title
                    text: 'Largest 5 Categories of Mediums',  // Title text
                    font: {
                        size: 18  // Adjust the font size of the title
                    }
                }
            }
        }
    });
}


function createLineChart(data) {
    const ctx = document.querySelector('#chart3').getContext('2d');
    const years = data.map(item => item.date_start).filter(year => year); // Extracting years
    const yearCounts = {};

    years.forEach(year => {
        if(year > 1100 && year < 8000) {
            yearCounts[year] = (yearCounts[year] || 0) + 1;
        }
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(yearCounts),
            datasets: [{
                label: 'Number of Artworks',
                data: Object.values(yearCounts),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            plugins:{
                title: {
                    display: true,  // Enables the title
                    text: 'Artwork Created By Year',  // Title text
                    font: {
                        size: 18  // Adjust the font size of the title
                    }
                }
            }
        }
    });
}

function createPieChart(data) {
    const ctx = document.querySelector('#chart4').getContext('2d');
    const exhibitions = data.map(item => item.place_of_origin);
    const exhibitionCounts = {};

    exhibitions.forEach(exhibition => {
        if(exhibition) {
            exhibitionCounts[exhibition] = (exhibitionCounts[exhibition] || 0) + 1;
        }
    });


    const sortedArray = Object.entries(exhibitionCounts).sort(([, a], [, b]) => b - a);
    const sortedJsonData = Object.fromEntries(sortedArray);
    // sorted written by chatgpt ^

    

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(exhibitionCounts).slice(0,5),
            datasets: [{
                label: 'Number of Artworks',
                data: Object.values(exhibitionCounts).slice(0,5),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#E57373', '#64B5F6', '#81C784', '#FFF176', '#BA68C8', '#FF8A65',
                    '#F06292', '#4DB6AC', '#AED581', '#FFD54F', '#90A4AE', '#DCE775',
                    '#F48FB1', '#4FC3F7', '#A1887F', '#FFCC80', '#7986CB', '#FFEB3B',
                    '#009688', '#FFC107', '#8E24AA', '#7CB342', '#FFA726', '#8D6E63',
                    '#9CCC65', '#FF7043', '#7986CB', '#CE93D8', '#00ACC1', '#FFD740',
                    '#80CBC4', '#5C6BC0', '#B39DDB', '#FF6E40', '#26A69A', '#FFB74D',
                    '#9FA8DA', '#9575CD', '#C0CA33', '#C5E1A5', '#FF5252', '#40C4FF',
                    '#43A047', '#BA68C8', '#8E24AA', '#FF4081', '#4DD0E1'
                ]
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,  // Enables the title
                    text: 'Top 5 Sources of the Artwork',  // Title text
                    font: {
                        size: 18  // Adjust the font size of the title
                    }
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }
        }
    });
    
}

fetchArtworks().then(data => {
    createBarChart(data);
    createDoughnutChart(data);
    createLineChart(data);
    createPieChart(data);
});
