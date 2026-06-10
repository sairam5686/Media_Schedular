import React, { useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Paperclip,
  Code2,
  Rocket,
  Layers,
  Palette,
  Monitor,
  FileUp,
  ImageIcon,
  CircleUserRound,
} from "lucide-react";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = `${minHeight}px`;

    const height = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight || Infinity
    );

    textarea.style.height = `${height}px`;
  }, [minHeight, maxHeight]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  return {
    textareaRef,
    adjustHeight,
  };
}



const RuixenMoonChat = () => {
  const [message, setMessage] = useState("");

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 180,
  });
return (
  <div className="min-h-screen w-full relative bg-white overflow-hidden">
    {/* Soft Yellow Glow Background */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, #FFF991 0%, transparent 70%)
        `,
        opacity: 0.6,
        mixBlendMode: "multiply",
      }}
    />

    {/* Main Content */}
    <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-bold text-slate-900">
            Ruixen AI
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            Create content, generate captions, schedule posts,
            and manage your social media workflow with AI.
          </p>
        </div>

        {/* Chat Input */}
        <div className="w-full max-w-4xl mt-10">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <Textarea
              ref={textareaRef}
              value={message}
              placeholder="Ask Ruixen AI anything..."
              onChange={(e) => {
                setMessage(e.target.value);
                adjustHeight();
              }}
              className="
                border-none
                resize-none
                bg-transparent
                focus-visible:ring-0
                focus-visible:ring-offset-0
                text-slate-800
                placeholder:text-slate-400
                px-5
                py-4
              "
              style={{
                overflow: "hidden",
              }}
            />

            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:bg-slate-100"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                className="rounded-full bg-slate-900 hover:bg-slate-800"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default RuixenMoonChat;