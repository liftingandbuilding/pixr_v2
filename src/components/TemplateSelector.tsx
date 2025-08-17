import { useEditor, type Template } from "@/contexts/EditorContext";

const TEMPLATES: Template[] = [
  {
    id: 'mrbeast',
    name: 'MrBeast',
    textStyle: {
      fontSize: 120,
      color: '#FFFF00',
      strokeColor: '#FF0000',
      strokeWidth: 8,
      shadowColor: '#000000',
      shadowBlur: 10,
      shadowOffsetX: 4,
      shadowOffsetY: 4,
      fontFamily: 'Press Start 2P',
    }
  },
  {
    id: 'girlboss',
    name: 'Girlboss',
    textStyle: {
      fontSize: 90,
      color: '#FF9DE0',
      strokeColor: '#FFFFFF',
      strokeWidth: 6,
      shadowColor: '#000000',
      shadowBlur: 8,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      fontFamily: 'Press Start 2P',
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    textStyle: {
      fontSize: 80,
      color: '#000000',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
      shadowColor: 'transparent',
      shadowBlur: 0,
      fontFamily: 'Press Start 2P',
    }
  },
  {
    id: 'neon',
    name: 'Retro Neon',
    textStyle: {
      fontSize: 100,
      color: '#A3FF00',
      strokeColor: '#FF00FF',
      strokeWidth: 6,
      shadowColor: '#A3FF00',
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      fontFamily: 'Press Start 2P',
    }
  },
  {
    id: 'classic',
    name: 'Classic',
    textStyle: {
      fontSize: 85,
      color: '#F5F5F5',
      strokeColor: '#000000',
      strokeWidth: 5,
      shadowColor: '#000000',
      shadowBlur: 6,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      fontFamily: 'Press Start 2P',
    }
  },
  {
    id: 'bold',
    name: 'Bold Pop',
    textStyle: {
      fontSize: 110,
      color: '#FF0000',
      strokeColor: '#FFFF00',
      strokeWidth: 8,
      shadowColor: '#000000',
      shadowBlur: 12,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      fontFamily: 'Press Start 2P',
    }
  }
];

export const TemplateSelector = () => {
  const { applyTemplate } = useEditor();

  return (
    <div>
      <h3 className="text-sm mb-4 text-pixel-lime font-pixel">TEMPLATES</h3>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => applyTemplate(template)}
            className="btn-pixel text-center p-4 hover:bg-pixel-pink hover:text-pixel-black transition-colors"
          >
            <div className="text-xs font-pixel mb-1">{template.name.toUpperCase()}</div>
            <div 
              className="text-[10px] px-2 py-1 border border-foreground"
              style={{ 
                color: template.textStyle.color,
                backgroundColor: template.textStyle.strokeColor ? `${template.textStyle.strokeColor}20` : 'transparent'
              }}
            >
              SAMPLE
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 border border-foreground bg-muted/20">
        <p className="text-[10px] text-muted-foreground">
          Select text layer first, then click template to apply style
        </p>
      </div>
    </div>
  );
};