# ElementMixer

ElementMixer is a game based on Alchemy. The aim is to find as many recipes as you can!


## Table of Contents
* [User Experience Design (UX)](#User-Experience-Design)
    * [The Strategy Plane](#The-Strategy-Plane)
        * [Site Goals](#Site-Goals)
        * [User stories](#User-Stories)
    * [The Scope Plane](#The-Scope-Plane)
    * [The Structure Plane](#The-Structure-Plane)
    * [The Skeleton Plane](#The-Skeleton-Plane)
        * [Wireframes](#Wireframes)
        * [Database Design](#Database-Design)
        * [Security](#Security)
    * [The Surface Plane](#The-Surface-Plane)
        * [Design](#Design)
            * [Colour Scheme](#Colour-Scheme)
            * [Typography](#Typography)
            * [Imagery](#Imagery)
    * [Differences to Design](#Differences-to-Design)
- [Features](#Features)
    * [Existing Features](#Existing-Features)
    * [Future Features](#Features-Left-to-Implement)
* [Technologies](#Technologies)
* [Testing](#Testing)
    * [Test Strategy](#Test-Strategy)
    * [Test Results](#Test-Results)
    * [Isses and Resolutions](#Issues-and-Resolutions-to-issues-found-during-testing)
* [Deployment](#Deployment)
    * [Project Creation](#Project-Creation)
    * [GitHub Pages](#Deployment-To-Heroku)
    * [Run Locally](#Run-Locally)
    * [Fork Project](#Fork-Project)
* [Credits](#Credits)
  * [Content](#Content)
  * [Acknowledgements](#Acknowledgements)





### Project Creation

**Note: The project will not run locally with database connections unless the user sets up an [env.py](https://pypi.org/project/env.py/) file configuring IP, PORT, 
MONGO_URI, MONGO_DBNAME and SECRET_KEY. You must have the connection details in order to do this. These details are private and not disclosed in this repository for security purposes.**

### Local deplyoment

1. Click on the green 'code' button on the repository
1. Select one of two options 'Download as ZIP', 'Open with GitHub Desktop'
1. If 'Download as ZIP' has been chosen, follow the steps below:
1. Once the folder has been downloaded, un-ZIP the folder using a third-party application like WinZip, WinRAR
1. Open the unzipped folder into your IDE (integrated development environment)
1. For VSCode users, you can download the 'Live server' plugin and launch the project using a local server
1. For users using any other IDE you will need to find out how to launch this project on the respective IDE
1. Open your IDE of choice then open its terminal window (CLI) and locate the projects directory
1. Use the 'git clone' command in the terminal followed by the copied git URL
1. A clone of the project will be created locally on your machine.

### Deployment to Heroku

**Create application:**
1. Navigate to Heroku.com and login
1. Click on the new button
1. Select create new app
1. Enter the app name
1. Select region
1. Deploy App

**Set up connection to Github Repository:**

1. Click the deploy tab and select GitHub - Connect to GitHub
1. A prompt to find a github repository to connect to will then be displayed
1. Enter the repository name for the project and click search
1. Once the repo has been found, click the connect button

**Set environment variables:**

Click the settings tab and then click the Reveal Config Vars button and add the following:

1. key: IP, value: 0.0.0.0
2. key: PORT, value: 5000
3. key: MONGO_DBNAME, value: (database name you want to connect to)
4. key: MONGO_URI, value: (mongo uri - This can be found in MongoDB by going to clusters > connect > connect to your application and substituting the password and 
    dbname that you set up in the link).
5. key: SECRET_KEY, value: (This is a custom secret key set up for configuration to keep client-side sessions secure).

**Enable automatic deployment:**
1. Click the Deploy tab
1. In the Automatic deploys section, choose the branch you want to deploy from then click Enable Automation Deploys.

### Fork Project 

Forks are used to either propose changes to someone else's project or to use someone else's project as a starting point 
for your own idea. - Definition from [Github Docs](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo).

1. Navigate to the GitHub Repository you want to fork.
1. On the top right of the page under the header, click the fork button.
1. This will create a duplicate of the full project in your GitHub Repository.




