const socket = io();

socket.on('generalevent', (arg1, arg2) => {
    console.log(arg1);
    console.log(arg2);
})

socket.on('productdeleted', productid => {
    let divtoDelete = document.getElementById("product" + productid);
    divtoDelete.remove();
})

socket.on('productupdated', product =>{
    let divtoUpdate = document.getElementById("product" + product._id);
    divtoUpdate.innerHTML = createProductCard(product);
})

socket.on('productadded', product => {
    addProduct(product);
})

function addProduct(product){
    let str = createProductCard(product);
    let container = document.getElementById("container");
    let originalHtml = container.getInnerHTML();
    let lastHtml = str.concat(originalHtml);
    container.innerHTML = lastHtml;
}

function createProductCard(product){
    let str = `<div class="img-card iCard-style1" id="product` + product._id + `">
    <div class="card-content">
        <div class="card-image">
            <span class="card-title">`+ product.title + `</span>
            <img src="` + product.thumbnail + `" alt="#">
            </div>
            <div class="card-text">
                <ul>
                    <li>ID: ` + product._id + `</li>
                    <li>Price: ` + product.price +`</li>
                    <li>Description: ` + product.description + `</li>
                    <li>Category: ` + product.category +`</li>
                    <li>Status: ` + product.status + `</li>
                    <li>Stock: ` + product.stock + ` units</li>
                    </ul>
                </div>            
            </div>
        </div>`;
    return str;
}