# easy-meet

A web-app for finding events, helping people to meet each other and get socialized easier.

## FEATURES

- ### **FEATURE 1**: FILTER EVENTS BY CITY

  - #### **SCENARIO 1**: When user hasn't searched for a city, show upcoming events from all cities.

    - **Given** _user hasn’t searched for any city_
    - **When** _the user opens the app_
    - **Then** _the user should see a list of all upcoming events_

  - #### **SCENARIO 2**: User should see a list of suggestions when they search for a city.

    - **Given** _the main page is open_
    - **When** _user starts typing in the city textbox_
    - **Then** _the user should see a list of cities (suggestions) that match what they’ve typed_

  - #### **SCENARIO 3**: User can select a city from the suggested list.

    - **Given** _the user was typing “Berlin” in the city textbox, and the list of suggested cities is showing_
    - **When** _the user selects a city (e.g., “Berlin, Germany”) from the list_
    - **Then** _their city should be changed to that city (i.e., “Berlin, Germany”), and the user should receive a list of upcoming events in that city_

- ### **FEATURE 2**: SHOW/HIDE AN EVENT’S DETAILS

  - #### **Scenario 1**: An event element is collapsed by default.

    - **Given** _user has selected a city from the search box_
    - **When** _the events loads from the server_
    - **Then** _the event elements will be collapsed by default_

  - #### **Scenario 2**: User can expand an event to see its details.
    - **Given** _the events are loaded and displayed on the screen_
    - **When** _the user click on event elements_
    - **Then** _the event element will be expanded and event's details will be shown_
  - #### **Scenario 3**: User can collapse an event to hide its details.
    - **Given** _an event element is expanded_
    - **When** _user clicks on it_
    - **Then** _the event element will be collapsed again_

- ### **FEATURE 3**: SPECIFY NUMBER OF EVENTS

  - #### **Scenario 1**: When user hasn’t specified a number, 32 is the default number.
    - **Given** _user hasn't specified a number_
    - **When** _user want to specify a number of an event_
    - **Then** _the default event number will be 32_
  - #### **Scenario 2**: User can change the number of events they want to see.
    - **Given** _user hasn't given specified the number of events_
    - **When** _user specifies a number of an event_
    - **Then** _the events that has this number will be shown_

- ### **FEATURE 4**: USE THE APP WHEN OFFLINE

  - #### **Scenario 1**: Show cached data when there’s no internet connection.
    - **Given** _there is no internet connection_
    - **When** _the user is using the app_
    - **Then** _the cached data will be used to shown the events_
  - #### **Scenario 2**: Show error when user changes the settings (city, time range).
    - **Given** _the app is in offline mode_
    - **When** _user tries to change the settings_
    - **Then** _an error will be shown_

- ### **FEATURE 5**: DATA VISUALIZATION
  - #### **Scenario 1**: Show a chart with the number of upcoming events in each city.
    - **Given** _an event is selected_
    - **When** _user click on more details_
    - **Then** _a chart with the number of upcoming events in the each city will be shown_
