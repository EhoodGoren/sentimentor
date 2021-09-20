async function getSentim(text="") {
    const response = await fetch ("https://sentim-api.herokuapp.com/api/v1/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"text": `${text}`})
    });
    const result = await response.json();
    return result;
}

async function sendText(){
    const textToSend = document.querySelector("#text-area").value;
    const sentim = await getSentim(textToSend);

    const textSentimColor = getColor(sentim.result.polarity);

    const resultDiv = document.createElement("div");

    resultDiv.innerText = 
        `Your Sentence: ${sentim.sentences[0].sentence}
        Polarity: ${sentim.result.polarity}
        Type: ${sentim.result.type}`
    resultDiv.style.color = textSentimColor;

    document.querySelector("#result").appendChild(resultDiv);
}

function getColor(sentim) {
    if (sentim < 0){
        return "rgb(255,0,0)";
    }
    if (sentim > 0){
        return "rgb(0,255,0)";
    }
    else {
        return "rgb(90,90,90)";
    }
}

const sendButton = document.querySelector("#send-button");
sendButton.addEventListener("click", sendText);
