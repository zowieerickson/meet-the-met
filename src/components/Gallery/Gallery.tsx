import { useEffect, useState } from "react"

type Object = {
    total: number,
    objectIDs: number[]
}

export default function Gallery() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArt = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data : any = await response.json()
                setData(data)
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
        <h1>Hello, Gallery!</h1>
    )
}