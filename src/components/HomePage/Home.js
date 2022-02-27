import { PureComponent } from "react";
import '../../style/HomePage/home.style.css';
import { getProductList, deleteCheckbox } from '../../helpers/request/request.js';
import { Container, Row, Col, Button } from 'react-bootstrap';


class HomePage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
          products: [],
          productsChecked: [],
          isDeleting: false
        };
      this.handleChange = this.handleChange.bind(this);
      this.deleteMass = this.deleteMass.bind(this);
      this.renderGrid = this.renderGrid.bind(this);
    }

    componentDidMount() {
        // Simple GET request using fetch
        getProductList()
          .then((data) => this.setState({products: data}));
      }
    
    deleteMass() {
      const { productsChecked, isDeleting } = this.state;
      this.setState({isDeleting: true});
      deleteCheckbox(productsChecked)
        .then((data) => this.setState({products: data, productsChecked: [],isDeleting: false}));
    }

    addProduct() {
      window.location.href = "/add-product";
    }

    handleChange(event) {
      const { id } = event.target;
      const { productsChecked } = this.state;

      const isChecked = productsChecked.indexOf(id) === -1 ? false : true;

      if(isChecked) {
        this.setState({productsChecked: productsChecked.filter(product => product !== id)});
      } else {
        this.setState({productsChecked: [...this.state.productsChecked, id]});
      }
    }

    renderGrid()
    {
      const { products, productsChecked } = this.state;

      return (
        <Container class="grid-container" spacing={4}>
            <Row>
              {products.map(({id, sku,name,price,attribute}) => (
                <Col xs={3} >
                  <div class="product-cell">
                    <input type="checkbox" class="delete-checkbox" name={sku} id={id} checked={ productsChecked.includes(id) } onChange={this.handleChange}  />
                    <ul class="product-details">
                      <li>{ sku }</li>
                      <li>{ name }</li>
                      <li>{ price }</li>
                      <li>{ attribute }</li>
                    </ul>
                  </div>
                </Col>
            ))
            }
            </Row>
        </Container>
      );
    }

    render() {
      const { isDeleting } = this.state;
      return (
        <div>
          <header>
            <h1>Product List</h1>
            <div>
              <Button variant="outline-danger" disabled={isDeleting} id="delete-product-onclick" onClick={this.deleteMass}>
                {isDeleting ? 'Deleting...' : 'DELETE MASS'}
              </Button> {' '}

              <Button variant="outline-success" onClick={this.addProduct}>
                ADD
              </Button> {' '}
            </div>
          </header>
          <hr/>
          { this.renderGrid() }
        </div>
      )
    }
}

  export default HomePage;