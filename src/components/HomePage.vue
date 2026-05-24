<template>
  <div>
    <h1>Home</h1>
    <RouterLink to="/search">Go to Search</RouterLink>
  </div>



  <!-- Hero Section -->
    <section class="hero bg-light py-5 text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Discover Your Next Favorite Book</h1>
        <p class="lead">Browse thousands of titles from all genres</p>
        
      </div>
    </section>

    <!-- Featured Books Section -->
    <div class="container my-5">
      <h2 class="text-center mb-4">Featured Books</h2>

      <div class="row g-4">
        <!-- Dynamic Book Cards via v-for -->
        <div v-for="book in featuredBooks" :key="book.id" class="col-md-3">
          <div class="card h-100 book-card">
            <img :src="book.image" class="card-img-top" :alt="book.title">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text text-muted">${{ book.price }}</p>
              </div>
              <button class="btn btn-success w-100 mt-3">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-5">
      <p class="mb-0">© 2026 BookStore | All Rights Reserved</p>
    </footer>

</template>


<script setup>
import { ref } from 'vue'

// tmp mock/test
//i can replace to call json file later
const featuredBooks = ref([
  { id: 1, title: 'The Great Novel', price: 19.99, image: 'https://via.placeholder.com/200x300' },
  { id: 2, title: 'Mystery Tales', price: 14.99, image: 'https://via.placeholder.com/200x300' },
  { id: 3, title: 'Science World', price: 24.99, image: 'https://via.placeholder.com/200x300' },
  { id: 4, title: 'History Insights', price: 18.99, image: 'https://via.placeholder.com/200x300' }
])
</script>