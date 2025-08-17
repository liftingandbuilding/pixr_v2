import { useEditor, type AspectRatio } from "@/contexts/EditorContext";

export const AspectRatioSelector = () => {
  const { aspectRatio, setAspectRatio } = useEditor();

  const ratios: { value: AspectRatio; label: string; desc: string }[] = [
    { value: '16:9', label: '16:9', desc: 'YouTube' },
    { value: '9:16', label: '9:16', desc: 'TikTok/Stories' },
    { value: '1:1', label: '1:1', desc: 'Instagram' },
  ];

  return (
    <div className="flex gap-1">
      {ratios.map((ratio) => (
        <button
          key={ratio.value}
          onClick={() => setAspectRatio(ratio.value)}
          className={`btn-pixel text-xs px-3 py-2 ${
            aspectRatio === ratio.value 
              ? 'bg-pixel-lime text-pixel-black' 
              : ''
          }`}
        >
          <div className="font-pixel text-xs">{ratio.label}</div>
          <div className="text-[8px] opacity-60">{ratio.desc}</div>
        </button>
      ))}
    </div>
  );
};