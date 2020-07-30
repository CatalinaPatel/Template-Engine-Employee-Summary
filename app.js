const fs = require("fs");
const path = require("path")
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/TeamRenderer");

const teamMembers = []

function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Type of Employee",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "No more employees"
                ]
            }

        ]).then(userChoice => {
            switch (userChoice.memberChoice) {

                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "No more employees":
                    const generatingHtml = render(teamMembers);
                    console.log(generatingHtml)
                    fs.writeFile(outputPath, generatingHtml, function (err) {
                        if (err) throw err
                        console.log("success")
                    })
                    break
            }
        })

    function addManager() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your name?",
                    name: "managerName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "managerID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "managerEmail"
                },

                {
                    type: "input",
                    message: "What is your office number?",
                    name: "managerOfficeNumber"
                }

            ]).then(userChoice => {
                console.log(userChoice);

                const manager = new Manager(userChoice.managerName, userChoice.managerID, userChoice.managerEmail, userChoice.managerOfficeNumber)

                teamMembers.push(manager)

                createTeam();
            })
    }

    function addEngineer() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your name?",
                    name: "engineerName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "engineerID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "engineerEmail"
                },

                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "gitHubUsername"
                }
            ]).then(userChoice => {
                console.log(userChoice);

                const engineer = new Engineer(userChoice.engineerName, userChoice.engineerID, userChoice.engineerEmail, userChoice.gitHubUsername)

                teamMembers.push(engineer)

                createTeam();
            })
    }

    function addIntern() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your name?",
                    name: "internName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "internID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "internEmail"
                },

                {
                    type: "input",
                    message: "What school do you attend?",
                    name: "internSchool"
                }
            ]).then(userChoice => {
                console.log(userChoice);

                const intern = new Intern(userChoice.internName, userChoice.internID, userChoice.internEmail, userChoice.internSchool)

                teamMembers.push(intern)

                createTeam();
            })
    }
}
module.exports = teamMembers

createTeam();
