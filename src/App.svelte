<script lang="ts">
  import BusinessDays from './lib/BusinessDays.svelte';
</script>

<main>
  <BusinessDays />
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(:root) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    font-size: 18px;
  }

  :global(#app) {
    min-height: 100vh;
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
    display: grid;
  }

  :global(html) {
    height: -webkit-fill-available;
  }

  main {
    text-align: center;
    padding: 1rem;
    margin: auto;
  }
</style>
