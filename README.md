# Online Grocery Store Project

RUN INSTRUCTIONS:

 - You must have nodejs and MySQL server installed on your computer
 - Download the project zip folder and unzip its contents
 - In order to use the webapp you will need to set up a local MySQL database server that the app can connect to. The backend server will be looking for a database to connect to based on the following criteria which must be matched when setting up the database: host: "localhost", user: "root", password: "password", database name: "grocery_store". 
  - A dump-file has been provided in the project folder. Once you have set up the new database, import the dump file (from command-line: ‘mysql -u [username] -p [database name] < [Dump20230409.sql])
 - Once you have set up the database, start the sql server by running ‘service mysql start’ from command-line. Ensure it is running (there are many command-line ways to check, such as ‘sudo service mysql status’)
 - Now you can launch the webapp. There are 2 sub-folders in the directory called ‘app’ and ‘backend’. You must navigate into each subfolder and run the terminal command ‘npm start’ in order to start the webapp
 - Now you should be able to go to ‘localhost:8080/’ in a browser to see the webapp

Citations:
all images are from www.walmart.ca
code citations are within code files (where applicable)
