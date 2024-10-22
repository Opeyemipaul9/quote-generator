const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('id-quote');
const authorText = document.getElementById('author');
const  twitterBtN = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// Show loading 

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete(){
    if(!loading.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;}


}

// Get Qotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // Check if Author field is blank and replace with 'Uknown'
        if(!quotes.author){
            authorText.textContent  ='Unknown';
        } else {
            authorText.textContent = quotes.author;
        }
        // Check Quote Length to determine styling
        if(quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.textContent =  quotes.text;

        // Stop loader, show Quotes
        complete();
        // getQuotes(); 

    }
    catch(error){
        console.error(error)
    }
}
// Tweet Quote 
function tweetQuote(){
    const twitterUrl = `https://x.com/intent/post?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtN.addEventListener('click', tweetQuote);


// On Load
getQuotes();
