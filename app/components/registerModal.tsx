"use client";

import React, { useRef, useState } from "react";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCpfCnpj } from "../src/utils/clearDocument";
import {
  formatCNPJ,
  formatCPF,
  isValidEmail,
  isValidPhone,
} from "@brazilian-utils/brazilian-utils";

export default function RegisterModal({ isOpen, onOpenChange }: any) {
  const name = useRef("");
  const email = useRef("");
  const phoneNumber = useRef("");
  const [documentoFederal, setDocumentoFederal] = useState("");
  const nickname = useRef("");
  const password = useRef("");
  const confPassword = useRef("");

  const router = useRouter();

  async function register() {
    var request = {
      name: name.current,
      email: email.current,
      phoneNumber: phoneNumber.current,
      password: password.current,
      documentoFederal: clearCpfCnpj(documentoFederal),
      apelido: nickname.current,
      tipoPerfil: 1,
    };

    if (!validarRequest()) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/User/register`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast("Cadastro realizado com sucesso", {
        type: "success",
        autoClose: 2000,
      });
      router.replace("/");
    } else {
      const data = res.json();

      data.then((error) => {
        toast(error.mensagem || error.detail, {
          type: "error",
          autoClose: 2000,
        });
      });
    }
  }

  function validarRequest() {
    if (!isValidEmail(email.current)) {
      toast("O email informado é inválido.", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });

      return false;
    }

    if (!isValidPhone(phoneNumber.current)) {
      toast("O telefone informado é inválido.", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });

      return false;
    }

    if (password.current.length < 8) {
      toast("A senha informada é invalida.", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });

      return false;
    } else {
      if (password.current !== confPassword.current) {
        toast("As senhas não são iguais.", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });

        return false;
      }
    }

    return true;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cadastrar-se
              </ModalHeader>
              <ModalBody className="grid grid-cols-12">
                <Input
                  autoFocus
                  label="Nome"
                  variant="bordered"
                  className="col-span-12"
                  onChange={(e) => (name.current = e.target.value)}
                />
                <Input
                  label="Documento Federal"
                  variant="bordered"
                  className="col-span-12"
                  value={documentoFederal}
                  onChange={(e) => {
                    const { value } = e.target;

                    let doc = clearCpfCnpj(value);

                    if (doc.length <= 11) {
                      setDocumentoFederal(formatCPF(value));
                    } else {
                      setDocumentoFederal(formatCNPJ(value));
                    }
                  }}
                />
                <Input
                  label="Telefone"
                  variant="bordered"
                  className="col-span-6"
                  onChange={(e) => (phoneNumber.current = e.target.value)}
                />
                <Input
                  label="Apelido"
                  variant="bordered"
                  className="col-span-6"
                  onChange={(e) => (nickname.current = e.target.value)}
                />
                <Input
                  label="Email"
                  variant="bordered"
                  className="col-span-12"
                  onChange={(e) => (email.current = e.target.value)}
                />
                <Input
                  label="Senha"
                  type="password"
                  variant="bordered"
                  className="col-span-6"
                  onChange={(e) => (password.current = e.target.value)}
                />
                <Input
                  label="Confirmação Senha"
                  type="password"
                  variant="bordered"
                  className="col-span-6"
                  onChange={(e) => (confPassword.current = e.target.value)}
                />
              </ModalBody>
              <ModalFooter className="py-6">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={register}>
                  Cadastrar-se
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
