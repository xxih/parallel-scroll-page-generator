import { Routes, Route } from 'react-router-dom';
import './index.css';
import TheOptionBar from './TheOptionBar/TheOptionBar';
import TheMenu from './TheMenu/TheMenu';
import TheEditor from './TheEditor/TheEditor';
import ThePanel from './ThePanel/ThePanel';
import ThePreviewer from './ThePreviewer/ThePreviewer';

function App() {
  return (
    <div className="ps-layout">
      <TheOptionBar></TheOptionBar>
      <div className="ps-layout-main">
        <TheMenu></TheMenu>
        <Routes>
          <Route path='/' element={<TheEditor/>}></Route>
          <Route path='/preview' element={<ThePreviewer/>}></Route>
        </Routes>
        <ThePanel></ThePanel>
      </div>
    </div>
  );
}

export default App;
