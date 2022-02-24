import { PureComponent } from "react";
import '../../style/HomePage/home.style.css';
import { Container, Row, Col, Button } from 'react-bootstrap';


class HomePage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
          products: [],
          productsChecked: []
        };
      this.handleChange = this.handleChange.bind(this);
      this.deleteMass = this.deleteMass.bind(this);
      this.renderGrid = this.renderGrid.bind(this);
    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('http://127.0.0.1:8000/')
            .then(response => response.json())
            .then((data) => this.setState({products: data}))
    }
    
    deleteMass() {
      const { productsChecked } = this.state;
      //console.log(productsChecked);
      //console.log(JSON.stringify(this.state));

      fetch(`http://127.0.0.1:8000/delete`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(productsChecked)
      }).then(() => {
          window.location.href = "http://localhost:3000/";
      })


    }

    addProduct() {
      window.location.href = "http://localhost:3000/add-product";
    }

    handleChange(event) {
      const { id } = event.target;
      const { productsChecked } = this.state;

      const isChecked = productsChecked.indexOf(id) === -1 ? false : true;

      if(isChecked) {
        this.setState({productsChecked: productsChecked.filter(product => product !== id)});
      } else {
        productsChecked.push(id);
      }
    }

    renderGrid()
    {
      const { products } = this.state;
      return (
        <Container class="grid-container" spacing={4}>
            <Row>
              {products.map(({id, sku,name,price,attribute}) => (
                <Col xs={3} >
                  <div class="product-cell">
                    <input type="checkbox" class="delete-checkbox" name={sku} id={id} onChange={this.handleChange}  />
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
      return (
        <div>
          <header>
            <h1>Product List</h1>
            <div>
                <Button variant="outline-danger" id="delete-product-onclick" onClick={this.deleteMass}>
                  DELETE MASS
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