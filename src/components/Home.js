import { PureComponent } from "react";
import { Container, Row, Col } from 'react-grid-system';
import Checkbox from "./checkbox/checkbox";

class HomePage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
          isChecked:false,
          products: [],
        };
      this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('http://127.0.0.1:8000/')
            .then(response => response.json())
            .then((data) => this.setState({products: data}));
    }
    
    deleteMass() {

    }

    addProduct() {
      window.location.href = "http://localhost:3000/add-product";
    }

    handleChange() {
      setChecked(!checked);

      // const updatedCheckedState = checkedState.map((product,index) =>
      //   index === position ? !product : product
      //   );
      // setCheckedState(updatedCheckedState);

    }

    renderGrid()
    {
      const { products } = this.state;
      return (
        <Container>
            <Row>
              {
            products.map((product) => (
                <Col xs={6} md={4}>
                  <input type="checkbox" name={product.sku} checked={false}id={product.sku} onChange={this.handleChange}  />
                  <ol>
                    { product.sku }
                    { product.name }
                    { product.price }
                    { product.attribute }
                  </ol>
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
          <button onClick={this.deleteMass}>
            Delete MASS
          </button>

          <button onClick={this.addProduct}>
            Add
          </button>
          { this.renderGrid() }
        </div>
      )
    }
}

  export default HomePage;