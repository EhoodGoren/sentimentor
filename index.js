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
    const resultDiv = document.querySelector("#result");

    const loadingImage = document.createElement("img");
    loadingImage.setAttribute("src", "https://media4.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif?cid=ecf05e471z0rb3o8hq50tpjrflxos3d1pdq9heu1a9slec1r&rid=giphy.gif&ct=g");
    loadingImage.setAttribute("style", "height: 200px");
    loadingImage.setAttribute("style", "width: 200px");
    resultDiv.appendChild(loadingImage);

    const existingSentims = document.querySelectorAll(".sentims");
    for (let sentims of existingSentims){
        resultDiv.removeChild(sentims);
    }

    const textToSend = document.querySelector("#text-area").value;
    const sentim = await getSentim(textToSend);
    console.log(sentim);

    const textSentimColor = getColor(sentim.result.polarity);

    const newSentim = document.createElement("div");
    newSentim.classList.add("sentims");

    newSentim.innerText = 
        `Your Sentence: ${sentim.sentences[0].sentence}
        Polarity: ${sentim.result.polarity}
        Type: ${sentim.result.type}`
    newSentim.style.color = textSentimColor;

    resultDiv.appendChild(newSentim);
    resultDiv.removeChild(loadingImage);
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
