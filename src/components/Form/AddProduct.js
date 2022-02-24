import React, { PureComponent } from 'react';
import ProductForm from '../ProductForm/ProductForm';
import { Button } from 'react-bootstrap';
import '../../style/Form/form.style.css';

class Product extends PureComponent {

    
    constructor(props) {
        super(props);
        this.initialState = {size:''};
        this.state = {
            type: 'dvd',
            sku: '',
            name: '',
            price: '',
            size: '',
            height: '',
            width: '',
            length: '',
            weight: '',
         };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelFunction = this.cancelFunction.bind(this); 
        this.validateEmpty = this.validateEmpty.bind(this);
        this.validateInputType = this.validateInputType.bind(this);
        this.validate = this.validate.bind(this);       
        this.handleChangeType = this.handleChangeType.bind(this);
    }

    validateEmpty() {
        const {
            type,
            sku,
            name,
            price,
            size,
            weight,
            height,
            width,
            length
        } = this.state;

        const isProductValid = sku && name && price;
        const isDvdValid = type === 'dvd' && !size ? false : true;
        const isBookValid = type === 'book' && !weight ? false : true;
        const isFurnitureValid = type === 'furniture' && !height && !width && !length ? false : true;

        if (isProductValid && isDvdValid && isBookValid && isFurnitureValid) {
            return true;
        }

        return false;
    }

    validateInputType() {
        const {
            type,
            price,
            size,
            weight,
            height,
            width,
            length
        } = this.state;

        // const newPrice = price.replace(',','.');
        // const newSize = size.replace(',','.');
        // const newWeight = weight.replace(',','.');
        // const newHeight = height.replace(',','.');
        // const newWidth = width.replace(',','.');
        // const newLength = length.replace(',','.');

        // this.setState({ price : newPrice, size : newSize, weight : newWeight, height : newHeight, width : newWidth, length : newLength }, () => {

        // });

        const isPriceValid = !isNaN(price);
        const isSizeValid = type === 'dvd' && isNaN(size) ? false : true;
        const isBookValid = type === 'book' && isNaN(weight) ? false : true;
        const isHWLValid = type === 'furniture' && isNaN(length) && isNaN(height) && isNaN(width) ? false : true;

        if (isPriceValid && isSizeValid && isBookValid && isHWLValid) {
            return true;
        }

        return false;
    }

    validate() {
        if(!this.validateEmpty()) {
            alert('Please, submit required data');
            return false;
        }
        if(!this.validateInputType()) {
            alert('Please, provide the data of indicated type');
            return false;
        }
        return true;
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value});
    }

    handleChangeType(event) {
        this.setState({type:event.target.value});
        this.size.value = '';
        //this.setState(() => this.initialState);
        //this.setState({size: '', height: '', width: '', length: '', weight: ''});
        //reset({size: ''});
    }

    handleSubmit(event) {

        const {type} = this.state;
        event.preventDefault();

        const isValid = this.validate();

        if (isValid) 
        {
            console.log(JSON.stringify(this.state));

            fetch(`http://127.0.0.1:8000/add-product/${type}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            }).then(() => {
                window.location.href = "http://localhost:3000/";
            })
        }
    }
    
    cancelFunction() {
        this.setState({type: 'dvd', sku: '', name: '', price: '', size: '', height: '', width: '', length: '', weight: ''});

        window.location.href = "http://localhost:3000/";
    }

    renderSelect() {
        return (
            <select id='productType' name='type' value={this.state.type} onChange={this.handleChange}>
                <option value='dvd'>DVD</option>
                <option value='book'>Book</option>
                <option value='furniture'>Furniture</option>
            </select>
        )
    }

    render() {
        return (
            <form id='product_form' onSubmit={this.handleSubmit}>
                <header>
                    <h1>Add product</h1>
                    <div>
                        <Button variant="outline-success" type="submit" name="button" value="Save" onClick={this.handleSubmit}>
                            Save
                        </Button> {' '}
                    <Button type="button" variant="outline-danger" name="button" value="cancel" onClick={this.cancelFunction}>
                        Cancel
                    </Button> {' '}
                    </div>
                </header>
                <hr/>

                <div>
                    <label htmlFor='sku'>SKU</label>
                    <input type="text" name='sku' id='sku' value={this.state.sku} onChange={this.handleChange}/>
                </div>

                <div>
                    <label htmlFor='name'>Name</label>
                        <input type="text" name='name' id='name' value={this.state.name} onChange={this.handleChange}/>
                </div>

                <div>
                    <label htmlFor='price'>Price ($)</label>
                        <input type="text" name='price' id='price' value={this.state.price} onChange={this.handleChange}/>
                </div>

                <label> Type Switcher:</label>
                    { this.renderSelect() }
                    <ProductForm id={this.state.type} formState={this.state} handleChange={this.handleChange} />
            </form>
        )
    }
}
export default Product;