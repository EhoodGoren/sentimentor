// Send a request to the api.
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
    // If the repsonse was an error, it is thrown.
    if(!response.ok){
        throw new Error(status);
    }
    const result = await response.json();
    return [result, status];
}

// Sends the text to the api, and displays the response
async function showResponse(){
    // resultDiv is where the response info and status image will be.
    const resultDiv = document.querySelector("#result");

    // Loading gif
    const loadingImage = document.createElement("img");
    loadingImage.setAttribute("src", "https://media4.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif?cid=ecf05e471z0rb3o8hq50tpjrflxos3d1pdq9heu1a9slec1r&rid=giphy.gif&ct=g");
    loadingImage.setAttribute("style", "height: 200px");
    loadingImage.setAttribute("style", "width: 200px");
    resultDiv.appendChild(loadingImage);

    // Removes the existing sentims from the dom (and their cat photos).
    const existingSentims = document.querySelectorAll(".sentims");
    for (let sentims of existingSentims){
        resultDiv.removeChild(sentims);
    }
    const existingStatusImgs = document.querySelectorAll(".status-img");
    for (let imgs of existingStatusImgs){
        resultDiv.removeChild(imgs);
    }

    // textToSend is the text written in the textarea.
    const textToSend = document.querySelector("#text-area").value;
    let sentim;
    try{
        // There will be an error if the api response was an error.
        sentim = await getSentim(textToSend);
    }
    catch (error){
        resultDiv.removeChild(loadingImage);

        // Result section now displays the error info.
        const sentimError = document.createElement("div");
        sentimError.classList.add("sentims");
        sentimError.innerText = error;
        resultDiv.appendChild(sentimError);

        // Status image for the error.
        const sentimStatusImg = getSentimStatusImg(error.message);
        resultDiv.appendChild(sentimStatusImg);

        throw error;
    }

    // The color for the reponse text.
    const textSentimColor = getColor(sentim[0].result.polarity);

    // newSentim is where the repsonse info will be.
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

// Returns the status image for a given status.
function getSentimStatusImg(status){
    const sentimStatusImg = document.createElement("img");
    sentimStatusImg.classList.add("status-img");
    sentimStatusImg.setAttribute("src", `https://http.cat/${status}`);
    return sentimStatusImg;
}

/**
 * Returns the text color for the response text (by it's polarity):
 * Red if negative
 * Green if positive
 * Gray if neutral
 */

function getColor(polarity) {
    if (polarity < 0){
        return "rgb(255,0,0)";
    }
    if (polarity > 0){
        return "rgb(0,255,0)";
    }
    else {
        return "rgb(90,90,90)";
    }
}

// Text is sent upon send button click.
const sendButton = document.querySelector("#send-button");
sendButton.addEventListener("click", showResponse);
