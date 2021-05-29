# JWT-Mongoose-NodeJS-RESTAPI

Author: Orel Vaizman

That project is a REST API project that's written in Node.JS, it's including two entities (Team, User), JWT is being used for user-autentication, and Mongoose as for the database-persistence layer.

# Project-Running-instructions

1. Run npm install
2. Run npm start

# Requests-Running-instructions

-   Fields' Lengths' resitrications can be found at the models. \*

-   User Requests \*

1. Registering a user request: The request requires the following data to be send through the body: { firstName, lastName, email, password, confirmPassword }.

2. Logging a user request: The request requires the following data to be send through the body: { email, password }

3. Logging a user out request: No information should be sent.

-   Team Requests \*

1. Creating a team request: The request requires the following data to be send through the body: { name }

2. Deleting a team request: The request requires the following data to be send through the body: { teamId }

3. Adding a member request: The request requires the following data to be send through the body: { teamId, userId }

4. Updating a member's status request(Manager status updating): The request requires the following data to be send through the body: { userId, teamId, isManager (true/false) }
