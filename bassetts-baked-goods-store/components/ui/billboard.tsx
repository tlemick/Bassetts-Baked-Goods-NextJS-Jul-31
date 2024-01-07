import type { Billboard } from '@/types';

interface BillboardProps {
	data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
	console;
	return (
		<div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
			<div
				style={{ backgroundImage: `url(${data?.imageUrl})` }}
				className="relative rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
			>
				<div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8"></div>
			</div>
		</div>
	);
};

export default Billboard;
