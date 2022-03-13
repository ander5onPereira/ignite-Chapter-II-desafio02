import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import api from '../../services/api';
import Food from './../../components/Food';
import { FoodsContainer } from './styles';

interface FoodProps{
  id: number,
  name:string,
  description: string,
  price: string,
  available:boolean,
  image: string,
}
function Dashboard() {
  const [modalOpen,setModalOpen]=useState(false);
  const [editModalOpen,setEditModalOpen]=useState(false);
  const [editingFood,setEditingFood]=useState<FoodProps>();
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    getFoods();
  }, [modalOpen,editModalOpen,editingFood])
  const getFoods = async () => {
    try {
      const response = await api.get('/foods')
      setFoods(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleAddFood = async (food:FoodProps) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      const newDate = [...foods, response.data];
      setFoods(newDate);
    } catch (err) {
      console.log(err);
    }
  }

  const handleLoading = () => {
    getFoods();
    setLoading(false);
  }
  const handleUpdateFood = async (food: FoodProps) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood?.id}`,{ ...editingFood,...food },);

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      
      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id:number) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)

  }

  const handleEditFood = (food: FoodProps) => {
    toggleEditModal();
    setEditingFood(food)
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      
      {editingFood &&
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />
      }

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food:FoodProps) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              handleLoading={handleLoading}
            />
          ))}
      </FoodsContainer>
    </>
  );
}


export default Dashboard;
