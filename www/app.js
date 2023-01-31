const tempValues = {
    'arousal': [],
    'valence': []
}

const initSDK = new Promise((res) => {
    res(CY.loader()
        .licenseKey("0c1147cda5c900085bac32b44d10bf923c2edcd791ac")
        .addModule(CY.modules().FACE_AGE.name)
        .addModule(CY.modules().FACE_GENDER.name)
        .addModule(CY.modules().FACE_EMOTION.name)
        .addModule(CY.modules().FACE_AROUSAL_VALENCE.name, {smoothness: 0})
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

window.addEventListener(CY.modules().FACE_AROUSAL_VALENCE.eventName, (evt) => {
    const { valence, arousal } = evt.detail.output
    tempValues['valence'].push(valence);
    tempValues['arousal'].push(arousal);
})

window.setInterval(() => {
    avg = {
        'a': tempValues['arousal'].reduce((a, b) => a + b, 0) / tempValues['arousal'].length,
        'v': tempValues['valence'].reduce((a, b) => a + b, 0) / tempValues['arousal'].length
    }
    tempValues['arousal'].length = 0;
    tempValues['valence'].length = 0;

    if (isNaN(avg['a']) || isNaN(avg['v'])) {
        return
    }
    console.log(avg)
}, 5000)