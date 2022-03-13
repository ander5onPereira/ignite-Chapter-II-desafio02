import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';

export interface FoodProps{
  name: String,
  description: String,
  price: String,
  available: Boolean,
  image: String
}

interface ModalAddFoodProps{
  isOpen:boolean,
  setIsOpen: () => void,
  handleAddFood:Function,
}

function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodProps) {
  const handleSubmit = async (data:FoodProps) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
