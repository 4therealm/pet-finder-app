# PawPrints: The Ultimate Pet Finder App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### "Find your lost pet with ease using **PawPrints** - the ultimate pet finder app. Create a pet profile, report them missing, and track their location with GPS technology. Join our community and reunite with your furry friend today!"

## Links

- [Source Code](https://github.com/4therealm/pet-finder-app)
- [Deployed App](https://pet-finder-application.herokuapp.com)


## Description

The Pet Finder App helps pet owners locate their lost pets quickly and efficiently. Create a profile for your pet with their name, breed, age, and photo, and report them as missing through the app. Our app uses TensegrityJS, a JavaScript library that helps identify the breed of the pet you are adding, making it easier to match your pet with other lost pets. The app also uses GPS technology to track both your and your pet's location, so you can easily reunite with your furry friend. Additionally, we've integrated Twilio to alert pet owners when their pet has been spotted by others. Others in the area can also report sightings through the app, notifying you immediately. Join our community and reunite with your lost pet joyfully!

## Table of Contents
- [Usage](#usage)
- [Installation](#installation)
- [License](#license)
- [Things We Learned](#things-we-learned)
- [Sources](#sources)
- [Team](#team)
- [RoadMap](#roadmap)

## Usage

* Create a profile for your pet with their name, breed, age, and photo.
* Report your missing pet through the app to alert other users in the area.
* The app's GPS technology tracks you and your pet's location, making it easy to reunite with your furry friend.
* Other users can report sightings through the app, notifying you immediately.
* Join our community and joyfully reunite with your lost pet!

## Installation

Follow these steps to set up the project on your local machine:

1. Ensure that you have the following prerequisites installed:
   - [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
   - [npm](https://www.npmjs.com/get-npm) (usually included with Node.js)

2. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo```

3. Install the required dependencies:
   ```sh
   npm install```

4. Create a `.env` file in the root directory of the project and add the following environment variables:
   ```sh
    MONGODB_URI=<your MongoDB connection string>
    PORT=<your port number>
    API_KEY=<your Google Maps API key>
    TWILIO_ACCOUNT_SID=<your Twilio account SID>
    TWILIO_AUTH_TOKEN=<your Twilio auth token>
    TWILIO_PHONE_NUMBER=<your Twilio phone number>
    ```
5. Start the development server:

   ```sh
   npm run develop```

6. Open your browser and navigate to `http://localhost:3000` to view the app.


## License

Click the license badge at the beginning of the document to get more info.

## Things We Learned

* Building a fully functional web application including client-side and server-side from start to finish.
* Working together as a group, utilizing our strengths to code the different parts of the site, troubleshooting as a team.
* Using the MVC paradigm to organize our code.
* Using React to build the front end.
* Using Node.js and Express to build the back end.
* Using MongoDB to store our data.
* Using Mongoose to create our models.
* Using the Google Maps API to track the location of the user and their pet.

## Team

- [4therealm](https://github.com/4therealm)
- [Kenny4297](https://github.com/Kenny4297)
- [ElizabethGonzalez11](https://github.com/ElizabethGonzalez11)
- [EshuShango](https://github.com/EshuShango)

## RoadMap

* Refactor code to be more efficient.
* Make UI "prettier".
* Continued improvements to make the app more user friendly.
* TODO: Add a Feed, which would run Ads for pet foods, items, Health Care and Donations etc (this could be for potential sponsorship and/or paid ads to generate funds etc)."

## How to Contribute

We welcome contributions from the community! To get started, please follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right corner of this repository to create your own copy.

2. **Clone your fork**: Clone your forked repository to your local machine by running the following command (replace `YOUR_USERNAME` with your GitHub username):

```git clone https://github.com/4therealm/pet-finder-app.git```

3. **Create a new branch**: Create a new branch for your feature or bug fix. Use a descriptive name for your branch, such as `add-new-feature` or `fix-bug`. To create and switch to a new branch, run:

```git checkout -b your-branch-name```

4. **Make changes**: Make the necessary changes in your branch, and commit them with a clear and concise commit message.

5. **Push your changes**: Push your changes to your forked repository on GitHub.

```git push origin your-branch-name```

6. **Create a Pull Request**: Go to your forked repository on GitHub, and click the "New pull request" button. Choose the branch with your changes, and submit a pull request to the main repository.

7. **Wait for a review**: Please be patient while the project maintainers review your pull request. They may ask for additional changes or improvements. Once your pull request is approved and merged, your changes will become part of the project.

### Code of Conduct

We expect contributors to follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a positive and inclusive environment for everyone involved in the project.

### Reporting Issues and Requesting Features

If you find a bug or have a feature request, please create a new issue in the repository's issue tracker. Provide as much information as possible to help us understand and address your concerns.

Don't hesitate to reach out to the project maintainers if you have any questions or need assistance. We appreciate your contribution!

## Acknowledgments

We would like to extend a heartfelt thank you to our cohort teacher, Gary Almes, and his TA, Kathryn Vincent. Their tireless efforts, guidance, and support have been instrumental in enabling us to complete this project. We are truly grateful for their dedication and the knowledge they've shared with us throughout our learning journey.
