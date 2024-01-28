<script>
import * as tf from '@tensorflow/tfjs';
import * as math from 'mathjs';
import {stemmer} from 'stemmer';
import { onMount } from 'svelte';
onMount(() => {
    const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Load the pre-trained model
async function loadModel() {
    const model = await tf.loadLayersModel('model/model.json');
    return model;
}

// Generate a response from the model
async function generateResponse(model, message) {
    const inputTensor = tf.tensor2d([message.map(char => char.charCodeAt(0))]);
    const outputTensor = model.predict(inputTensor);
    const outputArray = Array.from(outputTensor.dataSync()[0]);
    const response = outputArray.map(code => String.fromCharCode(code)).join('');
    return response;
}

// Add message to the chat log
function addMessageToChatLog(message, isUser) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    if (isUser) {
        messageContainer.classList.add('user');
    } else {
        messageContainer.classList.add('bot');
    }
    messageContainer.textContent = message;
    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Handle user input and generate response
async function handleUserInput() {
    const userMessage = userInput.value;
    userInput.value = '';

    addMessageToChatLog(userMessage, true);

    const response = await generateResponse(model, userMessage);
    addMessageToChatLog(response, false);
}

// Load the model and set up event listeners
let model;
loadModel().then(loadedModel => {
    model = loadedModel;
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });
});
// Define the model architecture
function createModel() {
    const model = tf.sequential();

    // Encoder
    model.add(tf.layers.lstm({
        units: 128,
        inputShape: [null, 1],
        returnSequences: false
    }));

    // Repeat vector to match decoder input shape
    model.add(tf.layers.repeatVector({ n: 10 }));

    // Decoder
    model.add(tf.layers.lstm({
        units: 128,
        returnSequences: true
    }));

    model.add(tf.layers.timeDistributed({
        layer: tf.layers.dense({ units: 1 })
    }));

    return model;
}

// Prepare the data for training
function prepareData() {
    const data = [
        { input: "Hello", output: "Hi" },
        { input: "What's your name?", output: "I am a chatbot" },
        // Add more training examples here
    ];

    const inputSeqs = data.map(entry => entry.input.split("").map(char => char.charCodeAt(0)));
    const outputSeqs = data.map(entry => entry.output.split("").map(char => char.charCodeAt(0)));

    const maxInputLength = Math.max(...inputSeqs.map(seq => seq.length));
    const maxOutputLength = Math.max(...outputSeqs.map(seq => seq.length));

    const inputTensor = tf.tensor2d(inputSeqs, [inputSeqs.length, maxInputLength, 1]);
    const outputTensor = tf.tensor2d(outputSeqs, [outputSeqs.length, maxOutputLength, 1]);

    return { inputTensor, outputTensor };
}

// Train the model
async function trainModel(model, inputTensor, outputTensor) {
    const learningRate = 0.01;
    const optimizer = tf.train.adam(learningRate);
    model.compile({
        optimizer,
        loss: 'meanSquaredError'
    });

    const batchSize = 2;
    const epochs = 100;

    const history = await model.fit(inputTensor, outputTensor, {
        batchSize,
        epochs,
        shuffle: true,
        validationSplit: 0.2,
        callbacks: tf.node.tensorBoard('./logs')
    });

    console.log('Training complete.');
}

// Save the model
async function saveModel(model) {
    await model.save('model');
    console.log('Model saved.');
}

// Create and train the model
async function main() {
    const model = createModel();
    const { inputTensor, outputTensor } = prepareData();
    await trainModel(model, inputTensor, outputTensor);
    await saveModel(model);
}

main().catch(console.error);
}

// Start the training and prediction process
trainAndSaveModel().then(initializeModelAndPredict);
})
</script>

<div class="chat-container">
    <div class="chat-output" id="chat-output"></div>
    <input type="text" id="user-input" placeholder="Type your message...">
    <button id="send-button">Send</button>
</div>

<style>
.chat-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
}

.chat-output {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 300px;
  overflow-y: scroll;
  padding: 10px;
}

#user-input {
  width: 100%;
  margin-top: 10px;
  padding: 5px;
}

#send-button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
