<script>
    let hello = 'Hello Svelte!'
</script>

<style>
    h1 {
        font-size: 16px;
        font-weight: 500;
        color: rebeccapurple;
    }
</style>

<h1>{hello}</h1>
<input type="text" bind:value={hello}>

<button>Svelte</button>
