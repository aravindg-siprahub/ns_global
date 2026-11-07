/**
 * GLSL for the hero particle flower. All shape + motion lives here so the
 * CPU only uploads a handful of uniforms per frame (one draw call).
 */

// 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT)
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uIntro;
uniform float uPixelRatio;
uniform float uSize;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uUnfold;
uniform float uOpacity;
uniform vec3 uDot;
uniform vec3 uTint;

attribute vec2 aUV;      // x: along ribbon 0..1, y: across ribbon -1..1
attribute vec2 aPetal;   // x: petal angle, y: phase offset
attribute vec3 aScatter; // intro start position
attribute vec3 aExtra;   // x: seed, y: thickness offset, z: sparkle flag

varying vec3 vColor;
varying float vAlpha;

${SIMPLEX}

vec3 rotZ(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x-s*p.y, s*p.x+c*p.y, p.z); }
vec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }

void main(){
  float u = aUV.x;
  float v = aUV.y;
  float phase = aPetal.y;
  float breath = sin(uTime * 0.18 + phase);           // slow open / close per petal

  // Petal spine: radiates from the centre, bends in an S, lifts toward the viewer
  float r = u * 2.8;
  vec3 spine = vec3(r, sin(u * 3.14159) * 0.6 + sin(u * 6.28318) * 0.16, sin(u * 2.8) * 0.55);

  // Width: thin at the root, fanning out like a petal near the tip
  float w = 0.08 + 1.1 * pow(max(sin(u * 3.14159 * 0.88), 0.0), 0.85);

  // ~1.5 turns of twist, gently unfolding
  float twist = u * 9.42478 + uUnfold * breath * 0.35 + phase * 0.2;
  vec3 pos = spine + vec3(0.0, cos(twist), sin(twist)) * v * w;
  // volumetric fuzz: push each dot off the surface so edges are soft, not printed
  pos += vec3(0.0, -sin(twist), cos(twist)) * aExtra.y * (0.05 + w * 0.06);
  pos += vec3(sin(aExtra.x * 91.0), cos(aExtra.x * 57.0), sin(aExtra.x * 33.0)) * 0.025;
  pos.z += breath * 0.12 * u * u;

  // Arrange petals around the shared centre
  pos = rotX(pos, (phase - 1.5) * 0.35);
  pos = rotZ(pos, aPetal.x + breath * 0.04);

  // Silk-underwater drift
  vec3 np = pos * uNoiseFreq + vec3(0.0, 0.0, uTime * 0.06);
  pos += vec3(snoise(np), snoise(np + 17.3), snoise(np + 41.7)) * uNoiseAmp;

  // Intro: scattered -> shape (easeOutExpo)
  float t = clamp(uIntro, 0.0, 1.0);
  float e = t >= 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * t);
  pos = mix(aScatter, pos, e);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float depth = -mv.z;
  float nearness = smoothstep(9.0, 4.5, depth);       // 1 = close to camera
  float sparkle = aExtra.z;
  gl_PointSize = clamp(uSize * (0.5 + nearness * 0.9) * (6.5 / depth) * (1.0 + sparkle * 0.7), 0.9, 2.6) * uPixelRatio;

  float edge = smoothstep(0.55, 1.0, abs(v));
  float tint = clamp(edge * 0.35 + (1.0 - nearness) * 0.25, 0.0, 1.0);
  vColor = mix(uDot, uTint, tint);
  float twinkle = 0.65 + 0.35 * sin(uTime * (0.8 + aExtra.x * 2.2) + aExtra.x * 40.0);
  vAlpha = (0.14 + nearness * 0.5) * (0.75 + 0.25 * (1.0 - u)) * twinkle * (1.0 + sparkle * 1.6) * uOpacity;
}
`;

export const particleFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.12, d) * vAlpha;
  gl_FragColor = vec4(vColor, a);
}
`;
