// services/messageService.js
const mongoose = require('mongoose');
const Message = mongoose.model('Message');

const getMessages = async () => {
    console.log('Récupération des messages');
    try {
        const messages = await Message.find()
            .sort({ date : 1 })
            .limit(50)
            .populate('sender', 'sender displayName profilePicture');

        console.log('Messages récupérés :', messages);
        return messages;
    } catch (err) {
        throw new Error('Erreur lors de la récupération des messages : ' + err.message);
    }
};

module.exports = { getMessages };