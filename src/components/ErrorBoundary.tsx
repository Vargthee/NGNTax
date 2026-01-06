import { ReactNode, Component, ErrorInfo } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="w-full max-w-md">
            <div className="bg-card border border-border rounded-lg p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-destructive/10 rounded-full p-4">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Something went wrong
                </h1>
                <p className="text-muted-foreground text-sm">
                  We encountered an unexpected error. Your calculation data is safe, but please reload the calculator to continue.
                </p>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="bg-destructive/5 border border-destructive/20 rounded p-3 text-left">
                  <p className="text-xs font-mono text-destructive">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <Button
                onClick={this.handleReset}
                className="w-full"
                size="lg"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Reload Calculator
              </Button>

              <p className="text-xs text-muted-foreground">
                If the problem persists, try clearing your browser cache or opening in incognito mode.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
