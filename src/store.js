import { writable } from "svelte/store";
const disp_data = writable({
    "svg_id": "/moon.svg",
    "logo_id": "/logo-light.svg",
    "compass_id": "/compass-light.svg",
})
export const messages = writable(["Loading chatbot ..."]);

export default disp_data;