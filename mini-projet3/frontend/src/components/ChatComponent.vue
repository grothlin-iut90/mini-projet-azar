<template>
  <div class="chat-container">
    <div id="messages">
      <div
        v-for="message in messages"
        :key="message._id"
        :class="[
          'message',
          {
            'my-message': message.sender._id === currentUserId,
            'other-message': message.sender._id !== currentUserId,
          },
        ]"
      >
        <!-- Structure pour les messages des autres utilisateurs -->
        <template v-if="message.sender._id !== currentUserId">
          <img
            v-if="message.sender.profilePicture"
            :src="message.sender.profilePicture"
            alt="Profile"
            class="profile-picture other-profile-picture"
          />

          <div class="message-content other-message-content">
            <span class="sender-name">{{ message.sender.displayName }}</span>
            <p class="message-text">{{ message.content }}</p>
            <span class="message-time">{{ formatTime(message.date) }}</span>
          </div>
        </template>

        <!-- Structure pour mes messages -->
        <template v-else>
          <div class="message-content my-message-content">
            <p class="message-text">{{ message.content }}</p>
            <span class="message-time">{{ formatTime(message.date) }}</span>
          </div>

          <img
            v-if="currentUserProfilePicture"
            :src="currentUserProfilePicture"
            alt="Profile"
            class="profile-picture my-profile-picture"
          />
        </template>
      </div>
    </div>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Tapez votre message..."
      class="message-input"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import socket from "../socket";

const newMessage = ref("");
const messages = ref([]);
const currentUserId = ref("");
const currentUsername = ref("");
const currentUserProfilePicture = ref("");

async function loadMessages() {
  try {
    const response = await axios.get("http://localhost:5000/api/messages", {
      withCredentials: true,
    });
    console.log("Messages response ChatComponent:", response.data);
    messages.value = response.data;
  } catch (err) {
    console.error("Erreur lors du chargement des messages:", err);
  }
}

async function loadCurrentUser() {
  try {
    const response = await axios.get("http://localhost:5000/api/current_user", {
      withCredentials: true,
    });
    currentUserId.value = response.data.id;
    currentUsername.value = response.data.username;
    currentUserProfilePicture.value = response.data.profilePicture;
    console.log("Profile picture:", currentUserProfilePicture.value);
    console.log("Utilisateur courant:", response.data);

    // Connecte le socket ici si ce n'est pas déjà fait
    if (!socket.connected) {
      socket.connect();
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur courant:",
      err
    );
  }
}

function formatTime(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

onMounted(() => {
  loadMessages();
  loadCurrentUser();

  socket.on("newMessage", (message) => {
    console.log("Nouveau message reçu:", message);
    messages.value.push(message);
    setTimeout(() => {
      const messagesContainer = document.getElementById("messages");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  });
});

function sendMessage() {
  if (newMessage.value.trim() !== "") {
    if (!socket.connected) {
      console.warn("Socket non connecté, tentative de reconnexion...");
      socket.connect();
      socket.once("connect", () => {
        socket.emit("sendMessage", buildMessage());
      });
    } else {
      socket.emit("sendMessage", buildMessage());
    }
    newMessage.value = "";
    loadMessages();
  }
}

function buildMessage() {
  return {
    content: newMessage.value,
    sender: {
      _id: currentUserId.value,
      displayName: currentUsername.value,
      profilePicture: currentUserProfilePicture.value,
    },
    date: new Date().toISOString(),
  };
}
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 860px;
  margin: auto;
  background: #f7f2e8;
  border: 2px solid #e0d8c4;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(120, 98, 89, 0.2);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', 'Segoe Script', cursive;
  overflow: hidden;
  position: relative;
  background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png');
}

#messages {
  flex: 1;
  padding: 36px 24px 120px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 14px;
  position: relative;
  transition: transform 0.2s;
}

.my-message {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.other-message {
  flex-direction: row;
  justify-content: flex-start;
}

.profile-picture {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #c9bca4;
}

.message-content {
  max-width: 70%;
  padding: 16px 22px;
  background: #fffefb;
  border-radius: 20px;
  position: relative;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.06);
  border: 1.5px dashed #d6cdbf;
  word-break: break-word;
  animation: fadeIn 0.4s ease;
}

.other-message-content {
  background: #fffefb;
  color: #3a2f2f;
}

.my-message-content {
  background: #4b3f72;
  color: #fffefb;
  border: 1.5px solid #4b3f72;
}

.sender-name {
  font-weight: bold;
  margin-bottom: 4px;
  color: #6a4e42;
  font-size: 0.95em;
}

.my-message-content .sender-name {
  display: none;
}

.message-text {
  font-size: 1.05em;
  margin: 0;
  line-height: 1.6;
  letter-spacing: 0.02em;
}

.message-time {
  margin-top: 8px;
  font-size: 0.8em;
  opacity: 0.7;
  font-style: italic;
  color: inherit;
  text-align: right;
}

.message-input {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 680px;
  padding: 18px 24px;
  font-size: 1.1em;
  border: 2px dashed #d4c8b0;
  border-radius: 32px;
  background: #fffefb;
  box-shadow: 0 6px 24px rgba(120, 98, 89, 0.1);
  outline: none;
  transition: box-shadow 0.2s ease;
  font-family: 'Segoe UI', 'Segoe Script', cursive;
}

.message-input:focus {
  background: #fdf7ec;
  box-shadow: 0 8px 28px rgba(120, 98, 89, 0.15);
}

.message-input::placeholder {
  color: #b7a997;
  font-style: italic;
}

@keyframes fadeIn {
  from {
    transform: translateY(8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .chat-container {
    border-radius: 0;
    box-shadow: none;
  }

  .message-content {
    max-width: 85%;
    padding: 14px 16px;
  }

  .message-input {
    width: 96%;
    font-size: 1em;
    padding: 16px 16px;
  }

  .profile-picture {
    width: 36px;
    height: 36px;
  }
}
</style>
