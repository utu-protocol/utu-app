import AWN from "awesome-notifications"

let globalOptions: any = {
    icons: {enabled: false},
    durations:  {
        alert: 30000,
    }
}

export const notifier = new AWN(globalOptions)
