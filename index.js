const { Command } = require("commander");
const program = new Command();

const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      try {
        const allContacts = await listContacts();
        console.log(allContacts);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "get":
      try {
        const getById = await getContactById(id);
        console.log(getById);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "add":
      try {
        const add = await addContact(name, email, phone);
        console.log(add);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "remove":
      try {
        const remove = await removeContact(id);
        console.log(remove);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "update":
      try {
        const update = await updateContactById(id, name, email, phone);
        console.log(update);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
