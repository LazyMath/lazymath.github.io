<script>

</script>
<div class = "container">
    <div class = "blob"></div>
</div>
<style>
    .container {
        min-height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    .blob {
        position: absolute;
        width: 200px;
        height: 200px;
        background: transparent linear-gradient(180deg, #d6d6d6,white);
        mix-blend-mode: color-dodge;
        animation: move 25s infinite alternate;
        border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
    }
    @keyframes move {
        from {
            transform: translate(-100px,-50px) rotate(-90deg);
            border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
        }
        to {
            transform: translate(500px,100px) rotate(-10deg);
            border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
        }
    }
</style>