---
title: HTML 标签手册：Canvas 绘图与音视频补充属性
date: 2026/05/19
desc: 系统整理 canvas 的基本使用方式，以及 audio、video、track、source 的补充属性与常见场景，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#Canvas']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 14：补充 Canvas 和音视频细项，方便处理绘图、媒体控制和字幕轨道时快速查阅。</small>

# 一、`canvas`

- 作用：位图绘图区域。
- 常用属性：
- `width`
- `height`

```html
<canvas id="chart" width="300" height="150"></canvas>
```

最小绘图示例：

```ts
/**
 * 在 canvas 上绘制矩形。
 */
function drawRect() {
  const canvas = document.getElementById('chart') as HTMLCanvasElement | null
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = '#2563eb'
  ctx.fillRect(20, 20, 120, 60)
}
```

- 原理总结：Canvas 是像素画布，适合频繁重绘图形。
- 注意点：Canvas 内容不能像普通 DOM 那样直接用 CSS 细粒度控制每个形状。

# 二、Canvas 常见上下文方法

高频 API：

- `fillRect()`
- `strokeRect()`
- `clearRect()`
- `beginPath()`
- `moveTo()`
- `lineTo()`
- `arc()`
- `fill()`
- `stroke()`
- `drawImage()`

# 三、`audio` 补充属性

| 属性 | 作用 |
| --- | --- |
| `controls` | 显示控制栏 |
| `autoplay` | 自动播放 |
| `muted` | 静音 |
| `loop` | 循环 |
| `preload` | 预加载策略 |

```html
<audio controls preload="metadata" muted src="/audio/demo.mp3"></audio>
```

# 四、`video` 补充属性

| 属性 | 作用 |
| --- | --- |
| `controls` | 显示控制栏 |
| `autoplay` | 自动播放 |
| `muted` | 静音 |
| `loop` | 循环 |
| `poster` | 封面图 |
| `preload` | 预加载策略 |
| `playsinline` | 移动端内联播放 |

```html
<video controls preload="metadata" poster="/poster.webp" playsinline>
  <source src="/video/demo.mp4" type="video/mp4" />
</video>
```

# 五、`source`

- 作用：为 `audio` / `video` / `picture` 提供候选资源。

```html
<video controls>
  <source src="/video/demo.webm" type="video/webm" />
  <source src="/video/demo.mp4" type="video/mp4" />
</video>
```

- 注意点：浏览器会按支持情况选择可用资源。

# 六、`track`

- 作用：字幕、说明、章节轨道。
- 常用属性：
- `kind`
- `src`
- `srclang`
- `label`
- `default`

```html
<track kind="subtitles" src="/subtitles.vtt" srclang="zh" label="中文" default />
```

常见 `kind`：

- `subtitles`
- `captions`
- `descriptions`
- `chapters`
- `metadata`

# 七、媒体实践建议

- 视频优先配 `poster`
- 有课程或讲话内容时优先配 `track`
- 非首屏音视频资源优先 `preload="metadata"`
- 多格式资源可用多个 `source` 做兼容
