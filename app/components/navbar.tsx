'use client'

import {
    Navbar,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";

import Link from "next/link";

export default function CommomNavbar() {
    const menuItems = [
        { text: "Página Inicial", route: "/" },
        { text: "Serviços", route: "/servicos" },
        { text: "Perguntas Frequentes", route: "/perguntas-frequentes" },
        { text: "Sobre", route: "/sobre" },
        { text: "Sair", route: "#" }
    ];

    return (
        <Navbar disableAnimation>
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
                    <Link href="#" color="foreground">Entrar</Link>
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
    )
}
