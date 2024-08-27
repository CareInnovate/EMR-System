import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get("search") as string;
	const medications = await prisma.medication.findMany({
		where: {
			OR: [
				{
					name: {
						contains: name,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: name,
						mode: "insensitive",
					},
				},
			],
		},
		take: 5,
	});
	return NextResponse.json(medications);
}
export async function POST() {
	await prisma.medication.createMany({
		data: [
			{
				name: "Advil",
				description: "Also known as Ibuprofen",
				price: 7.99,
				available: 50,
			},
			{
				name: "Tylenol",
				description: "Also known as Acetaminophen",
				price: 8.99,
				available: 50,
			},
			{
				name: "Aleve",
				description: "Also known as Naproxen",
				price: 9.49,
				available: 50,
			},
			{
				name: "Motrin",
				description: "Also known as Ibuprofen",
				price: 6.99,
				available: 50,
			},
			{
				name: "Aspirin",
				description: "Also known as Acetylsalicylic Acid",
				price: 4.99,
				available: 50,
			},
			{
				name: "Lisinopril",
				description: "Also known as Lisinopril",
				price: 10.0,
				available: 50,
			},
			{
				name: "Zestril",
				description: "Also known as Lisinopril",
				price: 10.0,
				available: 50,
			},
			{
				name: "Lipitor",
				description: "Also known as Atorvastatin",
				price: 13.99,
				available: 50,
			},
			{
				name: "Zocor",
				description: "Also known as Simvastatin",
				price: 12.49,
				available: 50,
			},
			{
				name: "Crestor",
				description: "Also known as Rosuvastatin",
				price: 15.0,
				available: 50,
			},
			{
				name: "Plavix",
				description: "Also known as Clopidogrel",
				price: 14.99,
				available: 50,
			},
			{
				name: "Coumadin",
				description: "Also known as Warfarin",
				price: 10.49,
				available: 50,
			},
			{
				name: "Glucophage",
				description: "Also known as Metformin",
				price: 5.0,
				available: 50,
			},
			{
				name: "Amoxil",
				description: "Also known as Amoxicillin",
				price: 8.49,
				available: 50,
			},
			{
				name: "Cipro",
				description: "Also known as Ciprofloxacin",
				price: 11.99,
				available: 50,
			},
			{
				name: "Zithromax",
				description: "Also known as Azithromycin",
				price: 12.99,
				available: 50,
			},
			{
				name: "Augmentin",
				description: "Also known as Amoxicillin/Clavulanate",
				price: 15.49,
				available: 50,
			},
			{
				name: "Lasix",
				description: "Also known as Furosemide",
				price: 4.99,
				available: 50,
			},
			{
				name: "Norvasc",
				description: "Also known as Amlodipine",
				price: 6.99,
				available: 50,
			},
			{
				name: "Prozac",
				description: "Also known as Fluoxetine",
				price: 9.99,
				available: 50,
			},
			{
				name: "Zoloft",
				description: "Also known as Sertraline",
				price: 10.99,
				available: 50,
			},
			{
				name: "Lexapro",
				description: "Also known as Escitalopram",
				price: 11.49,
				available: 50,
			},
			{
				name: "Ativan",
				description: "Also known as Lorazepam",
				price: 7.49,
				available: 50,
			},
			{
				name: "Xanax",
				description: "Also known as Alprazolam",
				price: 8.99,
				available: 50,
			},
			{
				name: "Valium",
				description: "Also known as Diazepam",
				price: 9.49,
				available: 50,
			},
			{
				name: "Ambien",
				description: "Also known as Zolpidem",
				price: 12.49,
				available: 50,
			},
			{
				name: "Lunesta",
				description: "Also known as Eszopiclone",
				price: 14.99,
				available: 50,
			},
			{
				name: "Singulair",
				description: "Also known as Montelukast",
				price: 10.99,
				available: 50,
			},
			{
				name: "Prednisone",
				description: "Also known as Prednisone",
				price: 6.49,
				available: 50,
			},
			{
				name: "Deltasone",
				description: "Also known as Prednisone",
				price: 6.49,
				available: 50,
			},
			{
				name: "Albuterol",
				description: "Also known as Albuterol",
				price: 18.99,
				available: 50,
			},
			{
				name: "ProAir",
				description: "Also known as Albuterol",
				price: 18.99,
				available: 50,
			},
			{
				name: "Ventolin",
				description: "Also known as Albuterol",
				price: 19.99,
				available: 50,
			},
			{
				name: "Flovent",
				description: "Also known as Fluticasone",
				price: 22.99,
				available: 50,
			},
			{
				name: "Symbicort",
				description: "Also known as Budesonide/Formoterol",
				price: 29.99,
				available: 50,
			},
			{
				name: "Advair",
				description: "Also known as Fluticasone/Salmeterol",
				price: 25.99,
				available: 50,
			},
			{
				name: "Spiriva",
				description: "Also known as Tiotropium",
				price: 30.99,
				available: 50,
			},
			{
				name: "Nasonex",
				description: "Also known as Mometasone",
				price: 15.99,
				available: 50,
			},
			{
				name: "Rhinocort",
				description: "Also known as Budesonide",
				price: 13.99,
				available: 50,
			},
			{
				name: "Clarinex",
				description: "Also known as Desloratadine",
				price: 11.99,
				available: 50,
			},
			{
				name: "Claritin",
				description: "Also known as Loratadine",
				price: 10.99,
				available: 50,
			},
			{
				name: "Zyrtec",
				description: "Also known as Cetirizine",
				price: 12.49,
				available: 50,
			},
			{
				name: "Benadryl",
				description: "Also known as Diphenhydramine",
				price: 7.49,
				available: 50,
			},
			{
				name: "Sudafed",
				description: "Also known as Pseudoephedrine",
				price: 6.99,
				available: 50,
			},
			{
				name: "Mucinex",
				description: "Also known as Guaifenesin",
				price: 14.99,
				available: 50,
			},
			{
				name: "Robitussin",
				description: "Also known as Guaifenesin",
				price: 9.49,
				available: 50,
			},
			{
				name: "Tamiflu",
				description: "Also known as Oseltamivir",
				price: 39.99,
				available: 50,
			},
			{
				name: "Imodium",
				description: "Also known as Loperamide",
				price: 5.99,
				available: 50,
			},
			{
				name: "Pepto-Bismol",
				description: "Also known as Bismuth Subsalicylate",
				price: 7.99,
				available: 50,
			},
			{
				name: "Maalox",
				description: "Also known as Aluminum/Magnesium Hydroxide",
				price: 4.99,
				available: 50,
			},
			{
				name: "Prilosec",
				description: "Also known as Omeprazole",
				price: 12.99,
				available: 50,
			},
			{
				name: "Nexium",
				description: "Also known as Esomeprazole",
				price: 14.99,
				available: 50,
			},
			{
				name: "Zantac",
				description: "Also known as Ranitidine",
				price: 8.99,
				available: 50,
			},
			{
				name: "Pepcid",
				description: "Also known as Famotidine",
				price: 11.49,
				available: 50,
			},
			{
				name: "Tums",
				description: "Also known as Calcium Carbonate",
				price: 4.99,
				available: 50,
			},
			{
				name: "Tagamet",
				description: "Also known as Cimetidine",
				price: 9.99,
				available: 50,
			},
			{
				name: "Lyrica",
				description: "Also known as Pregabalin",
				price: 29.99,
				available: 50,
			},
			{
				name: "Neurontin",
				description: "Also known as Gabapentin",
				price: 18.99,
				available: 50,
			},
			{
				name: "OxyContin",
				description: "Also known as Oxycodone",
				price: 32.99,
				available: 50,
			},
			{
				name: "Percocet",
				description: "Also known as Oxycodone/Acetaminophen",
				price: 24.99,
				available: 50,
			},
			{
				name: "Vicodin",
				description: "Also known as Hydrocodone/Acetaminophen",
				price: 19.99,
				available: 50,
			},
			{
				name: "Ultram",
				description: "Also known as Tramadol",
				price: 15.99,
				available: 50,
			},
			{
				name: "Morphine",
				description: "Also known as Morphine",
				price: 10.99,
				available: 50,
			},
			{
				name: "Dilaudid",
				description: "Also known as Hydromorphone",
				price: 21.99,
				available: 50,
			},
			{
				name: "Suboxone",
				description: "Also known as Buprenorphine/Naloxone",
				price: 89.99,
				available: 50,
			},
			{
				name: "Narcan",
				description: "Also known as Naloxone",
				price: 37.99,
				available: 50,
			},
			{
				name: "Vivitrol",
				description: "Also known as Naltrexone",
				price: 1229.99,
				available: 50,
			},
			{
				name: "Proair",
				description: "Also known as Albuterol",
				price: 18.99,
				available: 50,
			},
			{
				name: "Xarelto",
				description: "Also known as Rivaroxaban",
				price: 46.99,
				available: 50,
			},
			{
				name: "Eliquis",
				description: "Also known as Apixaban",
				price: 50.99,
				available: 50,
			},
			{
				name: "Lovenox",
				description: "Also known as Enoxaparin",
				price: 75.99,
				available: 50,
			},
			{
				name: "Pradaxa",
				description: "Also known as Dabigatran",
				price: 49.99,
				available: 50,
			},
			{
				name: "Synthroid",
				description: "Also known as Levothyroxine",
				price: 8.99,
				available: 50,
			},
			{
				name: "Armour Thyroid",
				description: "Also known as Thyroid",
				price: 34.99,
				available: 50,
			},
			{
				name: "Cymbalta",
				description: "Also known as Duloxetine",
				price: 19.99,
				available: 50,
			},
		],
	});
	return NextResponse.json("successful");
}
