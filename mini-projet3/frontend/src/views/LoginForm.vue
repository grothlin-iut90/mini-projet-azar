<template>
    <div class="login-form-container">
        <h2>Connexion</h2>

        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" placeholder="Votre email" required />
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" placeholder="Votre mot de passe" required />
            </div>

            <button type="submit" class="login-btn">Se connecter</button>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user'; // adapte le chemin selon ton projet

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const error = ref('');

async function handleLogin() {
    error.value = '';

    if (!email.value || !password.value) {
        error.value = 'Tous les champs sont obligatoires.';
        return;
    }

    try {
        await userStore.login({
            email: email.value,
            password: password.value
        });

        // Redirection après connexion réussie
        router.push('/');
    } catch (err) {
        error.value = 'Connexion échouée. Vérifiez vos informations.';
    }
}
</script>

<style scoped>
.login-form-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 30px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.login-btn {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #0056b3;
}

.error-message {
    margin-top: 20px;
    color: red;
    text-align: center;
}
</style>