"use client";

import {
	faCheckCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

type props = {
	message: string;
	password: string | undefined;
	error: boolean;
	isOpen: boolean;
	onClose?: () => void;
};
const Popup = ({ message, password, error, onClose, isOpen }: props) => {
	const [isModalOpen, setModalOpen] = useState(isOpen);
	const modalRef = useRef<HTMLDialogElement | null>(null);
	useEffect(() => {
		const modalElement = modalRef.current;
		if (modalElement) {
			if (isModalOpen) {
				modalElement.showModal();
			} else {
				modalElement.close();
			}
		}
	}, [isModalOpen]);
	useEffect(() => {
		setModalOpen(isOpen);
	}, [isOpen]);
	function handleClose() {
		onClose && onClose();
		setModalOpen(false);
	}
	return (
		<dialog
			ref={modalRef}
			className="backdrop:bg-gray-400 z-40 w-full md:w-1/3 min-w-48 md:min-w-96 h-96 backdrop:opacity-40 rounded-xl"
		>
			<div className="flex flex-col p-10 m-auto absolute inset-0 bg-white items-center justify-around gap-5 text-center">
				<FontAwesomeIcon
					icon={error ? faXmarkCircle : faCheckCircle}
					className={`text-7xl ${
						error ? "text-red-600" : "text-green-500"
					}`}
				/>
				<p className="text-gray-600 text-xl">{message}</p>

				{password && (
					<p>
						The patient`&apos;`s temporary password is
						<strong>{password}</strong>
					</p>
				)}
				<button
					className={`py-2 px-5 rounded-md text-xl ${
						error ? "bg-red-200" : "bg-green-200"
					}`}
					onClick={handleClose}
				>
					{error ? "Try Again" : "Continue"}
				</button>
			</div>
		</dialog>
	);
};

export default Popup;
