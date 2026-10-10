import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

function hexToRgb(hex: string): Float32Array {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex);
  if (!result) return new Float32Array([1, 1, 1]);
  return new Float32Array([
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ]);
}

export interface ShaderCanvasProps {
  fragmentShader: string;
  uniforms?: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShader = `#version 300 es
in vec2 position;
out vec2 v_uv;

void main() {
  v_uv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

export function ShaderCanvas({
  fragmentShader,
  uniforms = {},
  className = "",
  style,
}: ShaderCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<Program | null>(null);

  // Update uniforms dynamically when props change
  useEffect(() => {
    if (!programRef.current) return;
    const prog = programRef.current;
    Object.entries(uniforms).forEach(([key, val]) => {
      const uKey = key.startsWith("u_") ? key : `u_${key}`;
      if (prog.uniforms[uKey]) {
        if (typeof val === "string" && val.startsWith("#")) {
          prog.uniforms[uKey].value = hexToRgb(val);
        } else if (typeof val === "number") {
          prog.uniforms[uKey].value = val;
        } else {
          prog.uniforms[uKey].value = val;
        }
      }
    });
  }, [uniforms]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
      return;
    }

    const { gl } = renderer;
    const geometry = new Triangle(gl);

    // Build uniform declarations and initial values
    const oglUniforms: Record<string, { value: any }> = {
      u_resolution: { value: new Float32Array([1, 1]) },
      u_time: { value: 0 },
    };

    let uniformDeclarations = `
uniform vec2 u_resolution;
uniform float u_time;
`;

    Object.entries(uniforms).forEach(([key, val]) => {
      const uKey = key.startsWith("u_") ? key : `u_${key}`;
      if (typeof val === "string" && val.startsWith("#")) {
        oglUniforms[uKey] = { value: hexToRgb(val) };
        uniformDeclarations += `uniform vec3 ${uKey};\n`;
      } else if (typeof val === "number") {
        oglUniforms[uKey] = { value: val };
        uniformDeclarations += `uniform float ${uKey};\n`;
      } else if (Array.isArray(val) || val instanceof Float32Array) {
        oglUniforms[uKey] = { value: val };
        uniformDeclarations += `uniform vec2 ${uKey};\n`;
      }
    });

    const fullFragment = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

${uniformDeclarations}

${fragmentShader}
`;

    let program: Program;
    try {
      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fullFragment,
        uniforms: oglUniforms,
      });
    } catch (e) {
      console.error("Shader compilation error:", e);
      return;
    }

    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const resize = () => {
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)));
      const resolution = program.uniforms.u_resolution.value as Float32Array;
      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frame = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const startTime = performance.now();

    const renderFrame = (time: number) => {
      program.uniforms.u_time.value = (time - startTime) * 0.001;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(renderFrame);
    };

    const start = () => {
      if (isVisible && isPageVisible && frame === 0) {
        frame = requestAnimationFrame(renderFrame);
      }
    };

    const stop = () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      geometry.remove();
      program.remove();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
      programRef.current = null;
    };
  }, [fragmentShader]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={style}
    />
  );
}
