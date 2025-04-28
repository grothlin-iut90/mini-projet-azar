<template>
  <div class="profile-bg">
    <div class="profile-card">
      <div class="avatar">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="6" fill="#4F8EF7" />
          <ellipse cx="12" cy="19" rx="8" ry="4" fill="#38bdf8" />
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = ref({ email: '', id: '' })
const token = localStorage.getItem('jwt')
const router = useRouter()

onMounted(async () => {
  if (!token) {
    router.push('/login')
    return
  }
  const res = await fetch('http://localhost:3000/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (res.ok) {
    const data = await res.json()
    user.value = data.user
  } else {
    router.push('/login')
  }
})

function logout() {
  localStorage.removeItem('jwt')
  router.push('/login')
}
</script>

<style scoped>
.profile-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #0f3460 0%, #23234a 100%);
  position: relative;
  overflow: hidden;
}
.profile-bg::before {
  content: '';
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: repeating-radial-gradient(circle at 60% 40%, #00f2fe33 0 60px, transparent 80px 120px), repeating-radial-gradient(circle at 30% 70%, #ff61a633 0 40px, transparent 60px 100px);
  opacity: 0.18;
  z-index: 0;
  pointer-events: none;
  animation: wave-move 8s linear infinite alternate;
}
@keyframes wave-move {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 80px 40px, 60px 100px; }
}

.profile-card {
  background: rgba(26, 26, 46, 0.97);
  border-radius: 2rem;
  box-shadow: 0 0 32px 4px #00f2fe55, 0 2px 8px #ff61a655;
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  border: 2px solid #00f2fe;
  animation: neon-flicker 2.5s infinite alternate;
}

@keyframes neon-flicker {
  0%, 100% { box-shadow: 0 0 32px 4px #00f2fe55, 0 2px 8px #ff61a655; }
  50% { box-shadow: 0 0 48px 8px #00f2fe99, 0 2px 16px #ff61a699; }
}

.avatar {
  margin-bottom: 1.2rem;
  background: linear-gradient(135deg, #00f2fe 60%, #ff61a6 100%);
  border-radius: 50%;
  padding: 0.7rem;
  box-shadow: 0 4px 24px #00f2fe99, 0 0 16px #ff61a6aa;
  animation: avatar-glow 2s infinite alternate;
}
@keyframes avatar-glow {
  0% { box-shadow: 0 4px 24px #00f2fe99, 0 0 16px #ff61a6aa; }
  100% { box-shadow: 0 4px 48px #ff61a6cc, 0 0 32px #00f2fecc; }
}

.profile-title {
  font-size: 2rem;
  color: #00f2fe;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
  text-shadow: 0 0 8px #00f2fe, 0 0 2px #ff61a6;
}

.profile-info {
  width: 100%;
  background: #23234a;
  border-radius: 1rem;
  padding: 1.2rem 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px #00f2fe33;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  font-size: 1.1rem;
  color: #fff;
  font-family: 'Fira Mono', 'Consolas', monospace;
  border: 1.5px solid #ff61a6;
}
.profile-info strong {
  color: #ff61a6;
  margin-right: 0.5rem;
}

.logout-btn {
  background: linear-gradient(90deg, #ff61a6 0%, #00f2fe 100%);
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem 0;
  font-size: 1.2rem;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 0 16px #ff61a699;
  letter-spacing: 1px;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #00f2fe 0%, #ff61a6 100%);
  transform: scale(1.04) rotate(-2deg);
  box-shadow: 0 0 32px #00f2fecc;
}
</style>
