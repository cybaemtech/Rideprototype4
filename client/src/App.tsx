import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import BookRide from "@/pages/BookRide";
import RideTracking from "@/pages/RideTracking";
import DriverDashboard from "@/pages/DriverDashboard";
import Wallet from "@/pages/Wallet";
import RideHistory from "@/pages/RideHistory";
import Drive from "@/pages/Drive";
import Support from "@/pages/Support";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/driver/signup" component={Signup} />
      <Route path="/book-ride" component={BookRide} />
      <Route path="/ride/tracking" component={RideTracking} />
      <Route path="/driver/dashboard" component={DriverDashboard} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/ride/history" component={RideHistory} />
      <Route path="/drive" component={Drive} />
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
