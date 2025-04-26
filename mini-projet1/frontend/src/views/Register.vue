<template>
  <div class="register-container">
    <div class="register-card">
      <div class="icon-header">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="#4F8EF7"/>
          <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="#4F8EF7" stroke-width="2" fill="none"/>
        </svg>
        <h2>Créer un compte</h2>
      </div>
      <form @submit.prevent="register">
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
        <button type="submit" class="register-btn">S'inscrire</button>
        <div v-if="error" class="error-msg">{{ error }}</div>
        <div v-if="success" class="success-msg">{{ success }}</div>
      </form>
      <div class="login-link">
        <span>Déjà inscrit ?</span>
        <router-link to="/login">Se connecter</router-link>
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

async function register() {
  error.value = "";
  success.value = "";
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
    credentials: "include"
  });
  if (res.ok) {
    success.value = "Inscription réussie, vous pouvez vous connecter.";
    setTimeout(() => router.push("/login"), 1500);
  } else {
    const data = await res.json();
    error.value = data.message || "Erreur lors de l’inscription";
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%);
}

.register-card {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(79, 142, 247, 0.12), 0 1.5px 4px rgba(0,0,0,0.04);
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
}

.icon-header h2 {
  margin-top: 0.5rem;
  font-size: 1.5rem;
  color: #4F8EF7;
  font-weight: 700;
  letter-spacing: 1px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 0.8rem 1rem;
  border: 1.5px solid #d1d5db;
  border-radius: 0.8rem;
  font-size: 1rem;
  transition: border 0.2s;
  outline: none;
  background: #f9fafb;
}
.input:focus {
  border: 1.5px solid #4F8EF7;
  background: #fff;
}

.register-btn {
  background: linear-gradient(90deg, #4F8EF7 60%, #38bdf8 100%);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  padding: 0.9rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-top: 0.5rem;
}
.register-btn:hover {
  background: linear-gradient(90deg, #2563eb 60%, #0ea5e9 100%);
  transform: translateY(-2px) scale(1.03);
}

.error-msg {
  color: #ef4444;
  font-size: 0.98rem;
  margin-top: 0.2rem;
  text-align: center;
}

.success-msg {
  color: #22c55e;
  font-size: 0.98rem;
  margin-top: 0.2rem;
  text-align: center;
}

.login-link {
  margin-top: 1.2rem;
  font-size: 0.98rem;
  color: #64748b;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.login-link a {
  color: #4F8EF7;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.login-link a:hover {
  color: #2563eb;
}
</style>
