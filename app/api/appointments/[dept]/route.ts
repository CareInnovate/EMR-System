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
					date: startTime.toLocaleDateString("en-US", {
						weekday: "long",
					}),
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
			const timeString = `${padTime(datetime.getHours())}:${padTime(
				datetime.getMinutes()
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

export async function POST(
	req: NextRequest,
	{ params }: { params: { dept: string } }
) {
	const data: { date: string; patientId: string } = await req.json();
	const date = new Date(data.date);
	const doctor = await prisma.doctor.findMany({
		include: {
			_count: {
				select: {
					appointments: true,
				},
			},
		},
		where: {
			staff: {
				departmentId: params.dept,
			},
			workingHours: {
				some: {
					date: date.toLocaleDateString("en-US", {
						weekday: "long",
					}),
					from: {
						lte: date.getHours(),
					},
					to: {
						gte: date.getHours(),
					},
				},
			},
			appointments: {
				none: {
					datetime: {
						equals: data.date,
					},
				},
			},
		},
		orderBy: {
			appointments: {
				_count: "asc",
			},
		},
	});
	if (doctor) {
		const appointment = await prisma.appointment.create({
			data: {
				datetime: data.date,
				patientId: data.patientId,
				doctorId: doctor[0].id,
			},
			include: {
				doctor: {
					select: {
						staff: {
							select: {
								firstName: true,
								middleName: true,
							},
						},
					},
				},
			},
		});
		return NextResponse.json(appointment);
	} else {
		return NextResponse.json(
			{ error: "No available doctors found for the selected time." },
			{ status: 404 }
		);
	}
}
export async function PUT(
	req: NextRequest,
	{ params }: { params: { dept: string } }
) {
	const data: {
		date: string;
		appointmentId: string;
		doctorId: string;
	} = await req.json();
	const date = new Date(data.date);
	const appointment = await prisma.appointment.update({
		where: {
			id: data.appointmentId,
		},
		data: {
			datetime: date,
			doctorId: data.doctorId,
		},
		include: {
			doctor: {
				select: {
					staff: {
						select: {
							firstName: true,
							middleName: true,
						},
					},
				},
			},
		},
	});
	return NextResponse.json(appointment);
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
