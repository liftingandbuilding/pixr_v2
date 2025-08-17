import { useState } from "react";
import { Plus, Trash2, Type } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";

export const TextControls = () => {
  const { 
    texts, 
    addText, 
    updateText, 
    removeText, 
    selectedTextId, 
    setSelectedTextId 
  } = useEditor();
  
  const [newTextValue, setNewTextValue] = useState("");
  
  const selectedText = texts.find(t => t.id === selectedTextId);

  const handleAddText = () => {
    if (newTextValue.trim()) {
      addText(newTextValue.trim());
      setNewTextValue("");
    }
  };

  const colors = [
    { name: 'Lime', value: '#A3FF00' },
    { name: 'Pink', value: '#FF9DE0' },
    { name: 'White', value: '#F5F5F5' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#00FFFF' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm mb-2 text-pixel-lime font-pixel">ADD TEXT</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTextValue}
            onChange={(e) => setNewTextValue(e.target.value)}
            placeholder="Enter text..."
            className="input-pixel flex-1 text-xs"
            onKeyDown={(e) => e.key === 'Enter' && handleAddText()}
          />
          <button
            onClick={handleAddText}
            className="btn-pixel px-3"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {texts.length > 0 && (
        <div>
          <h3 className="text-sm mb-2 text-pixel-lime font-pixel">TEXT LAYERS</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {texts.map((text) => (
              <div 
                key={text.id}
                className={`flex items-center gap-2 p-2 border border-foreground cursor-pointer hover:bg-muted ${
                  selectedTextId === text.id ? 'bg-pixel-lime text-pixel-black' : ''
                }`}
                onClick={() => setSelectedTextId(text.id)}
              >
                <Type className="w-3 h-3" />
                <span className="text-xs flex-1 truncate font-pixel">
                  {text.text}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeText(text.id);
                  }}
                  className="opacity-50 hover:opacity-100"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedText && (
        <div className="border-t border-foreground pt-4">
          <h3 className="text-sm mb-3 text-pixel-pink font-pixel">STYLE</h3>
          
          {/* Font Size */}
          <div className="mb-3">
            <label className="block text-xs mb-1 font-pixel">SIZE</label>
            <input
              type="range"
              min="24"
              max="200"
              value={selectedText.fontSize}
              onChange={(e) => updateText(selectedText.id, { fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-xs text-center mt-1">{selectedText.fontSize}px</div>
          </div>

          {/* Text Color */}
          <div className="mb-3">
            <label className="block text-xs mb-2 font-pixel">COLOR</label>
            <div className="grid grid-cols-3 gap-1">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => updateText(selectedText.id, { color: color.value })}
                  className={`w-full h-8 border-2 border-foreground ${
                    selectedText.color === color.value ? 'ring-2 ring-pixel-lime' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Stroke Width */}
          <div className="mb-3">
            <label className="block text-xs mb-1 font-pixel">OUTLINE</label>
            <input
              type="range"
              min="0"
              max="20"
              value={selectedText.strokeWidth || 0}
              onChange={(e) => updateText(selectedText.id, { strokeWidth: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-xs text-center mt-1">{selectedText.strokeWidth || 0}px</div>
          </div>

          {/* Shadow */}
          <div>
            <label className="block text-xs mb-1 font-pixel">SHADOW</label>
            <input
              type="range"
              min="0"
              max="20"
              value={selectedText.shadowBlur || 0}
              onChange={(e) => updateText(selectedText.id, { shadowBlur: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-xs text-center mt-1">{selectedText.shadowBlur || 0}px</div>
          </div>
        </div>
      )}
    </div>
  );
};