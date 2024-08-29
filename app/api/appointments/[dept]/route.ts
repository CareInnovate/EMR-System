import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { dept: string } }
) {
	const timeSlots = initializeSlots();
	const date = req.nextUrl.searchParams.get("date") as string;
	const startTime = new Date(date);
	const endTime = new Date(date);
	startTime.setHours(9);
	endTime.setHours(17);

	const departmentId = params.dept;
	const doctors = await prisma.doctor.findMany({
		where: {
			workingHours: {
				some: {
					date: "Thursday",
				},
			},
			staff: {
				departmentId: departmentId,
			},
		},
		include: {
			appointments: {
				where: {
					datetime: {
						gte: startTime,
						lte: endTime,
					},
				},
			},
			workingHours: {
				where: {
					date: startTime.toLocaleDateString("en-US", {
						weekday: "long",
					}),
				},
			},
		},
	});
	doctors.forEach((doctor) => {
		doctor.appointments.forEach((app) => {
			const datetime = new Date(app.datetime);
			const timeString = `${padTime(datetime.getUTCHours())}:${padTime(
				datetime.getUTCMinutes()
			)}`;
			timeSlots[timeString] =
				timeSlots[timeString] !== undefined
					? timeSlots[timeString] - 1
					: 1;
			-1;
		});
		doctor.workingHours.forEach((wh) => {
			for (let i = wh.from; i < wh.to; i++) {
				const hour = padTime(i);

				timeSlots[`${hour}:00`] =
					timeSlots[`${hour}:00`] !== undefined
						? timeSlots[`${hour}:00`] + 1
						: 1;
				timeSlots[`${hour}:30`] =
					timeSlots[`${hour}:30`] !== undefined
						? timeSlots[`${hour}:30`] + 1
						: 1;
			}
		});
	});

	return NextResponse.json(timeSlots);
}
function initializeSlots(): Record<string, number> {
	const slots: Record<string, number> = {};
	const startHour = 9; // 9:00 AM
	const endHour = 17; // 5:00 PM

	for (let hour = startHour; hour < endHour; hour++) {
		slots[`${padTime(hour)}:00`] = 0;
		slots[`${padTime(hour)}:30`] = 0;
	}

	return slots;
}

// Helper function to pad the time with leading zero if necessary
function padTime(time: number): string {
	return time.toString().padStart(2, "0");
}
