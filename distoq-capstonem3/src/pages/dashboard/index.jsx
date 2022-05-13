import DashboardPage from "../../components/dashboard-components/DashboardPage";
import PedidosPage from "../../components/dashboard-components/PedidosPage";
import FornecedoresPage from "../../components/dashboard-components/FornecedoresPage";
import InsumosPage from "../../components/dashboard-components/InsumosPage";
import ProdutosPage from "../../components/dashboard-components";
import EstoquePage from "../../components/dashboard-components/EstoquePage";
import FinanceiroPage from "../../components/dashboard-components/FinanceiroPage";
import DashboardHeader from "../../components/header-components";
import ComprasPage from "../../components/dashboard-components/ComprasPage";
import { useActivePage } from "../../Providers/DashboardPageController";

const Dashboard = () => {
  const { activeDashboardPage } = useActivePage();

  const handlePageRender = (value) => {
    switch (value) {
      case "Dashboard":
        return <DashboardPage />;
      case "Pedidos":
        return <PedidosPage />;

      case "Fornecedores":
        return <FornecedoresPage />;

      case "Insumos":
        return <InsumosPage />;

      case "Compras":
        return <ComprasPage />;

      case "Produtos":
        return <ProdutosPage />;

      case "Estoque":
        return <EstoquePage />;

      case "Financeiro":
        return <FinanceiroPage />;

      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <DashboardHeader />
      {handlePageRender(activeDashboardPage)}
    </>
  );
};

export default Dashboard;
