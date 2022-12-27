const IMG_OUTER_WIDTH = 800;
const IMG_INNER_WIDTH = 598;
const IMG_X_OFFSET = 101;

const IMG_OUTER_HEIGHT = 686;
const IMG_INNER_HEIGHT = 598;
const IMG_Y_OFFSET = 45;

const PIN_RADIUS = 6;

const img_ratio = IMG_OUTER_WIDTH / IMG_OUTER_HEIGHT;
const pin_radius_x = PIN_RADIUS / img_ratio;

function get2DPoint({ valence, arousal }) {

    const normalized = (z) => (z + 1) / 2;

    return {
        x: 100 * (IMG_X_OFFSET + IMG_INNER_WIDTH * normalized(valence)) / IMG_OUTER_WIDTH,
        y: 100 * (IMG_Y_OFFSET + IMG_INNER_HEIGHT * normalized(arousal)) / IMG_OUTER_HEIGHT
    };
}

function setPinPosition({ x, y }) {
    const pin = document.getElementById("pin");
    pin.style.left = `${x - pin_radius_x}%`; // check img ratio to avoid ellipse
    pin.style.bottom = `${y - PIN_RADIUS}%`;
}

window.addEventListener(CY.modules().FACE_AROUSAL_VALENCE.eventName, (evt) => {
    const { valence, arousal } = evt.detail.output;
    const { x, y } = get2DPoint({ valence, arousal });
    setPinPosition({ x, y });
    console.log(valence, arousal)
});

CY.loader()
    .licenseKey("0c1147cda5c900085bac32b44d10bf923c2edcd791ac")
    .addModule(CY.modules().FACE_AROUSAL_VALENCE.name, { smoothness: 0.8 })
    .load()
    .then(({ start, stop }) => start());