<script lang="ts">
  import { BusinessDaysCalculator } from '../lib/BusinessDaysCalculator';

  const businessDays = new BusinessDaysCalculator();

  let chosen = Date.now();

  $: day = new Date(chosen);

  $: days = businessDays.calculate(day);
</script>

<div>
  <header>📈🤑💰</header>
  <h1>{days} business days</h1>
  <label for="month">
    Choose Month:
    <input type="date" bind:value={chosen} id="month" />
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
