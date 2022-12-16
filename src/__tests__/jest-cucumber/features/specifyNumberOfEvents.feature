Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given user hasn't specified a number
When user want to specify a number of an event
Then the default event number will be 32

Scenario: User can change the number of events they want to see.
Given user hasn't given specified the number of events
When user specifies a number of an event
Then the events that has this number will be shown