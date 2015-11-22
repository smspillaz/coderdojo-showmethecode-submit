# CoderDojo WA - Show Me the Project Submission

A Node.js web-application for students to submit projects and for mentors to view them on the leader-computer.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running Locally

You'll need to create a postgres database and provide it in `DATABASE_URL`, eg `export DATABASE_URL=postgres:///my_database`. Tables will be created automatically.

Authentication to get in to the dojo master view happens with Google's OAuth2 backend. You'll need to add your profile ID to the `user` table in the database manually for now. The application requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to be set. You can get some of those by creating an application on Google Developer Console that just requires the ability authenticate via email address, going to "Credentials" and filling out the form. Keep those tokens secret.

After that, its just a matter of:

```
$ git clone git://github.com/smspillaz/coderdojo-showmethecode-submit # or clone your own fork
$ cd coderdojo-showmethecode-submit
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
