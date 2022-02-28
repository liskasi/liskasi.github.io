export function getProductList() {
    //fetch(`http://127.0.0.1:8000/`, {
    return fetch('https://juniortestelizavetasirotina.000webhostapp.com/')
        .then(response => response.json())
}

export function deleteCheckbox(productsChecked)
{
    //fetch(`http://127.0.0.1:8000/delete`, {
    return fetch(`https://juniortestelizavetasirotina.000webhostapp.com/delete`, {
        method: 'post',
        body: JSON.stringify(productsChecked)
    }).then(() => {
        return getProductList();
    })
}

export function postProduct(type, productData) {
    //fetch(`http://127.0.0.1:8000/add-product/${type}`, {
    fetch(`https://juniortestelizavetasirotina.000webhostapp.com/add-product/${type}`, {
        method: 'post',
        body: JSON.stringify(productData)
    }).then(() => {
        window.location.href = "/";
    })
}