import './index.css';
import TheOptionBar from './TheOptionBar/TheOptionBar';
import TheMenu from './TheMenu/TheMenu';
import TheEditor from './TheEditor/TheEditor';
import ThePanel from './ThePanel/ThePanel';

function App() {
  return (
    <div className="ps-layout">
      <TheOptionBar></TheOptionBar>
      <div className="ps-layout-main">
        <TheMenu></TheMenu>
        <TheEditor></TheEditor>
        <ThePanel></ThePanel>
      </div>
    </div>
  );
}

export default App;
