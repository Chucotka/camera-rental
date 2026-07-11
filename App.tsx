import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Studio from "./pages/Studio";
import Services from "./pages/Services";
import Contacts from "./pages/Contacts";
import Production from "./pages/Production";
import AILab from "./pages/AILab";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Terms from "./pages/Terms";
import AdminBookings from "./pages/AdminBookings";
import BookingSuccess from "./pages/BookingSuccess";
import BookingCancel from "./pages/BookingCancel";
import Orders from "./pages/Orders";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/report"} component={Report} />
      <Route path={"/studio"} component={Studio} />
      <Route path={"/services"} component={Services} />
      <Route path={"/production"} component={Production} />
      <Route path={"/ai-lab"} component={AILab} />
      <Route path={"/catalog"} component={Catalog} />
      <Route path={"/contacts"} component={Contacts} />
      <Route path={"/about"} component={About} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/admin/bookings"} component={AdminBookings} />
      <Route path={"/booking-success"} component={BookingSuccess} />
      <Route path={"/booking-cancel"} component={BookingCancel} />
      <Route path={"/orders"} component={Orders} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
