<template>
  <div class="home-container">
    <div class="home-content">
      <h1 class="welcome-title">Bienvenue sur notre plateforme !</h1>

      <div v-if="userStore.user" class="user-section">
        <div class="user-info">
          <div class="user-details">
            <p>
              Connecté en tant que
              <strong>{{ userStore.user.username }}</strong>
            </p>
            <p class="user-email">{{ userStore.user.email }}</p>
          </div>
        </div>

        <button @click="userStore.logout" class="logout-btn">
          <span>Se déconnecter</span>
        </button>

        <router-link to="/chat" class="open-chat-btn">
          Ouvrir le chat en plein écran
        </router-link>
      </div>

      <div v-else class="login-section">
        <h2>Connectez-vous pour accéder au chat</h2>
        <button @click="loginWithGoogle" class="google-login-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google logo"
            class="google-logo"
          />
          <span>Se connecter avec Google</span>
        </button>
        <br>
        <button @click="loginWithGithub" class="github-login-btn">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub logo"
            class="github-logo"
          />
          <span>Se connecter avec GitHub</span>
        </button>
        <br>
        <router-link to="/login" class="email-login-btn">
          Se connecter avec Email/Mot de passe
        </router-link>
        <br />
        <router-link to="/register" class="email-login-btn">
          S'enregistrer
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});

function loginWithGoogle() {
  window.location.href = "http://localhost:5000/auth/google";
}

function loginWithGithub() {
  window.location.href = "http://localhost:5000/auth/github";
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f7f2e8;
  background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
  padding: 20px;
  font-family: "Segoe UI", "Segoe Script", cursive;
}

.home-content {
  background-color: white;
  border-radius: 16px;
  border: 2px solid #e0d8c4;
  box-shadow: 0 12px 32px rgba(120, 98, 89, 0.13);
  padding: 40px;
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.welcome-title {
  color: #4b3f72;
  margin-bottom: 30px;
  font-size: 2.2rem;
  font-family: inherit;
}

.user-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.user-details {
  text-align: left;
}

.user-email {
  color: #666;
  font-size: 0.9rem;
  margin-top: 5px;
}

button,
.open-chat-btn,
.email-login-btn,
.github-login-btn,
.google-login-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 32px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: 1em;
  box-shadow: 0 4px 16px rgba(120, 98, 89, 0.08);
}

.google-login-btn,
.email-login-btn {
  background-color: #fffefb;
  color: #5f6368;
  border: 1.5px dashed #d6cdbf;
  margin-top: 20px;
}

.google-login-btn:hover,
.email-login-btn:hover {
  background-color: #fdf7ec;
}

.google-logo {
  width: 20px;
  margin-right: 12px;
}

.logout-btn {
  background-color: #f8f9fa;
  color: #dc3545;
  border: 1.5px dashed #dc3545;
}

.logout-btn:hover {
  background-color: #dc3545;
  color: white;
}

.open-chat-btn {
  background-color: #4b3f72;
  color: white;
  text-decoration: none;
  margin-top: 20px;
}

.open-chat-btn:hover {
  background-color: #6a4e42;
}

.github-login-btn {
  background-color: #24292e;
  color: white;
  border: none;
  margin-top: 15px;
}

.github-login-btn:hover {
  background-color: #444c56;
}

.github-logo {
  width: 20px;
  margin-right: 12px;
  background: white;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .home-content {
    padding: 20px;
  }

  .welcome-title {
    font-size: 1.8rem;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>
