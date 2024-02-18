import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Input,
  Button,
  useDisclosure
} from "@nextui-org/react";
import { DeleteIcon } from "@/app/assets/icons/DeleteIcon";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
import { SearchIcon } from "@/app/assets/icons/SearchIcon";
import { AddIcon } from "@/app/assets/icons/AddIcon";
import { EditIcon } from "@/app/assets/icons/EditIcon";
import { situacoes, tiposPerfil } from "@/app/src/utils/enums";
import ReportIcon from "@/app/assets/icons/ReportIcon";
import ReportOperadoresModal from "./ReportOperadoresModal";

export default function TableOperadores({
  items,
  refresh,
  openEditModal,
  openAddModal,
}: any) {
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [item, setItem] = React.useState<any>();


  const columns = [
    { name: "NOME", uid: "nome" },
    { name: "IDENTIFICADOR", uid: "identificador" },
    { name: "DOCUMENTO FEDERAL", uid: "documento" },
    { name: "EMAIL", uid: "email" },
    { name: "TELEFONE", uid: "telefoneCelular" },
    { name: "TIPO PERFIL", uid: "tipoPerfil" },
    { name: "SITUAÇÃO", uid: "situacao" },
    { name: "AÇÕES", uid: "actions" },
  ];

  async function deleteOperador(codigo: string) {
    const session = await getSession();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/Operador/${codigo}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session?.user.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        toast("Deletado com sucesso", { type: "success", autoClose: 2000 });
        refresh();
      } else {
        const data = res.json();

        data.then((error) => {
          toast(error.mensagem, { type: "error", autoClose: 2000 });
        });
      }
    });
  }

  function openReportModal(item: any) {
    console.log(item);
    setItem(item);
    onOpen();
  }

  const rowsPerPage = 10;

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredItems = [...items];

    if (hasSearchFilter) {
      filteredItems = filteredItems.filter((user) =>
        user.nome.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredItems;
  }, [items, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const listItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  function formatTiposPerfis(tipoPerfil: any) {
    return tiposPerfil.find((item) => item.value === tipoPerfil).text;
  }

  function formatSituacao(situacao: any) {
    return situacoes.find((item) => item.value === situacao).text;
  }

  return (
    <>
      <div className="mb-2 flex justify-between items-center">
        <Button className="bg-primary mr-2 text-white" onPress={openAddModal}>
          Cadastrar
          <AddIcon className="text-white"></AddIcon>
        </Button>

        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[25%]",
            inputWrapper: "border-1",
          }}
          placeholder="Pesquisar..."
          size="md"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>

      <Table
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={page}
              total={pages}
              onChange={(page: number) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={listItems}
          emptyContent={"Não foram encontrados registros."}
        >
          {(item: any) => (
            <TableRow key={item.codigo}>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize truncate">
                    {item.nome}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize truncate">
                    {item.identificador}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize truncate">
                    {item.documentoFederal}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize truncate">
                    {item.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize truncate">
                    {item.telefoneCelular}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize truncate">
                    {formatTiposPerfis(item.tipoPerfil)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize truncate">
                    {formatSituacao(item.situacao)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <div onClick={(e) => openEditModal(item)}>
                        <EditIcon />
                      </div>
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Deletar">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <div onClick={(e) => deleteOperador(item.codigo)}>
                        <DeleteIcon />
                      </div>
                    </span>
                  </Tooltip>
                  <Tooltip color="success" content="Relatório">
                    <span className="text-lg text-success cursor-pointer active:opacity-50">
                      <div onClick={(e) => openReportModal(item)}>
                        <ReportIcon />
                      </div>
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ReportOperadoresModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={item}></ReportOperadoresModal>
    </>
  );
}
