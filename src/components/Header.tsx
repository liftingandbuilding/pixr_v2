import { Save } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";

export const Header = () => {
  const { exportCanvas } = useEditor();

  return (
    <header className="h-16 border-b-2 border-foreground bg-background px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl text-pixel-lime font-pixel tracking-wide">PIXR</h1>
        <div className="w-2 h-2 bg-pixel-pink animate-pulse"></div>
      </div>
      
      <button 
        onClick={exportCanvas}
        className="btn-pixel-export flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        EXPORT
      </button>
    </header>
  );
};