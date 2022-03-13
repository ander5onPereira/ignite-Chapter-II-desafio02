import React from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import { Container } from './styles';

interface FoodProps{
  id: number,
  name:string,
  description: string,
  price: string,
  available:boolean,
  image: string,
}
interface FoodComponentProps{
  food: FoodProps,
  handleEditFood: Function,
  handleDelete: Function,
  handleLoading: Function,
}

function Food({ food,handleEditFood,handleDelete,handleLoading }: FoodComponentProps) {
  
  const toggleAvailable = async () => {
 await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available,
    });

    handleLoading(true);
  }

  const setEditingFood = () => {
    handleEditFood(food);
  }
  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          {/* BUTTON EDITAR */}
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
            >
            <FiEdit3 size={20} />
          </button>

            {/* BUTTON EXCLUIR */}
          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

export default Food;
