const initSDK = new Promise((res) => {
    res(CY.loader()
        .licenseKey("0c1147cda5c900085bac32b44d10bf923c2edcd791ac")
        .addModule(CY.modules().FACE_AGE.name)
        .addModule(CY.modules().FACE_GENDER.name)
        .addModule(CY.modules().FACE_EMOTION.name)
        .load()
        .then(({ start }) => start()))
});

const age_div = document.querySelector("#age");
const gen_div = document.querySelector("#gender");
const emo_div = document.querySelector("#emotion");

window.addEventListener(CY.modules().FACE_AGE.eventName, (evt) => {
    age_div.innerHTML = 'Age: ' + evt.detail.output.numericAge;
});

window.addEventListener(CY.modules().FACE_GENDER.eventName, (evt) => {
    gen_div.innerHTML = 'Gender: ' + evt.detail.output.mostConfident;
});

window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    emo_div.innerHTML = 'Emotion: ' + evt.detail.output.dominantEmotion;
});

window.setInterval(() => {
    console.log("INSRT")
}, 1000)