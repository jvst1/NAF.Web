"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { useDisclosure } from "@nextui-org/react";
import AddNewTaskModal from "../components/AddNewTaskModal";

interface Data {
  id: number;
  title: string;
  components: {
    codigo: number;
    titulo: string;
    descricao: string;
  }[];
}


export default function Home() {
  const [data, setData] = useState<Data[] | []>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [servicos, setServicos] = useState<[]>([]);
  const [item, setItem] = useState<{}>();

  let { isOpen, onOpen, onOpenChange } = useDisclosure();

  function refresh() {
    setRefreshKey((oldKey) => oldKey + 1);
  }

  const { data: session, status } = useSession({
    required: true,
  });

  useEffect(() => {
    let cardsData: Data[] = [
      {
        id: 0,
        title: "Pendente",
        components: [],
      },
      {
        id: 1,
        title: "Em andamento",
        components: [],
      },
      {
        id: 2,
        title: "Concluído",
        components: [],
      },
    ]

    const getData = async () => {
      const ses = await getSession();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado`, {
        headers: {
          authorization: `Bearer ${ses?.user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok && res.status === 200) {
        const response = await res.json()

        response.map((item: any) => {
          cardsData[item.situacao].components.push(item);
        });
      }

      setData(cardsData)
    };

    getData();
  }, [refreshKey]);

  if (status === "loading") {
    return <></>;
  }

  const onDragEnd = (e: DropResult) => {
    if (!e.destination) {
      return;
    }

    const { source, destination, draggableId } = e;

    const sourceCard = data.find(card => card.id.toString() === source.droppableId);
    const destinationCard = data.find(card => card.id.toString() === destination.droppableId);

    if (sourceCard && destinationCard) {
      const draggedComponent = sourceCard.components.find(comp => comp.codigo.toString() === draggableId);

      if (draggedComponent) {
        sourceCard.components = sourceCard.components.filter(comp => comp.codigo.toString() !== draggableId);

        destinationCard.components.splice(destination.index, 0, draggedComponent);

        data[sourceCard.id] = sourceCard
        data[destinationCard.id] = destinationCard

        var req = {
          situacao: destination.droppableId,
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/${draggableId}/Situacao`,
          {
            method: "PUT",
            body: JSON.stringify(req),
            headers: {
              authorization: `Bearer ${session?.user.token}`,
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            toast('Atualizado com sucesso.', { type: 'success', autoClose: 2000 })
          } else {
            const data = res.json()

            data.then((error) => {
              toast(error.mensagem, { type: 'error', autoClose: 2000 })
            })
          }
        })

        setData(data)
      }
    }
  };

  const getServicos = async () => {
    const queryAreas = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Area`, {
      headers: {
        authorization: `Bearer ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });

    const responseAreas = await queryAreas.json();

    const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico`, {
      headers: {
        authorization: `Bearer ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });

    const response = await query.json();

    response.map((servico: any) => {
      servico.area = responseAreas.filter(
        (area: any) => area.codigo === servico.codigoArea
      )[0];
    });

    setServicos(response);
  };

  function openTaskDetails(task: any) {
    getServicos();
    setItem(task);
    onOpen();
  }

  return (
    <main className="h-screen flex flex-col py-4 pr-4">
      <h1 className="text-2xl font-medium">Board</h1>

      <div className="h-full w-full flex gap-4 text-center mt-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {data.length &&
            data.map((items, index) => (
              <Droppable key={items.id} droppableId={items.id.toString()}>
                {(provided) => (
                  <div
                    className="border w-1/3 h-full bg-gray-200 rounded-lg flex flex-col gap-4 overflow-y-scroll"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h1 className="pt-3 text-lg">{items.title}</h1>
                    {items.components.map((component, index) => (
                      <Draggable
                        key={component.codigo.toString()}
                        draggableId={component.codigo.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            onClick={(e) => openTaskDetails(component)}
                            key={index}
                            className="bg-white mx-4 rounded-lg text-start p-4 flex flex-col"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {component.titulo}

                            <span className="text-sm">
                              {component.descricao}
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
        </DragDropContext>
      </div>

      <AddNewTaskModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        refresh={refresh}
        item={item}
        servicos={servicos}
      ></AddNewTaskModal>
    </main>
  );
}
