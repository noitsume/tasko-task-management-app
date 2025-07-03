import Image from "next/image"

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <Image src="/tasko-logo.png" alt="Tasko Logo" width={80} height={80} className="rounded-2xl" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Tasko</h1>
      <p className="text-gray-600 mb-4">Your Tasks, Under Control.</p>
    </div>
  )
}
