# Contact Management API

An Express.js API for managing contacts. It uses MongoDB as the database and has a RESTful API for creating, reading, updating, and deleting contacts.

## Prerequisites

To run this API, you will need the following:

* Node.js and npm installed
* MongoDB installed and running

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file in the root directory of the project and add the following environment variables:

```
PORT=XXXX
MONGODB_URI=mongodb://localhost:27017/contactDB
```

4. Run `npm run dev` to start the API.

## Usage

The API has the following endpoints:

* `/api/contacts`: This endpoint allows you to create, read, update, and delete contacts.
* `/`: This endpoint returns a simple "Hello" message.

## Postman Documentation and Usage
[Click here](https://learning.postman.com/docs/introduction/overview/) to understand how Postman works and how it's used for API testing.

### Creating a Contact

To create a contact, send a POST request to the `/api/contacts` endpoint with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "0123456789"
}
```

The API will respond with the newly created contact.

### Reading Contacts

To read all contacts, send a GET request to the `/api/contacts` endpoint.

The API will respond with an array of all contacts.

### Updating a Contact

To update a contact, send a PUT request to the `/api/contacts/:id` endpoint with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "0123456789"
}
```

The API will respond with the updated contact.

### Deleting a Contact

To delete a contact, send a DELETE request to the `/api/contacts/:id` endpoint.

The API will respond with a success message.
