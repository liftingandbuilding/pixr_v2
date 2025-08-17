import { Header } from "@/components/Header";
import { CanvasArea } from "@/components/CanvasArea";
import { RightPanel } from "@/components/RightPanel";
import { EditorProvider } from "@/contexts/EditorContext";

const Index = () => {
  return (
    <EditorProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] gap-4 p-4">
          {/* Left Panel - Future features (Desktop only) */}
          <div className="w-64 hidden lg:block">
            <div className="panel-retro h-full">
              <h3 className="text-sm mb-4 text-pixel-lime">LAYERS</h3>
              <p className="text-xs opacity-60">Coming Soon...</p>
            </div>
          </div>
          
          {/* Main Canvas Area */}
          <div className="flex-1 min-h-0">
            <CanvasArea />
          </div>
          
          {/* Right Panel - Controls */}
          <div className="w-full lg:w-80 lg:min-h-0">
            <RightPanel />
          </div>
        </main>
      </div>
    </EditorProvider>
  );
};

export default Index;