# README
ShakaProject is a message posting app

It is created with a React front end 
and a Ruby on Rails back end

Users sign up with their first name, 
username, email, password and can choose 
to be an admin

Utilizes bcrypt gem to store the password
securely

Users login using only their username
and password, both are case sensitive

Regular users can only edit and delete 
their own messages

Admin users can edit and delete any 
users message

Only shows five messages at the time
the rest are paginated

Can filter messages based on first
name, username or time message was
created

This app utilizes Redux for state 
management, Bootstrap & Reactstrap
for a better user interface, and 
Jest & Enzyme for testing components

TO RUN THE APP: rails s
FIND ON: localhost:3000

TO RUN TESTS: npm test