export default function Skeleton({width = "100%", height = "100%"}:{
    width: string,
    height: string
}) {
    return (
        <div 
            style={{
                width,
                height
            }}

            className="rounded-xl p-4 bg-gray-200 animate-pulse"
        >
        </div>
    )
}