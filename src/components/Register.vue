<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">Create Account</h2>
            <div v-if="resultMessage" :class="['alert', resultSuccess ? 'alert-success' : 'alert-danger']" role="alert">
              {{ resultMessage }}
            </div>
            <form @submit.prevent="handleSubmit" novalidate>
              <div class="mb-3">
                <label class="form-label" for="registerName">Full name</label>
                <input
                  id="registerName"
                  type="text"
                  class="form-control"
                  :class="{'is-invalid': form.errors.name}"
                  v-model="form.fields.name"
                  placeholder="Your name"
                />
                <div class="invalid-feedback">{{ form.errors.name }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label" for="registerEmail">Email</label>
                <input
                  id="registerEmail"
                  type="email"
                  class="form-control"
                  :class="{'is-invalid': form.errors.email}"
                  v-model="form.fields.email"
                  placeholder="you@example.com"
                />
                <div class="invalid-feedback">{{ form.errors.email }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label" for="registerPassword">Password</label>
                <input
                  id="registerPassword"
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': form.errors.password}"
                  v-model="form.fields.password"
                  placeholder="Create a password"
                />
                <div class="invalid-feedback">{{ form.errors.password }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label" for="registerConfirm">Confirm password</label>
                <input
                  id="registerConfirm"
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': form.errors.confirmPassword}"
                  v-model="form.fields.confirmPassword"
                  placeholder="Repeat your password"
                />
                <div class="invalid-feedback">{{ form.errors.confirmPassword }}</div>
              </div>

              <button type="submit" class="btn btn-success w-100">Create account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { RegisterForm } from '../models/AuthService.js'

export default {
  name: 'Register',
  setup() {
    const form = reactive(new RegisterForm())
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
