import React, { useRef, useState, useMemo } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const SIZE_DIMENSIONS = {
	sm: { width: 360, height: 500 },
	md: { width: 420, height: 600 },
	lg: { width: 520, height: 700 },
	xl: { width: 640, height: 800 },
	full: { width: '90vw', height: '85vh' },
};

export const ExpandableChat = ({ className, position = 'bottom-right', size = 'md', icon, children, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);
	const chatRef = useRef(null);

	const toggleChat = () => setIsOpen((v) => !v);

	const dims = useMemo(() => SIZE_DIMENSIONS[size] || SIZE_DIMENSIONS.md, [size]);

	const rootStyle = {
		position: 'fixed',
		zIndex: 1000,
		bottom: 20,
		right: position === 'bottom-right' ? 20 : undefined,
		left: position === 'bottom-left' ? 20 : undefined,
	};

	const panelStyle = {
		position: 'fixed',
		right: position === 'bottom-right' ? 20 : undefined,
		left: position === 'bottom-left' ? 20 : undefined,
		bottom: 20 + 70, // show above the toggle button
		width: typeof dims.width === 'number' ? `${dims.width}px` : dims.width,
		height: typeof dims.height === 'number' ? `${dims.height}px` : dims.height,
		background: '#fff',
		border: '1px solid #e5e7eb',
		borderRadius: 12,
		overflow: 'hidden',
		boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
		transition: 'opacity 180ms ease, transform 180ms ease',
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
		pointerEvents: isOpen ? 'auto' : 'none',
		visibility: isOpen ? 'visible' : 'hidden',
	};

	return (
		<div style={rootStyle} className={className} {...props}>
			<div ref={chatRef} style={panelStyle}>
				{children}
				<button
					onClick={toggleChat}
					aria-label="Close chat"
					style={{
						position: 'absolute',
						top: 8,
						right: 8,
						width: 36,
						height: 36,
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: 'none',
						background: 'transparent',
						cursor: 'pointer',
					}}
				>
					<X size={16} />
				</button>
			</div>
			<ExpandableChatToggle icon={icon} isOpen={isOpen} toggleChat={toggleChat} />
		</div>
	);
};

export const ExpandableChatHeader = ({ className, ...props }) => (
	<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid #e5e7eb' }} className={className} {...props} />
);

export const ExpandableChatBody = ({ className, ...props }) => (
	<div style={{ height: 'calc(100% - 120px)', overflowY: 'auto' }} className={className} {...props} />
);

export const ExpandableChatFooter = ({ className, ...props }) => (
	<div style={{ padding: 16, borderTop: '1px solid #e5e7eb' }} className={className} {...props} />
);

export const ExpandableChatToggle = ({ className, icon, isOpen, toggleChat, ...props }) => (
	<button
		onClick={toggleChat}
		aria-label={isOpen ? 'Close chat' : 'Open chat'}
		style={{
			width: 56,
			height: 56,
			borderRadius: '50%',
			border: 'none',
			background: '#FF8C5A',
			color: '#fff',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			boxShadow: '0 10px 25px rgba(0,0,0,.25)',
			cursor: 'pointer',
		}}
		className={className}
		{...props}
	>
		{isOpen ? <X size={24} /> : icon || <MessageCircle size={24} />}
	</button>
);

export default ExpandableChat;

