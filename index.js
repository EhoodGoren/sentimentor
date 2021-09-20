async function getSentim(text="") {
    const response = await fetch ("https://sentim-api.herokuapp.com/api/v1/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"text": `${text}`})
    });
    const status = response.status;
    if(!response.ok){
        throw new Error(status);
    }
    const result = await response.json();
    return [result, status];
}

async function sendText(){
    const resultDiv = document.querySelector("#result");

    const loadingImage = document.createElement("img");
    loadingImage.setAttribute("src", "https://media4.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif?cid=ecf05e471z0rb3o8hq50tpjrflxos3d1pdq9heu1a9slec1r&rid=giphy.gif&ct=g");
    loadingImage.setAttribute("style", "height: 200px");
    loadingImage.setAttribute("style", "width: 200px");
    resultDiv.appendChild(loadingImage);

    // Removes the existing sentims from the dom (and their cat photos)
    const existingSentims = document.querySelectorAll(".sentims");
    for (let sentims of existingSentims){
        resultDiv.removeChild(sentims);
    }
    const existingStatusImgs = document.querySelectorAll(".status-img");
    for (let imgs of existingStatusImgs){
        resultDiv.removeChild(imgs);
    }

    const textToSend = document.querySelector("#text-area").value;
    try{
        const sentim = await getSentim(textToSend);
    }
    catch (error){
        resultDiv.removeChild(loadingImage);

        const sentimError = document.createElement("div");
        sentimError.classList.add("sentims");
        sentimError.innerText = error;
        resultDiv.appendChild(sentimError);

        const sentimStatusImg = getSentimStatusImg(error.message);
    
        resultDiv.appendChild(sentimStatusImg);

        throw error;
    }

    const sentim = await getSentim(textToSend);
    const textSentimColor = getColor(sentim[0].result.polarity);

    const newSentim = document.createElement("div");
    newSentim.classList.add("sentims");

    newSentim.innerText = 
        `\n Your Sentence: ${sentim[0].sentences[0].sentence}
        Polarity: ${sentim[0].result.polarity}
        Type: ${sentim[0].result.type}`
    newSentim.style.color = textSentimColor;

    resultDiv.appendChild(newSentim);
    resultDiv.removeChild(loadingImage);

    const sentimStatusImg = getSentimStatusImg(sentim[1]);

    resultDiv.appendChild(sentimStatusImg);
}

function getSentimStatusImg(status){
    const sentimStatus = status;
    const sentimStatusImg = document.createElement("img");
    sentimStatusImg.classList.add("status-img");
    sentimStatusImg.setAttribute("src", `https://http.cat/${sentimStatus}`);
    return sentimStatusImg;
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
