<script>
import * as tf from '@tensorflow/tfjs';
import * as math from 'mathjs';
import {stemmer} from 'stemmer';
import { onMount } from 'svelte';
import {goto} from "$app/navigation";
import { page } from '$app/stores';
import { messages } from '../store';
//Misc variables
let userMessage = "";
let button_img = "/chat-button.svg";
//Scroll on page
function scroll_to(entry) {
    var ref = document.getElementById(entry);
    setTimeout(function () {
        ref?.scrollIntoView({
            behavior: 'smooth'
        });
    },100)
}
//Define data pre-processing variables
let tags = [];
let all_words = [];
let xy = [];
let x_train = [];
let y_train = [];
let model;
let orig_order;
const training_data =  [
    {
      "tag": "funny",
      "patterns": [
        "Give me a joke!",
        "Make me laugh",
        "Do you know a joke?",
        "Tell me something funny!"
      ],
      "responses": [
        "Why isn't dark spelt with a C? Because you can't see in the dark!",
        "What do you call a fish with no eyes? A fsh!",
        "What do you call a sleeping Bull? A bulldozer",
        "What happens when a frog parks illegally? It gets toad away..."
      ]
    },
    {
        "tag": "creation",
      "patterns": [
        "Who made you?",
        "How were you created?",
        "When were you made?",
        "Who programmed you?",
        "How were you made?"
      ],
      "responses": [
        "I was made by Open Source VCE. My creator starting programming me in late 2023 and finished in early 2024! :)"
      ]
    },
    {
        "tag": "purpose",
      "patterns": [
        "What are you?",
        "Why were you created?",
        "Why did someone decide to make you?",
        "What is your purpose?",
        "Why were you made?",
        "What can you do?",
        "What do you do?"
      ],
      "responses": [
        "I am a chatbot designed to assist those which visit this website with their inquiries!",
        "Currently, I am just a humble chatbot... However, I hope to become more general purpose in the future!",
        "Right now I just assist with inquiries, but my creator plans to train me on data from VCE subjects and allow me to also assist students with their studies!"
      ]
    },
    {
        "tag": "apology",
      "patterns": [
        "Sorry about that",
        "Whoops, sorry for that",
        "Apologies for that",
        "My bad I didn't mean that",
        "My bad whoops, sorry",
        "Sorryyy"
      ],
      "responses": [
        "That's okay, don't worry about it :)",
        "Sorry I'm not the best at interpreting language haha, I was just recently made. Hopefully I will improve in the future :)",
        "All good! Don't worry about it!"
      ]
    },
    {
      "tag": "goodbye",
      "patterns": ["Bye", "See you later", "Goodbye"],
      "responses": [
        "See you later, thanks for visiting",
        "Have a nice day",
        "Bye! Come back again soon."
      ]
    },
    {
      "tag": "greeting",
      "patterns": [
        "Hi",
        "Hey",
        "Is anyone there?",
        "Hello",
        "Good day"
      ],
      "responses": [
        "Heyyy!",
        "Hello, thanks for visiting this site!",
        "Hi there, how can I help?"
      ]
    },
    {
      "tag": "semiGreeting",
      "patterns": [
        "Hi, how are you?",
        "Hey, how are you today?",
        "How are you?",
        "Hello, how are you?"
      ],
      "responses": [
        "Hello! I'm good thanks for asking! How about you?",
        "Hi, I am good thanks. I hope you are well too :)",
        "Hey, I am good thank you. How are you?"
      ]
    },
    {
      "tag": "compliment",
      "patterns": [
        "That's amazing!",
        "That is awsome!",
        "You are cool",
        "You are amazing",
        "That's fantastic!",
        "That is great",
        "That is so cool!",
        "You are so cool!",
        "you're amazing!",
        "You're awsome!"
      ],
      "responses": [
        "Aww thanks :)",
        "Haha thanks so much!",
        "thanks!",
        "Thanks so much :)"
      ]
    },
    {
      "tag": "doingWell",
      "patterns": [
        "I'm good thank you.",
        "I am good too!",
        "I am well thanks",
        "I am all good",
        "I am doing well",
        "Doing good, thanks",
        "Things are doing amazing!"
      ],
      "responses": [
       "That's great to hear!",
       "That's great!",
       "That is good!",
       "Amazing to hear!"
      ]
    },
    {
      "tag": "howWork",
      "patterns": [
        "How do you work exactly?",
        "How do I navigate?",
        "How do you work?",
        "How do I use you?",
        "What do you do exactly?"
      ],
      "responses": [
       "I am currently able to assist in navigation and answering questions. If you would like me to help you navigate the website, just type where you want to go in the chat! For example, if you want to go to the methods udfs, just type: mm udfs :)"
      ]
    },
    {
      "tag": "compassion",
      "patterns": [
        "I don't feel good today",
        "I am sad",
        "I am depressed",
        "I am not okay",
        "I'm not feeling too well",
        "A lot of bad stuff happened",
        "Something bad happened",
        "I am not happy right now",
        "I failed",
        "I didn't do well in a test"
      ],
      "responses": [
       "Hey, its okay to feel that way when times are rough. I hope you get better soon. If you need someone to talk to please contact lifeline (13 11 14) or beyond blue (1300 22 4636)",
       "I understand what you are going through is tough, but I know you can get through it :)",
       "That's okay, the next few days might be a bit rough, but I know you can get through it :)",
       "Hey, it's not the end of the world. I understand that it's tough, but you will get better soon. If you need someone to talk to please contact (13 11 14) or beyond blue (1300 22 4636)"
      ]
    },
    {
      "tag": "student software",
      "patterns": [
        "My student software expired what do I do?",
        "No more student software",
        "Student software gone",
        "Student software expired. What to do?",
        "Student software expired",
        "Ti license expired",
        "Texas Instruments license expired",
        "Can't use student software anymore"
      ],
      "responses": [
        "That is very unfortunate :( Please use this link instead to install our programs, found here: https://nspireconnect.ti.com/nsc/"
      ]
    },
    {
      "tag": "contact",
      "patterns": [
        "How do I contact you?",
        "Who do I contact?",
        "How can I contact the owner?",
        "How can I contact the creator?",
        "How can get help?",
        "Need help",
        "Need support",
        "You're not helping",
        "Need further assistance",
        "Not sure what to do"
      ],
      "responses": [
        "Please have a look at our FAQs. If you have already done so and still require help, please contact us via email using: opensourceedu2023@gmail.com"
      ]
    },
    {
      "tag": "thanks",
      "patterns": [
        "Thanks", 
        "Thank you", 
        "That's helpful", 
        "Thank's a lot!"
      ],
      "responses": [
        "Happy to help!", 
        "Any time!", 
        "My pleasure"]
    },
    {
      "tag": "scrollToTop",
      "patterns": [
        "Go to top",
        "scroll to top",
        "go top",
        "scroll top",
        "scroll to start",
        "go to start",
        "go start",
        "go back up",
        "go up",
        "top"
      ],
      "responses": [
        "sure thing!",
        "Can do! Scrolling now!",
        "Scrolling...",
        "Scrolling now!",]
    },
    {
      "tag": "scrollToBottom",
      "patterns": [
        "Go to bottom",
        "scroll to bottom",
        "go bottom",
        "scroll end",
        "scroll to end",
        "go to end",
        "go end",
        "bottom",
        "go down",
      ],
      "responses": [
        "sure thing!",
        "Can do! Scrolling now!",
        "Scrolling...",
        "Scrolling now!",]
    },
    {
      "tag": "scrollToMM",
      "patterns": [
        "Go to math methods udfs",
        "go to mathematical methods udfs",
        "go to mm udfs",
        "go to mm",
        "go to methods udfs",
        "mm"
      ],
      "responses": [
        "sure thing!",
        "Can do! Scrolling now!",
        "Scrolling...",
        "Scrolling now!",]
    },
    {
      "tag": "scrollToSM",
      "patterns": [
        "Go to specialist udfs",
        "go to specialist mathematics udfs",
        "go to sm udfs",
        "go to sm",
        "go to spec udfs",
        "sm"
      ],
      "responses": [
        "sure thing!",
        "Can do! Scrolling now!",
        "Scrolling...",
        "Scrolling now!",]
    },
    {
      "tag": "scrollToDownload",
      "patterns": [
        "Go to download",
        "go to download udf",
        "go to download section",
        "go to download part"
      ],
      "responses": [
        "sure thing!",
        "Can do! Scrolling now!",
        "Scrolling...",
        "Scrolling now!",]
    },
    {
      "tag": "gotoHome",
      "patterns": [
        "Go to home",
        "go home page",
        "go to home page",
        "go home page",
        "take me to home",
        "take me to home page",
        "load home page",
        "take me back to home page",
        "home"
      ],
      "responses": [
        "sure thing!",
        "Can do! Redirecting now!",
        "Redirecting...",
        "Redirecting now!",]
    },
    {
      "tag": "gotoAbout",
      "patterns": [
        "Go to about",
        "go about page",
        "go to about page",
        "go about page",
        "take me to about",
        "take me to about page",
        "load about page",
        "take me back to about page",
        "about us"
      ],
      "responses": [
        "sure thing!",
        "Can do! Redirecting now!",
        "Redirecting...",
        "Redirecting now!",]
    },
    {
      "tag": "gotoContact",
      "patterns": [
        "Go to contact",
        "go contact page",
        "go to contact page",
        "go contact page",
        "take me to contact",
        "take me to contact us page",
        "load contact us page",
        "take me back to contact us page",
        "contact us"
      ],
      "responses": [
        "sure thing!",
        "Can do! Redirecting now!",
        "Redirecting...",
        "Redirecting now!",]
    },
    {
      "tag": "chatGPT",
      "patterns": [
        "Are you made using the Open AI API?",
        "Are you chatGPT?",
        "Are you made using chatGPT?",
        "Are you a chatGPT clone?"
      ],
      "responses": [
       "Haha I am not! :O I am a humble chatbot made by the owner of this website!",
       "I was not created using the Open AI API, my owner didn't want to pay for the Open AI API, so they made and trained me on their own!" 
       ]
    },
    {
      "tag": "insult",
      "patterns": [
        "You are stupid", 
        "You are dumb", 
        "Why are you so stupid", 
        "Why are you so dumb?",
        "Stupid chatbot",
        "Stupid robot",
        "Dumbass chatbot",
        "Dumb robot",
        "dumbass",
        "stupid"
      ],
      "responses": [
        "You hurt my feelings :(",
        "Why are you so mean? :(",
        "You make me sad :("
        ]
    }
   ];
//Creating processing functions
function tokenize(sentence) {
    let string_clean = sentence.toLocaleLowerCase()
    string_clean = string_clean.replace(/[^\w\s]|_/g,"") // Removing punctuation characters, replace with blank space
    string_clean = string_clean.split(" ") //Splitting into array via removing blank spaces
    return string_clean
};
function stem(word) {
    return stemmer(word); //Getting stem of word
};
function bag_of_words(tokenized_sentence, all_words) {
    tokenized_sentence = tokenized_sentence.map(stem);
    let bag = tf.zeros([all_words.length,], "float32");
    let bag_buffer = tf.buffer(bag.shape, bag.dtype, bag.dataSync());
    for (var j = 0; j < all_words.length; j++) {
        if (tokenized_sentence.includes(all_words[j])) {
            bag_buffer.set(1,j)
        }
    }
    bag = bag_buffer.toTensor();
    return bag
};
//Processing Data
function process_data() {
   for (var i = 0; i < training_data.length; i++) {
    let data = training_data[i];
    tags.push(data["tag"]);
    for (var j = 0; j < data.patterns.length; j++) {
        let word = tokenize(data["patterns"][j]);
        all_words.push(...word);
        xy.push([word,data["tag"]]);
    };
   };
   orig_order = tags;
   all_words = all_words.map(stem);
   all_words = [... (new Set(all_words))].sort(); //Removing duplicates
   tags = [... (new Set(tags))].sort();
   for (var i = 0; i < xy.length; i++) {
    x_train.push(bag_of_words(xy[i][0],all_words));
    y_train.push(tags.indexOf(xy[i][1]));
   };
   return [x_train, y_train];
};
//Creating model 
async function train_model(input_data,output_data) {
    const model = tf.sequential();
    const learning_rate = 0.01;
    const epochs = 10;
    const optimizer = tf.train.adam(learning_rate);
    model.add(tf.layers.dense({
        units: 100,
        batchSize: 8,
        inputShape: [all_words.length],
        activation: 'relu'
    }))
    model.add(tf.layers.dense({
        units: 50,
        activation: 'relu'
    }))
    model.add(tf.layers.dense({
        units: tags.length,
        activation: 'softmax'
    }))
    model.compile({
        optimizer: optimizer,
        loss: 'sparseCategoricalCrossentropy',
        metrics: ['accuracy']
    })
    const history = model.fit(input_data,output_data,{
        epochs: epochs,
        callbacks: {onEpochEnd: async (epoch, logs) => {
            await tf.nextFrame();
        }}
    });
    return model
};
//Training and Saving model
async function save_model() {
    const [x_train, y_train] = process_data();
    model = await train_model((tf.stack(x_train)), tf.tensor(y_train, [y_train.length,], 'float32'));
    setTimeout(function() {
        model.save('indexeddb://chat-bot');
        $messages[0] = ("Hello! I am your virtual assistant chatbot! I can help in page navigation, and help answer any questions you have :)");
    }, 6000);
}

//Update chat log
function handleKeydown(e) {
    let sendButton = document.querySelector(".send-button");
    let click_event = new CustomEvent("click");
    let chatBox = document.querySelector(".chat-log");
    if ((e.key == "Enter")){
        e.preventDefault();
        if (userMessage.trim() != "") {
            sendButton?.dispatchEvent(click_event);
        };
        update_chat_log();
        setTimeout(() => {
          chatBox?.scrollTo(0,chatBox?.scrollHeight);
        }, 100);
    };
};
async function update_chat_log() {
    let sendButton = document.querySelector(".send-button");
    const model = await tf.loadLayersModel('indexeddb://chat-bot');
    sendButton?.addEventListener("click", () => {
        if (!(userMessage.trim() == "")) {
            $messages.push(userMessage);
            let input = (bag_of_words(tokenize(userMessage), all_words)).reshape([1,all_words.length]);
            let predictions = (model.predict(input));
            let prediction = predictions.argMax(-1).dataSync();
            let predictString = tags[prediction];
            let responses = training_data[orig_order.indexOf(predictString)]["responses"];
            let response = responses[math.floor(math.random() * responses.length)];
            $messages.push(response);
            $messages = $messages;
            userMessage = "";
            switch(predictString) {
                case "scrollToTop":
                    setTimeout(function () {
                        scroll_to("scrollToTop")
                    },500)
                    break;
                case "scrollToBottom":
                    setTimeout(function () {
                        scroll_to("scrollToBottom");
                    },500)
                    break;
                case "scrollToMM":
                    if ($page.route.id != "/") {
                        goto("/");  
                    };
                    setTimeout(function () {
                        scroll_to("scrollToMM");
                    },500);
                    break;
                case "scrollToSM":
                    if ($page.route.id != "/") {
                        goto("/");
                    }
                    setTimeout(function () {
                        scroll_to("scrollToSM")
                    },500)
                    break;
                case "scrollToDownload":
                    if ($page.route.id != "/") {
                        goto("/");
                    }
                    setTimeout(function() {
                        scroll_to("scrollToBottom");
                    },500)
                    break;
                case "gotoHome":
                    goto("/");
                    break;
                case "gotoAbout":
                    goto("/about");
                    break;
                case "gotoContact":
                    goto("/contact");
                    break;
                default:
                    break;
            };
        };
    });
};

function hide_chat() {
    let chatBox = document.querySelector(".chat-box");
    let chatLog = document.querySelector(".chat-log");
    let lastChild = chatLog?.lastElementChild;
    chatBox?.classList.toggle("hide");
    if (button_img == "/chat-button.svg") {
        button_img = "/x-icon.svg";
        setTimeout(function () {
        lastChild?.scrollIntoView({
            behavior: 'smooth'
          });
        },100)
    } else if (button_img == "/x-icon.svg") {
        button_img = "/chat-button.svg";
    }
};

onMount(() => {
  save_model();
});

</script>
<div class = "chat-bot-wrapper">
    <div class = "chat-box hide" id = "dropup">
        <div class = "top-banner">
            <div class = "icon-holder">
                <img class = "bot-icon-img" src = "/bot-icon.svg" alt = "bot-icon">
            </div>
        </div>
        <ul class = "chat-log">
            {#each $messages as message, i}
                {#if i%2 == 0}
                    <li class = "message-card"><p class = "message-item chat-out">{message}</p></li>
                {:else}
                    <li class = "message-card"><p class = "message-item chat-in">{message}</p></li>
                {/if}
            {/each}
        </ul>
        <div class = "chat-input">
            <textarea placeholder="Enter message..." required class = "user-input" id = "user-input" bind:value={userMessage} on:keydown={handleKeydown}></textarea>
            <img src = "send-button.svg" class = "send-button" alt = "send-button">
        </div>
    </div>
    <button class = "chat-button" data-target="#dropup" on:click={() => hide_chat()}>
        <img class = "chat-button-image" src = {button_img} alt = "chat-button">
    </button>
</div>

<style>
    .message-card p {
        font-size: 0.95rem;
        padding: 4% 3%; 
        margin-left: 3%;
        overflow-y: hidden;
    }
    .chat-box.hide {
        display: none;
    }
    .chat-input {
        border-top: 1px solid lightgray;
        width: 100%;
        display: inline-block;
    }
    .chat-input img {
        width: 6%;
        margin-left: 90%;
        margin-top: 6%;
        position: absolute;
        cursor: pointer;
    }
    .chat-input .user-input {
        position: absolute;
        font-family: inherit;
        border: none;
        outline: none;
        resize: none;
        width: 85%;
        margin-left: 2%;
        font-size: medium;
        height: 12%;
    }
    .chat-in {
        color: white;
        background: #8e4bfc;
        float: right;
        margin-right: 15px;
    }
    .chat-out {
        background: lightgray;
        color: black;
    }
    .message-item {
        width: fit-content;
        max-width: 65%;
        border-radius: 12px;
        margin-left: 2%;
    }
    .message-card {
        width: 100%;
        height: fit-content;
    }
    .chat-log {
        display: flex;
        flex-direction: column;
        padding-left: 2%;
        list-style: none;
        max-height: 290px;
        height: 290px;
        overflow-y: scroll;
        scroll-behavior: smooth;
        hyphens: auto;
    }
    .icon-holder {
        display: inline-block;
        background-color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 4%;
    }
    .bot-icon-img {
        padding: 19%;
        width: 30px;
        height: 30px;
    }
    .top-banner {
        display: inline-block;
        width: 100%;
        height: 15%;
        background: linear-gradient(90deg,#8e4bfc,#30befc);
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
    .chat-box {
        width: 300px;
        height: 500px;
        border-radius: 12px;
        background-color: white;
        -moz-box-shadow: 0 0 10px lightgray;
        -webkit-box-shadow: 0 0 10px lightgray;
        box-shadow: 0 0 10px lightgray;
        position: fixed;
        bottom: 140px;
        right: 60px;
    }
    .chat-button-image {
        width: 30px;
        height: 30px;
    }
   .chat-button {
        display: inline-block;
        position: fixed;
        background-color: #8e4bfc;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        bottom: 60px;
        right: 50px;
   }
</style>