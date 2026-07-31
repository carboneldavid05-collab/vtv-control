import { prisma } from "@/lib/prisma";
import { format, isBefore, addDays } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export const dynamic = "force-dynamic";

export default async function FlotaPage() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { vtvExpiration: "asc" }
  });

  const today = new Date();
  const nextMonth = addDays(today, 30);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Flota de Vehículos</h1>
          <p className="text-gray-400">Gestiona las VTVs y seguros de tus camionetas.</p>
        </div>
        <Link 
          href="/flota/nuevo"
          className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} />
          Nuevo Vehículo
        </Link>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border bg-surface/30">
                <th className="p-4 font-semibold text-gray-300">Patente</th>
                <th className="p-4 font-semibold text-gray-300">Marca / Modelo</th>
                <th className="p-4 font-semibold text-gray-300">Año</th>
                <th className="p-4 font-semibold text-gray-300">Vencimiento VTV</th>
                <th className="p-4 font-semibold text-gray-300">Vencimiento Seguro</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No hay vehículos registrados. Haz clic en "Nuevo Vehículo" para empezar.
                  </td>
                </tr>
              ) : (
                vehicles.map((v) => {
                  const vtvExpired = isBefore(v.vtvExpiration, today);
                  const vtvExpiring = !vtvExpired && isBefore(v.vtvExpiration, nextMonth);
                  
                  const insExpired = isBefore(v.insuranceExpiration, today);
                  const insExpiring = !insExpired && isBefore(v.insuranceExpiration, nextMonth);

                  return (
                    <tr key={v.id} className="border-b border-surface-border/50 hover:bg-surface-hover/30 transition-colors">
                      <td className="p-4 font-mono font-medium text-white">{v.licensePlate}</td>
                      <td className="p-4 text-gray-300">{v.brand} {v.model}</td>
                      <td className="p-4 text-gray-400">{v.year}</td>
                      <td className="p-4">
                        <span className={clsx(
                          vtvExpired ? "badge-danger" : 
                          vtvExpiring ? "badge-warning" : "badge-success"
                        )}>
                          {format(v.vtvExpiration, "dd/MM/yyyy")}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={clsx(
                          insExpired ? "badge-danger" : 
                          insExpiring ? "badge-warning" : "badge-success"
                        )}>
                          {format(v.insuranceExpiration, "dd/MM/yyyy")}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
