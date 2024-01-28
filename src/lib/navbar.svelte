<script>
import { onMount } from "svelte";
import disp_data from "../store.js";
function toggle_dark_theme() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")){
        $disp_data = {
            "svg_id": "/sun.svg",
            "logo_id": "/logo-dark.svg",
            "compass_id":  "/compass-dark.svg"
        }
    }
    else {
        if (document.body.classList.contains("about-theme")) {
            if (document.body.classList.contains("dark-mode")){
            $disp_data = {
                "svg_id": "/sun.svg",
                "logo_id": "/logo-dark.svg",
                "compass_id":  "/compass-dark.svg",
            }}
            else {
                $disp_data = {
                    "svg_id": "/moon-white.svg",
                    "logo_id": "/logo-dark.svg",
                    "compass_id": "/compass-light.svg",
                }}
        }
        else {
            $disp_data = {
            "svg_id": "/moon.svg",
            "logo_id": "/logo-light.svg",
            "compass_id": "/compass-light.svg"
            }
        }
    }};
onMount(() => {
    window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");
    navbar?.classList.toggle("sticky", window.scrollY > 0)
    })
})

</script>

<div class = "navbar">
    <img class = "site-logo" src = {$disp_data["logo_id"]} alt = "site logo">
    <nav>
        <ul>
            <li><a href="/" class = "stay">Home</a></li>
            <li><a href="/about" class = "stay">About Us</a></li>
            <li><a href="/contact" class = "stay">Contact Us</a></li>
            <li><button on:click={() => toggle_dark_theme()} style="width:0%; cursor:default;"><img src={$disp_data["svg_id"]} alt = "moon-icon" id="icon"></button></li>
        </ul>
    </nav>
</div>
<style>
    
</style>