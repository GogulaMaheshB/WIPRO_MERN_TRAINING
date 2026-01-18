var ContactManager = /** @class */ (function () {
    function ContactManager() {
        this.contacts = [];
    }
    ContactManager.prototype.addContact = function (contact) {
        this.contacts.push(contact);
        console.log("Contact added successfully");
    };
    ContactManager.prototype.viewContacts = function () {
        return this.contacts;
    };
    ContactManager.prototype.modifyContact = function (id, updatedContact) {
        var contact = this.contacts.find(function (c) { return c.id === id; });
        if (!contact) {
            console.log("Error: Contact does not exist");
            return;
        }
        Object.assign(contact, updatedContact);
        console.log("Contact modified successfully");
    };
    ContactManager.prototype.deleteContact = function (id) {
        var index = this.contacts.findIndex(function (c) { return c.id === id; });
        if (index === -1) {
            console.log("Error: Contact does not exist");
            return;
        }
        this.contacts.splice(index, 1);
        console.log("Contact deleted successfully");
    };
    return ContactManager;
}());
// Testing
var manager = new ContactManager();
manager.addContact({
    id: 1,
    name: "Mahesh",
    email: "mahesh@gmail.com",
    phone: "9876543210"
});
console.log(manager.viewContacts());
manager.modifyContact(1, { phone: "9999999999" });
manager.deleteContact(1);
