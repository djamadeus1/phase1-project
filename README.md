steps

Like button - to be added
>> added pending troubleshooting on refresh / prevent defeault functionality 


CURRENT VERSION PASSES LIKES PROPERLY, SHOWS ERROR IN BROWSER CONSOLE DUE TO "E"
function listenForLikeClick(likeButton, jewelry, likeCountPar) {
  likeButton.addEventListener('click', () => {
    jewelry.likes++;
    likeCountPar.textContent = `${jewelry.likes} Likes`;
    e.preventDefault();

    "Uncaught ReferenceError: e is not defined
    at HTMLButtonElement.<anonymous> (index.js:37:5)"


BELOW VERSION - UPDATED W/ E ADDED REFRESHES PAGE BUT LOGS CLICK CORRECTLY
function listenForLikeClick(likeButton, jewelry, likeCountPar) {
  likeButton.addEventListener('click', (e) => {
    jewelry.likes++;
    likeCountPar.textContent = `${jewelry.likes} Likes`;
    e.preventDefault();


Submit functionality - to be confirmed

Click - complete
DOMContentLoaded - complete
"Focus" - Karina has shared 
element.addEventListener('focus', function);


- html
>>> remember to pull "liker button" code..what does code to pull in 'most liked' look like...
>>> ramen has ratings...we want likes...need to figure out that change, maybe this is where toy tale code comes in..

>> "Featured Jewlery" section --> key, this is where ideally 'most liked' gets populated somehow...

1. click functionalty, underlying detail information not populating correctly. 

A) updates to ensure likes, details for each item populate w/ correct tags
> updates needed to json
> updates needed javascript to pull in proper tags
> handlClick bug, used to be showing name of jewelry console logged

B) for the information to show center justified

- javascript
>> does ramen rater code as foundation play bigger role in javascript...

- css
>> table this until we have html + JS in better places
>> nothing in there right now...do we pull from toy tale and/or ramen

+ pending confirmed new sumbission functionality, have jewelry pictures begin to populate on left and right

- json
>> basic updates needed: jewelry links, names, prices, etc
>> do we need to follow similar steps from Ramen to get server 'running' ?


milestones
- 10/21 basic functionality aligned to Ramen Rater, but for jewelry
- 10/22 add on builds ('most liked' video functionality, mouseover, and custom CSS aesthetic begin to be implemented)
- 10/23 debugging, fine tuning, asking emily feedback