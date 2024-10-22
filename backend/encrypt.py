import bcrypt

class Encrypt :
    # encrypt password, def function returns a byte
    def passwordEncrypt(password) -> bytes :
        # encoding to bytes
        encodedPassword = password.encode()
        # salt password
        salt = bcrypt.gensalt()

        # hash password and return
        return bcrypt.hashpw(encodedPassword, salt)
    
    # compare password from userAccountMatch to login input, def function returns a bool
    def passwordCompare(password, encryptedPassword) -> bool :
        encodedPassword = password.encode()

        # compare encoded password to encrypted password
        return bcrypt.checkpw(encodedPassword, encryptedPassword)