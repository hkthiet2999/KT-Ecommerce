// sign with Google
const fetch = require('node-fetch')

async function verifyFacebook(accessToken, userId) {

    const URL = `https://graph.facebook.com/v2.9/${userId}/?fields=id,name,email,picture&access_token=${accessToken}`
    const data = await fetch(URL).then(res => res.json()).then(res => {return res})
    return data

}
module.exports = {verifyFacebook: verifyFacebook}