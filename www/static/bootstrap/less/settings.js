export const Settings = {
    port: process.env.SERVER_PORT || 8081,
    secret: process.env.AUTH_SECRET || 'Shhhhhhhhh!',
    saltRounds: process.env.AUTH_SALT_ROUNDS || 10,
    faultsBeforeBlock: process.env.AUTH_FAULTS_LIMIT || 5,
    inviteTimeout: process.env.AUTH_INVITE_TIMEOUT || 3
}
