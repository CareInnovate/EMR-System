import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/client";
import { Prisma } from "@prisma/client";

export async function GET() {
	const user = await getServerSession(options);
	switch (user?.user.role) {
		case "Patient":
			const patientApp = await prisma.appointment.findMany({
				where: {
					patientId: user.user.id,
				},
				include: {
					doctor: {
						select: {
							staff: {
								select: {
									firstName: true,
									middleName: true,
									department: true,
								},
							},
						},
					},
				},
				orderBy: {
					datetime: "desc",
				},
			});
			return NextResponse.json(patientApp);
		case "Doctor":
			const docApp = await prisma.doctor.findUnique({
				where: {
					id: user.user.id,
				},
				include: {
					appointments: {
						include: {
							patient: {
								select: {
									firstName: true,
									middleName: true,
									lastName: true,
								},
							},
						},
					},
				},
			});
			return NextResponse.json(docApp?.appointments);
		default:
			return NextResponse.json(
				"You are unauthorized to use this api endpoint"
			);
	}
}
export async function DELETE(req: NextRequest) {
	const data: patientAppointment = await req.json();
	const appointment = await prisma.appointment.delete({
		where: {
			id: data.id,
		},
	});
	console.log(appointment);
	return NextResponse.json(appointment);
}

export type patientAppointment = Prisma.AppointmentGetPayload<{
	include: {
		doctor: {
			select: {
				staff: {
					select: {
						firstName: true;
						middleName: true;
						department: true;
					};
				};
			};
		};
	};
}>;
export type doctorAppointment = Prisma.AppointmentGetPayload<{
	include: {
		doctor: {
			select: {
				staff: {
					select: {
						firstName: true;
						middleName: true;
					};
				};
			};
		};
	};
}>;
