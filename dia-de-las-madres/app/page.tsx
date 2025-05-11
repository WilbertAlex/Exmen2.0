import MothersCard from "@/components/mothers-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <MothersCard />
      </div>
    </main>
  )
}
