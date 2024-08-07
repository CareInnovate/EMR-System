export default function Profile() {
	return (
		<main className="w-4/5 inset-0 m-auto flex flex-col items-center gap-3 py-1 px-5">
			<h1 className="text-4xl mb-5 w-3/4 text-left">My Profile</h1>
			<div className="flex w-3/4">
				<div className="min-w-32 w-max flex flex-col gap-1 text-lg font-bold">
					<div>
						<p className="bg-slate-200 p-2">FullName</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Age</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Sex</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Address</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Mobile No.</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Email</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Emergency Contact</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Occupation</p>
					</div>
					<div>
						<p className="bg-slate-200 p-2">Blood Type</p>
					</div>
				</div>
				<div className="w-1/2 flex flex-col gap-1 text-lg">
					<div className="flex justify-between w-2/3">
						<p className="p-2">Thomas Shelby</p>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">32</p>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">Male</p>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">Birmingham, England</p>
						<button>Edit</button>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">111-255-2552</p>
						<button>Edit</button>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">thomashelby@gmail.com</p>
						<button>Edit</button>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">222-255-2552</p>

						<button>Edit</button>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">Business Man</p>
						<button>Edit</button>
					</div>
					<div className="flex justify-between w-2/3">
						<p className="p-2">B</p>
					</div>
				</div>
			</div>
		</main>
	);
}
