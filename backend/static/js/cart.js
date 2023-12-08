var decreaseButton = document.querySelector(".btn-decrease")
var increaseButton = document.querySelector(".btn-increase")
var itemCount = document.querySelectorAll(".item-count")

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

async function decreaseCount(id, item) {
    var count = document.querySelector(`#item-${id}`).value
    if (count > 1){
        count -= 1
        await fetch('http://127.0.0.1:8000/shop/cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'mode': 'same-origin'
            },
            body: JSON.stringify({
                'id': id,
                'quantity': count
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            document.querySelector(`#item-${id}`).value = data.quantity
            document.querySelector(`#price-${id}`).innerHTML = `Rs. ${data.price}.0`
        })
    }
}

async function increaseCount(id) {
    var count = Number(document.querySelector(`#item-${id}`).value)
    count += 1
    await fetch('http://127.0.0.1:8000/shop/cart/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'mode': 'same-origin'
        },
        body: JSON.stringify({
            'id': id,
            'quantity': count
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        document.querySelector(`#item-${id}`).value = data.quantity
        document.querySelector(`#price-${id}`).innerHTML = `Rs. ${data.price}.0`
    })
}