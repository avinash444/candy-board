import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import yellowcandy from './images/yellow-candy.png';
import redcandy from './images/red-candy.png';
import orangecandy from './images/orange-candy.png';
import purplecandy from './images/purple-candy.png';
import greencandy from './images/green-candy.png';
import bluecandy from './images/blue-candy.png';
function App() {
  return (
    <div className="App">
      <Board boardSize={10} colors={[yellowcandy,redcandy,orangecandy,purplecandy,greencandy,bluecandy]} />
    </div>
  );
}

export default App;
