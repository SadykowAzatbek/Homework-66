import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Meal} from '../../../types';
import axiosApi from '../../axiosApi';
import Loader from '../Loader/Loader';

const Home = () => {
  const [mealElem, setMealElem] = useState<Meal[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);

      try {
        const responseMeal = await axiosApi.get('meals.json');
        const data = Object.keys(responseMeal.data);

        const promise = data.map( async (elem) => {
          const response = await axiosApi.get('meals/' + elem + '.json');
          return response.data;
        });

        const meal = await Promise.all(promise);
        setMealElem(meal);
      } finally {
        setLoading(false);
      }
    };

    void fetchUrl();
  }, []);

  const totalKcal = () => {
    return mealElem.reduce(
      (acm, number) => acm + parseInt(number.calories.toString()), 0
    );
  };

  let content = (
    <>
      <div className="d-flex justify-content-between p-3 mt-2">
        <h4>Total calories: {totalKcal()} kcal</h4>
        <Link to="/meals/new" className="btn btn-light">Add new meal</Link>
      </div>
      {mealElem.map((elem) => (
        <div className="border border-dark rounded-2 m-3 p-2" key={Math.random()}>
          <div className="d-flex justify-content-between">
            <span>{elem.meal}</span>
            <Link to="/meals/edit" className="btn btn-light">Edit</Link>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <p className="m-0 w-75">{elem.food}</p>
            <strong>{elem.calories} Kcal</strong>
            <button type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </>
  );

  if (loading) {
    content = (
      <div className="mt-3">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {content}
    </>
  );
};

export default Home;