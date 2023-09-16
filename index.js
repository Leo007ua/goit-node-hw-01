const constants = require("./db");

const { Command } = require("commander");
const program = new Command();
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
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case "get":
      const getById = await getContactById(id);
      console.log(getById);
      break;

    case "add":
      const add = await addContact(name, email, phone);
      console.log(add);
      break;

    case "remove":
      const remove = await removeContact(id);
      console.log(remove);
      break;

    case "update":
      const update = await updateContactById(id, name, email, phone);
      console.log(update);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
