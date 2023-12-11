import './App.css';
import {Route, Routes} from 'react-router-dom';
import MealsForm from './components/MealsForm/MealsForm';
import Home from './components/Home/Home';

function App() {
  return (
    <>
      <header className="p-3 border-bottom border-dark">
        <h1 className="text-start">Calorie tracker</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals/new" element={<MealsForm />} />
          <Route path="/meals/:id/edit" element={<MealsForm />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </main>
    </>
  )
}

export default App;
