# To Run

An environment file defining the base url `SHORT_BASE_URL` and the MongoDB connection string `MONGO_CONN_STR`

The, execute `npm run start` to start the solution

Open [http://localhost:3000](http://localhost:3000) to see the homepage

# Assumptions and Limitations

- To fulfill the global uniqueness constrains, I leveraged a uuid library from npm, and I gave it a 5 minute once over and it seemed like it was good, but I would like to explore it further to make sure it is actually generating unique ids if the application were to be deployed.

- I used the node MongoClient to connect to the database, which in the long run may have some limitations on expanding the application, but for the MVP of this solution it worked well, and could handle horizontal scaling if the application needed the throughput.

- I am assuming a correct url is entered, taking advantage of built-in client-side validation, but I am not validating a correct URL on the server, the main ramification of this is that the user's short link will redirect them to whatever text they provided.
