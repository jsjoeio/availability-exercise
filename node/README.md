# Thinkful Availability Exercise Server

A Node.js API created for a technical assessment. This server is live at [`https://floating-reaches-66025.herokuapp.com/`]('https://floating-reaches-66025.herokuapp.com/advisors).

## Running Locally

After cloning the repository, in the root, run:

```bash
npm install
```

To start the server, run:

```bash
npm run dev
```
Navigate to [`http://localhost:4433/`]('http://localhost:4433/) to verify that it's working.



To run tests, run:

```bash
npm test
```

## Deploying

This project is currently hosted by Heroku. Because it lives in a monorepo, deployment is different than your typical automatic CD process.

We have to push a 'subtree' of the project by running the following:

```bash
# From the root of the project
git subtree push --prefix node heroku master
```