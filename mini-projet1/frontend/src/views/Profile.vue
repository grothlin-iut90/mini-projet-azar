<template>
  <div class="profile-bg">
    <div class="profile-card">
      <div class="avatar">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="6" fill="#4F8EF7"/>
          <ellipse cx="12" cy="19" rx="8" ry="4" fill="#38bdf8"/>
        </svg>
      </div>
      <h2 class="profile-title">Bienvenue, {{ user.email }}</h2>
      <div class="profile-info">
        <div>
          <strong>Email :</strong>
          <span>{{ user.email }}</span>
        </div>
        <div>
          <strong>ID :</strong>
          <span>{{ user.id }}</span>
        </div>
      </div>
      <button class="logout-btn" @click="logout">Se déconnecter</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const user = ref({ email: "", id: "" });
const router = useRouter();

onMounted(async () => {
  const res = await fetch("http://localhost:3000/auth/profile", {
    credentials: "include"
  });
  if (res.ok) {
    const data = await res.json();
    user.value = data.user;
  } else {
    router.push("/login");
  }
});

async function logout() {
  await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include"
  });
  router.push("/login");
}
</script>

<style scoped>
.profile-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f0fdfa 0%, #e0e7ff 100%);
}

.profile-card {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(56, 189, 248, 0.13), 0 1.5px 4px rgba(0,0,0,0.04);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.avatar {
  margin-bottom: 1.2rem;
  background: linear-gradient(135deg, #4F8EF7 60%, #38bdf8 100%);
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 4px 16px rgba(56, 189, 248, 0.12);
}

.profile-title {
  font-size: 1.5rem;
  color: #2563eb;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
}

.profile-info {
  width: 100%;
  background: #f9fafb;
  border-radius: 1rem;
  padding: 1.2rem 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  font-size: 1.08rem;
  color: dimgrey;
}
.profile-info strong {
  color: #4F8EF7;
  margin-right: 0.5rem;
}

.logout-btn {
  background: linear-gradient(90deg, #ef4444 60%, #f87171 100%);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  padding: 0.9rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s, transform 0.1s;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #dc2626 60%, #f87171 100%);
  transform: translateY(-2px) scale(1.03);
}
</style>
