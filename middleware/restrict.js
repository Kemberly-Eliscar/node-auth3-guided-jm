const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../users/users-model")

function restrict() {
	const authError = {
		message: "Invalid credentials",
	}
	
	return async (req, res, next) => {
		try {
			const { token } = req.cookies // this gives us the value of token from the cookie jar
			if (!token) {
				return res.status(401).json(authError)
			}
			// verify the token's signature
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				req.token = decoded // this is the value of the decoded token
				console.log(decoded)

				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict