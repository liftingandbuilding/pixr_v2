import { useRef, useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { AspectRatioSelector } from "@/components/AspectRatioSelector";

export const CanvasArea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const { 
    backgroundImage, 
    setBackgroundImage, 
    aspectRatio, 
    texts, 
    canvasSize,
    redrawCanvas 
  } = useEditor();

  useEffect(() => {
    redrawCanvas(canvasRef.current);
  }, [backgroundImage, texts, aspectRatio, redrawCanvas]);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setBackgroundImage(img);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add text at click position (scaled to canvas coordinates)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // This would be handled by the editor context
    console.log('Canvas clicked at:', x * scaleX, y * scaleY);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-pixel">CANVAS</h2>
        <AspectRatioSelector />
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div 
          className={`relative border-2 border-foreground canvas-checker ${
            isDragOver ? 'border-pixel-lime glow-lime' : ''
          }`}
          style={{ 
            width: `${canvasSize.display.width}px`, 
            height: `${canvasSize.display.height}px` 
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.export.width}
            height={canvasSize.export.height}
            className="w-full h-full cursor-crosshair"
            onClick={handleCanvasClick}
            style={{ imageRendering: 'pixelated' }}
          />
          
          {!backgroundImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-pixel mb-2">DROP IMAGE HERE</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-pixel text-xs"
                >
                  BROWSE FILES
                </button>
              </div>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="hidden"
        />
      </div>
    </div>
  );
};