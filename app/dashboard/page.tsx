"use client";

import { Card, CardBody, useDisclosure, Button } from "@nextui-org/react";
import { AddIcon } from "@/app/assets/icons/AddIcon";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { situacoesTask } from "../src/utils/enums";
import AddNewTaskModal from "../components/AddNewTaskModal";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
  });

  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [items, setItems] = useState<[]>([]);
  const [servicos, setServicos] = useState<[]>([]);
  const [item, setItem] = useState<{}>();

  const [refreshKey, setRefreshKey] = useState(0);

  const getServicos = async () => {
    const resAreas = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Area`, {
      headers: {
        authorization: `Bearer ${session?.user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (resAreas.ok && resAreas.status === 200) {
      const areas = await resAreas.json()

      const resServicos = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico`, {
        headers: {
          authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (resServicos.ok && resServicos.status === 200) {
        const servicos = await resServicos.json();

        servicos.map((servico: any) => {
          servico.area = areas.filter(
            (area: any) => area.codigo === servico.codigoArea
          )[0];
        });

        setServicos(servicos);
      } else {
        setServicos([]);
      }
    }
  };

  function openAddTask() {
    const task: any = {};
    getServicos();
    setItem(task);
    onOpen();
  }

  function openDetails(item: any) {
    getServicos();
    setItem(item);
    onOpen();
  }

  function refresh() {
    setRefreshKey((oldKey) => oldKey + 1);
  }

  useEffect(() => {
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

        setItems(response)
      } else {
        setItems([])
      }
    };
    getData();
  }, [refreshKey]);

  function formatSituacao(situacao: any) {
    return situacoesTask.find((item) => item.value === situacao).text;
  }

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-medium">Solicitações recentes</h1>

        <Button className="bg-primary mr-4 text-white" onPress={openAddTask}>
          Novo chamado
          <AddIcon className="text-white"></AddIcon>
        </Button>
      </div>

      <div className="mt-6 gap-4 flex flex-col">
        {items.map((item: any, index: any) => (
          <Card className="mr-4" key={index}>
            <CardBody className="px-16 h-full justify-center">
              <div className="flex h-16 justify-between items-center">
                <div className="h-full flex flex-col justify-between w-1/4">
                  <h1>Chamado</h1>
                  <h1 className="text-gray-400">
                    {item.titulo}
                  </h1>
                </div>
                <div className="h-full flex flex-col justify-between w-1/4">
                  <h1>Status</h1>
                  <h1 className="text-danger">
                    {formatSituacao(item.situacao)}
                  </h1>
                </div>
                <div className="h-full flex flex-col justify-between w-1/4">
                  <h1>Data da abertura</h1>
                  <h1 className="text-gray-400">
                    {format(new Date(item.dtInclusao), "dd/MM/yyyy HH:mm")}
                  </h1>
                </div>
                <div className="w-1/4 flex justify-center">
                  <Button
                    className="bg-primary mr-4 text-white"
                    onPress={(e) => openDetails(item)}
                  >
                    Abrir detalhes
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <AddNewTaskModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        refresh={refresh}
        item={item}
        servicos={servicos}
      ></AddNewTaskModal>
    </div>
  );
}
