import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { collection, getDocs, QuerySnapshot, DocumentData, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Credentials";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";


interface DataItem {
  id: string;
  plate: string;
  date: string;
  description: string;
}

const TableReport = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateTerm, setDateTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState<DataItem | null> (null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot: QuerySnapshot = await getDocs(collection(db, "services"));
        const services: DataItem[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as DocumentData; 
          return {
            id: doc.id, 
            plate: data.plate || "", 
            date: data.date || "",   
            description: data.description || "", 
          };
        });
        setData(services);
      } catch (error) {
        console.error("Erro ao buscar serviços: ", error);
      }
    };

    fetchServices();
  }, []);

  const filteredData = data.filter(item => {
    const plateMatch = item.plate?.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = dateTerm ? item.date === dateTerm : true;
    return plateMatch && dateMatch;
  });

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este serviço?");
    if (confirmDelete) {
      try {

        await deleteDoc(doc(db, "services", id));
        setData(data.filter(item => item.id !== id));
      } catch (error) {
        console.error("Erro ao excluir serviço: ", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    const serviceToEdit = data.find(item => item.id === id)
    if (serviceToEdit){
      setCurrentService(serviceToEdit)
      setIsModalOpen(true)
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false)
    setCurrentService(null)
  }

  const handleUpdate = async () => {
    if (currentService){
      try{
        const docRef = doc(db,"services", currentService.id)
        await updateDoc(docRef, {
          plate: currentService.plate,
          date: currentService.date,
          description: currentService.description
        })
        setData(data.map(item => (item.id === currentService.id ? currentService : item)))
        handleModalClose()
      } catch (error){
        console.error("Erro ao atualizar o serviço: ", error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 w-max flex flex-col items-center justify-center">
        <div className="flex gap-x-2">
          <input
            type="text"
            placeholder="Buscar por Placa"
            className="mb-4 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className="mb-4 p-2 border border-gray-300 rounded"
            value={dateTerm}
            onChange={(e) => setDateTerm(e.target.value)}
          /> 
        </div>

        <Table className="w-fit border border-gray-300 rounded-lg shadow-md overflow-hidden">
          <TableCaption>Relatório de serviços realizados.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[10rem] text-left text-gray-600">Placa</TableHead>
              <TableHead className="w-[8rem] text-left text-gray-600">Data</TableHead>
              <TableHead className="w-[25rem] text-left text-gray-600">Descrição</TableHead>
              <TableHead className="w-auto text-left text-gray-600">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.id} className="hover:bg-gray-50 transition duration-150">
                <TableCell className="font-medium text-gray-800">{item.plate}</TableCell>
                <TableCell className="text-gray-600">{item.date}</TableCell>
                <TableCell className="text-gray-600">{item.description}</TableCell>
                <TableCell className="flex items-center">
                  <button
                    className="mr-2 text-blue-500"
                    onClick={() => handleEdit(item.id)}
                  >
                    <MdModeEdit color="gray" size={23} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDeleteForever size={25} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={2} className="font-bold">Total de Serviços</TableCell>
              <TableCell className="text-right font-bold text-gray-800" colSpan={2}>
                {filteredData.length} Serviços
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {isModalOpen && currentService && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl mb-4">Editar Serviço</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Placa</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={currentService.plate}
                onChange={(e) =>
                  setCurrentService({ ...currentService, plate: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Data</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={currentService.date}
                onChange={(e) =>
                  setCurrentService({ ...currentService, date: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Descrição</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={currentService.description}
                onChange={(e) =>
                  setCurrentService({ ...currentService, description: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleModalClose}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableReport;
