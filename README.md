# customer-location-tracker
Tracking users location using google map api with react for the UI, express and nodejs for backend and server while using mysql for database.

The system uses google map to compare two marked or pinned location on google map, thereby creating a route between the two point and as well calculating the duration and distance between both point. 

Both point works with google autocomplete places libraries which make it easier for users to find location and get the location marked on map.

A form built using react and the following dependencies:
- use-places-autocomplete for converting address to positional cordinate
- react-icons for icons
- formik for form input and request
- yup for form validation
- axios for http request
- @react-google-maps for serving Google Map functionality such as directional rendering, autocomplete and loading Google map API
- @vis.gl/react-google-maps for serving one good purpose and which is the use of advancedmarker

Backend database model and server design using ExpressJS and Mysql2 withe following depemdencies:
- Cors
- sequelize and sequelize-cli
- mysqli2
- express

The project structure below:

### `└───client`
### `├───public`
### `├───src`
###     `├───index.js`
###     `├───App.js`
###     `├───App.css`
### `├───.env.local`

### `└───server`
### `├───config`
###     `├───config.json`
### `├───models`
###     `├───index.js`
###     `├───Users.js`
### `├───routes`
###     `├───Users.js`
### `├───index.js`
* ... *

    # Setup Instructions
    1. create two seperate folders and name the "client" and "server"
    2. traverse into the "client" folder and create react-app using command npx create-react-app .
    3. Install all dependencies listed above to get on with the design of the UI and the basic functionality
    4. on console.developers.google.com, get your google map api key for your google map. You need to enable four ap:
      - Place API
      - GeoCoding API
      - Map Javascript API
      - Direction API

    5.Traverse to "server" folder and create "package.json" file by running npm init
    6. Install express cors mysql2 sequelize using the command ### `npm i express cors mysql2 sequelize`
    7. install sequelize-cli globally using the command ### `npm i -g squelize-cli`
    8. run sequelize init, and this should  create the following folders:
        - ### `config`, contains the config file, which tells CLI how to connect with the database
        - ### `models`, contains all models for your project
        - ### `migrations`, contains all migration files
        - ### `seeders`, contains all seed files

    # Using WampServer or XampServer or MySQL Workbench
    1. Launch the above mention software in order to create database with any name of your choice. If you do not have the aforementioned software, you can make search for any of it and          download.
    2. Do no create the tables. The tables will be generated automatically using our models which will defined and create each tables and it fields.
    3. Enter the database name in the config.json file at the development section. 
    4. Create your model and as it pertains to this task, a Users model is created with the following fields: 
        - ### `fullname`
        - ### `email address`
        - ### `destination address`
        - ### `latitude (positional cordinates of destination address)`
        - ### `longitude (positional cordinates of destination address)`

    # Lastly create your routes folder for your GET and POST Request
    Also add 
    ### `cors()` middleware so as to connect the React frontend or client with your server when making a POST Request
    ### `express.json()` middlewares to help with parsing json strings to objects when posting to the database
    ### `app.use('/<endpoint>' , <router request file>)` middleware
    
