// Painted cloud bands only; the approved scenery and semantic content stay in the DOM.
export type ArchipelagoPose = {
  islandX: number;
  islandY: number;
  islandScale: number;
  foregroundX: number;
  foregroundY: number;
  foregroundScale: number;
};

const vertex = `
attribute vec2 position;
varying vec2 screen;
void main() {
  screen = vec2(position.x * .5 + .5, .5 - position.y * .5);
  gl_Position = vec4(position, 0., 1.);
}`;
const fragment = `
precision mediump float;
varying vec2 screen;
uniform sampler2D painting;
uniform sampler2D silhouettes;
uniform vec2 cover;
uniform vec3 island;
uniform vec3 foreground;
uniform vec2 drift;
uniform float journey;
vec2 source(vec2 point) { return (point - .5) * cover + .5; }
vec3 clouds(vec2 point, float drift) {
  float x = fract(point.x + drift);
  float weight = pow(sin(x * 3.14159265), 2.);
  return mix(texture2D(painting, vec2(fract(x + .5), point.y)).rgb,
             texture2D(painting, vec2(x, point.y)).rgb, weight);
}
void main() {
  vec2 uv = source(screen);
  // Inverse DOM transforms: both silhouettes retain the exact centered-cover crop.
  float rock = texture2D(silhouettes, source((screen - .5 - island.xy) / island.z + .5)).r;
  float nearRock = texture2D(silhouettes, source((screen - .5 - foreground.xy) / foreground.z + .5)).g;
  vec3 farColor = clouds(vec2(uv.x, .66 + (uv.y - .5) * .5), drift.x);
  float farShape = smoothstep(.56, .84, dot(farColor, vec3(.4, .4, .2)));
  float farBand = smoothstep(.48, .64, uv.y) * (1. - smoothstep(.84, 1., uv.y));
  float farAlpha = farShape * farBand * .38 * (1. - rock) * (1. - nearRock);
  vec3 nearColor = clouds(vec2(uv.x, .72 + (uv.y - .6) * .5), drift.y);
  float nearShape = smoothstep(.61, .87, dot(nearColor, vec3(.4, .4, .2)));
  float nearAlpha = nearShape * smoothstep(.68, .94, uv.y) * .16 * (1. - nearRock);
  float clearing = 1. - smoothstep(.6, 1., journey);
  nearAlpha *= clearing;
  farAlpha *= clearing;
  float alpha = nearAlpha + farAlpha * (1. - nearAlpha);
  // Premultiplied output for the transparent browser compositor.
  gl_FragColor = vec4(nearColor * nearAlpha + farColor * farAlpha * (1. - nearAlpha), alpha);
}`;

export class ArchipelagoClouds {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private shaders: WebGLShader[] = [];
  private textures: WebGLTexture[] = [];
  private uniforms: Record<string, WebGLUniformLocation> = {};
  private width = 1;
  private height = 1;
  private aspect: number;

  constructor(
    private canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    paths: { island: string; foreground: string },
  ) {
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) throw new Error('WebGL unavailable');
    this.gl = gl;
    this.aspect = image.naturalWidth / image.naturalHeight;
    try {
      for (const [type, source] of [
        [gl.VERTEX_SHADER, vertex],
        [gl.FRAGMENT_SHADER, fragment],
      ] as const) {
        const shader = gl.createShader(type);
        if (!shader) throw new Error('Shader allocation failed');
        this.shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
          throw new Error('Cloud shader compilation failed');
      }
      this.program = gl.createProgram();
      if (!this.program) throw new Error('Program allocation failed');
      for (const shader of this.shaders) gl.attachShader(this.program, shader);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
        throw new Error('Cloud shader link failed');
      gl.useProgram(this.program);
      this.buffer = gl.createBuffer();
      if (!this.buffer) throw new Error('Buffer allocation failed');
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(this.program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      for (const name of [
        'painting',
        'silhouettes',
        'cover',
        'island',
        'foreground',
        'drift',
        'journey',
      ]) {
        const location = gl.getUniformLocation(this.program, name);
        if (location === null) throw new Error('Cloud uniform unavailable');
        this.uniforms[name] = location;
      }
      const limit = Math.min(2048, gl.getParameter(gl.MAX_TEXTURE_SIZE));
      let painting: HTMLImageElement | HTMLCanvasElement = image;
      if (Math.max(image.naturalWidth, image.naturalHeight) > limit) {
        const scaled = document.createElement('canvas');
        const ratio = limit / Math.max(image.naturalWidth, image.naturalHeight);
        scaled.width = Math.max(1, Math.round(image.naturalWidth * ratio));
        scaled.height = Math.max(1, Math.round(image.naturalHeight * ratio));
        const context = scaled.getContext('2d');
        if (!context) throw new Error('Texture scaling unavailable');
        context.drawImage(image, 0, 0, scaled.width, scaled.height);
        painting = scaled;
      }
      const mask = document.createElement('canvas');
      const ratio = Math.min(
        1,
        1024 / image.naturalWidth,
        limit / image.naturalWidth,
        limit / image.naturalHeight,
      );
      mask.width = Math.max(1, Math.round(image.naturalWidth * ratio));
      mask.height = Math.max(1, Math.round(image.naturalHeight * ratio));
      const context = mask.getContext('2d');
      if (!context) throw new Error('Silhouette rasterization unavailable');
      context.fillStyle = '#000';
      context.fillRect(0, 0, mask.width, mask.height);
      context.scale(mask.width / image.naturalWidth, mask.height / image.naturalHeight);
      context.fillStyle = '#f00';
      context.fill(new Path2D(paths.island));
      context.fillStyle = '#0f0';
      context.fill(new Path2D(paths.foreground));
      // Top-down UVs match SVG/image coordinates; NPOT inputs need no mipmaps.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      for (const [unit, source] of [painting, mask].entries()) {
        const texture = gl.createTexture();
        if (!texture) throw new Error('Texture allocation failed');
        this.textures.push(texture);
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      }
      gl.uniform1i(this.uniforms.painting, 0);
      gl.uniform1i(this.uniforms.silhouettes, 1);
      if (gl.getError() !== gl.NO_ERROR || gl.isContextLost())
        throw new Error('Cloud texture upload failed');
    } catch (error) {
      this.dispose();
      throw error;
    }
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    const narrow = width <= 600;
    const scale = Math.min(
      1,
      (narrow ? 960 : 1440) / Math.max(width, height),
      Math.sqrt((narrow ? 400_000 : 900_000) / (width * height)),
    );
    this.canvas.width = Math.max(1, Math.floor(width * scale));
    this.canvas.height = Math.max(1, Math.floor(height * scale));
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(progress: number, pose: ArchipelagoPose) {
    const gl = this.gl;
    const imageWidth = Math.max(this.width, this.height * this.aspect);
    const imageHeight = imageWidth / this.aspect;
    gl.uniform2f(this.uniforms.cover, this.width / imageWidth, this.height / imageHeight);
    gl.uniform3f(
      this.uniforms.island,
      pose.islandX / this.width,
      pose.islandY / this.height,
      pose.islandScale,
    );
    gl.uniform3f(
      this.uniforms.foreground,
      pose.foregroundX / this.width,
      pose.foregroundY / this.height,
      pose.foregroundScale,
    );
    // Scroll distance, not elapsed time: atmosphere freezes and reverses with the scene.
    gl.uniform2f(this.uniforms.drift, progress * 0.252, -progress * 0.432);
    gl.uniform1f(this.uniforms.journey, progress);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  dispose() {
    const gl = this.gl;
    // A current program otherwise defers deletion until it is unbound.
    gl.useProgram(null);
    for (const texture of this.textures) gl.deleteTexture(texture);
    for (const shader of this.shaders) gl.deleteShader(shader);
    gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
    this.textures = [];
    this.shaders = [];
    this.buffer = this.program = null;
  }
}
