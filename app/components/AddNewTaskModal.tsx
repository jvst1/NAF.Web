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
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getSession, useSession } from "next-auth/react";

export default function AddNewTaskModal({
  isOpen,
  onOpenChange,
  refresh,
  item,
  servicos,
  operadores
}: any) {
  const [situacao, setSituacao] = useState("");
  const [area, setArea] = useState("");
  const [servico, setServico] = useState("");
  const [solicitante, setSolicitante] = useState("");

  const [operador, setOperador] = useState("");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<[]>([]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [files, setFiles] = useState<any[]>([]);

  const [refreshCommentKey, setRefreshCommentKey] = useState(0);
  const [refreshFileKey, setRefreshFileKey] = useState(0);

  const { data: session } = useSession();

  const handleFileChange = (event: any) => {
    files.push(Array.from(event.target.files))

    setFiles(files);
  };

  const handleSelectionServico = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServico(e.target.value);
    setDescricao(servicos[e.target.value].descricao);
  };

  const handleSelectionSituacao = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSituacao(e.target.value);
  };

  const handleSelectionOperadores = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperador(e.target.value)
  };

  async function submitFiles(taskId: any) {
    if (!files) return;

    files.forEach(async (file) => {
      const session = await getSession();

      try {
        const formData = new FormData();

        formData.append("file", file);

        var codigoUsuario = session?.user.id ?? "";
        formData.append("codigoUsuario", codigoUsuario);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/${taskId}/Documento`, {
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${session?.user.token}`,
          },
        });
      } catch (e: any) {
        console.log(e);
      }
    })
  }

  async function submit(closeModal: any) {
    const session = await getSession();

    if (item.codigo) {
      const codigoOperador: any = operadores[operador]?.codigo;

      let req = {
        codigoOperador: codigoOperador
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/` + item.codigo, {
        method: "PUT",
        body: JSON.stringify(req),
        headers: {
          authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          toast("Chamado atualizado com sucesso.", {
            type: "success",
            autoClose: 2000,
          });
          submitFiles(item.codigo);
          refresh();
          closeModal();
        } else {
          const data = await res.json();

          data.then((error: any) => {
            toast(error.mensagem, { type: "error", autoClose: 2000 });
          });
        }
      });
    } else {
      const codigoServico = servicos[servico].codigo;

      let req = {
        codigoUsuario: session?.user.id,
        codigoServico: codigoServico,
        titulo: titulo,
        descricao: descricao,
      };

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
          submitFiles(data.codigo);
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

  function refreshComments() {
    setRefreshCommentKey(oldKey => oldKey + 1)
  }

  async function comentar(taskId: any) {
    const session = await getSession();

    var req = {
      codigoUsuario: session?.user.id,
      mensagem: comment
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Chamado/${taskId}/Comentario`,
      {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const data = await res.json();

      if (res.ok && res.status === 200) {
        toast("Comentário anexado com sucesso.", {
          type: "success",
          autoClose: 2000,
        });
        setComment("")
        refreshComments();
      } else {
        data.then((error: any) => {
          toast(error.mensagem, { type: "error", autoClose: 2000 });
        });
      }
    });
  }

  function refreshFiles() {
    setRefreshFileKey(oldKey => oldKey + 1)
  }

  async function downloadFile(file: any) {
    const session = await getSession();

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Chamado/${file.codigoChamado}/Documento/${file.codigo}/Download`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${session?.user.token}`
        },
      }
    ).then(async (res) => {
      saveByteArray(file.nomeArquivo, res)
    });
  }

  function saveByteArray(reportName: any, byte: any) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }

  async function deleteFile(file: any) {
    const session = await getSession()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/${file.codigoChamado}/Documento/${file.codigo}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${session?.user.token}`
      }
    }).then((res) => {
      if (res.ok) {
        toast('Arquivo removido com sucesso', { type: 'success', autoClose: 2000 })
        refreshFiles()
      } else {
        const data = res.json()

        data.then((error) => {
          toast(error.mensagem, { type: 'error', autoClose: 2000 })
        })
      }
    })
  }

  useEffect(() => {
    if (item?.codigo) {
      const getComentarios = async () => {
        const session = await getSession();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Chamado/${item.codigo}/Comentario`,
          {
            headers: {
              authorization: `Bearer ${session?.user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok && res.status === 200) {
          const response = await res.json();

          setComments(response)
        } else {
          setComments([])
        }
      };

      const getDocumentos = async () => {
        const session = await getSession();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Chamado/${item.codigo}/Documento`,
          {
            headers: {
              authorization: `Bearer ${session?.user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok && res.status === 200) {
          const response = await res.json();

          setFiles(response)
        }
      };

      getDocumentos();
      getComentarios();

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

      if (operadores?.length > 0) {
        var operador: any = operadores.find((operador: any) => operador.codigo === item.codigoOperador);
        
        setOperador(operador?.id?.toString());
      } else {
        setOperador(item?.operador?.nome)
      }
    } else {
      setTitulo("")
      setServico("")
    }
  }, [item, servicos, operadores, refreshCommentKey, refreshFileKey]);

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

                              <Input
                                type="text"
                                label="Serviço"
                                value={servico}
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

                              {
                                session?.user.tipoPerfil !== 1
                                  ?
                                  <Select
                                    label="Operador"
                                    placeholder="Selecione"
                                    selectedKeys={operador}
                                    onChange={handleSelectionOperadores}
                                    isDisabled={session?.user.tipoPerfil !== 4}
                                  >
                                    {operadores.map((operador: any, index: any) => (
                                      <SelectItem
                                        key={index}
                                        value={operador.id}
                                      >
                                        {operador.nome}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                  :
                                  <Input
                                    type="text"
                                    label="Operador"
                                    value={operador}
                                    isDisabled
                                  />
                              }

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
                        <Card className="bg-gray-200 h-1/2 gap-4 p-4 flex flex-col overflow-y-scroll">
                          <div className="bg-white h-1/3 rounded-lg p-4 flex items-center gap-4">
                            <Avatar />

                            <Textarea
                              disableAutosize
                              label="Comentar"
                              className="w-full mt-4 h-full"
                              classNames={{
                                input: "resize-y  min-h-[30px] max-h-[30px]",
                              }}
                              value={comment}
                              onChange={(e: any) => setComment(e.target.value)}
                            />

                            <Button
                              color="primary"
                              onPress={(e: any) => comentar(item.codigo)}
                            >
                              Enviar
                            </Button>
                          </div>
                          {
                            comments.length > 0 &&
                            <div className="flex flex-col gap-4">
                              {
                                comments.map((comment: any, index: any) => (
                                  <div key={index} className="bg-white rounded-lg p-4 overflow-y-scroll">
                                    <div className="flex gap-4 items-center">
                                      <Avatar />

                                      <div className="flex flex-col">
                                        <span>{comment.usuario.nome}</span>
                                        <span className="text-sm">{comment.mensagem}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          }
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
                      <div className="m-1 bg-white rounded-lg p-4 h-full overflow-y-scroll">
                        Anexar Documentos
                        <label className="flex flex-col">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <ul className="file-list">
                          {files.map((file: any, index) => (
                            <li key={index} className="file-item">
                              {/* If the file is an image, display a preview */}
                              {file?.type?.startsWith("image/") && (
                                <Image
                                  src={URL.createObjectURL(file)}
                                  alt="Preview"
                                  className="img-preview"
                                />
                              )}
                              <div className="file-details w-full flex justify-between items-center">
                                <div>
                                  <div>
                                    <strong>Nome:</strong> {file.name || file.nomeArquivo}
                                  </div>
                                  {
                                    file.size &&
                                    <div>
                                      <strong>Tamanho:</strong>{" "}
                                      {(file.size / 1024).toFixed(2)} KB
                                    </div>
                                  }
                                </div>

                                <div className="flex gap-2 mr-4">
                                  {
                                    file.arquivo &&
                                    <Tooltip content="Baixar">
                                      <div onClick={(e) => downloadFile(file)}>
                                        <span className="material-symbols-outlined cursor-pointer">
                                          download
                                        </span>
                                      </div>
                                    </Tooltip>
                                  }
                                  <Tooltip content="Remover">
                                    <div onClick={(e) => deleteFile(file)}>
                                      <span className="material-symbols-outlined cursor-pointer">
                                        close
                                      </span>
                                    </div>
                                  </Tooltip>
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
