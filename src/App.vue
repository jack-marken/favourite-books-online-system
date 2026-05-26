<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">FavouriteBooks</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><RouterLink class="nav-link" to="/">Home</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/cart">Cart</RouterLink></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Account
            </a>
            <ul class="dropdown-menu" aria-labelledby="accountDropdown">
              <li><RouterLink class="dropdown-item" to="/account">Account</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/login">Login</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/register">Register</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>