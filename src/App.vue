<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <span class="navbar-brand">FavouriteBooks</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><RouterLink class="nav-link" to="/">Home</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/cart">Cart</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/account">Account</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>