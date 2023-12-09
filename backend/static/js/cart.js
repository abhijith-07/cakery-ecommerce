var decreaseButton = document.querySelector(".btn-decrease")
var increaseButton = document.querySelector(".btn-increase")
var itemCount = document.querySelectorAll(".item-count")
var url = '/shop/cart/'

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
        await fetch(url, {
            method: 'PUT',
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
    await fetch(url, {
        method: 'PUT',
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

async function deleteItem(id) {
    const cartItem = document.querySelector(`#cart-item-${id}`);
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'mode': 'same-origin'
            },
            body: JSON.stringify({
                'id': id
            })
        });
        if (response.ok) {
            const data = await response.json();
            cartItem.remove();
        } else {
            console.error("Failed to delete item. Server returned:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("An error occurred during the delete request:", error);
    }
}
