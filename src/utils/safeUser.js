function safeUser(user){
    const {
        __v,
        ...userSafe
    } = user.toObject();
    return userSafe;
} 

export default safeUser;