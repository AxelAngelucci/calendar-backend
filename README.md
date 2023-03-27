  

# Calendar Backend

A simple backend to comments management.

  

### Tech Stack

- Developed using [node.js](https://nodejs.org/en) .
- [Express](https://expressjs.com/es/) .
- Firestore as DB.
- [Typescript](https://www.typescriptlang.org) .
- MVC Model.
- [JEST](https://jestjs.io/)
  
  

## About

This project belongs to Axel Angelucci. It's divided between a REST API Server, developed using [node.js](https://nodejs.org/en) and [Express](https://expressjs.com/es/) using Firestore as DB. Meanwhile, it has a [NextJs](https://nextjs.org) with [Typescript](https://www.typescriptlang.org) frontend, wich is a framework that works on top of [React](https://reactjs.org). It is styled with [SASS](https://sass-lang.com/), featuring a responsive layout.

  

**Before Running Anything**, you need to follow theese steps:

  

**Backend**

- Add your personal Firestore json key in src/config

- Run the backend:

```

npm install

npm run build

npm start

```

  

**Frontend**

- In .env.local, add the APOD API URL with your own API KEY and add your own comments API URL or use my deployed api "https://calendar-nasa-backend.onrender.com/comments/"

```

NEXT_PUBLIC_NASA_API = your-APOD-API

  

NEXT_PUBLIC_COMMENTS_API = your-comments-API

```

- Run the FrontEnd:

```

npm install

npm run dev

```


  

Every operation runs through Controllers. There's one for each module. While requests and responses are also modelled in JAVASCRIPT with the usage of MVC pattern, the server will handle JSON bodies back and forth.\

When testing the endpoints, one must note that JSON objects are **camelCased**

  
 ## Using the API:
 ENDPOINTS: 
 ```GET https://calendar-nasa-backend.onrender.com/comments/2023-01-01``` - get all comments for a date
  ```POST https://calendar-nasa-backend.onrender.com/comments/2023-01-01``` - set a new comment
 
 
 
 As we can see, the endpoints only receive one parameter, which is the date in format YYYY-MM-DD
 ### Required data for GET querys: NONE, just run the query in a valid enpoint
  ### Required data for POST querys:
```

name: string

date: string

commeny: string

```
 ### GET query EXAMPLE:
 ```

GET https://calendar-nasa-backend.onrender.com/comments/2023-01-01

RESPONSE:

[
	{
		"actualDate": "2023-03-26",
		"name": "Axel",
		"comment": "lorem"
	},
	{
		"actualDate": "2023-03-26",
		"name": "Axel",
		"comment": "test comment"
	},
]

```
 
  ### POST query EXAMPLE:
 ```

POST https://calendar-nasa-backend.onrender.com/comments/2023-03-03

REQUEST:
	{
		"actualDate": "2023-03-26",
		"name": "Axel",
		"comment": "lorem"
	},


RESPONSE:
	{
		"actualDate": "2023-03-26",
		"name": "Axel",
		"comment": "lorem"
	},


```


## File Structure:

Note that:

- Folders that have ":" below indicate many files of a certain kind.

- Files named [Type] mean that they have a custom name, and are classes

that are related to that specific "Type".

  

### Backend:

```

Calendar Backend:

├── package.json
├── package-lock.json
├── src
│   ├── app.ts
│   ├── config
│   │   ├── db.ts
│   │   └── key.json
│   ├── controllers
│   │   ├── comments.controller.ts
│   │   └── jest.config.js
│   ├── helpers
│   │   └── customValidationResult.ts
│   ├── middlewares
│   │   ├── validateBody.middleware.ts
│   │   └── validateParam.middleware.ts
│   ├── routes
│   │   └── comments.routes.ts
│   └── __tests__
│       └── comments.controller.spec.ts
└── tsconfig.json

```