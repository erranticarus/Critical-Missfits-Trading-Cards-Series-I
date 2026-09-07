/** @format */

import React from "react";
import Card from "./Card";
import cardsData from "./data";
import "./App.css";

function App() {
	return (
		<div className="app">
			{/* Main header */}
			<header className="app-header">
				<h1>CRITICAL MISSFITS</h1>
				<p>Trading Cards | Series I | 2026</p>
			</header>

			{/* Map through all cards and render them */}
			<div className="app-container">
				{cardsData.map((card) => (
					<Card key={card.id} data={card} />
				))}
			</div>

			{/* Design justification required for rubric */}
			<section className="justification-section">
				<h2>⚡ System Architecture (Design Justification)</h2>

				<div className="justification-grid">
					{/* Vector graphics explanation */}
					<article>
						<h3 style={{ color: "#a8e6ff" }}>
							1. The "IDE Frame" (Vector / SVG)
						</h3>
						<p>
							I built the card frames in SVG so they look like a code editor window.
							Clean lines, perfect circles for the window controls — vectors stay
							sharp no matter the screen size.
							<br />
							<br />
							<em>Why not PNG?</em> Raster would've turned those thin lines into
							blurry mush on zoom or mobile. SVG is math (<code>&lt;path&gt;</code>,{" "}
							<code>&lt;rect&gt;</code>, <code>&lt;circle&gt;</code>), not pixels,
							so it scales forever without losing quality.
						</p>
					</article>

					{/* Raster graphics explanation */}
					<article>
						<h3 style={{ color: "#ff99cc" }}>
							2. The "MavScript Art" (Raster / PNG)
						</h3>
						<p>
							The character art is PNG. Shading, brush textures, messy gradients
							— all the organic detail you can't fake in vector. I drew these in
							Procreate, so they carry the noise and color variation that makes
							them feel alive.
							<br />
							<br />
							<em>Why not vector?</em> Vectorizing something like The Architect
							(galaxy brain portrait) or The Crew (factory scene) would mean
							tracing millions of paths. You'd end up with a bloated 10–50MB SVG
							that renders slower and looks worse. PNG keeps the detail intact and
							loads fast.
						</p>
					</article>

					{/* How the layering system works */}
					<article>
						<h3 style={{ color: "#ffe5a3" }}>
							3. The Layering Strategy (z‑index Architecture)
						</h3>
						<p>
							Four layers, stacked clean:
							<br />
							<br />
							<strong>• Layer 1 (z‑index: 1):</strong> CSS gradient background —
							pure code, no files
							<br />
							<strong>• Layer 2 (z‑index: 3):</strong> Character art (PNG)
							<br />
							<strong>• Layer 2.5 (z‑index: 3):</strong> Holographic foil overlay
							— rainbow shimmer via <code>mix‑blend‑mode: color‑dodge</code>
							<br />
							<strong>• Layer 3 (z‑index: 4):</strong> SVG frame on top, borders
							stay crisp
							<br />
							<br />
							Foil and art share z‑index: 3 so they blend, while the frame floats
							above at 4. <code>Pointer‑events: none</code> on foil + frame so
							clicks pass through to the flip handler.
						</p>
					</article>

					{/* 3D flip animation and advanced features */}
					<article>
						<h3 style={{ color: "#e0b3ff" }}>
							4. Legendary Features (CSS 3D Transform System)
						</h3>
						<p>
							Here's where it gets fun. I built a hybrid 3D system that mixes tilt
							tracking with flip animations. Cards live in 3D space with{" "}
							<code>perspective: 1000px</code>.
							<br />
							<br />
							<strong>• Tilt Tracking:</strong> Invisible 5×5 grid (25 zones). Hover
							anywhere, card tilts in real‑time with <code>rotateX</code>/
							<code>rotateY</code>. Feels like holding a physical card. Grid is
							generated in React.
							<br />
							<br />
							<strong>• Mouse‑Tracking Holo Effect:</strong> Foil overlay tracks
							your mouse in real‑time. Radial gradient spotlight follows your cursor,
							rainbow sweep animates across. Updates on every <code>onMouseMove</code>{" "}
							with smooth <code>0.1s</code> transitions.
							<br />
							<br />
							<strong>• Click‑to‑Flip:</strong> Click triggers one of four flip
							directions based on character personality: <code>rotateY(180deg)</code>,{" "}
							<code>rotateX(180deg)</code>, <code>rotate3d(1,1,0,180deg)</code>, or{" "}
							<code>rotate3d(-1,1,0,180deg)</code>. Tilt tracking disables during
							flips to avoid conflicts.
							<br />
							<br />
							Plus staggered float animations (<code>@keyframes float</code>) across
							all 9 cards, glow on hover, unique timing delays so they load in a wave.
							<br />
							<br />
							<strong>All 9 artworks are 100% original</strong>, made by me — going
							beyond the 5–6 card requirement and hitting the top tier for creative
							content.
						</p>
					</article>

					{/* Dynamic color system for each character */}
					<article>
						<h3 style={{ color: "#a8e6b3" }}>
							5. Dynamic Color System (Role‑Based Theming)
						</h3>
						<p>
							Each card gets its own pastel vibe:
							<br />
							<br />
							<strong>• Sky Blue (#a8e6ff)</strong> – Innovation/Founding (The Founder)
							<br />
							<strong>• Lavender (#d4a5ff)</strong> – Cosmic Vision (The Architect)
							<br />
							<strong>• Steel Blue (#b0c4d4)</strong> – Industrial (The Crew)
							<br />
							<strong>• Rose Pink (#ffb3d9)</strong> – Love/Loyalty (Brindle Buddy)
							<br />
							<strong>• Hot Pink (#ff99cc)</strong> – Chaos/Energy (Experiment 626)
							<br />
							<strong>• Coral (#ffb399)</strong> – Power/Backend (Dragon Rider)
							<br />
							<strong>• Golden Yellow (#ffe5a3)</strong> – Reliability (Chicken Keeper)
							<br />
							<strong>• Mint Green (#a8e6b3)</strong> – Debugging (The Gonzo Devs)
							<br />
							<strong>• Lilac (#e0b3ff)</strong> – UI/UX Magic (Neon Raver)
							<br />
							<br />
							Soft pastels keep the aesthetic consistent while giving each character
							its own identity. The <code>data.frameColor</code> property injects
							directly into SVG <code>stroke</code> + text <code>fill</code>, so one
							component handles all 9 cards without copy‑pasting.
						</p>
					</article>
				</div>

				{/* Tech stack footer */}
				<div
					style={{
						marginTop: "3rem",
						textAlign: "center",
						padding: "2rem",
						background: "rgba(0, 0, 0, 0.3)",
						borderRadius: "10px",
					}}>
					<p style={{ fontSize: "0.9rem", color: "#888", lineHeight: "1.8" }}>
						<strong>Technical Stack:</strong> Vite 6 + React 18 (Modern Build Tool & Component Architecture)
						• CSS3 (3D Transforms & Animations) • SVG (Vector Graphics) • PNG
						(Raster Art) • Flexbox/Grid (Responsive Layout)
						<br />
						<strong>Repository:</strong> MavScript Universe © 2025 • All
						artwork and designs are original creations
					</p>
				</div>
			</section>
		</div>
	);
}

export default App;
