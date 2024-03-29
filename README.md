# Contact Management API

An Express.js API for managing contacts. It uses MongoDB as the database and has a RESTful API for creating, reading, updating, and deleting contacts.

## Prerequisites

To run this API, you will need the following:

* Node.js and npm installed
* MongoDB installed and running

To test the endpoints:
* [Postman](https://learning.postman.com/docs/introduction/overview/), [Insomnia](https://docs.insomnia.rest/), [curl](https://curl.se/docs/)

## Installation

1. Clone the repository:

```
git clone https://github.com/Meko007/contact-management.git
```

2. Install the dependencies:

```
npm install
```

3. Create a `.env` file in the root directory of the project and follow the [sample file](./.env.sample)

## Running the API

Run the `npm run dev` script to start the development server.

The API will be available at `http://localhost:XXXX/api/v1`

## Usage

The API has the following endpoints:

* `/api/v1` - The base endpoint for all routes.
* `/`: This endpoint returns a simple "Hello" message.

### User endpoints

| Operation | Route | Description |
|:----------|:------|:------------|
| POST | /users/register | Registers a new user |
| POST | /users/login | Logs in user |
| POST | /users/logout Logs out user |
| POST | /users/forgot-password | User forgets password |
| POST | /users/reset-password/:resetToken | User changes password |

### Contact endpoints

| Operation | Route | Auth | Unique user | Description |
|:----------|:------|:-----|:------------|:------------|
| POST | /contacts | Required | Yes | Creates a new contact |
| GET | /contacts | Required | Yes | Returns all contacts if no query parameters are given |
| GET | /contacts/:id | Required | Yes | Returns a contacts by its id |
| PUT | /contacts/:id | Required | Yes | Updates contact |
| DELETE | /contacts/:id | Required | Yes | Deletes contacts |

### Creating a Contact

To create a contact, send a POST request to the `/api/contacts` endpoint with the following JSON body:

```json
{
  "name": "John Doe",
  "phoneNumbers": [
    "0123456789"
  ],
  "email": "john@doe.com", 
}
```

The API will respond with the newly created contact.
