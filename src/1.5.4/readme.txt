
Version 1.5.4

* fixed callbacks to be function based instead of time based (//TODO link)

// TODO callbacks for after gather_all_events() and get_users_db() to call localstorage_function to "repick" our last picked username filter

Version 1.5.3

* added local storage to remember last picked users for display filter
* fixed username to deprecete "@domain" suffix
* fixed password length to be >=6


Version 1.5.2

* Fix in date bug.

Version 1.51

* Added filtering to calendar
* Events colored by source
* Admin is capable of choosing colors for users (including himself)
* Moved libraries to libs
* Create new users (only admin)

Version 1.5

* Added Admin-page
* Auth by FireAuth
* Added icons for buttons


Version 1.43

* updated "back button" to image
* fixed hebrew unicode issue with links

Version 1.42

* added back button
* added Load screen for facebook page (?)

Version 1.41

*fix - config.js on /facebook_page variable name was incorrect


Version 1.4

* Autheration by APP id instead of user-token, allowing grasp of event data without logging in
* modulized config javascript in both config files and script files
* hidden app id source with predefined password under module
* hidden token id by app-id in module

// TODO
* Autheration page (login) for Facebook page database

Version 1.3

* added Facebook event database manipulation page
* based configuration file on source
* added Google Firebase operation API to db page
* added viewable table and buttonized operation to table

// TODO

* Autheration by ID


Version 1.2

* moved token variable to configuration
* added Google Firebase API to API-key configuration on config file
* added firebase-DB support and load
* added dynamic event from facebook load and render

// TODO

* Facebook DB page manipulation page




Version 1.1

* added Facebook API
* added pre-configured JS file to convert Facebook API date to generlized date
* added function to gather events from pre-configured Facebook page
* lists all said event on fullcalendar API
* virtual defiance on index.html to define each list of imports to it's conclusion
* completed skeleton 

// TODO
* dynamic loaded Facebook page (/event) loading
* database to load Facebook pages from





First version

* added a virtual div for calendar 
* chosen an apporpiate calendar API
* added chosen calendar API to logic and interface operations
* did a skeleton build for apporpiate functions

// TODO

* add facebook API
* add facebook page control page
* add all events from facebook page database to calendar and load them