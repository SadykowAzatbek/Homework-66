import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Meal, mealApi} from '../../../types';
import axiosApi from '../../axiosApi';
import Loader from '../Loader/Loader';

const Home = () => {
  const [mealElem, setMealElem] = useState<Meal[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);

      try {
        const responseMeal = await axiosApi.get<mealApi | null>('meals.json');

        if (!responseMeal.data) {
          return;
        }

        const data = Object.keys(responseMeal.data);

        const promise = data.map( async (key) => {
          const response = await axiosApi.get('meals/' + key + '.json');

          return {
            ...response.data,
            id: key,
          }
        });

        const meal = await Promise.all(promise);
        setMealElem(meal);
      } finally {
        setLoading(false);
      }
    };

    void fetchUrl();
  }, []);

  const deleteBtn = async (id: string) => {
    setLoading(true);
    try {
      await axiosApi.delete('meals/' + id + '.json');
      setMealElem(mealElem.filter((elem) => elem.id !== id));
    } finally {
      setLoading(false);
    }
  };

  const totalKcal = () => {
    return mealElem.reduce(
      (acm, number) => acm + parseInt(number.calories.toString()), 0,
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
            <Link to={"/meals/" + elem.id + "/edit"} className="btn btn-light">Edit</Link>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <p className="m-0 w-75">{elem.food}</p>
            <strong>{elem.calories} Kcal</strong>
            <button type="button" className="btn btn-danger" onClick={() => deleteBtn(elem.id)}>Delete</button>
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