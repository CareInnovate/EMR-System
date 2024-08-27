"use client";

import { useEffect, useRef } from "react";

type props = {
	isOpen: boolean;
	children: any;
};
const Popup = ({ isOpen, children }: props) => {
	const modalRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const modalElement = modalRef.current;
		if (modalElement) {
			if (isOpen) {
				modalElement.showModal();
			} else {
				modalElement.close();
			}
		}
	}, [isOpen]);
	return (
		<dialog
			ref={modalRef}
			className="backdrop:bg-gray-400 z-40 w-full md:w-1/2 min-w-48 md:min-w-96 min-h-96 backdrop:opacity-40 rounded-xl h-1/2"
		>
			{children}
		</dialog>
	);
};

export default Popup;
