import React, {useCallback, useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Meal } from '../../../types';
import axiosApi from '../../axiosApi';
import Loader from '../Loader/Loader';

const MealsForm = () => {
  const [meal, setMeal] = useState<Meal>({
    meal: '',
    food: '',
    calories: 0,
    id: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const location = useLocation();

  const onChangeInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const formSubmit = useCallback( async (event: React.FormEvent) => {
      event.preventDefault();


      if (location.pathname === '/meals/' + params.id + '/edit') {

        const fetchUrl = async () => {
          setLoading(true);
          try {
            await axiosApi.put('meals/' + params.id + '.json', meal);
          } finally {
            setLoading(false);
          }
        };
        void fetchUrl();
      }

      if (location.pathname === '/meals/new') {
        setLoading(true);

        const fetchUrl = async () => {

          try {
            await axiosApi.post('meals.json', meal);
          } finally {
            setLoading(false);
            navigate('/');
          }
        };
        void fetchUrl();
      }

  }, [location.pathname, params.id, meal, navigate]);

  let content = (<button className="btn btn-success col-1 ms-3" type="submit">Save</button>);

  if (loading) {
    content = (<div className="btn"><Loader /></div>);
  }

  return (
    <div className="mt-2">
      <form className="row flex-column gap-2" onSubmit={formSubmit}>
        <select id="meal" name="meal" className="col-6" required
                value={meal.meal}
                onChange={onChangeInput}
        >
          <option value=""></option>
          <option>Breakfast</option>
          <option>Snack</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
        <input id="food" name="food" type="text" placeholder="Meal description" className="col-6" required
               value={meal.food}
               onChange={onChangeInput}
        />
        <div className="ps-0">
          <input id="calories" name="calories" type="number" placeholder="calories" required
                 value={meal.calories}
                 onChange={onChangeInput}
          />
          <span>Kcal</span>
          {content}
        </div>
      </form>
    </div>
  );
};

export default MealsForm;