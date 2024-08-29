--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: EmploymentStatus; Type: TYPE; Schema: public; Owner: postgres
--



--
-- Data for Name: Appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Department" (id, name, description) FROM stdin;
\.


--
-- Data for Name: Diseases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Diseases" (id, name) FROM stdin;
5cac4911-780d-4614-aba4-041d78390213	Hypertension
9bedcc75-aeff-4f05-97e0-b7456ff1969e	Diabetes Mellitus
1e843fb5-e721-4d04-beb6-9a770e8b367b	Asthma
11cc7a0a-0eba-4dbf-be2f-419a73cc0d2c	Chronic Obstructive Pulmonary Disease (COPD)
dc427921-aa50-477a-a124-96b3ce67589a	Coronary Artery Disease
a777c944-42eb-43db-ada1-b9facee292d2	Stroke
13ef5aa7-37e7-42bf-bde7-e5e9f0ac0db1	Cancer
d4790c0b-5350-4644-a842-ee8f184bc0fa	Alzheimer's Disease
de48a529-fb6f-4e6c-9c91-e501ca29bf2c	Parkinson's Disease
9fe8c06c-7d17-484d-be87-0dfc70c0fa68	Osteoporosis
79e18a78-1bf2-4047-8f33-01782d16234d	Arthritis
6d8d461c-dd78-48ce-a78c-d244cc7f3e45	Rheumatoid Arthritis
e8d07339-a1c2-4523-a576-c0fb697aa160	Osteoarthritis
88b33bc9-651b-4e2f-8efa-d9415085c8f5	Chronic Kidney Disease
1a9c064e-2d26-4a54-9819-02a6eea78bfb	Hepatitis B
169fdf20-6389-4972-a784-0c7aa5899a5e	Hepatitis C
c7be3a01-de75-4f29-8bed-c2b8e53a696a	HIV/AIDS
549f1f35-98a0-47ac-9ba3-bae3fdcb6839	Tuberculosis
fa6c59d5-53c3-4833-b01d-172df4c101aa	Pneumonia
93e920c4-1ea7-4376-96e6-7c6276ac99ad	Influenza
54c74aa6-4fea-4f4d-86dd-85179c403608	COVID-19
e7fc5208-4a21-4783-9b4a-710c7f6daf06	Migraine
fe106b05-523a-4767-bb80-f58c7a2f0c6d	Epilepsy
eefaea7f-3bfe-4ce8-bcea-8528309c406a	Multiple Sclerosis
c16c0e6f-1032-4112-9483-52a1f89348a0	Celiac Disease
3c74f537-5117-48b9-b889-a85860515274	Crohn's Disease
1a48504d-3a93-45f4-aad8-c3c2d64f7fe4	Ulcerative Colitis
b41a6cc0-76df-4fef-beca-9547f08bd9f5	Irritable Bowel Syndrome
88323dca-c125-4630-8d9d-84082012af4e	Gastritis
6d8b51b2-1131-4033-b2f4-93a607aa7196	Peptic Ulcer
f0e0451e-6981-4b77-9acc-fb72422bfc9e	Gastroesophageal Reflux Disease (GERD)
d720ad87-f8eb-4e85-97f1-275a260b97cf	Chronic Fatigue Syndrome
6c9908fe-9846-40a6-b287-5c1178a646d5	Lupus
0e66f21a-719c-49f3-90b7-a200d0d9f056	Psoriasis
f5dc394a-1c35-43fc-81ba-61806c906a0e	Eczema
0e138992-4711-4e12-8e8d-e28fedc58ad4	Dermatitis
e90698a8-c301-4281-9ff1-a21092c1ba39	Acne
21d2d96c-f5a1-48b8-a7ea-54e8d5667f4c	Rosacea
9ef48a12-1fc7-4da1-8d32-547ebd8be3fd	Vitiligo
a922abc3-350c-461b-bf94-706a67e7b244	Sickle Cell Anemia
60a1b01c-05d3-4f65-8002-6315c0b62cc5	Hemophilia
04ec97c0-b3be-4a39-8c3d-9a3e50eb1f05	Leukemia
8f8ac199-455a-4d76-a7ce-1292a64dc04a	Lymphoma
bbab1c52-ab15-44a7-bb36-0b8682afbcd3	Anemia
c04d3436-6570-4512-89af-cb644f76b1a3	Thalassemia
78dd0ef8-3f27-4dd7-a8a8-29470b406353	Gout
8a722fea-ba4c-48ee-8f0d-e72cca4680a0	Fibromyalgia
293baf67-96e9-4ab5-b019-5b009d919fcb	Carpal Tunnel Syndrome
8b16df65-6c1f-49cc-a5f8-16b897bc2800	Tendonitis
28184e7d-143a-49d7-933f-6ba655089559	Bursitis
5c6cd23e-300d-42c7-adae-6b75cc7e1896	Shingles
905a4ad0-c6d9-4be1-8fbe-5f7b6d39e266	Chickenpox
a3d2fed2-fa80-4977-971f-1c752a94fa21	Measles
684c6dc1-ca2d-4908-89e9-7a8b8d98263b	Mumps
62781e89-32d4-420a-830b-7c9086554acf	Rubella
19c35945-843b-4dd8-b52b-a02f2e88b702	Whooping Cough
0e717e30-d82e-45c6-850e-dc4a51a340f3	Tetanus
94e1e5c2-616d-425f-b13c-1b689db6a26e	Diphtheria
72e26604-2581-4e23-920d-84d94211bef6	Pertussis
1890a7b3-bcbe-4cec-853b-608233104f36	Polio
57f15fed-38b2-481e-950d-12bd5ff29b09	Malaria
0b26d9e9-1fc2-46d2-9ad1-ff1b6195bb9d	Dengue
b519c57d-7403-45e1-8f1a-06ac5d8895c6	Zika Virus
78f646b2-b880-4794-aa82-306074217fa3	Chikungunya
bb6fc9d7-9e7d-4366-a033-14155d560ce9	Yellow Fever
9a568dd8-02f8-4fa3-b81f-d9d07227a139	Rabies
88807a4b-dcdb-45d9-90a7-809ef7641fbb	Lyme Disease
2dde1fd8-67ee-4fcd-b540-e34d37821528	Rocky Mountain Spotted Fever
cddce623-acce-4e7c-bac0-989e4405b5fc	Ebola
1af8bfa5-ecb0-43e9-8cdd-562705b94890	Marburg Virus
c671d222-c864-47be-bc57-f2332b4eb09e	Hantavirus
ec30073a-e9c3-41d6-8f39-483c6d0fc167	Lassa Fever
d743ccf9-fd25-44f7-8a1c-820de0509330	Meningitis
ef952dc1-c06d-4ebc-a818-e29cdab1573b	Encephalitis
87ff9309-7760-4bf7-b659-57d924df7267	West Nile Virus
712825c8-78c1-4945-8c49-39b3da5cbe25	Zoster Virus
4617e27b-fc19-4e3c-bef6-80e005dfc419	Hantavirus Pulmonary Syndrome
79ba3356-0fff-42fb-a188-aa1dc184724c	Middle East Respiratory Syndrome (MERS)
a5446638-7b72-42fb-a516-4cba4f60e898	Severe Acute Respiratory Syndrome (SARS)
2ab3bed4-b969-4c69-846b-0471c66e49b4	Avian Influenza
e5a5a21f-4d05-4c4e-a0db-b13d4322048f	Swine Flu
74f0b28d-2622-4c51-82b2-1a0938480d94	Anthrax
4078bc2f-7707-49b8-8cce-13f5cf3516ad	Plague
5f61ca92-eb8e-429e-be64-79cf42b538bc	Tularemia
ba1c42ee-6229-40de-9ffd-be39eee76814	Q Fever
f52a5abc-d7bd-46e5-b259-a68637a4db1b	Brucellosis
8d53cac1-f3f5-443d-b334-cfd5ca20888e	Botulism
70934e1d-b286-47e4-a950-0fbbe9b6c106	Leptospirosis
ee264d1d-dba4-4669-a0a0-db24647c5ef0	Schistosomiasis
69695a7e-784a-4223-84fe-06e10a6f1eec	Trypanosomiasis
c066d107-5ae9-4365-91a6-463dfde854e3	Leishmaniasis
ecad8de3-7423-4d80-b3d3-9c347e5532cb	Chagas Disease
701afb2a-1e6c-461d-9a16-5de7c77b3543	Onchocerciasis
d9b87af2-24c3-4443-9f5e-444863203def	Filariasis
054d7ed3-79f7-42ad-b474-ee23dca3db29	Dracunculiasis
25c17a57-f6e5-4d8c-a0ef-1b07fb2c96b1	Ascariasis
8d4c1512-ca5e-4ab7-858c-2723cfbaf095	Hookworm Infection
6e23e26e-4db0-4f15-9fd3-b4a0f05139d5	Pinworm Infection
2e780098-1c35-4378-9a16-40bfb0001f8a	Toxocariasis
f8ec066a-6883-4f87-bdf3-b2ff6ccb570d	Strongyloidiasis
\.


-- --
-- -- Data for Name: Medication; Type: TABLE DATA; Schema: public; Owner: postgres
-- --

COPY public."Medication" (id, name, description, price, available) FROM stdin;
med-1	Aspirin	Pain reliever and anti-inflammatory	5	100
med-2	Amoxicillin	Antibiotic	10	50
med-3	Lisinopril	Blood pressure medication	7	75
0ece4106-07bd-4944-a7c3-f1ce46f94ce1	Advil	Also known as Ibuprofen	7.99	50
fc64db6c-8bd7-42f6-a553-368cfb53b44e	Tylenol	Also known as Acetaminophen	8.99	50
0b87d4a0-4b95-49cd-94a5-96b480af2d8d	Aleve	Also known as Naproxen	9.49	50
91b3987e-9164-456c-b206-7ecfcf3c5335	Motrin	Also known as Ibuprofen	6.99	50
6823b755-04b9-4e87-bf28-1b796c754cb1	Aspirin	Also known as Acetylsalicylic Acid	4.99	50
49010d0b-3dc8-4024-a8cf-462892f9e95b	Lisinopril	Also known as Lisinopril	10	50
d331f0c6-5ba9-4e4d-a587-b45fc1607a6a	Zestril	Also known as Lisinopril	10	50
70d3783e-1ac9-4988-9e3e-b512b2d59c2f	Lipitor	Also known as Atorvastatin	13.99	50
84dabceb-3feb-4964-a7fe-96179e40e9cf	Zocor	Also known as Simvastatin	12.49	50
e24ec743-7924-46c9-b49b-c64839aea953	Crestor	Also known as Rosuvastatin	15	50
896dc756-9fe5-49f5-9850-8237967e0f8d	Plavix	Also known as Clopidogrel	14.99	50
a886b6b7-fa2b-4b86-8b79-c8fe446138ae	Coumadin	Also known as Warfarin	10.49	50
562737a4-52ca-4835-b03d-dcb213f416e5	Glucophage	Also known as Metformin	5	50
b4d049b0-a9ed-433c-8e0f-0768383839d8	Amoxil	Also known as Amoxicillin	8.49	50
9d679298-5243-444f-b0be-2524f86e96f6	Cipro	Also known as Ciprofloxacin	11.99	50
ea7b1e10-9c10-44cf-b7e9-c848a7bd9f92	Zithromax	Also known as Azithromycin	12.99	50
2c00823c-64da-475b-aca2-1044033503e4	Augmentin	Also known as Amoxicillin/Clavulanate	15.49	50
c414615d-8a21-4550-a2f8-6267f00ace9c	Lasix	Also known as Furosemide	4.99	50
8b8e1231-edbc-4bce-ab0e-bf93bcf096e9	Norvasc	Also known as Amlodipine	6.99	50
d73f5324-ecfd-4e29-8760-70038c55d505	Prozac	Also known as Fluoxetine	9.99	50
9067b0e1-ad3c-4038-b96a-c4cda52b9af3	Zoloft	Also known as Sertraline	10.99	50
d5c4e077-7f64-49e7-8140-b483077d3bd4	Lexapro	Also known as Escitalopram	11.49	50
74f0268d-daaf-471c-b9fa-2ff0b3e339d3	Ativan	Also known as Lorazepam	7.49	50
117b6068-1506-4f33-a2bb-291cb848583e	Xanax	Also known as Alprazolam	8.99	50
7efbb06d-2a93-4c68-8f50-770bcbcabe7f	Valium	Also known as Diazepam	9.49	50
dce24ae3-e8d4-48ca-93a4-7d63ff6aa76f	Ambien	Also known as Zolpidem	12.49	50
a76c48b4-843d-409f-8707-5dc143a58721	Lunesta	Also known as Eszopiclone	14.99	50
1f32afe8-7d21-4a2d-b95f-814e1bddbea6	Singulair	Also known as Montelukast	10.99	50
b5fa864c-32fb-46d0-9d26-9dd5f088ea0b	Prednisone	Also known as Prednisone	6.49	50
809d69a5-a51b-4d08-8cc3-c7bc1d270ea0	Deltasone	Also known as Prednisone	6.49	50
676f7db6-d67b-425f-9b9b-de559093e762	Albuterol	Also known as Albuterol	18.99	50
c4f9fb20-9eaf-4500-884e-3259e625d7d6	ProAir	Also known as Albuterol	18.99	50
3669eef9-e5f5-4692-b0fe-58e0a931f80d	Ventolin	Also known as Albuterol	19.99	50
d4db4e4b-32ff-4738-b477-3094a93051b9	Flovent	Also known as Fluticasone	22.99	50
801a8739-6735-4d5b-a4bf-ad65b21354a2	Symbicort	Also known as Budesonide/Formoterol	29.99	50
c84a13bb-abdc-4b8b-9381-e70646e8078d	Advair	Also known as Fluticasone/Salmeterol	25.99	50
b3c4d653-6eee-4271-a961-e9801888ef40	Spiriva	Also known as Tiotropium	30.99	50
81b30932-7309-4d85-a7f9-06d7abad528c	Nasonex	Also known as Mometasone	15.99	50
ebc25c6c-8da1-494a-a012-6a6be2105c9a	Rhinocort	Also known as Budesonide	13.99	50
df8619c2-0cb4-43e8-9e5e-f89c2e8548d5	Clarinex	Also known as Desloratadine	11.99	50
8aa2b96e-692b-4d78-8e49-e6892b44b62a	Claritin	Also known as Loratadine	10.99	50
9617f212-21a2-400e-9852-b721daa96590	Zyrtec	Also known as Cetirizine	12.49	50
fca29424-efcc-4f60-b6eb-23c45fb5a8c0	Benadryl	Also known as Diphenhydramine	7.49	50
e898f588-b5e5-41dc-a421-969b1c6d702b	Sudafed	Also known as Pseudoephedrine	6.99	50
237e3aeb-0637-41ec-a8b5-d8393ec8963a	Mucinex	Also known as Guaifenesin	14.99	50
9ab51f9a-c8d6-40ca-8e2c-1b0811c904ab	Robitussin	Also known as Guaifenesin	9.49	50
018125b5-b3dc-41f7-8086-54e97c6a06dd	Tamiflu	Also known as Oseltamivir	39.99	50
4657f439-9655-4a5b-b586-cf56144f9f28	Imodium	Also known as Loperamide	5.99	50
73ab9a6b-cdb1-418d-96bf-9e6efd0f16fc	Pepto-Bismol	Also known as Bismuth Subsalicylate	7.99	50
d7277772-e9e7-4d94-b99d-f47019442318	Maalox	Also known as Aluminum/Magnesium Hydroxide	4.99	50
cf8aeda6-dc0e-453c-873e-b656d2535c20	Prilosec	Also known as Omeprazole	12.99	50
c4aec955-9bf7-4a0e-97af-9427912c3fcf	Nexium	Also known as Esomeprazole	14.99	50
ae0bb85c-ade6-4a84-b2e5-c5f1343ad953	Zantac	Also known as Ranitidine	8.99	50
00cfa5e5-dd5b-4f3b-9bd6-02e89797ba28	Pepcid	Also known as Famotidine	11.49	50
d32a1f6f-acc3-44de-87ff-be94e5136bc7	Tums	Also known as Calcium Carbonate	4.99	50
e2bb61c3-fa74-4dd5-aeff-e42400ef7780	Tagamet	Also known as Cimetidine	9.99	50
80e3fbbc-ad93-4d63-8de5-ad266950ba1a	Lyrica	Also known as Pregabalin	29.99	50
86219498-cfb3-43ec-8f8f-0fa69dace843	Neurontin	Also known as Gabapentin	18.99	50
ff50658a-4b8e-4447-8ad0-48826ae07c6d	OxyContin	Also known as Oxycodone	32.99	50
40416bab-3375-4a2c-8d89-dcaf3bde780b	Percocet	Also known as Oxycodone/Acetaminophen	24.99	50
dc5a8f58-fff3-4442-94dc-600a57b1d3b4	Vicodin	Also known as Hydrocodone/Acetaminophen	19.99	50
5c784155-64f1-4e93-bd3b-b45d9084486b	Ultram	Also known as Tramadol	15.99	50
22e5dbf8-0468-4943-9629-3cf5b44ac201	Morphine	Also known as Morphine	10.99	50
1f088214-5cdb-45e3-b3a3-6ef718978859	Dilaudid	Also known as Hydromorphone	21.99	50
fd03b826-f109-440d-9e1c-88018f03f06c	Suboxone	Also known as Buprenorphine/Naloxone	89.99	50
911b2e28-4a4e-40e3-b316-e9c7ef225b9b	Narcan	Also known as Naloxone	37.99	50
d5f99ae5-c78d-4a44-8807-5d5e16c3737d	Vivitrol	Also known as Naltrexone	1229.99	50
777304f0-e745-490b-b909-84d774782c24	Proair	Also known as Albuterol	18.99	50
009b3c6b-e73e-4623-a0ab-64bb89a17e77	Xarelto	Also known as Rivaroxaban	46.99	50
21114a5c-2ca7-4995-bbf9-99be373d90e5	Eliquis	Also known as Apixaban	50.99	50
7bc5de8e-df86-4c3e-96c8-5978f2cbee4f	Lovenox	Also known as Enoxaparin	75.99	50
2f405244-d2cc-4507-9e7d-15114482c3b1	Pradaxa	Also known as Dabigatran	49.99	50
1218499f-5601-4790-b06b-a011e0380df9	Synthroid	Also known as Levothyroxine	8.99	50
2a5259a1-7e6f-4501-8712-e9adcb619354	Armour Thyroid	Also known as Thyroid	34.99	50
bd1c8a5e-fbfb-45c9-8cd5-895f1b862558	Cymbalta	Also known as Duloxetine	19.99	50
\.

COPY public."Department" (id, name, description) FROM stdin;
general-id	General	General department for hospital
\.

--
-- Data for Name: Patient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Patient" (id, "firstName", "middleName", "lastName", "birthDate", region, city, woreda, kebele, "mobileNumber", email, occupation, sex, password, "emergencyContactMobileNo", "emergencyContactName") FROM stdin;
91a60e74-94ab-423f-8930-4dc130061915	Thomas	Shelby	Limited	2024-02-01 10:13:14.741	North-England	Birmingham		\N	111-255-2554	\N	Business Man	MALE		\N	\N
45f62fb0-db7b-49bd-be31-db3ba3a94372	John	Shelby	Limited	2024-02-01 10:14:36.728	North-England	Birmingham		\N	111-155-2554	\N	Business Man	MALE		\N	\N
6274f891-7c97-48cd-9867-31ed054144a9	Arthur	Shelby	Limited	2024-02-01 10:14:52.97	North-England	Birmingham		\N	111-055-2554	\N	Business Man	MALE		\N	\N
patient-1	John	A.	Doe	1990-01-01 00:00:00	Addis Ababa	Addis Ababa	01	123	0911000000	john.doe@example.com	\N	MALE	hashed_password	\N	\N
patient-2	Jane	B.	Smith	1985-05-15 00:00:00	Oromia	Adama	02	456	0912000000	jane.smith@example.com	\N	FEMALE	hashed_password	\N	\N
7c3865ea-fef2-48c5-b53c-477cb61edb0a	Bereket	Beyene	Demes	2003-07-10 00:00:00	Addis Ababa	Addis Ababa	Saris Addis Sefer	12	0985404351	beaglewizpatrix726@gmail.com	Student	MALE		0909090909	Beyene Demes
93d27043-d622-4784-968e-9c908d1fc409	Hilal	Rahmeto	Anito	2000-05-04 00:00:00	Addis Ababa	Addis Ababa	Koye	1	0924621641	hilalrhmt5@gmail.com	Student	MALE		0911717304	Rahmeto Anito
c59e7342-bf62-48fd-a6e5-77348e347e7d	Alem	Tilaye	Awegichew	1980-05-05 00:00:00	Addis Ababa	Addis Ababa	Koye	1	0927259308	a0911991679@gmail.com	House wife	MALE		0911717304	Rahmeto Anito
9206f122-5800-4126-a557-dbbfc4b03ea0	Nebil	Rahmeto	Anito	2004-02-05 00:00:00	Addis Ababa	Addis Ababa	Koye	1	0940070726	a0940070726@gmail.com	Student	MALE	123456789	0911717304	Rahmeto Anito
47cb08d0-2042-47a2-ad7d-3ade5513947a	Peter	B.	Parker	2000-10-02 00:00:00	New York	New York	Queens		0909090909	peterparker2000@gmail.com	Superhero	MALE		0910101010	May Parker
\.

--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Permission" (id, name, description, "roleId") FROM stdin;
perm-001	View Patient Records	Allows viewing of patient records	role-doctor
perm-002	Edit Patient Records	Allows editing of patient records	role-doctor
perm-003	Manage Appointments	Allows managing of patient appointments	role-receptionist
perm-004	Manage Staff	Allows managing of staff information	role-administrator
perm-005	Access Admin Dashboard	Allows access to the admin dashboard	role-administrator
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name) FROM stdin;
role-doctor	Doctor
role-receptionist	Receptionist
role-administrator	Administrator
\.

--
-- Data for Name: Staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Staff" (id, username, password, "firstName", "middleName", "lastName", sex, "birthDate", region, city, woreda, kebele, "mobileNumber", email, "hireDate", "emergencyContact", "employmentStatus", notes, "departmentId", "roleId") FROM stdin;
d1f01f67-6b20-4316-add4-81dd4415fac9	drjohnsmith	securepassword123	John	Michael	Smith	MALE	1980-06-15 00:00:00	Addis Ababa	Addis Ababa	04	12	0912345678	john.smith@example.com	2015-03-25 00:00:00	0911234567	Active	{"Highly experienced in cardiac surgeries"}	general-id	role-doctor
staff-002	reception001	securepassword456	Martha	Jane	Doe	FEMALE	1992-08-20 00:00:00	Oromia	Adama	03	15	0912345679	martha.doe@example.com	2018-06-01 00:00:00	0911234568	Active	{"Excellent communication skills"}	\N	role-receptionist
staff-003	admin001	securepassword789	David	Andrew	Johnson	MALE	1975-12-05 00:00:00	Amhara	Bahir Dar	02	8	0912345680	david.johnson@example.com	2012-01-15 00:00:00	0911234569	Active	{"Experienced in hospital administration"}	\N	role-administrator
\.


--
-- Data for Name: Doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Doctor" (id, "staffId","specialization") FROM stdin;
84217cb9-4af4-4a92-941d-3d26fb64e2de	d1f01f67-6b20-4316-add4-81dd4415fac9	Cardiology
\.

COPY public."Appointment" (id, type, datetime, "scheduledAt", "updatedAt", "patientId", "doctorId", status) FROM stdin;
3ff9bcfc-3b89-4929-aa9c-329a39ef8da5	Check up	2024-11-05 00:00:00	2024-08-14 11:16:44.795	2024-08-14 11:16:44.795	patient-1	84217cb9-4af4-4a92-941d-3d26fb64e2de	Scheduled
3rd-app	Check-up	2024-07-20 00:00:00	2024-08-20 09:15:28.449	2024-08-20 09:15:28.449	9206f122-5800-4126-a557-dbbfc4b03ea0	84217cb9-4af4-4a92-941d-3d26fb64e2de	Scheduled
2nd-app	Check-up	2024-05-10 00:00:00	2024-08-20 09:15:28.449	2024-08-20 09:15:28.449	9206f122-5800-4126-a557-dbbfc4b03ea0	84217cb9-4af4-4a92-941d-3d26fb64e2de	Scheduled
1st-app	Check-up	2024-05-15 00:00:00	2024-08-20 09:15:28.449	2024-08-20 09:15:28.449	9206f122-5800-4126-a557-dbbfc4b03ea0	84217cb9-4af4-4a92-941d-3d26fb64e2de	Scheduled
4th-app	Check-up	2024-08-29 12:00:00	2024-08-29 13:40:05.411	2024-08-29 00:00:00	9206f122-5800-4126-a557-dbbfc4b03ea0	84217cb9-4af4-4a92-941d-3d26fb64e2de	Scheduled
\.



--
-- Data for Name: Invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Invoice" (id, status, "createdAt", "updatedAt", "patientId") FROM stdin;
invoice-1	Unpaid	2024-08-11 14:14:01.513	2024-08-11 14:14:01.513	patient-1
invoice-2	Paid	2024-08-11 14:14:01.535	2024-08-11 14:14:01.535	patient-2
\.


--
-- Data for Name: Invoice_Medication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Invoice_Medication" (id, quantity, "invoiceId", "medicationId") FROM stdin;
9e93d299-0b09-412e-b271-c02b4813dbab	2	invoice-1	med-1
7a6ecd81-f7d2-427e-99fa-87a61ddbdf8e	1	invoice-2	med-3
\.


--
-- Data for Name: LabResult; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LabResult" (id, "medicalRecordId") FROM stdin;
\.



--
-- Data for Name: MedicalRecord; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MedicalRecord" (id, "treatmentPlan", notes, "appointmentId", "patientId", "createdAt", "updatedAt", "medsInstruction", diagnosis, "medicalProcedures", "symptomId", symptoms, "doctorId") FROM stdin;
895d5f79-d0e8-4f36-b660-1d5ac8f8b6da	Example treatment plan	Example notes	1st-app	9206f122-5800-4126-a557-dbbfc4b03ea0	2024-08-20 09:15:28.449	2024-08-20 09:15:28.449	\N	\N	\N	\N	\N	84217cb9-4af4-4a92-941d-3d26fb64e2de
c8ed3db1-12ff-4ad7-b676-664bfdd2d0e3	Example treatment plan	Example notes	2nd-app	9206f122-5800-4126-a557-dbbfc4b03ea0	2024-08-20 09:15:28.449	2024-08-20 09:15:28.449	\N	\N	\N	\N	\N	84217cb9-4af4-4a92-941d-3d26fb64e2de
dffdf364-7cbd-4f3a-b9b1-d0e581aa1237	Example treatment plan	Example notes	3rd-app	9206f122-5800-4126-a557-dbbfc4b03ea0	2024-08-20 09:15:28.449	2024-08-20 09:15:28.449	\N	\N	\N	\N	\N	84217cb9-4af4-4a92-941d-3d26fb64e2de
\.


--
-- Data for Name: OTP; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OTP" ("mobileNumber", passcode) FROM stdin;
\.



--
-- Data for Name: PatientRecord; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PatientRecord" (id, "patientType", "patientCondition", allergies, "familyHistory", "bloodPressure", height, "patientId", temperature, weight, "bloodType") FROM stdin;
22abb26b-9361-4e0b-b16c-7f91cf333818	Out	Mild	{Peanuts}	myopia	120/80	184	9206f122-5800-4126-a557-dbbfc4b03ea0	\N	55	B+
\.


--
-- Data for Name: WorkingHours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WorkingHours" (id, date, "doctorId", "from", "to") FROM stdin;
thur-wh	Thursday	84217cb9-4af4-4a92-941d-3d26fb64e2de	9	17
\.




--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Service" (id, name, description, price) FROM stdin;
service-1	Consultation	Service provided by doctor to patient	200
service-2	Blood Test	Comprehensive blood test	30
service-3	X-Ray	Chest X-ray	75
\.




--
-- Data for Name: Symptom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Symptom" (id, name, description) FROM stdin;
\.


--
-- Data for Name: _InvoiceToService; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_InvoiceToService" ("A", "B") FROM stdin;
invoice-1	service-1
invoice-1	service-2
invoice-2	service-3
\.


--
-- Data for Name: _MedicalRecordToMedication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_MedicalRecordToMedication" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _MedicalRecordToSymptom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_MedicalRecordToSymptom" ("A", "B") FROM stdin;
\.



--
-- Name: Appointment Appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
