"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Sparkles, Download } from "lucide-react"
import confetti from "canvas-confetti"
import { jsPDF } from "jspdf"

export default function MothersCard() {
  const [name, setName] = useState("Wilbert Alex Mayta")
  const [message, setMessage] = useState(
    "Mamá, feliz día.\nEspero que hoy estés pasando un día muy especial. Puede que no estemos cerca para celebrar este día contigo, pero quiero que sepas que te llevamos siempre en nuestros corazones.\n\nHoy se celebra el día más hermoso de todos: El Día de la Madre, ese momento en el que honramos a esas guerreras incansables que, con amor y sacrificio, sacan adelante a sus hijos. Y tú, mamá, eres el mejor ejemplo de todo eso.\n\nQuiero agradecerte de corazón por cada esfuerzo, por cada palabra de aliento, por todas las veces que te preocupaste por nosotros, incluso cuando a veces fuimos ingratos. Pero tú siempre estuviste a nuestro lado, apoyándonos a pesar de todo.\n\nGracias, mamá. Espero algún día poder retribuir todo lo que has hecho por nosotros. Y con esto quiero decirte algo muy importante:\n\nTe amo profundamente, y no hay palabras suficientes para expresar lo agradecido que estoy por tenerte.\nFeliz Día de la Madre, mamá. Eres lo mejor que tengo.",
  )
  const [isEditing, setIsEditing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const messageRef = useRef(null)

  const handleOpenCard = () => {
    setIsOpen(true)
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
  }

  const handleSaveMessage = () => {
    setIsEditing(false)
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } })
  }

  const handleEditMessage = () => setIsEditing(true)

  const handleDownloadPDF = () => {
    setIsDownloading(true)
    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
      const pageWidth = pdf.internal.pageSize.width
      const pageHeight = pdf.internal.pageSize.height
      const centerX = pageWidth / 2
      const titleY = 60
      const subtitleY = 70
      const messageStartY = 90
      const signatureY = pageHeight - 60

      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(20)
      pdf.setTextColor(190, 18, 60)
      pdf.text("¡Feliz Día de las Madres!", centerX, titleY, { align: "center" })
      pdf.text("Para la mejor mamá del mundo", centerX, subtitleY, { align: "center" })

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)

      const paragraphs = message.split("\n\n")
      let yPosition = messageStartY
      const maxWidth = 150

      paragraphs.forEach((paragraph) => {
        const lines = pdf.splitTextToSize(paragraph, maxWidth)
        lines.forEach((line) => {
          pdf.text(line, centerX, yPosition, { align: "center" })
          yPosition += 6
        })
        yPosition += 4
      })

      pdf.setFont("helvetica", "italic")
      pdf.setFontSize(14)
      pdf.setTextColor(190, 18, 60)
      pdf.text("De,", centerX, signatureY, { align: "center" })
      pdf.text(name, centerX, signatureY + 10, { align: "center" })

      pdf.setDrawColor(249, 168, 212)
      pdf.setLineWidth(1)
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20)

      pdf.setDrawColor(253, 164, 175)
      pdf.setLineWidth(0.5)
      pdf.rect(15, 15, pageWidth - 30, pageHeight - 30)

      pdf.save("Mensaje_Dia_de_las_Madres.pdf")
    } catch (error) {
      console.error("Error al generar el PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex flex-col items-center px-4 pb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 mb-2 text-center">¡Feliz Día de las Madres!</h1>
      <p className="text-lg text-rose-600 mb-8 text-center">Una tarjeta especial para una persona especial</p>

      <div className="relative w-full max-w-2xl">
        {!isOpen ? (
          <div
            className="cursor-pointer transform transition-all duration-500 hover:scale-105"
            onClick={handleOpenCard}
          >
            <Card className="bg-rose-50 border-rose-300 p-8 text-center shadow-lg">
              <div className="flex justify-center mb-4">
                <Heart className="h-16 w-16 text-rose-500 animate-pulse" />
              </div>
              <h2 className="text-2xl font-semibold text-rose-700 mb-4">Haz clic para abrir</h2>
              <div className="flex justify-center">
                <Sparkles className="h-6 w-6 text-yellow-500 animate-spin" />
              </div>
            </Card>
          </div>
        ) : (
          <div className="transform transition-all duration-500">
            <Card className="bg-rose-50 border-rose-300 p-8 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-6">
                  <img
                    src="/madre.jpg"
                    alt="Flores para mamá"
                    className="rounded-full border-4 border-rose-300 shadow-md"
                  />
                </div>

                {isEditing ? (
                  <div className="w-full space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-rose-700 mb-1">
                        Tu nombre:
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Escribe tu nombre"
                        className="border-rose-300 focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-rose-700 mb-1">
                        Mensaje para mamá:
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe un mensaje especial para tu mamá"
                        className="min-h-[120px] border-rose-300 focus:border-rose-500"
                      />
                    </div>

                    <Button onClick={handleSaveMessage} className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                      Guardar mensaje
                    </Button>
                  </div>
                ) : (
                  <div className="w-full space-y-6 text-center">
                    <div ref={messageRef} className="bg-white p-6 rounded-lg shadow-inner border border-rose-200">
                      <h2 className="text-2xl font-bold text-rose-700 mb-4">Para la mejor mamá del mundo</h2>
                      <p className="text-rose-800 mb-6 whitespace-pre-line">
                        {message ||
                          "Eres la persona más especial en mi vida. Gracias por todo tu amor y dedicación. ¡Te quiero mucho!"}
                      </p>
                      <p className="text-rose-600 font-semibold">
                        De
                        <br />
                        {name || "Tu hijo/a"}
                      </p>
                    </div>
                    <div className="flex justify-center gap-4">
                     
                      <Button
                        onClick={handleDownloadPDF}
                        className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2"
                        disabled={isDownloading}
                      >
                        <Download className="h-4 w-4" />
                        {isDownloading ? "Generando PDF..." : "Descargar como PDF"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
