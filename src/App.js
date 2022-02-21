import { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import NoPage from './components/NoPage';
import Form from './components/Form/AddProduct';
import './App.css';

export class App extends PureComponent {

  render() {
    return (
        <Router>
            <div className="App">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route exact path="/add-product" element={<Form />} />
                <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
          </div>
        </Router>
    );
  }
}

export default App;