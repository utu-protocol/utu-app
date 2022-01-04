import AWN from "awesome-notifications"

let globalOptions: any = {
    icons: {enabled: false}
}


export const notifier = new AWN(globalOptions)
