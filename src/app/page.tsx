import DashboardComponent from "@/components/DashboardComponent";
import { CountryProvider } from "@/context/CountryContext";
import { lazy } from 'react';


const CardDashboard = lazy(() => import('./../components/CardDashboard'));
export default function Home() {
  return (
    <div>
      <CountryProvider>
        <CardDashboard />
      </CountryProvider>
    </div>
  );
}
