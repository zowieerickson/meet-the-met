import { useEffect, useState } from "react"

type ApiResponse = {
    total: number;
    objectIDs: number[];
}

type ObjectDetail = {
    objectID: number;
    title: string;
    artistDisplayName: string;
    primaryImageSmall: string;

}

export default function Gallery() {
    const [data, setData] = useState<ApiResponse | null>(null)
    const [items, setItems] = useState<number[]>([])
    const [details, setDetails] = useState<ObjectDetail[]>([])
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

                const apiData: ApiResponse = await response.json()
                
                setData(apiData)
                setItems(apiData.objectIDs.slice(0, 20))
            } catch (err) {
                setError("Something went wrong loading the gallery.")
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
                return <p key={itemDuh}>{itemDuh}</p>
            })}
        </section>
    )
}