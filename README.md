# TopBrainFrame
This project is a cloud-based project management application built with React, Express, and MySQL.

## How to Run the Project
Follow these steps to set up and run the project:

### 1. Install MySQL
Begin by installing MySQL on your machine if it is not already installed.

### 2. Configure Environment Variables
Rename the file from topbrainframe > server > .env.example to .env.development. Update the contents of .env.development to match your MySQL configuration settings.

### 3.Set Up the Client Proxy
Navigate to topbrainframe > client and update the proxy setting in the package.json file to match your server's URL, e.g., "proxy": "http://127.0.0.1:5443".

### 4. Open Command Prompts
Open two command prompt windows. In one window, navigate to the client folder, and in the other, navigate to the server folder.

### 5. Install Dependencies
In each command prompt window, run the command npm install to install necessary dependencies for both the client and server.

### 6. Start the Project
Once installation is complete, in the client command prompt, run npm run start to start the client. In the server command prompt, run npm run dev to start the server.

## Additional Tips
- Ensure that your MySQL service is running before you try to connect from your application.
- Check that the ports specified in your .env.development and proxy settings are open and not being used by another service.
