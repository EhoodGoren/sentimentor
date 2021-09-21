# Sentimentor

Go here: https://sentim-api.herokuapp.com/. This is an API that tries to determine if a text expresses positive or negative emotions. The problem is, it doesn't have a nice webpage to display the results.

Your job is to fix that!

## Requirements

Your webpage will contain:

-   a `textarea` input where the user can write/paste text
-   a `button` for sending the text to the API
-   an area to display the result

Once the API returns an answer, the results area will contain:

-   the numeral `polarity` of the result
-   the string `type` of the result (positive/negative)
-   both of the above should be green if positive, red if negative, and grey if neutral.

While the result from the API is still being loaded, the results area will contain a "loading" indicator. Feel free to use a cool spinner animation.

If the API returns an error, the results area will show a message that there was an error.

## Bonuses

-   Below the results area, display the appropriate [HTTP Cat](https://http.cat/) based on the status of the response.

## Submission

1. On GitHub, open a pull request from your branch to the main branch.
2. **Do not merge the pull request!**
3. Add the user `Cyber4sPopo` as collaborator to your repo.
4. Submit a link to the pull request in Google Classroom.

## Additional Notes

-   Remember objects need to be serialized so you can send them.
-   Remember HTTP status codes above 400 are errors.
