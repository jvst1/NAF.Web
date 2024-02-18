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
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatCNPJ, formatCPF } from "@brazilian-utils/brazilian-utils";
import { clearCpfCnpj } from "../src/utils/clearDocument";

export default function LoginModal({ isOpen, onOpenChange }: any) {
  const [documentoFederal, setDocumentoFederal] = useState("");
  const password = useRef("");

  const router = useRouter();

  async function login() {
    const result = await signIn("credentials", {
      document: clearCpfCnpj(documentoFederal),
      password: password.current,
      redirect: false,
    });

    isOpen = false;

    if (result?.ok) {
      var session = await getSession();
      if (session?.user.tipoPerfil === 2 || session?.user.tipoPerfil === 4) {
        router.replace("/board");
      } else {
        router.replace("/dashboard");
      }
    } else toast(result?.error, { type: "error", autoClose: 2000 });
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Entrar</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Documento Federal"
                  variant="bordered"
                  value={documentoFederal}
                  onChange={(e) => {
                    const { value } = e.target;

                    let doc = clearCpfCnpj(value)

                    if (doc.length <= 11) {
                      setDocumentoFederal(formatCPF(value));
                    } else {
                      setDocumentoFederal(formatCNPJ(value))
                    }
                  }}
                />
                <Input
                  label="Senha"
                  type="password"
                  variant="bordered"
                  onChange={(e) => (password.current = e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={login}>
                  Entrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
