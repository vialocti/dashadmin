import { useEffect, useState } from 'react';

import DynamicTable from '../../components/comunes/DynamicTable';
import { analizarDatosAlumnos, constructorSQL, enviarDatosParaAnalisis } from '../../services/servicesOpenAI';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ConsuOpenAI = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("Espere luego de la consulta, un análisis de los datos...");
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [conclusion, setConclusion] = useState(false);

    const instrucciones = `Se te envia informacion referida a alumnos, propuestas y/o ubicación. Debes ser
    lo más preciso posible en tu análisis estadístico.`;

    const handleAsk = async () => {
        setAnswer("Espere luego de la consulta, un análisis de los datos...");
        setDatos([]);
        try {
            const response = await constructorSQL(question);
            if (response.data !== "error") {
                setDatos(response.data);
            }
        } catch (error) {
            setAnswer("Error en la conexión con el servidor");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const generarConsulta = async () => {
            try {
                let respuesta = await analizarDatosAlumnos(datos);
                console.log(respuesta);
                setAnswer(respuesta);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (datos && datos.length < 70 && datos.length > 1 && conclusion) {
            setLoading(true);
            generarConsulta();
        }
    }, [datos, conclusion]);

    const generarPDF = () => {
        const doc = new jsPDF();
        const marginLeft = 14;
        const maxWidth = 180;

        doc.setFontSize(18);
        doc.text("Reporte de Consulta", 14, 20);

        doc.setFontSize(10);
        doc.text("Pregunta:", marginLeft, 30);
        doc.text(question, marginLeft, 35);

        doc.text("Respuesta:", marginLeft, 50);
        const respuestaTexto = doc.splitTextToSize(answer, maxWidth);
        doc.text(respuestaTexto, marginLeft, 55);

        doc.save("reporte_consulta_openai.pdf");
    };

    return (
        <div className="p-4 max-w mx-auto bg-white shadow-lg rounded-2xl">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-[600px]">
                <div className="md:col-span-4 p-2 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-bold mb-2">Pregunta algo:</h2>
                    <textarea
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                        placeholder="Escribe tu pregunta..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={5}
                    />
                    <button
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        onClick={handleAsk}
                    >
                        Preguntar
                    </button>
                    <div className="mt-2 flex items-center">
                        <input
                            type="checkbox"
                            id="conclusion"
                            checked={conclusion}
                            onChange={(e) => setConclusion(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="conclusion" className="text-gray-700">Generar conclusión</label>
                    </div>
                </div>
                <div className="md:col-span-8 p-4 bg-gray-100 rounded-lg">
                    {datos && datos.length > 0 && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Tabla de Datos</h2>
                            <DynamicTable data={datos} />
                        </>
                    )}
                </div>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold">Conclusión</h2>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                        <span className="ml-2 text-gray-700">Generando conclusión...</span>
                    </div>
                ) : (
                    <pre className="text-gray-700 whitespace-pre-wrap">{answer}</pre>
                )}
            </div>
            <button
                className="mt-4 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                onClick={generarPDF}
            >
                Generar Reporte PDF
            </button>
        </div>
    );
};

export default ConsuOpenAI;
