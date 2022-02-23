import { PureComponent } from "react";
import { Container, Row, Col } from 'react-grid-system';
import '../style/home/home.style.css';


class HomePage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
          products: [],
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
              {
                products.map(({id, sku,name,price,attribute}) => (
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
        // <div class="grid-container">
        //   <div>
        //     {
        //       products.map(({id, sku,name,price,attribute}) => (
        //       <div class="product">
        //         <input type="checkbox" class="delete-checkbox" name={sku} id={id} onChange={this.handleChange}  />
        //         <ol>
        //           { sku }
        //           { name }
        //           { price }
        //           { attribute }
        //         </ol>
        //       </div>
        //   ))
        //   }
        //   </div>
        // </div>

      );
    }

    render() {
      return (
        <div>
          <div class="header">
            <header>Product List</header>
            <div>
              <button onClick={this.deleteMass}>
                DELETE MASS
              </button>

              <button onClick={this.addProduct}>
                ADD
              </button>
            </div>
          </div>
          <hr/>
          { this.renderGrid() }
        </div>
      )
    }
}

  export default HomePage;