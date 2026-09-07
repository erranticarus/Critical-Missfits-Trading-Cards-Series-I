/** @format */

import { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ data }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const [isZoomed, setIsZoomed] = useState(false);
	const [isZoomExpanded, setIsZoomExpanded] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [zoomTilt, setZoomTilt] = useState({ x: 0, y: 0 });

	const [zoomRect, setZoomRect] = useState(null);

	/* ==================== FLIP ==================== */

	const handleClick = () => {
		setIsFlipped((current) => !current);
	};

	/* ==================== TILT ==================== */

	const calculateTilt = (e, setTiltState) => {
		const rect = e.currentTarget.getBoundingClientRect();

		const xPercent =
			(e.clientX - rect.left) / rect.width;

		const yPercent =
			(e.clientY - rect.top) / rect.height;

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

	const handleMouseMove = (e) => {
		calculateTilt(e, setTilt);
	};

	const handleZoomMouseMove = (e) => {
		calculateTilt(e, setZoomTilt);
	};

	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 });
	};

	const handleZoomMouseLeave = () => {
		setZoomTilt({ x: 0, y: 0 });
	};

	/* ==================== OPEN ZOOM ==================== */

	const handleDoubleClick = (e) => {
		e.stopPropagation();

		if (isZoomed || isClosing) return;

		const rect = e.currentTarget.getBoundingClientRect();

		/*
		 * Calculate the largest card that fits inside
		 * 90% of the viewport while respecting the native
		 * 1500 × 2100 artwork resolution.
		 */

		const maxWidth = Math.min(
			window.innerWidth * 0.9,
			1500,
			(window.innerHeight * 0.9 * 5) / 7
		);

		const maxHeight = maxWidth * (7 / 5);

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

		/*
		 * Start with the exact position/size of the original
		 * card, then expand on the next animation frame.
		 */
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
		/*
		 * Width is one of the properties transitioning during
		 * the zoom. We only need one transition-end event to
		 * remove the overlay.
		 */
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
					}`}
				>

					{/* ==================== FRONT ==================== */}

					<div className="card-front">
						<img
							src={data.front}
							className="card-image card-base"
							alt={`${data.name} front`}
						/>

						<img
							src={data.border}
							className="card-image card-border"
							alt=""
							aria-hidden="true"
						/>

						<div
							className="foil-overlay"
							style={{
								"--border-mask":
									`url(${data.border})`,

								"--foil-x":
									`${currentTilt.y * 3}%`,

								"--foil-y":
									`${-currentTilt.x * 3}%`,

								"--foil-angle":
									`${45 + currentTilt.y * 2}deg`,
							}}
						/>

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

					{/* ==================== BACK ==================== */}

					<div className="card-back">
						<img
							src={data.back}
							className="card-image"
							alt={`${data.name} back`}
						/>

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
				className="card-container"
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
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
						onMouseMove={handleZoomMouseMove}
						onMouseLeave={handleZoomMouseLeave}
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