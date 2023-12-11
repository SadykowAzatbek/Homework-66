import React, {useState} from 'react';
import {Meal} from '../../../types';
import axiosApi from '../../axiosApi';
import Loader from '../Loader/Loader';
import {useNavigate} from 'react-router-dom';

const MealsForm = () => {
  const [meal, setMeal] = useState<Meal>({
    meal: '',
    food: '',
    calories: 0,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      await axiosApi.post('meals.json', meal);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  let content = (<button className="btn btn-success col-1 ms-3" type="submit">Save</button>);

  if (loading) {
    content = (<button className="btn"><Loader /></button>);
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