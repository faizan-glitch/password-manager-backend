# Password Manager Backend
This Nodejs app will serve as a backend for the complete re-write of the Password Manager app.
## Getting Started
1. Download and Install [Node.js](https://nodejs.org/en/download/)
  * Linux (Ubuntu based distros)
  ```console
    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install nodejs
  ```
2. Clone the [Github Repo](https://github.com/faizan-glitch/password-manager-backend)
  ```properties
  git clone https://github.com/faizan-glitch/password-manager-backend.git
  ```
3. Go into the local copy of the repo.
### Installing Dependencies
Type the following command in the terminal
 ```properties
 npm install
 ```
### Setting the App Key via Environment Variables
1. Replace the **.env.example** with the **.env** file. 
### Running the app
  * Development environment
    ```properties
    npm run dev
    ```
  * Production environment
    ```properties
    npm start
    ```
The app should now be running :)
