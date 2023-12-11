import './App.css';
import {Link, Route, Routes} from 'react-router-dom';
import MealsForm from './components/MealsForm/MealsForm';

function App() {
  return (
    <>
      <header className="p-3 border-bottom border-dark">
        <h1 className="text-start">Calorie tracker</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={(
            <>
              <div className="d-flex justify-content-between p-3 mt-2">
                <h4>Total calories:  kcal</h4>
                <Link to="/meals/new" className="btn btn-light">Add new meal</Link>
              </div>
            </>
          )} />
          <Route path="/meals/:select" element={<MealsForm />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
