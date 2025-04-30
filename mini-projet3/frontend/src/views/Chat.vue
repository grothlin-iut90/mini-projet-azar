<template>
  <div class="chat-page-container">
    <div class="chat-page-header">
      <button @click="goBack" class="back-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        Retour
      </button>
      <div class="user-info" v-if="userStore.user">
        <div class="user-details">
          <h2>Chat en temps réel</h2>
          <div class="user-info">
            <span
              >Logged in as: <strong>{{ userStore.user.username }}</strong> (ID:
              {{ userStore.user.id }})</span
            >
          </div>
        </div>
      </div>
      <button @click="userStore.logout" class="logout-btn">
        <span>Se déconnecter</span>
      </button>
    </div>

    <div class="chat-content">
      <ChatComponent />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import ChatComponent from "../components/ChatComponent.vue";

const router = useRouter();
const userStore = useUserStore();

function goBack() {
  router.push("/");
}
</script>

<style scoped>
.chat-page-container {
  min-height: 100vh;
  background: #f7f2e8;
  background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  font-family: "Segoe UI", "Segoe Script", cursive;
}

.chat-page-header {
  background: #fffefb;
  border-radius: 16px;
  border: 2px solid #e0d8c4;
  box-shadow: 0 12px 32px rgba(120, 98, 89, 0.13);
  padding: 24px 32px;
  margin: 0 auto 28px auto;
  max-width: 860px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
}

.back-btn {
  padding: 10px 22px;
  background: #fffefb;
  color: #4b3f72;
  border: 1.5px dashed #d6cdbf;
  border-radius: 32px;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(120, 98, 89, 0.06);
}

.back-btn:hover {
  background: #fdf7ec;
  color: #6a4e42;
}

.back-btn svg {
  margin-right: 6px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.user-details h2 {
  margin: 0 0 6px 0;
  color: #4b3f72;
  font-size: 1.25rem;
  font-family: inherit;
}

.user-info span {
  color: #6a4e42;
  font-size: 1em;
}

.logout-btn {
  padding: 10px 22px;
  background: #fffefb;
  color: #dc3545;
  border: 1.5px dashed #dc3545;
  border-radius: 32px;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px rgba(120, 98, 89, 0.06);
}

.logout-btn:hover {
  background: #dc3545;
  color: #fffefb;
}

.chat-content {
  flex: 1;
  background: #f7f2e8;
  border-radius: 16px;
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 12px 32px rgba(120, 98, 89, 0.1);
  padding: 0;
  display: flex;
  flex-direction: column;
}

@media (max-width: 900px) {
  .chat-page-header,
  .chat-content {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
}

@media (max-width: 768px) {
  .chat-page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 16px 8px;
    border-radius: 0;
    box-shadow: none;
  }
  .chat-content {
    border-radius: 0;
    box-shadow: none;
  }
  .back-btn,
  .logout-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
