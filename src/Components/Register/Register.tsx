import { useState } from 'react';
import { Button } from '@/Components/ui/button' 
import { Input } from '@/Components/ui/input' 
import { Label } from '@/Components/ui/label'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/Credentials'
import { IoMdArrowDropright } from "react-icons/io";
import Background from '../Background/background';


interface Service {
  plate: string;
  date: string;
  description: string;
}

async function postServiceInFirebase(service: Service): Promise<void> {
  try {
    const serviceReference = await addDoc(collection(db, "services"), service)
    console.log("Serviço registrado com o ID: ", serviceReference.id)
  } catch (error) {
    console.error("Erro ao adicionar o serviço: ", error)
  }

}

export default function Register() {
  const [plate, setPlate] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const service: Service = { plate, date, description };
    await postServiceInFirebase(service)
  
    setPlate('');
    setDate('');
    setDescription('');
  };

  return (
  <>
    <Background/>
    <div className="flex items-center p-1 mt-8 ml-8">
      <span><IoMdArrowDropright size={30}/></span>
      <h2 className="text-xl font-[#171717] font-bold">Cadastro de serviços</h2>
    </div>
    <div className='flex justify-center'>
      <div className="p-4 bg-gray-100 shadow-xl border-2 border-gray-500 w-fit rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="plate">Placa</Label>
            <Input
              id="plate"
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              required
              className='w-fit border-black'
            />
          </div>
          <div>
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className='w-fit border-black'
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className='h-[5rem] w-[35rem] overflow-y-auto text-md border-black text-pretty'
            />
          </div>
          <Button type="submit">Registrar Serviço</Button>
        </form>
      </div>
    </div>
  </>
  );
};


