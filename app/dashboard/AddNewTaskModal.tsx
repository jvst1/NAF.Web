import React, { useEffect, useRef, useState } from "react";

import {
  Modal,
  ModalContent,
  Card,
  Avatar,
  CardBody,
  Textarea,
  Select,
  SelectItem,
  Input,
  Button,
  ModalFooter,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export default function AddNewTaskModal({
  isOpen,
  onOpenChange,
  refresh,
  item,
  servicos,
}: any) {
  const [situacao, setSituacao] = useState("");
  const [area, setArea] = useState("");
  const [servico, setServico] = useState("");
  const [solicitante, setSolicitante] = useState("");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [files, setFiles] = useState([]);

  const handleFileChange = (event: any) => {
    setFiles(Array.from(event.target.files));
  };

  const handleSelectionServico = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServico(e.target.value);
    setDescricao(servicos[e.target.value].descricao);
  };

  const handleSelectionSituacao = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSituacao(e.target.value);
  };

  //   async function submitFiles(taskId: any) {
  //     if (!file) return;

  //     const session = await getSession();

  //     try {
  //       const formData = new FormData();

  //       formData.append("file", file);

  //       var codigoUsuario = session?.user.id ?? "";
  //       formData.append("codigoUsuario", codigoUsuario);

  //       fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/${taskId}/Documento`, {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           authorization: `Bearer ${session?.user.token}`,
  //         },
  //       });
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }

  async function submit(closeModal: any) {
    const session = await getSession();

    const codigoServico = servicos[servico].codigo;

    let req = {
      codigoUsuario: session?.user.id,
      codigoServico: codigoServico,
      titulo: titulo,
      descricao: descricao,
    };

    if (item.codigo) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/` + item.codigo, {
        method: "PUT",
        body: JSON.stringify(req),
        headers: {
          authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          //   submitFiles(item.codigo);
          toast("Chamado atualizado com sucesso.", {
            type: "success",
            autoClose: 2000,
          });
          refresh();
          closeModal();
        } else {
          data.then((error: any) => {
            toast(error.mensagem, { type: "error", autoClose: 2000 });
          });
        }
      });
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado`, {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          //   submitFiles(data.codigo);
          toast("Chamado criada com sucesso.", {
            type: "success",
            autoClose: 2000,
          });
          refresh();
          closeModal();
        } else {
          data.then((error: any) => {
            toast(error.mensagem, { type: "error", autoClose: 2000 });
          });
        }
      });
    }
  }

  useEffect(() => {
    if (item?.codigo) {
      setTitulo(item.titulo);
      setDescricao(item.descricao);
      setServico(item.servico.nome);
      setSolicitante(item.usuario.identificador);
      setSituacao(item.situacao.toString());

      if (servicos.length > 0) {
        var servico = servicos.filter(
          (servico: any) => servico.codigo === item.codigoServico
        );
        setArea(servico[0]?.area.nome);
      }
    }
  }, [item, servicos]);

  const situacoes: any[] = [
    { name: "Pendente", value: 0 },
    { name: "Em Andamento", value: 1 },
    { name: "Concluído", value: 2 },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="full"
        className="p-12"
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <h1 className="text-2xl font-medium">
                  {item.codigo ? item.titulo : "Nova Tarefa"}
                </h1>

                <div className="grid grid-cols-12 gap-4 mt-4 h-full">
                  <div className="col-span-8 flex flex-col justify-between h-full gap-4 overflow-y-scroll">
                    {item.codigo ? (
                      <>
                        <Card className="bg-gray-200 h-1/2 overflow-y-scroll">
                          <div className="m-4 bg-white rounded-lg p-4 h-full flex flex-col gap-4">
                            <div className="flex gap-4">
                              <Select
                                label="Situação"
                                placeholder="Selecione"
                                selectedKeys={situacao}
                                isDisabled
                                onChange={handleSelectionSituacao}
                              >
                                {situacoes.map((situacao: any, index: any) => (
                                  <SelectItem
                                    key={index}
                                    value={situacao.value}
                                  >
                                    {situacao.name}
                                  </SelectItem>
                                ))}
                              </Select>

                              <Input
                                type="text"
                                label="Área"
                                value={area}
                                isDisabled
                              />
                            </div>
                            <div className="flex gap-4">
                              <Input
                                type="text"
                                label="Solicitante"
                                value={solicitante}
                                isDisabled
                                onChange={(e: any) =>
                                  setSolicitante(e.target.value)
                                }
                              />

                              <Input
                                type="text"
                                label="Serviço"
                                value={servico}
                                isDisabled
                              />
                            </div>
                          </div>
                          <div className="m-4 bg-white rounded-lg p-4 h-full">
                            Descrição
                            <Textarea
                              disableAutosize
                              isDisabled
                              className="w-full mt-4"
                              classNames={{
                                input: "resize-y min-h-[200px]",
                              }}
                              value={descricao}
                              onChange={(e: any) =>
                                setDescricao(e.target.value)
                              }
                            />
                          </div>
                        </Card>
                        <Card className="bg-gray-200 h-1/2 gap-4 p-4 flex flex-col justify-between">
                          <div className="bg-white h-1/3 rounded-lg p-4 flex items-center">
                            <Avatar />
                          </div>
                          <div className="bg-white h-full rounded-lg p-4 overflow-y-scroll">
                            <div className="bg-white h-1/3 rounded-lg flex items-center">
                              <Avatar />
                            </div>
                          </div>
                        </Card>
                      </>
                    ) : (
                      <>
                        <Card className="bg-gray-200 h-full overflow-y-scroll">
                          <div className="m-4 bg-white rounded-lg p-4 h-full flex flex-col gap-4">
                            <div className="flex gap-4">
                              <Input
                                type="text"
                                label="Titulo"
                                value={titulo}
                                onChange={(e: any) => setTitulo(e.target.value)}
                              />

                              <Select
                                label="Serviço"
                                placeholder="Selecione"
                                selectedKeys={servico}
                                onChange={handleSelectionServico}
                              >
                                {servicos.map((servico: any, index: any) => (
                                  <SelectItem
                                    key={index}
                                    value={servico.codigo}
                                  >
                                    {servico.nome}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>

                            <div className="bg-white rounded-lg">
                              Descrição
                              <Textarea
                                disableAutosize
                                isDisabled
                                className="w-full mt-4 h-full"
                                classNames={{
                                  input: "resize-y min-h-[200px] max-h-[400px]",
                                }}
                                value={descricao}
                                onChange={(e: any) =>
                                  setDescricao(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </Card>
                      </>
                    )}
                  </div>

                  <Card className="col-span-4 bg-gray-200">
                    <CardBody>
                      <div className="m-1 bg-white rounded-lg p-4 h-full">
                        Anexar Documentos
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                        <ul className="file-list">
                          {files.map((file: any, index) => (
                            <li key={index} className="file-item">
                              {/* If the file is an image, display a preview */}
                              {file.type.startsWith("image/") && (
                                <Image
                                  src={URL.createObjectURL(file)}
                                  alt="Preview"
                                  className="img-preview"
                                />
                              )}
                              <div className="file-details">
                                <div>
                                  <strong>Nome:</strong> {file.name}
                                </div>
                                <div>
                                  <strong>Tamanho:</strong>{" "}
                                  {(file.size / 1024).toFixed(2)} KB
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button
                        color="primary"
                        onPress={(e: any) => submit(onClose)}
                      >
                        Salvar
                      </Button>
                    </ModalFooter>
                  </Card>
                </div>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
