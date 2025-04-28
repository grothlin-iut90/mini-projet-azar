<template>
  <div class="login-container">
    <div class="login-card">
      <div class="icon-header">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="#FF6F61"/>
          <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="#FF6F61" stroke-width="2" fill="none"/>
        </svg>
        <h2>Connexion</h2>
      </div>
      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Adresse e-mail"
          required
          class="input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          required
          class="input"
        />
        <button type="submit" class="login-btn">Se connecter</button>
        <div v-if="error" class="error-msg">{{ error }}</div>
        <div v-if="success" class="success-msg">{{ success }}</div>
      </form>
      <div class="register-link">
        <span>Pas encore de compte ?</span>
        <router-link to="/register">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const router = useRouter();

async function login() {
  error.value = "";
  success.value = "";
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
    credentials: "include"
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('jwt', data.token);
    router.push('/profile');
  } else {
    const data = await res.json();
    error.value = data.message || "Erreur lors de la connexion";
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #23234a 60%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;
}
.login-container::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: repeating-linear-gradient(135deg, #00f2fe 0 2px, transparent 2px 40px), repeating-linear-gradient(45deg, #ff61a6 0 2px, transparent 2px 40px);
  opacity: 0.07;
  top: -100px;
  left: -100px;
  z-index: 0;
  border-radius: 50%;
  filter: blur(2px);
}

.login-card {
  background: rgba(35, 35, 74, 0.97);
  border-radius: 2rem;
  box-shadow: 0 0 32px 4px #00f2fe55, 0 2px 8px #ff61a655;
  padding: 2.5rem 2rem;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  border: 2px solid #ff61a6;
  animation: neon-flicker 2.5s infinite alternate;
}

@keyframes neon-flicker {
  0%, 100% { box-shadow: 0 0 32px 4px #00f2fe55, 0 2px 8px #ff61a655; }
  50% { box-shadow: 0 0 48px 8px #ff61a699, 0 2px 16px #00f2fe99; }
}

.icon-header {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-header svg {
  filter: drop-shadow(0 0 10px #ff61a6) drop-shadow(0 0 20px #00f2fe);
}
.icon-header h2 {
  margin-top: 0.5rem;
  font-size: 2rem;
  color: #ff61a6;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  letter-spacing: 2px;
  text-shadow: 0 0 8px #ff61a6, 0 0 2px #00f2fe;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.input {
  padding: 1rem 1.2rem;
  border: 2px solid #00f2fe;
  border-radius: 1.2rem;
  font-size: 1.1rem;
  background: #1a1a2e;
  color: #fff;
  font-family: 'Fira Mono', 'Consolas', monospace;
  box-shadow: 0 0 8px #00f2feaa;
  transition: border 0.2s, box-shadow 0.2s;
  outline: none;
}
.input:focus {
  border: 2px solid #ff61a6;
  box-shadow: 0 0 16px #ff61a6cc;
  background: #23234a;
}

.login-btn {
  background: linear-gradient(90deg, #ff61a6 0%, #00f2fe 100%);
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem 0;
  font-size: 1.2rem;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 0 16px #ff61a699;
  letter-spacing: 1px;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
}
.login-btn:hover {
  background: linear-gradient(90deg, #00f2fe 0%, #ff61a6 100%);
  transform: scale(1.04) rotate(2deg);
  box-shadow: 0 0 32px #00f2fecc;
}

.error-msg {
  color: #ff61a6;
  font-size: 1rem;
  margin-top: 0.2rem;
  text-align: center;
  text-shadow: 0 0 6px #ff61a6aa;
}

.success-msg {
  color: #00f2fe;
  font-size: 1rem;
  margin-top: 0.2rem;
  text-align: center;
  text-shadow: 0 0 6px #00f2feaa;
}

.register-link {
  margin-top: 1.2rem;
  font-size: 1rem;
  color: #fff;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-family: 'Fira Mono', 'Consolas', monospace;
}
.register-link a {
  color: #ff61a6;
  text-decoration: underline wavy #00f2fe;
  font-weight: 700;
  transition: color 0.2s, text-shadow 0.2s;
  text-shadow: 0 0 6px #ff61a6;
}
.register-link a:hover {
  color: #00f2fe;
  text-shadow: 0 0 12px #00f2fe;
}
</style>
