var decreaseButton = document.querySelector(".btn-decrease")
var increaseButton = document.querySelector(".btn-increase")
var itemCount = document.querySelectorAll(".item-count")

function decreaseCount(id) {
    var count = document.querySelector(`#item-${id}`).value
    if (count > 1){
        document.querySelector(`#item-${id}`).value -= 1
    }
}

function increaseCount(id) {
    var count = Number(document.querySelector(`#item-${id}`).value)
    count += 1
    document.querySelector(`#item-${id}`).value = count
}