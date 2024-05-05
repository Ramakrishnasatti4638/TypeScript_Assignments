"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let editingId = null;
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    if (editingId !== null) {
        const contact = {
            id: editingId,
            name: name,
            email: email,
            phone: phone
        };
        updateContact(editingId, contact);
    }
    else {
        const contact = {
            id: Math.random().toString(),
            name: name,
            email: email,
            phone: phone
        };
        addContact(contact);
    }
    form.reset();
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    renderContacts();
});
function fetchContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5180/api/contacts';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function renderContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tableBody = document.getElementById('contactTableBody');
            const contacts = yield fetchContacts();
            tableBody.innerHTML = '';
            contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.email}</td>
          <td>${contact.phone}</td>
          <td>
            <button onclick="editContact('${contact.id}')">Edit</button>
            <button onclick="deleteContact('${contact.id}')">Delete</button>
          </td>
        `;
                tableBody.appendChild(row);
            });
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
        }
    });
}
function editContact(id) {
    return __awaiter(this, void 0, void 0, function* () {
        editingId = id;
        const contacts = yield fetchContacts();
        const contact = contacts.find(contact => contact.id === id);
        if (contact) {
            nameInput.value = contact.name;
            emailInput.value = contact.email;
            phoneInput.value = contact.phone;
        }
    });
}
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5180/api/Contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
        renderContacts();
    });
}
function updateContact(id, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5180/api/Contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        renderContacts();
    });
}
function deleteContact(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5180/api/Contacts/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        renderContacts();
    });
}
