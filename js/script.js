const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector("button"),
  soundBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter");

const randomQuote = async () => {
  quoteBtn.innerText = "Loading Quote...";
  quoteBtn.classList.add("loading");

  const fetchedQuote = await fetch("https://api.quotable.io/random");
  const quote = await fetchedQuote.json();
  // console.log(fetchedQuote, quote);

  quoteText.innerText = quote.content;
  authorName.innerText = quote.author;
  quoteBtn.innerText = "New Quote";
  quoteBtn.classList.remove("loading");
};

soundBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`
  );
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(
    `"${quoteText.innerText}" \n\n- ${authorName.innerText}`
  );
});

twitterBtn.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?url="${quoteText.innerText}" - ${authorName.innerText}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
