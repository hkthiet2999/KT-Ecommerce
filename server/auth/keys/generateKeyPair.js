const { generateKeyPair } = require('crypto');
const fs = require('fs')
generateKeyPair(
  "rsa",
  {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  },
  (err, publicKey, privateKey) => {
    // Handle errors and use the generated key pair.
    if (err) console.log("Error!", err);
    fs.writeFileSync("./auth/keys/private.pem", privateKey)
    fs.writeFileSync("./auth/keys/public.pem", publicKey)
    // res.json({ publicKey, privateKey })
    // console.log('aaa: ',privateKey)
    // return {publicKey, privateKey}
  }
);

module.exports = {generateKeyPair: generateKeyPair};