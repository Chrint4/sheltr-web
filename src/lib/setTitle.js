export default function setTitle(title) {
    if (typeof document !== "undefined")
        document.title = title + " | sheltr";
    else
        console.error("setTitle(): document is undefined");
}