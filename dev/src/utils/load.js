export default function load(src){
    let script = document.createElement("script")
    script.type = "text/javascript"
    script.src = src + '&callback=loadedCallBack'
    document.body.appendChild(script)
    return new Promise(resolve => {
        window.loadedCallBack = () => {
            resolve()
        }
    })
}