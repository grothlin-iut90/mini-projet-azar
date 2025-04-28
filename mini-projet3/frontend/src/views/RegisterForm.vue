<template>
    <div class="register-form-container">
        <h2>Créer un compte</h2>

        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" placeholder="Votre email" required />
            </div>

            <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input v-model="username" type="text" id="username" placeholder="Votre nom d'utilisateur" required />
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" placeholder="Votre mot de passe" required />
            </div>

            <button type="submit" class="register-btn">S'inscrire</button>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const username = ref('');
const password = ref('');
const error = ref('');

async function handleRegister() {
    error.value = '';

    if (!email.value || !username.value || !password.value) {
        error.value = 'Tous les champs sont obligatoires.';
        return;
    }

    try {
        await userStore.register({
            email: email.value,
            username: username.value,
            password: password.value
        });

        router.push('/');
    } catch (err) {
        error.value = 'Inscription échouée. Essayez un autre email ou nom d\'utilisateur.';
    }
}
</script>

<style scoped>
.register-form-container {
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

.register-btn {
    width: 100%;
    padding: 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

.register-btn:hover {
    background-color: #218838;
}

.error-message {
    margin-top: 20px;
    color: red;
    text-align: center;
}
</style>