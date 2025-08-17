import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AspectRatio = '16:9' | '9:16' | '1:1';

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export interface Template {
  id: string;
  name: string;
  previewUrl?: string;
  textStyle: Partial<Omit<TextElement, 'id' | 'text' | 'x' | 'y'>>;
}

interface EditorContextType {
  // Canvas state
  backgroundImage: HTMLImageElement | null;
  setBackgroundImage: (image: HTMLImageElement | null) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  canvasSize: {
    export: { width: number; height: number };
    display: { width: number; height: number };
  };
  
  // Text elements
  texts: TextElement[];
  addText: (text: string, x?: number, y?: number) => void;
  updateText: (id: string, updates: Partial<TextElement>) => void;
  removeText: (id: string) => void;
  selectedTextId: string | null;
  setSelectedTextId: (id: string | null) => void;
  
  // Canvas operations
  redrawCanvas: (canvas: HTMLCanvasElement | null) => void;
  exportCanvas: () => void;
  
  // Templates
  applyTemplate: (template: Template) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};

const ASPECT_RATIOS = {
  '16:9': { width: 1920, height: 1080 },
  '9:16': { width: 1080, height: 1920 },
  '1:1': { width: 1080, height: 1080 },
};

const DISPLAY_MAX_WIDTH = 600;

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [texts, setTexts] = useState<TextElement[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  // Calculate canvas sizes
  const exportSize = ASPECT_RATIOS[aspectRatio];
  const aspectRatioNum = exportSize.width / exportSize.height;
  const displayWidth = DISPLAY_MAX_WIDTH;
  const displayHeight = Math.round(displayWidth / aspectRatioNum);
  
  const canvasSize = {
    export: exportSize,
    display: { width: displayWidth, height: displayHeight },
  };

  const addText = useCallback((text: string, x?: number, y?: number) => {
    const newText: TextElement = {
      id: Date.now().toString(),
      text,
      x: x ?? canvasSize.export.width / 2,
      y: y ?? canvasSize.export.height / 2,
      fontSize: 72,
      fontFamily: 'Press Start 2P',
      color: '#A3FF00',
      strokeColor: '#000000',
      strokeWidth: 4,
      shadowColor: '#000000',
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    };
    setTexts(prev => [...prev, newText]);
    setSelectedTextId(newText.id);
  }, [canvasSize.export.width, canvasSize.export.height]);

  const updateText = useCallback((id: string, updates: Partial<TextElement>) => {
    setTexts(prev => 
      prev.map(text => 
        text.id === id ? { ...text, ...updates } : text
      )
    );
  }, []);

  const removeText = useCallback((id: string) => {
    setTexts(prev => prev.filter(text => text.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  }, [selectedTextId]);

  const redrawCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background image if exists
    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }
    
    // Draw text elements
    texts.forEach(textElement => {
      ctx.save();
      
      // Set font
      ctx.font = `${textElement.fontSize}px "${textElement.fontFamily}"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw shadow
      if (textElement.shadowColor) {
        ctx.shadowColor = textElement.shadowColor;
        ctx.shadowBlur = textElement.shadowBlur || 0;
        ctx.shadowOffsetX = textElement.shadowOffsetX || 0;
        ctx.shadowOffsetY = textElement.shadowOffsetY || 0;
      }
      
      // Draw stroke
      if (textElement.strokeColor && textElement.strokeWidth) {
        ctx.strokeStyle = textElement.strokeColor;
        ctx.lineWidth = textElement.strokeWidth;
        ctx.strokeText(textElement.text, textElement.x, textElement.y);
      }
      
      // Draw fill
      ctx.fillStyle = textElement.color;
      ctx.fillText(textElement.text, textElement.x, textElement.y);
      
      ctx.restore();
    });
  }, [backgroundImage, texts]);

  const exportCanvas = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    // Create download link
    const link = document.createElement('a');
    link.download = `pixr-thumbnail-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  const applyTemplate = useCallback((template: Template) => {
    // Apply template styles to selected text or add new text
    if (selectedTextId) {
      updateText(selectedTextId, template.textStyle);
    } else {
      addText('SAMPLE TEXT', undefined, undefined);
      // Apply template after text is added (next tick)
      setTimeout(() => {
        const latestTextId = texts[texts.length - 1]?.id;
        if (latestTextId) {
          updateText(latestTextId, template.textStyle);
        }
      }, 0);
    }
  }, [selectedTextId, updateText, addText, texts]);

  return (
    <EditorContext.Provider value={{
      backgroundImage,
      setBackgroundImage,
      aspectRatio,
      setAspectRatio,
      canvasSize,
      texts,
      addText,
      updateText,
      removeText,
      selectedTextId,
      setSelectedTextId,
      redrawCanvas,
      exportCanvas,
      applyTemplate,
    }}>
      {children}
    </EditorContext.Provider>
  );
};