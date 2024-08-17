"use client";

import {
	faCheckCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

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
			className="backdrop:bg-gray-400 z-40 w-full md:w-1/3 min-w-48 md:min-w-96 h-96 backdrop:opacity-40 rounded-xl"
		>
			{children}
		</dialog>
	);
};

export default Popup;
