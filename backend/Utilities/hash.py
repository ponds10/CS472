import bcrypt

# hash password, def function returns a byte
def passwordHash(password) -> bytes :
    # encoding to bytes
    encodedPassword = password.encode()
    # salt password
    salt = bcrypt.gensalt()

    # hash password and return
    return bcrypt.hashpw(encodedPassword, salt)

# compare password from userAccountMatch to login input, def function returns a bool
def passwordCompare(password, hashedPassword) -> bool :
    encodedPassword = password.encode()

    # compare encoded password to hashed password
    return bcrypt.checkpw(encodedPassword, hashedPassword)