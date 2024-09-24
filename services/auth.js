const JWT = require("jsonwebtoken")
const sectret = "$secret";
function createTokenForUser(user)
{
    const payload = {
        _id : user._id,
        email: user.email,
        role: user.profileImageUrl,
    }
    const token=JWT.sign(payload,sectret);
    return token;
}

function validateToken(token)
{
    const payload = JWT.verify(token,sectret);
    return payload;
}


module.exports={
    createTokenForUser,
    validateToken
}