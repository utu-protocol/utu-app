import {Api, TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions";

import input from "input"; // npm i input


const apiId = 123456;
const apiHash = "123456abcdfg";
const stringSession = new StringSession(""); // fill this later with the value from session.save()

// (async () => {})();

export const TGApi = async (phoneNumber, password, phoneCode) => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await phoneNumber,
        password: async () => await password,
        phoneCode: async () =>
            await phoneCode,
        onError: (err) => console.log(err),
    });


    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    await client.sendMessage("me", {message: "Hello!"});

    const result = await client.invoke(
        new Api.contacts.GetContacts({
            hash: 0,
        })
    );
    console.log(result); // prints the result
}