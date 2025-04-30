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
    max-width: 420px;
    margin: 60px auto;
    padding: 36px 32px;
    background: #f7f2e8;
    border: 2px solid #e0d8c4;
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(120, 98, 89, 0.13);
    font-family: 'Segoe UI', 'Segoe Script', cursive;
    background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png');
}

h2 {
    text-align: center;
    margin-bottom: 28px;
    color: #4b3f72;
    font-weight: bold;
}

.form-group {
    margin-bottom: 22px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #6a4e42;
}

input {
    width: 91%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1.5px dashed #d6cdbf;
    background: #fffefb;
    font-size: 1em;
    font-family: inherit;
    transition: box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(120, 98, 89, 0.06);
}

input:focus {
    outline: none;
    background: #fdf7ec;
    box-shadow: 0 4px 16px rgba(120, 98, 89, 0.12);
}

.register-btn {
    width: 100%;
    padding: 14px 0;
    background-color: #4b3f72;
    color: #fffefb;
    border: none;
    border-radius: 32px;
    font-weight: bold;
    font-size: 1.1em;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(120, 98, 89, 0.08);
    transition: background 0.2s;
}

.register-btn:hover {
    background-color: #6a4e42;
}

.error-message {
    margin-top: 18px;
    color: #dc3545;
    text-align: center;
    font-weight: bold;
    background: #fff0f0;
    border-radius: 8px;
    padding: 8px 0;
}

@media (max-width: 600px) {
    .register-form-container {
        padding: 18px 8px;
    }
}
</style>