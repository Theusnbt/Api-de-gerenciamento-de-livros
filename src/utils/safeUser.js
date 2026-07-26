function safeUser(user){
    const {
        password,
        __v,
        ...userSafe
    } = user.toObject();
    return userSafe;
} 

export default safeUser;