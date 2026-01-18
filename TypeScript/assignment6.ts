interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

class ContactManager {
    private contacts: Contact[] = [];

    addContact(contact: Contact): void {
        this.contacts.push(contact);
        console.log("Contact added successfully");
    }

    viewContacts(): Contact[] {
        return this.contacts;
    }

    modifyContact(id: number, updatedContact: Partial<Contact>): void {
        const contact = this.contacts.find(c => c.id === id);

        if (!contact) {
            console.log("Error: Contact does not exist");
            return;
        }

        Object.assign(contact, updatedContact);
        console.log("Contact modified successfully");
    }

    deleteContact(id: number): void {
        const index = this.contacts.findIndex(c => c.id === id);

        if (index === -1) {
            console.log("Error: Contact does not exist");
            return;
        }

        this.contacts.splice(index, 1);
        console.log("Contact deleted successfully");
    }
}

// Testing
const manager = new ContactManager();

manager.addContact({
    id: 1,
    name: "Mahesh",
    email: "mahesh@gmail.com",
    phone: "9876543210"
});

console.log(manager.viewContacts());
manager.modifyContact(1, { phone: "9999999999" });
manager.deleteContact(1);
