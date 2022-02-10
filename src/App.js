import './App.css';
import Nav from './components/Nav/Nav';
import Clock from './components/Clock/Clock';
import TodoList from './components/Todo/TodoList';
import Tomato from './components/Tomato';

function App() {
  return (
    <main>
      <div className="w-100 flex justify-content-center" style={{marginTop: '30px'}}>
        <Tomato/>
      </div>
      <div>
          <div className='row'>
            <Clock/>
            <TodoList/>
          </div>
          <div className="blank"></div>
          
          <Nav/>
      </div>
    </main>
  );
}

export default App;
