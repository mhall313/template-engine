//Given with assignment
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//An array to contain all employee objects - aka the team
const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//Function to initialize node.js prompt via inquirer method to gather data from the user
function init() {
    //Function to collect data about the manager first including some data validation. In future state this would include more sophisticated data validation.
    function addManager(){
        console.log("Thank you for chosing Team Design to track your team. Let's start with your manager.");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Who is managing the project?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter the manager's name";
                }
            },
            {
                type: "number",
                name: "managerID",
                message: "What is the manager's ID?",
                validate: answer => {
                    if(answer > 0){
                        return true;
                    }
                    return "Please enter a number for the manager's ID.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email address?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter the manager's email address";
                }
            },
            {
                type: "input",
                name: "managerOffice",
                message: "What is the manager's office number?",
                validate: answer => {
                    if(answer > 0){
                        return true;
                    }
                    return "Please enter a number for the manager's office number.";
                }
            }
        ]).then(answers => {
            //Adds new object manager using the Manager class
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
            team.push(manager);
            //Moves to next step in adding team memebers
            addTeam();
        })
    }

    //Continue to prompt user for further team data - includes option to "opt out" of adding additional members
    function addTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "membRole",
                message: "What is your teammate's role?",
                choices: [
                    "intern",
                    "engineer",
                    "I'm done adding members."
                ]
            }

        //If the user selects either intern or engineer, continue with appropriate prompts. Otherwise, execute generateTeam()
        ]).then(answer => {
            if(answer.membRole === "engineer"){
                addEngineer();
            }
            else if (answer.membRole === "intern"){
                addIntern();
            }
            else{
                //If no more memebers, generate team
                generateTeam();
            }

        })
    }
    //Similar to addManager - prompt user for engineer specific team info
    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engName",
                message: "What is your teammate's name?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter your teammate's name";
                }
            },
            {
                type: "number",
                name: "engID",
                message: "What is your teammate's ID?",
                validate: answer => {
                    if (answer > 0 ){
                        return true;
                    }
                    return "Please enter a number for the teammate's ID.";
                }
            },
            {
                type: "input",
                name: "engEmail",
                message: "What is your teammate's email address?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter your teammate's email address";
                }
                    
            },
            {
                type: "input",
                name: "engGithub",
                message: "What is your teammate's GitHub username?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter your teammate's github username or N/A";
                }
            }
        ]).then(answers => {
            //Adds new object engineer using the Engineer class
            const engineer = new Engineer(answers.engName, answers.engID, answers.engEmail, answers.engGithub);
            team.push(engineer);
            //Prompts for potential new teammate
            addTeam();
        })

    }
    //Similar to addManager and add Engineer - prompt user for intern specific team info
    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your teammate's name?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter your teammate's name";
                }
            },
            {
                type: "number",
                name: "internID",
                message: "What is your teammate's ID?",
                validate: answer => {
                    if (answer >0 ){
                        return true;   
                    }
                    return "Please enter a number for the teammate's ID.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your teammate's email address?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter your teammate's email address";
                }
                    
            },
            {
                type: "input",
                name: "internSchool",
                message: "Where does your teammate go to school?",
                validate: answer => {
                    if (answer){
                        return true;
                    }
                    return "Please enter your teammate's school or N/A";
                }
            }
        ]).then(answers => {
            //Adds new object intern using the class Intern
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            team.push(intern);
            //Prompts or any new teammates
            addTeam();
        })
    }

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!
    
    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.

    function generateTeam(){

        //creates directory if it doesnt exist for output path called teamMembers with style utf-8
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
          }
          fs.writeFileSync(outputPath, render(teamMembers), "utf-8");   
    }
    //Execute addManager to start
    addManager();
}

//initialize app
init();


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


