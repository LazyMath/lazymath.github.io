<script>
import { onMount } from "svelte";
import disp_data from "../../store";
import SearchBar from "$lib/search-bar.svelte";
import InstallInstruc from "$lib/install-instruc.svelte";
import ChatBot from "$lib/chat-bot.svelte";
let searchTerm = "";
onMount(() => {
document.body.classList.remove("about-theme");
document.body.classList.add("home-theme");
document.body.classList.remove("contact-theme");
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
};

window.addEventListener("input", () => {
    let value = searchTerm;
    let cards = document.getElementsByClassName("card-info");
    let num_expired = 0;
    for (let i = 0; i < card_infos.length; i++) {
        let card_item = card_infos[i];
        const visible = card_item.header.toLowerCase().includes(value);
        cards[i].classList.toggle("hide-card", !visible);
        if (cards[i].classList.contains("hide-card")){
            num_expired += 1;
        }
    }
    let faq_div = document.getElementsByClassName("none-statement");
    faq_div[0].classList.toggle("hide-card", !(num_expired == card_infos.length));
})
})
const card_infos = [
    {
        header: "How do I install the UDFs?",
        body: "A long bunch of mumbo jumbo"
    },
    {
        header: "My student software has expired, what do I do?",
        body: ""
    },
    {
        header: "Can I request to have a new UDF made?",
        body: "Yes of course you can! Please send us an email letting us know what UDF you would like to be made. We will try and create a new UDF every month based on suggestions from the community."
    },
    {
        header: "Why should I use UDFs?",
        body: "UDFs take the brain work out of Tech Access exams, meaning you have a lower chance of making a careless error. Automating the process also makes it much faster, allowing you to speed through the exam."
    },
    {
        header: "Do you offer Casio Classpad or Mathematica UDFs?",
        body: ""
    },
    {
        header: "What do I do if there is an error?",
        body: "First, please check that you have not entered an incorrect input or syntax. If you have checked this and the error is still present please contact us immediately. While we endevour to minimise the errors in our programs, it is impossible to remove every single little bug. Thus, we heavily rely on community support to help us troubleshoot our UDFs."
    },
    {
        header: "Have these been tested?",
        body: "Yes, our team of beta testers have either used these on their VCE exams or spent time going through to ensure there are no errors present. However, it is not possible for us to determine every single bug in existance, thus, we heavily rely on community support to help troubleshoot our UDFs."
    },
    {
        header: "How much do these cost?",
        body: "As we said in our home page, they are completely FREE! Enjoy!"
    },
];
</script>
<div class = "contact-info">
    <div class = "search-wrapper" id = "scrollToTop">
        <h1 class = "contact-info-title">How can we help you?</h1>
        <SearchBar bind:searchTerm on:input></SearchBar>
    </div>
    <div class = "faq-wrapper">
        <h1>FAQs</h1>
        <p class = "none-statement hide-card">Sorry we couldn't find what you're looking for...</p>
        <div class = "card-wrapper">
            {#each card_infos as card, i}
                <div class = "card-info">
                    <details>
                        <summary class = "card-name"><b>{card.header}</b></summary>
                        {#if card.header == "How do I install the UDFs?"}
                            <InstallInstruc></InstallInstruc>
                        {:else if card.header == "My student software has expired, what do I do?"}
                            <p class = "card-main">Instead of the student software, you will still be able to transfer files to your CAS calculator via Nspire Connect, found <a href=" https://nspireconnect.ti.com/nsc/">here</a>.</p>
                            <p class = "card-main">You may wish to see installation for how to install the UDFs through this method.</p>
                        {:else if card.header == "Do you offer Casio Classpad or Mathematica UDFs?"}
                            <p class = "card-main">Unfortunately no. However, there are classpad and mathematica UDFs avaliable for free online. Check out Nhan's site, found <a href="https://nhtnhanbn.github.io/whitecas/">here</a>.</p>
                        {:else}
                            <p class = "card-main">{card.body}</p>
                        {/if}
                    </details><br>
                </div>
            {/each}
        </div>
    </div>
    <div class = "contact-info-wrapper" id = "scrollToBottom">
        <h1 class = "contact-title">Contact Us</h1>
        <p class = "contact-subtext">
            If you would like to contact us, please send an email to 
            <a class = "contact-subtext" href="mailto:opensourceedu2023@gmail.com">opensourceedu2023@gmail.com</a>
        </p>
    </div>
</div>
<ChatBot></ChatBot>
<style>
    
    
</style>