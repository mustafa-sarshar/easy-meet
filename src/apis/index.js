import NProgress from "nprogress";

import fullStackWebDevCalendarEvents from "../assets/data/full-stack-web-dev-calendar-events";
import mockData from "../assets/data/mock-data";

const extractLocations = (events) => {
  const extractLocations = events.map((event) => event.location);

  return [...new Set(extractLocations)];
};

const getEvents = async () => {
  return mockData;
};

const getEventsFull = async () => {
  return fullStackWebDevCalendarEvents;
};

const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.message);

  return result;
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const url = `https://mrw543502h.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodeCode}`;
  const { access_token } = await fetch(url)
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await fetch(
        "https://mrw543502h.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      )
        .then((res) => res.json())
        .catch((error) => error.message);
      if (results.authUrl) {
        const { authUrl } = results;
        return (window.location.href = authUrl);
      }
    }

    return code && getToken(code);
  }

  return accessToken;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newUrl);
  } else {
    const newUrl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newUrl);
  }
};

const getEventsFromServer = async () => {
  NProgress.start();

  const isLocal =
    window.location.href.startsWith("http://127.0.0.1") ||
    window.location.href.startsWith("http://localhost");

  if (isLocal) {
    NProgress.done();
    return fullStackWebDevCalendarEvents;
  }

  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://mrw543502h.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${token}`;
    const results = await fetch(url)
      .then((res) => res.json())
      .catch((error) => error.message);
    if (results.events) {
      const locations = extractLocations(results.events);
      localStorage.setItem("lastEvents", JSON.stringify(results));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();

    return results.events;
  }
};

export {
  extractLocations,
  getEvents,
  getEventsFull,
  getEventsFromServer,
  checkToken,
  getAccessToken,
};
