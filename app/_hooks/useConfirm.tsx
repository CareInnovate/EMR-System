"use client";
import { useState } from "react";

export const useConfirm = () => {
	const [promise, setPromise] = useState<{ resolve: Function } | null>(null);

	const confirm = () =>
		new Promise((resolve: Function, reject: Function) => {
			setPromise({ resolve });
		});

	const handleClose = () => {
		setPromise(null);
	};

	const handleConfirm = () => {
		promise?.resolve(true);
		handleClose();
	};

	const handleCancel = () => {
		promise?.resolve(false);
		handleClose();
	};
	return { open: promise !== null, handleConfirm, handleCancel, confirm };
};
