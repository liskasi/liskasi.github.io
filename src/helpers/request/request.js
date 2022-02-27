export function getProductList() {
    return fetch('https://juniortestelizavetasirotina.000webhostapp.com/')
        .then(response => response.json())
}

export function deleteCheckbox(productsChecked)
{
    return fetch(`https://juniortestelizavetasirotina.000webhostapp.com/delete`, {
        method: 'post',
        body: JSON.stringify(productsChecked)
    }).then(() => {
        return getProductList();
    })
}

export function postProduct(type, productData) {
    fetch(`https://juniortestelizavetasirotina.000webhostapp.com/add-product/${type}`, {
        method: 'post',
        body: JSON.stringify(productData)
    }).then(() => {
        window.location.href = "/";
    })
}