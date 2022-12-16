Feature: show/hide an event's details

Scenario: An event element is collapsed by default.
Given user has selected a city from the search box
When the events loads from the server
Then the event elements will be collapsed by default

Scenario: User can expand an event to see its details.
Given the events are loaded and displayed on the screen
When the user clicks on event elements
Then the event element will be expanded and event's details will be shown

Scenario: User can collapse an event to hide its details.
Given an event element is expanded
When user clicks on it
Then the event element will be collapsed again