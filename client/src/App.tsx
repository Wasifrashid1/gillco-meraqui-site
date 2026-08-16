import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SitePage from "./pages/SitePage";
import { allPages } from "./lib/siteData";

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Switch><Route path="/" component={Home} />{allPages.map(page => <Route key={page.slug} path={`/${page.slug}`}><SitePage page={page} /></Route>)}<Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
