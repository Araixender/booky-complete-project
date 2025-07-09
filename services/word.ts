export const fetchWord = async () => {
    try {
        const response = await fetch("https://random-word-api.vercel.app/api?words=10", {
            method: "GET"
        })
        if(!response.ok){
          console.log("Unable to fetch words", response)
        }
        const data = await response.json();
        return data

        
    } catch (error: any) {
        throw new Error("Unable to fetch", error)
    }
}
