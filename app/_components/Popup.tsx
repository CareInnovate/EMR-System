"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type props = {
	isOpen: boolean;
	fullWidth?: boolean;
	noMinHeight?: boolean;
	setOpen?: Dispatch<SetStateAction<boolean>>;
	children: any;
};
const Popup = ({
	isOpen,
	setOpen,
	fullWidth,
	noMinHeight,
	children,
}: props) => {
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
			className={`backdrop:bg-gray-400 z-40 w-full ${
				fullWidth ? "md:w-3/5" : "md:w-1/2"
			} min-w-48 md:min-w-96 ${
				!noMinHeight && "min-h-96"
			} backdrop:opacity-40 rounded-xl h-fit`}
			onClose={() => setOpen && setOpen(false)}
		>
			{children}
		</dialog>
	);
};

export default Popup;
