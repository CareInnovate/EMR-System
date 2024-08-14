import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function PatientProfile() {
	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-9 sm:px-5">
			<h1 className="text-2xl sm:text-4xl mb-5 w-full sm:w-3/4 text-left">
				My Profile
			</h1>
			<div className="flex w-full sm:w-3/4 flex-col gap-1 text-sm sm:text-lg break-words">
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						FullName
					</p>
					<p className="p-2 w-3/5 max-w-96">Thomas Shelby</p>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Age
					</p>
					<p className="p-2 w-3/5 max-w-96">32</p>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Sex
					</p>
					<p className="p-2 w-3/5 max-w-96">Male</p>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Address
					</p>
					<p className="p-2 w-3/5 max-w-96">Birmingham, England</p>
					<button>
						<FontAwesomeIcon icon={faEdit} />
					</button>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Mobile No.
					</p>
					<p className="p-2 w-3/5 max-w-96">111-255-2552</p>
					<button>
						<FontAwesomeIcon icon={faEdit} />
					</button>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Email
					</p>
					<p className="p-2 w-3/5 max-w-96 text-wrap ">
						thomashelby@gmail.com
					</p>
					<button>
						<FontAwesomeIcon icon={faEdit} />
					</button>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Emergency Contact
					</p>
					<p className="p-2 w-3/5 max-w-96">222-255-2552</p>
					<button>
						<FontAwesomeIcon icon={faEdit} />
					</button>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Occupation
					</p>
					<p className="p-2 w-3/5 max-w-96">Business Man</p>
					<button>
						<FontAwesomeIcon icon={faEdit} />
					</button>
				</div>
				<div className="flex">
					<p className="bg-slate-200 p-2 w-1/3 max-w-48 font-bold">
						Blood Type
					</p>

					<p className="p-2 w-3/5 max-w-96">B</p>
				</div>
			</div>
		</main>
	);
}
