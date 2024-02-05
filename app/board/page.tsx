'use client'

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

import { cardsData } from './teste'
interface Data {
    id: number,
    title: string,
    components: {
        id: number,
        name: string
    }[]
}

export default function Home() {
    const [data, setData] = useState<Data[] | []>([])

    const { data: session, status } = useSession({
        required: true
    })

    useEffect(() => {
        setData(cardsData)
    }, [])

    if (status === "loading") {
        return <></>
    }

    const onDragEnd = (e: DropResult) => {
        console.log(e)
    }

    return (
        <main className="h-screen flex flex-col py-4 pr-4">
            <h1 className="text-2xl font-medium">Board</h1>

            <div className="h-full w-full flex gap-4 text-center mt-4">                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        data.length && data.map((items, index) => (
                            <Droppable key={items.id} droppableId={`droppable${items.id}`}>
                                {
                                    (provided) => (
                                        <div className="border w-1/3 h-full bg-gray-200 rounded-lg flex flex-col gap-4"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <h1 className="pt-3 text-lg">{items.title}</h1>
                                            {
                                                items.components.map((component, index) => (
                                                    <Draggable key={component.id} draggableId={`draggable${component.id}`} index={index}>
                                                        {
                                                            (provided) => (
                                                                <div key={index} className="bg-white mx-4 rounded-lg text-start p-4 flex flex-col"
                                                                    {...provided.dragHandleProps}
                                                                    {...provided.draggableProps}
                                                                    ref={provided.innerRef}
                                                                >
                                                                    {component.name}

                                                                    <span className="text-sm">Descrição</span>
                                                                </div>
                                                            )
                                                        }
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                        ))
                    }
                </DragDropContext>
            </div>
        </main>
    )
}
