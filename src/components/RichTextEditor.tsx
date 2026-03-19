import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <div className="flex flex-wrap gap-2 p-2 border-b border-slate-200 bg-slate-50">
        <Button type="button" variant="outline" size="sm" onMouseDown={(e) => { e.preventDefault(); exec("bold"); }}>
          Bold
        </Button>
        <Button type="button" variant="outline" size="sm" onMouseDown={(e) => { e.preventDefault(); exec("italic"); }}>
          Italic
        </Button>
        <Button type="button" variant="outline" size="sm" onMouseDown={(e) => { e.preventDefault(); exec("underline"); }}>
          Underline
        </Button>
        <Button type="button" variant="outline" size="sm" onMouseDown={(e) => { e.preventDefault(); exec("insertUnorderedList"); }}>
          Bullet
        </Button>
        <Button type="button" variant="outline" size="sm" onMouseDown={(e) => { e.preventDefault(); exec("insertOrderedList"); }}>
          Numbered
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onMouseDown={(e) => {
            e.preventDefault();
            const url = window.prompt("Enter link URL");
            if (url) exec("createLink", url);
          }}
        >
          Link
        </Button>
        <Button type="button" variant="outline" size="sm" onMouseDown={(e) => { e.preventDefault(); exec("removeFormat"); }}>
          Clear
        </Button>
      </div>
      <div
        ref={editorRef}
        className="min-h-[200px] p-4 text-sm md:text-base text-slate-700 focus:outline-none"
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder ?? "Write blog content..."}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;
