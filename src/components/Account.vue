<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">My Account</h2>
            <div v-if="currentUser">
              <p class="mb-2">Welcome back, <strong>{{ currentUser.name }}</strong>.</p>
              <p class="text-muted">Email: {{ currentUser.email }}</p>
              <button class="btn btn-outline-danger mt-3" @click="logout">Logout</button>
            </div>
            <div v-else>
              <p>No user is currently signed in.</p>
              <RouterLink class="btn btn-primary me-2" to="/login">Login</RouterLink>
              <RouterLink class="btn btn-success" to="/register">Create an account</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { UserStore } from '../models/AuthService.js'

export default {
  name: 'Account',
  setup() {
    const currentUser = ref(UserStore.getCurrentUser())
    const logout = () => {
      UserStore.logout()
      currentUser.value = null
    }

    return {
      currentUser,
      logout,
    }
  },
}
</script>
