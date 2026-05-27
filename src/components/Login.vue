<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">Login</h2>
            <div v-if="resultMessage" :class="['alert', resultSuccess ? 'alert-success' : 'alert-danger']" role="alert">
              {{ resultMessage }}
            </div>
            <form @submit.prevent="handleSubmit" novalidate>
              <div class="mb-3">
                <label class="form-label" for="loginEmail">Email address</label>
                <input
                  id="loginEmail"
                  type="email"
                  class="form-control"
                  :class="{'is-invalid': form.errors.email}"
                  v-model="form.fields.email"
                  placeholder="you@example.com"
                />
                <div class="invalid-feedback">{{ form.errors.email }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label" for="loginPassword">Password</label>
                <input
                  id="loginPassword"
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': form.errors.password}"
                  v-model="form.fields.password"
                  placeholder="Enter your password"
                />
                <div class="invalid-feedback">{{ form.errors.password }}</div>
              </div>

              <button type="submit" class="btn btn-primary w-100">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { LoginForm } from '../models/AuthService.js'

export default {
  name: 'Login',
  setup() {
    const form = reactive(new LoginForm())
    const resultMessage = ref('')
    const resultSuccess = ref(false)

    const handleSubmit = () => {
      const result = form.submit()
      resultMessage.value = form.message
      resultSuccess.value = result.success
    }

    return {
      form,
      resultMessage,
      resultSuccess,
      handleSubmit,
    }
  },
}
</script>
