const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quotes From API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const text = await response.text();
        let data;
        // If Author is blank, add 'Unknown'
        try {
            data = JSON.parse(text);
        }catch (jsonErr) {
            console.error('Invalid JSON:', text);
            return;
        }

        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
    } catch (error) {
        getQuote();
        console.log('whoops, no quote', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote();
