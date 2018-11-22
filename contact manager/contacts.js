/* 
Activity: Contact manager
*/

// TODO: Complete the program
//Poner Prompts y fijarme en un loop para lo de quit

var greetingName = prompt ("Enter your name:");
alert ("Hi " + greetingName + ", wellcome to your contacts manager!");

var Contact = {
    init: function (name, surname) {
        this.name = name;
        this.surname = surname;
    },
    describe: function () {
        var description = this.name + " " + this.surname;
        return description;
    }
};

var contact1 = Object.create(Contact);
contact1.init("John", "Smith");

var contact2 = Object.create(Contact);
contact2.init("Jane", "Doe");

var contact3 = Object.create(Contact);
contact3.init("Esther", "Galliano");

var contacts = [];
contacts.push(contact1);
contacts.push(contact2);
contacts.push(contact3);

function displayContacts(){
    contacts.forEach(function (contact) {
        console.log(contact.describe());
        });
}

function addContact() {
    var contact = Object.create(Contact);
    var firstName = prompt("Enter first name: ");
    var lastName = prompt("Enter last name: ");
    contact.init(firstName, lastName);
    contacts.push(contact);
    return console.log("Added:\n",contacts[contacts.length-1]);
}

while (feature !== "0") {
    var feature = prompt("Type 1 to view each contact, 2 to add a contact or 0 to quit.");
    if (feature === "1") {
        console.log("Your contacts:");
        displayContacts();
    } 
    else if (feature === "2") {
        console.log("Add a contact");
        addContact();
    } 
    else if (feature === "0") {
        console.log("Quit");
    } 
    else {
        console.log("Not a valid number");
    }
    }