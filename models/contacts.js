const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsData = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactsData);
};

const getContactById = async (id) => {
  const contactId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (id) => {
  const contactId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid.urlAlphabet,
    ...body,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  console.log(index);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
