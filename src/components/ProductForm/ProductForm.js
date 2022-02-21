import { Fragment, PureComponent } from 'react';


class ProductForm extends PureComponent {

    formVariants = {
        dvd: [
            {
                name: 'Size (MB)',
                id: 'size'
            }
        ],
        furniture: [
            {
                name: 'Height (CM)',
                id: 'height'
            },
            {
                name: 'Width (CM)',
                id: 'width'
            },
            {
                name: 'Length (CM)',
                id: 'length'
            }
        ],
        book: [
            {
                name: 'Weight (KG)',
                id: 'weight'
            }
        ]
        
    };

    renderInputs() {
        return (
            <>
                {this.formVariants[this.props.id].map( (fields) => {
                    return (
                        <> 
                            <label htmlFor={fields.id}>{fields.name}</label>
                            <input name={fields.id} id={fields.id} onChange={this.props.handleChange} />
                        </>
                    )
                })}
            </>
        )
    }

    render() {
        return (
            <div id={this.props.id}>
                {this.renderInputs()}
            </div>
        )
    }
}
export default ProductForm;