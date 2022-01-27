import './App.css';
import OptionBar from './OptionBar/OptionBar';
import Menu from './Menu/Menu';
import Board from './Board/Board';

function App() {
  return (
    <div className="ps-layout">
      <OptionBar></OptionBar>
      <div className="ps-container">
        <Menu></Menu>
        <Board></Board>
        <div className="ps-layout-block ps-con-right">
        </div>
      </div>
    </div>
  );
}

export default App;
