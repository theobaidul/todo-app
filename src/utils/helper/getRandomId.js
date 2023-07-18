export default function getRandomId() {
    const id = (new Date().getTime() + Math.floor(Math.random() * 100000)).toString(32);
    return id;
}
