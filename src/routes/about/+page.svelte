<script>
import { onMount } from "svelte";
import ChatBot from "$lib/chat-bot.svelte";
import disp_data from "../../store.js";
function toggle_about_dark() {
    if (document.body.classList.contains("dark-mode")){
        $disp_data = {
            "svg_id": "/sun.svg",
            "logo_id": "/logo-dark.svg",
            "compass_id":  "/compass-dark.svg",
        }
    }
    else {
        $disp_data = {
            "svg_id": "/moon-white.svg",
            "logo_id": "/logo-dark.svg",
            "compass_id": "/compass-light.svg",
        }
    }
}
function adjust_about_theme() {
    let navbar = document.querySelector(".navbar");
    if (document.body.classList.contains("about-theme") && !navbar?.classList.contains("sticky")){
        if (document.body.classList.contains("about-theme-off")) {
            document.body.classList.remove("about-theme-off")
        };
        toggle_about_dark()
    }
    else if (document.body.classList.contains("about-theme") && navbar?.classList.contains("sticky")){
        if (!document.body.classList.contains("about-theme-off")) {
            document.body.classList.add("about-theme-off")
        };
        if (document.body.classList.contains("dark-mode")){
        $disp_data = {
            "svg_id": "/sun.svg",
            "logo_id": "/logo-dark.svg",
            "compass_id":  "/compass-dark.svg"
        }
        }
        else {
            $disp_data = {
                "svg_id": "/moon.svg",
                "logo_id": "/logo-light.svg",
                "compass_id": "/compass-light.svg"
            }
        }
    }
};
onMount(() => {
    document.body.classList.add("about-theme");
    document.body.classList.remove("home-theme");
    document.body.classList.remove("contact-theme");
    adjust_about_theme()
    window.addEventListener("scroll", function() {
        adjust_about_theme()
    })
})
</script>
<div class = "about-info" id = "scrollToTop">
    <div class = "left-row">
        <h1 class = "about-left-text">About Us</h1>
        <p class = "about-left-subtext">
            With many resources locked behind heafty paywalls of fourty to sixty dollars, many students have been
            unable to afford them, resulting in them being disadvantaged in their exams.
        </p>
        <p class = "about-left-subtext">
            Open Source VCE was founded on the premise that these resources should be freely avaliable to everyone, not just to those
            which can afford them.
        </p>
    </div>
    <div class = "right-row">
        <img src = "/about-us-image.png" alt = "about-us-img" class = "about-right-row-img">
    </div>
</div>
<div class = "mission-info" id = "scrollToBottom">
    <div class = "mission-statement">
        <div class = "left-row">
            <h1 class = "left-text">Our Mission</h1>
            <p>Due to the scarcity of freely avaliable VCE and university resources it has become difficult for many students, 
                particularly those which face disadvantage, to get access to quality resources to support their education.</p>
            <p>We aim to fill this gap by offering students free access to both CAS software, and quality notes from various VCE 
                and university units.</p>
            <p>We highly value feedback on how to improve the quality of our services. If you believe something could be done 
                better, or believe the creation of a certain CAS UDF would be beneficial, feel free to contact us via email.</p>
        </div>
        <div class = "right-row">
            <h1 class = "right-text">Provide <u>all</u> students <span class = "spec-text">access to free resources</span></h1>
        </div>
    </div>
</div>
<ChatBot></ChatBot>
<style>
    
</style>