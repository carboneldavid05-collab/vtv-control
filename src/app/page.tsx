import { prisma } from "@/lib/prisma";
import { AlertTriangle, CarFront, CheckCircle2, Clock } from "lucide-react";
import { addDays, isBefore } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const vehicles = await prisma.vehicle.findMany();
  
  const total = vehicles.length;
  
  const today = new Date();
  const nextMonth = addDays(today, 30);
  
  const expiredVTV = vehicles.filter(v => isBefore(v.vtvExpiration, today)).length;
  const expiringVTV = vehicles.filter(v => 
    isBefore(v.vtvExpiration, nextMonth) && !isBefore(v.vtvExpiration, today)
  ).length;
  const validVTV = total - expiredVTV - expiringVTV;

  const expiredInsurance = vehicles.filter(v => isBefore(v.insuranceExpiration, today)).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Panel de Control</h1>
        <p className="text-gray-400">Resumen del estado de la flota y vencimientos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Vehicles */}
        <div className="glass-panel p-6 flex items-start gap-4">
          <div className="bg-primary-600/20 p-3 rounded-xl text-primary-500">
            <CarFront size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Flota</p>
            <h3 className="text-3xl font-bold text-white mt-1">{total}</h3>
          </div>
        </div>

        {/* Valid VTV */}
        <div className="glass-panel p-6 flex items-start gap-4">
          <div className="bg-success/20 p-3 rounded-xl text-success">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">VTV al día</p>
            <h3 className="text-3xl font-bold text-white mt-1">{validVTV}</h3>
          </div>
        </div>

        {/* Expiring VTV */}
        <div className="glass-panel p-6 flex items-start gap-4 border-b-4 border-b-warning">
          <div className="bg-warning/20 p-3 rounded-xl text-warning">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Por vencer (30d)</p>
            <h3 className="text-3xl font-bold text-white mt-1">{expiringVTV}</h3>
          </div>
        </div>

        {/* Expired VTV */}
        <div className="glass-panel p-6 flex items-start gap-4 border-b-4 border-b-danger">
          <div className="bg-danger/20 p-3 rounded-xl text-danger">
            <AlertTriangle size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">VTV Vencidas</p>
            <h3 className="text-3xl font-bold text-white mt-1">{expiredVTV}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Alertas Recientes</h2>
          {vehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay vehículos registrados en el sistema.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Here we can map actual alerts. For now, placeholders if data exists */}
              {expiredVTV > 0 && (
                <div className="flex items-center gap-4 bg-danger/10 border border-danger/20 p-4 rounded-lg text-danger">
                  <AlertTriangle size={20} />
                  <p className="font-medium">¡Tienes {expiredVTV} vehículo(s) con la VTV vencida!</p>
                </div>
              )}
              {expiredInsurance > 0 && (
                <div className="flex items-center gap-4 bg-danger/10 border border-danger/20 p-4 rounded-lg text-danger">
                  <AlertTriangle size={20} />
                  <p className="font-medium">¡Tienes {expiredInsurance} vehículo(s) con el seguro vencido!</p>
                </div>
              )}
              {expiringVTV > 0 && (
                <div className="flex items-center gap-4 bg-warning/10 border border-warning/20 p-4 rounded-lg text-warning">
                  <Clock size={20} />
                  <p className="font-medium">Tienes {expiringVTV} vehículo(s) con VTV próxima a vencer.</p>
                </div>
              )}
              {total > 0 && expiredVTV === 0 && expiringVTV === 0 && expiredInsurance === 0 && (
                <div className="flex items-center gap-4 bg-success/10 border border-success/20 p-4 rounded-lg text-success">
                  <CheckCircle2 size={20} />
                  <p className="font-medium">Toda la flota está en regla. ¡Buen trabajo!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
