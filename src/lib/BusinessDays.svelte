<script lang="ts">
  import { BusinessDaysInMonth } from './date';

  const businessDaysInMonth = new BusinessDaysInMonth();

  let chosen = Date.now();

  $: day = new Date(chosen);

  $: businessDays = businessDaysInMonth.calculate(day);
</script>

<div>
  <header>📈🤑💰</header>
  <h1>{businessDays} business daze</h1>
  <label for="date">
    Choose Month:
    <input type="date" bind:value={chosen} id="date" />
  </label>
</div>

<style>
  div {
    display: grid;
    grid-gap: 1rem;
  }

  header {
    font-size: 4rem;
  }
</style>
