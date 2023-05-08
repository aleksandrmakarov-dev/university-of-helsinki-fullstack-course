# Part 0 exercises

## Exercise 0.4

Create a similar diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button.  

```mermaid
sequenceDiagram
    participant User
    participant Form
    participant Server
    User ->> Form: inputs data and submits
    activate Form
    Form ->> Server: sends POST request to /new_note
    deactivate Form
    activate Server
    Note right of Server: saves new note <br/>to array or database
    Server -->> User: responds with status code 302 (found)
    deactivate Server
    Note left of User: reloads page
    User ->> Server: sends GET request to receive notes
    activate Server
    Server -->> User: responds with status code 200 and array of notes
    deactivate Server
```

## Exercise 0.5

Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.  

```mermaid
sequenceDiagram
    participant User
    participant Server
    User ->> Server:sends GET request to receive HTML, CSS and JS files
    activate Server
    Server -->> User:responds with HTML, CSS and JS files
    deactivate Server
    Note left of User: executes JS code and <br/> sends AJAX request <br/> to receive json data
    User ->> Server: sends GET to /exampleapp/data.json
    activate Server
    Server -->> User: responds with JSON document of notes
    deactivate Server
    Note left of User: When response is received,<br/> JS executes function which <br/>redraws notes with <li></li> elements
```

## Exercise 0.6

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.  

```mermaid
sequenceDiagram
    participant User
    participant Form
    participant Server
    User ->> Form: inputs data and submits
    activate Form
    Note right of Form: default POST <br/>action is prevented, <br/>new note is added to <br/>existing notes array
    Form ->> Server: sends POST request with new note to /new_note
    deactivate Form
    activate Server
    Server -->> User: responds with 201 status code (success)
    deactivate Server
```