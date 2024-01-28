<script>
    export let searchTerm;
</script>

<div class = "seach-bar-wrapper">
    <input class = "search-bar" type="text" placeholder="Search" id = "search-text" bind:value={searchTerm} on:input>
    <button class = "search-button">Search</button>
</div>

<style>
.search-button {
    font-size: 20px;
    margin-left: 1.5%;
    color: white;
    background: transparent linear-gradient(180deg,#6b66c6,#896deb);
    width: 120px;
    height: 60px;
    border-radius: 40px;
    font-weight: bold;
}
.search-bar {
    width: 650px;
    height: 60px;
    font-size: 20px;
    padding-left: 20px;
    border-radius: 40px;
    border: none;
    font-family: inherit;
}
</style>