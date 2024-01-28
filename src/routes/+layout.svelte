<script>
  import Navbar from '$lib/navbar.svelte';
  import Footer from '$lib/footer.svelte';
</script>

<header>
    <Navbar></Navbar>
</header>
<main class = "main">
  <slot></slot>
</main>
<footer>
  <Footer></Footer>
</footer>

<style>
  
</style>