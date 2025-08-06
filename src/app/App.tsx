import { ChartComponent } from "@/features/chart/ChartComponent";
import { TableComponent } from '@/features/table/TableComponent';
import { Header } from '@/widgets/header/ui/Header';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col justify-center">
      <Header />
      <main className="flex-1 flex flex-col justify-center w-full mx-auto">
        <ChartComponent />
        <TableComponent />
      </main>
    </div>
  );
};

export default App;