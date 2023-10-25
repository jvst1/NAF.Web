'use client'

import { Image } from "@nextui-org/react"
import Link from "next/link"
import logo_naf from '@/app/assets/images/logo_naf.png'

export default function Home() {
  return (
    <div className="h-5/6 flex justify-evenly items-center">
      <Image src={logo_naf.src} alt="logo_naf" />

      <div className="w-3/12">
        <h1 className="text-lg">
          O Núcleo de Apoio Contábil e Fiscal (NAF) é um projeto desenvolvido pela Receita Federal em parceria com
          instituições de ensino, com objetivo de oferecer serviços contábeis e fiscais gratuitos para cidadãos e pequenas
          empresas. Os serviços são de apoio e orientação, e não substituem um escritório de contabilidade.
        </h1>
        <h1 className="mt-4">
          <Link href="/sobre" className="text-blue-600 text-lg">Saiba mais sobre.</Link>
        </h1>
      </div>
    </div>
  )
}
