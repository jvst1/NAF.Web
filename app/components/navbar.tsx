'use client'

import {
    Navbar,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    NavbarMenu,
    NavbarMenuItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input
} from "@nextui-org/react";
import { signIn } from "next-auth/react";


import Link from "next/link";
import { useRef } from "react";

interface Props {
    children?: React.ReactNode
}

export default function CommomNavbar({ children }: Props) {
    const menuItems = [
        { text: "Página Inicial", route: "/" },
        { text: "Serviços", route: "/servicos" },
        { text: "Perguntas Frequentes", route: "/perguntas-frequentes" },
        { text: "Sobre", route: "/sobre" },
        { text: "Sair", route: "#" }
    ];

    let { isOpen, onOpen, onOpenChange } = useDisclosure();

    const document = useRef("")
    const password = useRef("")

    async function login() {
        const result = await signIn("credentials", {
            document: document.current,
            password: password.current,
            redirect: true,
            callbackUrl: "/dashboard"
        })

        isOpen = false
    }

    return (
        <div className="h-screen">
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Entrar</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Documento Federal"
                                    variant="bordered"
                                    onChange={(e) => (document.current = e.target.value)}
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

            <Navbar disableAnimation isBordered className="shadow-lg">
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <p className="font-bold text-inherit">NAF</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-10" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="/">
                            Página Inicial
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/servicos" color="foreground">
                            Serviços
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/perguntas-frequentes">
                            Perguntas Frequentes
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/sobre">
                            Sobre
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Button onPress={onOpen} color="primary">Entrar</Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} href="#" variant="flat">
                            Cadastre-se
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                href={item.route}
                            >
                                {item.text}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            {children}
        </div>
    )
}
