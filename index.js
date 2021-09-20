const link = "https://sentim-api.herokuapp.com/";

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
getSentim();
