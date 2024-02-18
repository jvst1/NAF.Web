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
    useDisclosure
} from "@nextui-org/react";


import Link from "next/link";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";

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
    const { isOpen: isOpenRegister, onOpen: onOpenRegister, onOpenChange: onOpenRegisterChange } = useDisclosure();

    return (
        <div className="h-screen">
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
                        <Button onPress={onOpenRegister} as={Link} href="#" variant="flat">
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

            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange}></LoginModal>
            <RegisterModal isOpen={isOpenRegister} onOpenChange={onOpenRegisterChange}></RegisterModal>
        </div>
    )
}
