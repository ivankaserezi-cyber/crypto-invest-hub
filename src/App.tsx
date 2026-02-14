import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Deposit from "./pages/Deposit";
import Referrals from "./pages/Referrals";
import Withdraw from "./pages/Withdraw";
import Documents from "./pages/Documents";
import TopInvestors from "./pages/TopInvestors";
import Rates from "./pages/Rates";
import Contacts from "./pages/Contacts";
import Office from "./pages/Office";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/referrals" element={<Referrals />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/top-investors" element={<TopInvestors />} />
              <Route path="/rates" element={<Rates />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/office" element={<Office />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
