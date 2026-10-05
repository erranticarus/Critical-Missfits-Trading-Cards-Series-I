/** @format */

import { useState, useEffect, useRef } from "react";
import "./Card.css";

const assetUrl = (path) =>
  path.startsWith("./")
    ? `${import.meta.env.BASE_URL}${path.slice(2)}`
    : path;

const Card = ({ data }) => {
	const isPatron = data.section === 4;
	const isHorizontal = data.id === 58;

	const floatDelay = -((data.id * 1.17) % 3);

	const [isFlipped, setIsFlipped] = useState(false);

	const [isZoomed, setIsZoomed] = useState(false);
	const [isZoomExpanded, setIsZoomExpanded] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [zoomTilt, setZoomTilt] = useState({ x: 0, y: 0 });

	const [zoomRect, setZoomRect] = useState(null);

	const videoRef = useRef(null);
	const lastPointerType = useRef(null);

	/* ==================== FLIP ==================== */

	const handleClick = () => {
		setIsFlipped((current) => !current);
	};

	/* ==================== TILT ==================== */

	const calculateTilt = (e, setTiltState) => {
		const rect = e.currentTarget.getBoundingClientRect();

		const xPercent = Math.max(
	0,
	Math.min(
		1,
		(e.clientX - rect.left) / rect.width
	)
);

const yPercent = Math.max(
	0,
	Math.min(
		1,
		(e.clientY - rect.top) / rect.height
	)
);

		const maxTilt = 20;

		const rotateY =
			(xPercent - 0.5) * maxTilt * 2;

		const rotateX =
			(0.5 - yPercent) * maxTilt * 2;

		setTiltState({
			x: rotateX,
			y: rotateY,
		});
	};

const handlePointerMove = (e) => {
	calculateTilt(e, setTilt);
};

const handleZoomPointerMove = (e) => {
	calculateTilt(e, setZoomTilt);
};

const handleMouseLeave = () => {
	setTilt({ x: 0, y: 0 });
};

const handleMouseEnter = () => {
  if (videoRef.current && data.video) {
    videoRef.current.play();
  }
};

const handleVideoMouseLeave = () => {
  if (videoRef.current && data.video) {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }
};

	const handleZoomMouseLeave = () => {
		setZoomTilt({ x: 0, y: 0 });
	};

	/* ==================== OPEN ZOOM ==================== */

	const handleDoubleClick = (e) => {
	e.stopPropagation();

	if (
		lastPointerType.current === "touch" ||
		lastPointerType.current === "pen"
	) {
		return;
	}

	if (isZoomed || isClosing) return;

		const rect = e.currentTarget.getBoundingClientRect();

const maxWidth = isHorizontal
    ? Math.min(
          window.innerWidth * 0.9,
          1500,
          (window.innerHeight * 0.9 * 8) / 5
      )
    : Math.min(
          window.innerWidth * 0.9,
          1500,
          (window.innerHeight * 0.9 * 5) / 7
      );

const maxHeight = isHorizontal
    ? maxWidth * (5 / 8)
    : maxWidth * (7 / 5);


		const targetLeft =
			(window.innerWidth - maxWidth) / 2;

		const targetTop =
			(window.innerHeight - maxHeight) / 2;

		setZoomRect({
			startLeft: rect.left,
			startTop: rect.top,
			startWidth: rect.width,
			startHeight: rect.height,

			targetLeft,
			targetTop,
			targetWidth: maxWidth,
			targetHeight: maxHeight,
		});

		setIsZoomed(true);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setIsZoomExpanded(true);
			});
		});
	};

	/* ==================== CLOSE ZOOM ==================== */

	const handleCloseZoom = () => {
		if (!isZoomed || isClosing) return;

		setIsClosing(true);
		setIsZoomExpanded(false);
	};

	/* ==================== ZOOM TRANSITION END ==================== */

	const handleZoomTransitionEnd = (e) => {
		if (
			isClosing &&
			e.propertyName === "width"
		) {
			setIsClosing(false);
			setIsZoomed(false);
			setZoomRect(null);

			setZoomTilt({
				x: 0,
				y: 0,
			});
		}
	};

	/* ==================== ESCAPE ==================== */

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			handleCloseZoom();
		}
	};

	useEffect(() => {
		if (!isZoomed) return;

		document.addEventListener(
			"keydown",
			handleKeyDown
		);

		return () => {
			document.removeEventListener(
				"keydown",
				handleKeyDown
			);
		};
	}, [isZoomed, isClosing]);

	/* ==================== CARD VISUAL ==================== */

	const renderCard = (currentTilt) => {
    const prismAngle =
      Math.atan2(
        currentTilt.x,
        currentTilt.y
      ) * (180 / Math.PI);

		return (
			<div
				className="card-tilt"
				style={{
					transform:
						`rotateX(${currentTilt.x}deg) ` +
						`rotateY(${currentTilt.y}deg)`,
				}}
			>
				<div
				className={`card-inner ${
    isFlipped ? "flipped" : ""
} ${isPatron ? "patron-card" : ""} ${
    isHorizontal ? "horizontal-card" : ""
}`}
				>

					{/* ==================== FRONT ==================== */}

					<div className="card-front">

						<img
  src={assetUrl(data.front)}
  className="card-image card-base"
  alt={`${data.name} front`}
  style={
    isPatron
      ? {
transform:
  `translate3d(` +
  `${-currentTilt.y * 0.9}px, ` +
  `${currentTilt.x * 0.9}px, ` +
  `0px) ` +
  `scale(${window.innerWidth <= 480 ? 1.18 : 1.11})`,
        }
      : undefined
  }
/>

  {data.video && (
    <video
  	ref={videoRef}
      src={assetUrl(data.video)}
      className="card-image card-base card-video"
      muted
      loop
      playsInline
      preload="auto"
      style={
        isPatron
          ? {
              transform:
                `translate3d(` +
                `${-currentTilt.y * 0.9}px, ` +
                `${currentTilt.x * 0.9}px, ` +
                `0px) ` +
                `scale(1.11)`,
            }
          : undefined
      }
    />
  )}

{/* Patron depth plane */}
{isPatron && (
  <div
    className="patron-depth-plane"
    style={{
      transform:
        `translate3d(` +
        `${-currentTilt.y * 0.15}px, ` +
        `${currentTilt.x * 0.15}px, ` +
        `-6px)`,
    }}
  />
)}


						{/* Front border + Patron foil */}

{isPatron ? (
	<div
		className="patron-name-layer"
		style={{
			transform:
				`translate3d(` +
				`${currentTilt.y * 0.1}px, ` +
				`${-currentTilt.x * 0.1}px, ` +
				`20px)`,
		}}
	>
		<img
			src={assetUrl(data.border)}
			className="card-image card-border"
			alt=""
			aria-hidden="true"
		/>

		<div
			className="foil-overlay"
			style={{
				"--border-mask": `url(${assetUrl(data.border)})`,
				"--foil-x": `${currentTilt.y * 3}%`,
				"--foil-y": `${-currentTilt.x * 3}%`,
				"--foil-angle": `${45 + currentTilt.y * 2}deg`,
			}}
		/>
	</div>
) : (
	<>
		<img
			src={assetUrl(data.border)}
			className="card-image card-border"
			alt=""
			aria-hidden="true"
		/>

		<div
			className="foil-overlay"
			style={{
				"--border-mask": `url(${assetUrl(data.border)})`,
				"--foil-x": `${currentTilt.y * 3}%`,
				"--foil-y": `${-currentTilt.x * 3}%`,
				"--foil-angle": `${45 + currentTilt.y * 2}deg`,
			}}
		/>
	</>
)}

						{/* Front sheen */}

						<div
							className="face-sheen"
							style={{
								"--sheen-x":
									`${currentTilt.y * 3}%`,

								"--sheen-y":
									`${-currentTilt.x * 3}%`,
							}}
						/>
{/* Patron prismatic reflection */}

{isPatron && (
  <div className="patron-idle-prism" />
)}

{isPatron && (
	<div
		className="patron-prismatic"
		style={{
			"--prism-x": `${currentTilt.y}%`,
			"--prism-y": `${-currentTilt.x}%`,
  			"--prism-angle": `${prismAngle}deg`,

			"--prism-strength":
				`${Math.min(
					Math.max(
						Math.abs(currentTilt.x) +
							Math.abs(currentTilt.y) -
							20,
						0
					) / 20,
					1
				)}`,
		}}
	/>
)}

{/* Patron specular highlight */}
{isPatron && (
  <div
    className="patron-specular"
    style={{
      "--specular-x": `${50 - currentTilt.y * 1.5}%`,
	"--specular-y": `${50 + currentTilt.x * 1.5}%`,
      "--specular-strength":
        `${Math.min(
          Math.max(
            Math.abs(currentTilt.x) +
              Math.abs(currentTilt.y) -
              8,
            0
          ) / 32,
          1
        )}`,
    }}
  />
)}

{/* Patron color spill */}
{isPatron && (
  <div
    className="patron-color-spill"
    style={{
      "--spill-x": `${currentTilt.y}%`,
      "--spill-y": `${-currentTilt.x}%`,
      "--spill-strength":
        `${Math.min(
          Math.max(
            Math.abs(currentTilt.x) +
              Math.abs(currentTilt.y) -
              6,
            0
          ) / 28,
          1
        )}`,
      "--spill-angle": `${prismAngle}deg`,
    }}
  />
)}

					</div>

					{/* ==================== BACK ==================== */}

					<div className="card-back">

						<img
							src={assetUrl(data.back)}
							className="card-image card-base"
							alt={`${data.name} back`}
						/>

{/* Back border + Patron foil */}

{isPatron ? (
	<div className="patron-back-border-layer">
		<img
			src={assetUrl(data.borderBack)}
			className="card-image card-border card-border-back"
			alt=""
			aria-hidden="true"
		/>

		<div
			className="foil-overlay"
			style={{
				"--border-mask":
					`url(${assetUrl(data.borderBack)})`,

				"--foil-x":
					`${currentTilt.y * 3}%`,

				"--foil-y":
					`${-currentTilt.x * 3}%`,

				"--foil-angle":
					`${45 + currentTilt.y * 2}deg`,
			}}
		/>
	</div>
) : (
	<>
		<img
			src={assetUrl(data.borderBack)}
			className="card-image card-border card-border-back"
			alt=""
			aria-hidden="true"
		/>

		<div
			className="foil-overlay"
			style={{
				"--border-mask":
					`url(${assetUrl(data.borderBack)})`,

				"--foil-x":
					`${currentTilt.y * 3}%`,

				"--foil-y":
					`${-currentTilt.x * 3}%`,

				"--foil-angle":
					`${45 + currentTilt.y * 2}deg`,
			}}
		/>
	</>
)}

						{/* Back sheen */}

						<div
							className="face-sheen"
							style={{
								"--sheen-x":
									`${currentTilt.y * 3}%`,

								"--sheen-y":
									`${-currentTilt.x * 3}%`,
							}}
						/>

					</div>

				</div>
			</div>
		);
	};

	/* ==================== ZOOM STYLE ==================== */

	const getZoomStyle = () => {
		if (!zoomRect) return {};

		if (!isZoomExpanded) {
			return {
				left: `${zoomRect.startLeft}px`,
				top: `${zoomRect.startTop}px`,
				width: `${zoomRect.startWidth}px`,
				height: `${zoomRect.startHeight}px`,
			};
		}

		return {
			left: `${zoomRect.targetLeft}px`,
			top: `${zoomRect.targetTop}px`,
			width: `${zoomRect.targetWidth}px`,
			height: `${zoomRect.targetHeight}px`,
		};
	};

	/* ==================== RENDER ==================== */

	return (
		<>
			{/* ==================== ORIGINAL CARD ==================== */}

<div
    className={`card-container ${
        isHorizontal ? "horizontal-card-container" : ""
    } ${isZoomed ? "zooming-source" : ""}`}
    style={{
		"--float-delay": `${floatDelay}s`,
	}}
    onPointerDown={(e) => {
      lastPointerType.current = e.pointerType;
    }}
onPointerMove={handlePointerMove}
onPointerEnter={handleMouseEnter}
onPointerLeave={() => {
  handleMouseLeave();
  handleVideoMouseLeave();
}}
	onClick={handleClick}
	onDoubleClick={handleDoubleClick}
>
				{renderCard(tilt)}
			</div>

			{/* ==================== ZOOM OVERLAY ==================== */}

			{isZoomed && zoomRect && (
				<div className="zoom-layer">

					<div
						className={`zoom-backdrop ${
							isClosing ? "closing" : ""
						}`}
						onClick={handleCloseZoom}
					/>

					<div
						className={`zoom-card ${
							isClosing ? "closing" : ""
						}`}
						style={getZoomStyle()}
						onPointerMove={handleZoomPointerMove}
						onPointerLeave={handleZoomMouseLeave}
						onClick={handleClick}
						onDoubleClick={(e) =>
							e.stopPropagation()
						}
						onTransitionEnd={
							handleZoomTransitionEnd
						}
					>
						{renderCard(zoomTilt)}
					</div>

				</div>
			)}
		</>
	);
};

export default Card;