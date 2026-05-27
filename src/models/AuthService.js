const STORAGE_USERS = 'fbo_users'
const STORAGE_CURRENT_USER = 'fbo_current_user'

class UserStore {
  static getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS)
      return raw ? JSON.parse(raw) : []
    } catch (error) {
      console.error('UserStore.getUsers parse failed', error)
      return []
    }
  }

  static saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
  }

  static findByEmail(email) {
    return this.getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase())
  }

  static addUser(user) {
    const users = this.getUsers()
    users.push(user)
    this.saveUsers(users)
  }

  static setCurrentUser(user) {
    localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(user))
  }

  static getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_CURRENT_USER)
      return raw ? JSON.parse(raw) : null
    } catch (error) {
      console.error('UserStore.getCurrentUser parse failed', error)
      return null
    }
  }

  static logout() {
    localStorage.removeItem(STORAGE_CURRENT_USER)
  }
}

class AuthForm {
  constructor(fields = {}) {
    this.fields = fields
    this.errors = {}
    this.message = ''
  }

  setField(name, value) {
    this.fields[name] = value
    this.errors[name] = ''
    this.message = ''
  }

  validateRequired(names) {
    let valid = true
    names.forEach((name) => {
      if (!this.fields[name] || !this.fields[name].toString().trim()) {
        this.errors[name] = 'This field is required.'
        valid = false
      }
    })
    return valid
  }

  validateEmail() {
    const email = this.fields.email || ''
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      this.errors.email = 'Enter a valid email address.'
      return false
    }
    return true
  }

  validatePassword(minLength = 6) {
    const password = this.fields.password || ''
    if (password.length < minLength) {
      this.errors.password = `Password must be at least ${minLength} characters.`
      return false
    }
    return true
  }

  isValid() {
    return Object.values(this.errors).every((error) => !error)
  }
}

class LoginForm extends AuthForm {
  constructor() {
    super({ email: '', password: '' })
  }

  validate() {
    this.errors = {}
    const required = this.validateRequired(['email', 'password'])
    const validEmail = required && this.validateEmail()
    const validPassword = required && this.validatePassword()
    return required && validEmail && validPassword
  }

  submit() {
    if (!this.validate()) {
      this.message = 'Please fix the highlighted errors.'
      return { success: false }
    }

    const user = UserStore.findByEmail(this.fields.email)
    if (!user) {
      this.message = 'No account found with this email.'
      return { success: false }
    }

    if (user.password !== this.fields.password) {
      this.errors.password = 'Incorrect password.'
      this.message = 'Unable to sign in.'
      return { success: false }
    }

    UserStore.setCurrentUser({ name: user.name, email: user.email })
    this.message = `Welcome back, ${user.name}!`
    return { success: true, user }
  }
}

class RegisterForm extends AuthForm {
  constructor() {
    super({ name: '', email: '', password: '', confirmPassword: '' })
  }

  validate() {
    this.errors = {}
    const required = this.validateRequired(['name', 'email', 'password', 'confirmPassword'])
    const validEmail = required && this.validateEmail()
    const validPassword = required && this.validatePassword()

    if (required && this.fields.password !== this.fields.confirmPassword) {
      this.errors.confirmPassword = 'Passwords must match.'
      return false
    }

    return required && validEmail && validPassword
  }

  submit() {
    if (!this.validate()) {
      this.message = 'Please fix the highlighted errors.'
      return { success: false }
    }

    if (UserStore.findByEmail(this.fields.email)) {
      this.errors.email = 'This email is already registered.'
      this.message = 'Choose a different email.'
      return { success: false }
    }

    const newUser = {
      name: this.fields.name.trim(),
      email: this.fields.email.trim().toLowerCase(),
      password: this.fields.password,
    }

    UserStore.addUser(newUser)
    UserStore.setCurrentUser({ name: newUser.name, email: newUser.email })
    this.message = `Account created for ${newUser.name}.`
    return { success: true, user: newUser }
  }
}

export { UserStore, LoginForm, RegisterForm }
