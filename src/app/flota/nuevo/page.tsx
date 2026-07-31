import { createVehicle } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NuevoVehiculoPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Link href="/flota" className="p-2 hover:bg-surface-hover rounded-lg transition-colors text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Registrar Camioneta</h1>
          <p className="text-gray-400">Añade un nuevo vehículo a la flota.</p>
        </div>
      </div>

      <div className="glass-panel p-8">
        <form action={createVehicle} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="licensePlate" className="text-sm font-medium text-gray-300">Patente</label>
              <input 
                type="text" 
                id="licensePlate" 
                name="licensePlate" 
                required 
                placeholder="AB 123 CD"
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow uppercase"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="year" className="text-sm font-medium text-gray-300">Año</label>
              <input 
                type="number" 
                id="year" 
                name="year" 
                required 
                min="1980" 
                max="2030"
                placeholder="2023"
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="brand" className="text-sm font-medium text-gray-300">Marca</label>
              <input 
                type="text" 
                id="brand" 
                name="brand" 
                required 
                placeholder="Toyota"
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="model" className="text-sm font-medium text-gray-300">Modelo</label>
              <input 
                type="text" 
                id="model" 
                name="model" 
                required 
                placeholder="Hilux"
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="vtvExpiration" className="text-sm font-medium text-gray-300">Vencimiento VTV</label>
              <input 
                type="date" 
                id="vtvExpiration" 
                name="vtvExpiration" 
                required 
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="insuranceExpiration" className="text-sm font-medium text-gray-300">Vencimiento Seguro</label>
              <input 
                type="date" 
                id="insuranceExpiration" 
                name="insuranceExpiration" 
                required 
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary-600/20"
            >
              <Save size={20} />
              Guardar Camioneta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
