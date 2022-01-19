import {Api, TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions";
import axios from "axios";



// const apiId = 123456;
// const apiHash = "123456abcdfg";

const apiId = 9280354;
const apiHash = 'd811a6ea6ec6324f7c4f665c573cbd9c';


const stringSession = new StringSession(""); // fill this later with the value from session.save()

// (async () => {})();

export const TGApi = async (phoneNumber: any, password: any, phoneCode: any) => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
     await client.start({
         phoneNumber: async () => await phoneNumber,
         password: async () => await password,
         phoneCode: async () => await phoneCode,
         onError: (err) => console.log(err),
     });


    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    const apiKey = client.session.save()

    // const result = await client.invoke(
    //     new Api.contacts.GetContacts({})
    // );
    // console.log(result); // prints the result

    await axios.post('http://localhost:3000/connections/telegram', {
        apiKey: apiKey
    })
}