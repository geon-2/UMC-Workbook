let modal = document.getElementsByClassName("modal")[0]
let openButton = document.getElementById("modal-open-button")
let closeButton = document.getElementById("modal-close-button")

openButton.onclick = e => modal.setAttribute('style', "display: flex;")
closeButton.onclick = e => modal.setAttribute('style', "display: none;")