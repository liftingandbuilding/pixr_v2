import { useState } from "react";
import { Type, Palette, Layers, Sparkles } from "lucide-react";
import { TextControls } from "@/components/TextControls";
import { TemplateSelector } from "@/components/TemplateSelector";

type PanelTab = 'text' | 'templates' | 'layers' | 'effects';

export const RightPanel = () => {
  const [activeTab, setActiveTab] = useState<PanelTab>('text');

  const tabs = [
    { id: 'text' as const, icon: Type, label: 'TEXT' },
    { id: 'templates' as const, icon: Sparkles, label: 'TEMPLATES' },
    { id: 'layers' as const, icon: Layers, label: 'LAYERS' },
    { id: 'effects' as const, icon: Palette, label: 'EFFECTS' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return <TextControls />;
      case 'templates':
        return <TemplateSelector />;
      case 'layers':
        return (
          <div className="text-center py-8">
            <p className="text-xs opacity-60">Coming Soon...</p>
          </div>
        );
      case 'effects':
        return (
          <div className="text-center py-8">
            <p className="text-xs opacity-60">Coming Soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-2 border-foreground bg-background mb-4">
        <div className="grid grid-cols-2 gap-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 border-r border-b border-foreground last:border-r-0 transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-pixel-lime text-pixel-black' 
                    : 'hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <div className="text-xs font-pixel">{tab.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 panel-retro overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};