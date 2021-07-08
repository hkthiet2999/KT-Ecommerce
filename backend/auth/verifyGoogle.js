// sign with Google
const {google} = require('googleapis');
const {OAuth2} = google.auth
const client = new OAuth2(process.env.CLIENT_ID)
async function verifyGoogle(tokenId) {

    // console.log('gg token:', tokenId)
    const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.CLIENT_ID})
    // const {email_verified, email, name, picture} = verify.payload
    // console.log(verify)
    // console.log(verify.payload)
    return verify.payload

}
module.exports = {verifyGoogle: verifyGoogle}