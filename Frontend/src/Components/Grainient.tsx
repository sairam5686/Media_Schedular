import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./Grainient.css";

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

#define S(a, b, t) smoothstep(a, b, t)

mat2 Rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
  return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = dot(-1.0 + 2.0 * hash(i), f);
  float b = dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return 0.5 + 0.5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;
  vec2 tuv = uv - 0.5;
  float degree = noise(vec2(iTime * 0.025, tuv.x * tuv.y) * 2.0);
  tuv.y /= ratio;
  tuv *= Rot(radians((degree - 0.5) * 500.0 + 180.0));
  tuv.y *= ratio;
  tuv.x += sin(tuv.y * 5.0 + iTime * 0.5) / 50.0;
  tuv.y += sin(tuv.x * 7.5 + iTime * 0.5) / 25.0;

  float blendX = tuv.x;
  float edge0 = -0.35;
  float edge1 = 0.25;
  vec3 layer1 = mix(uColor3, uColor2, S(edge0, edge1, blendX));
  vec3 layer2 = mix(uColor2, uColor1, S(edge0, edge1, blendX));
  vec3 color = mix(layer1, layer2, S(0.45, -0.35, tuv.y));

  vec2 grainUv = uv * 2.0;
  float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.1;
  color = (color - 0.5) * 1.5 + 0.5;
  color = clamp(color, 0.0, 1.0);

  float energy = max(max(color.r, color.g), color.b);
  vec3 hue = color / max(energy, 0.001);
  float chroma = length(color - vec3(dot(color, vec3(0.333333))));
  float coverage = clamp(0.12 + chroma * 1.15 + energy * 0.18, 0.0, 0.88);
  color = mix(vec3(1.0), clamp(hue * 0.58 + color * 0.18, 0.0, 1.0), coverage);

  fragColor = vec4(color, 1.0);
}`;

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return new Float32Array([1, 1, 1]);
  return new Float32Array([
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ]);
}

const Grainient = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const { gl } = renderer;
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uColor1: { value: hexToRgb("#d1fae5") },
        uColor2: { value: hexToRgb("#a3e635") },
        uColor3: { value: hexToRgb("#0f766e") },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const canvas = gl.canvas;
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)));
      const resolution = program.uniforms.iResolution.value as Float32Array;
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
      program.uniforms.iTime.value = (time - startTime) * 0.001;
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
      container.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} className="grainient-container" />;
};

export default Grainient;
