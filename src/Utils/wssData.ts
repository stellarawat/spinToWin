export type sendSpinData = {
    level: string,
    amount: number,
    msisdn: string,
}

export type receiveSpinData = {
    level: string,
    msisdn: string,
    randomkey: number,
    multiplier: number,
    color: string,
    winnings: number,
    balance: string,
}
