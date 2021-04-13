### App Name: Kitty Friends

Kitty Friends is an online application helping cats to find new homes. <br>
Link: https://kitty-friends-app.herokuapp.com/

### App Features:

- Pet lovers can view and search for pets that best matches their needs.
- They can then contact the owener using the email or phone number for more details.
- Kitty Friends also allow users to post cats and help them find a new home soon.
- User can manage what he or she has saved or posted.

### Author:

Xingyu Lai: https://xingyu711.github.io/ <br>
Hao Yin: https://pages.github.ccs.neu.edu/calvinyin/calvinyin.github.io/

### Screenshots:

1. Landing page that introduces our app.
   ![Lading page](frontend/src/Images/landingpage-sh.png) <br> <br>

2. Register to use our app.
   ![Register page](frontend/src/Images/registerpage-sh.png) <br> <br>

3. View cats in our database. Find some specific cats using the filters.
   ![Home page](frontend/src/Images/homepage-sh.png) <br> <br>

4. Post a cat for adoption by filling out needed infomation and upload a photo of your cat
   ![Post cat page](frontend/src/Images/postcat-sh.png) <br> <br>

5. Manage your posts and saved cats.
   ![My posts page](frontend/src/Images/myposts-sh.png) <br>
   ![My collections page](frontend/src/Images/mycollections-sh.png) <br> <br>

### Major technologies used:

- MongoDB
- Amazon AWS S3
- Node.js & Express
- JavaScript & React
- HTML & CSS
- Bootstrap
- Heroku

### How to build the project:

1. Install node.js on your computer: https://nodejs.org/en/download/
2. Clone this repository
3. Configs for the backend:

- Create a `.env` file in the root folder and add the following mongoDB credentials as environmental variables: `DB_USER, DB_PASSWORD, DB_NAME`

- Run `yarn install` in terminal to install all the dependencies for the backend
- Run `yarn start` to start the backend server

4. Configs for the frontend:

- Go to the frontend folder `cd frontend`
- Adding the followin credentials for Amazon S3 as environmental variables in your terminal: ` S3_ACCESS_KEY_ID, S3_ACCESS_KEY`

- Run `yarn install` to install all the dependencies for the frontend
- Run `yarn start` to start the frontend server

### Video Demo:

https://drive.google.com/file/d/1pwfLkbC89aSV5b6hXObRevv8ctxOBVcM/view?usp=sharing

### Slides:

https://docs.google.com/presentation/d/1oHSIaTM5l8kA-42WVPsfLQjQN2KlMi3PxGfd9cCcUD4/edit?usp=sharing

### Course:

- CS5610 Web Development Spring 2021
- Northeastern University
- Link to class homepage: https://johnguerra.co/classes/webDevelopment_spring_2021/
