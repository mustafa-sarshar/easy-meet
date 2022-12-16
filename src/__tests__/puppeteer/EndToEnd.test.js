import puppeteer from "puppeteer-core";

// General Settings for puppeteer
jest.setTimeout(30000);
const puppeteerConfigs = {
  browserAppPath: "/usr/bin/google-chrome-stable",
  serverURL: "http://localhost:3000/",
  slowMoDuration: 250, // ms
  headlessFlag: true,
  waitForTimeoutDuration: 1000, // ms
};

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: puppeteerConfigs.browserAppPath,
      headless: puppeteerConfigs.headlessFlag,
      slowMo: puppeteerConfigs.slowMoDuration,
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto(puppeteerConfigs.serverURL);
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event-details");

    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .event-button__details");
    const eventDetails = await page.$(".event .event-details");

    expect(eventDetails).toBeDefined();
    await page.waitForTimeout(puppeteerConfigs.waitForTimeoutDuration);
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .event-button__details");
    const eventDetails = await page.$(".event .event-details");

    expect(eventDetails).toBeNull();
    await page.waitForTimeout(puppeteerConfigs.waitForTimeoutDuration);
  });
});

describe("Filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: puppeteerConfigs.browserAppPath,
      headless: puppeteerConfigs.headlessFlag,
      slowMo: puppeteerConfigs.slowMoDuration,
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto(puppeteerConfigs.serverURL);
    await page.waitForSelector(".city-search");
  });

  afterAll(() => {
    browser.close();
  });

  test("At first the city search box is empty", async () => {
    const txtCitySearchEl = await page.$(".city-search__city");
    const searchText = await page.evaluate(
      (searchBox) => searchBox.value,
      txtCitySearchEl
    );

    expect(searchText).toBe("");
  });

  test("User enters the character 'Mumbai' in the search box", async () => {
    await page.focus(".city-search__city");
    await page.keyboard.type("Mumbai", { delay: 500 });
  });

  test("User selects 'Mumbai, Maharashtra, India' from the suggested cities", async () => {
    const suggestionsEl = await page.$$(".city-search__suggestions li");
    await suggestionsEl[0].click();
  });

  test("All events that take place in 'Mumbai, Maharashtra, India' will be shown (limited to the specified number of events)", async () => {
    await page.waitForTimeout(puppeteerConfigs.waitForTimeoutDuration);
  });
});

describe("Specify number of events shown", () => {
  let browser;
  let page;
  const nEventsToShow = 2;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: puppeteerConfigs.browserAppPath,
      headless: puppeteerConfigs.headlessFlag,
      slowMo: puppeteerConfigs.slowMoDuration,
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto(puppeteerConfigs.serverURL);
    await page.waitForSelector(".event-numbers");
  });

  afterAll(() => {
    browser.close();
  });

  test("By default the number of events shown is 32", async () => {
    const eventsEl = await page.$$(".event");

    expect(eventsEl).toHaveLength(32);
  });

  test(`User enters ${nEventsToShow} for the number of events`, async () => {
    await page.click(".event-numbers", { clickCount: 3 });
    await page.keyboard.type("" + nEventsToShow, { delay: 500 });

    const txtEventNumbersEl = await page.$(".event-numbers");
    const nEventsEntered = await page.evaluate(
      (searchBox) => searchBox.value,
      txtEventNumbersEl
    );

    expect(nEventsEntered).toBe("" + nEventsToShow);
  });

  test(`Only ${nEventsToShow} events are shown`, async () => {
    const suggestionsEl = await page.$$(".event");
    expect(suggestionsEl.length).toBe(nEventsToShow);

    await page.waitForTimeout(puppeteerConfigs.waitForTimeoutDuration);
  });
});
