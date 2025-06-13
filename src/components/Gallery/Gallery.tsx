import { useEffect, useState } from "react"

type Object = {
    total: number,
    objectIDs: number[]
}

type Item = {
    objectIDs: number[]
}

export default function Gallery() {
    const [data, setData] = useState({})
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArt = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?limit=0')

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data : any = await response.json()
                
                setItems(data.objectIDs)
                setData(data.objectIDs.slice(0, 20))
            } catch (err) {
                setError("idk")
            } finally {
                setLoading(false)
            }
        }

        fetchArt()
    }, [])

    console.log(data)
    return (
        <section>
            <h1>Hello, Gallery!~!</h1>
            {items.map(itemDuh => {
                return <p>Ok</p>
            })}
        </section>
    )
}