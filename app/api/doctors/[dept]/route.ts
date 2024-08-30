import prisma from "@/app/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { dept: string } }
) {
	const date = new Date();
	date.setHours(0);
	const doctors = await prisma.doctor.findMany({
		where: {
			staff: {
				departmentId: params.dept,
			},
		},
		include: {
			staff: {
				select: {
					firstName: true,
					middleName: true,
					lastName: true,
				},
			},
			appointments: {
				include: {
					patient: {
						select: {
							firstName: true,
							middleName: true,
							lastName: true,
							mobileNumber: true,
							sex: true,
						},
					},
				},
				where: {
					datetime: {
						gte: date,
					},
				},
			},
		},
	});
	return NextResponse.json(doctors);
}

export type doctor = Prisma.DoctorGetPayload<{
	include: {
		staff: {
			select: {
				firstName: true;
				middleName: true;
				lastName: true;
			};
		};
		appointments: {
			include: {
				patient: {
					select: {
						firstName: true;
						middleName: true;
						lastName: true;
						mobileNumber: true;
						sex: true;
					};
				};
			};
		};
	};
}>;
