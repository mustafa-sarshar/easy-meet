"use_strict";

(function (params) {
  // Define all HTML elements and variables and constants
  const btnGetAuthURLEl = document.getElementById("btnGetAuthURL");
  const txtResultEl = document.getElementById("txtResult");
  const lnkAuthURLEl = document.getElementById("lnkAuthURL");
  const getAuthURL =
    "https://mrw543502h.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"; // "LAMBDA_GET_AUTH_URL_ENDPOINT";

  const txtCodeInputEl = document.getElementById("txtCode");
  const btnGetTokenEl = document.getElementById("btnGetToken");
  const txtAccessTokenEl = document.getElementById("txtAccessToken");
  const getAccessTokenURL =
    "https://mrw543502h.execute-api.us-east-1.amazonaws.com/dev/api/token"; // "LAMBDA_GET_TOKEN_ENDPOINT";

  const btnGetEventsEl = document.getElementById("btnGetEvents");
  const txtEventsEl = document.getElementById("txtEvents");
  const getCalendarEventsURL =
    "https://mrw543502h.execute-api.us-east-1.amazonaws.com/dev/api/get-events"; // "LAMBDA_GET_CALENDAR_EVENTS_ENDPOINT";

  btnGetAuthURLEl.addEventListener("click", (evt) => {
    fetch(getAuthURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const result = JSON.stringify(json);
        // we get the value of authUrl
        const { authUrl } = JSON.parse(result);
        // then add it to the html
        txtResultEl.innerText = result;
        lnkAuthURLEl.href = authUrl;
      });
  });

  btnGetTokenEl.addEventListener("click", (evt) => {
    let code = txtCodeInputEl.value;
    // if the authorization code is not URL-encoded, then URL-encode it.
    if (decodeURIComponent(code) === code) {
      code = encodeURIComponent(txtCodeInputEl.value);
    }
    const getTokenRequestURL = getAccessTokenURL + "/" + code;

    fetch(getTokenRequestURL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        txtAccessTokenEl.innerText = JSON.stringify(json);
      });
  });

  btnGetEventsEl.addEventListener("click", (evt) => {
    const { access_token } = JSON.parse(txtAccessTokenEl.innerText);
    const eventRequestURL = getCalendarEventsURL + "/" + access_token;

    fetch(eventRequestURL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        txtEventsEl.innerText = JSON.stringify(json, null, 2);
      });
  });
})();
