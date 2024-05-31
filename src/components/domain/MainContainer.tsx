'use client'
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import TaskInput from '@/components/case/TaskInput';
import TaskList from '@/components/case/TaskList';
import { useSettings } from '@/providers/SettingsProvider';

type DogData = {
	fileName: string;
	loveToRunBackwards: boolean; // 右向きの画像ならtrue
}


const dogData: DogData[] = [
	{ fileName: 'dog_belgian_groenendael.png', loveToRunBackwards: true },
	{ fileName: 'dog_bernese_mountain.png', loveToRunBackwards: false },
	{ fileName: 'dog_borzoi.png', loveToRunBackwards: false },
	{ fileName: 'dog_english_springer_spaniel.png', loveToRunBackwards: false },
	{ fileName: 'dog_great_dane.png', loveToRunBackwards: false },
	{ fileName: 'dog_great_pyrenees.png', loveToRunBackwards: true },
	{ fileName: 'dog_italian_greyhound2.png', loveToRunBackwards: false },
	{ fileName: 'dog_kooikerhondje.png', loveToRunBackwards: false },
	{ fileName: 'dog_shetland_sheepdog_blue_merle.png', loveToRunBackwards: true },
	{ fileName: 'dog_shetland_sheepdog.png', loveToRunBackwards: true },
	{ fileName: 'dog_american_cocker_spaniel.png', loveToRunBackwards: true },
];

const MainContainer: React.FC = () => {
	const [tasks, setTasks] = React.useState<string[]>([]);
	const [dogIndex, setDogIndex] = React.useState<number>(0);
	const [eaten, setEaten] = React.useState<boolean>(false);
	const { headingTrained, mounted } = useSettings();

	return (
		<div
			className={clsx(
				'max-h-[70vh] self-center relative w-full p-5 overflow-hidden'
			)}
		>
				{/*
					TaskListの端から端まで犬を移動させたい
					こういう場合には、TaskListと同じ幅を持つラッパー要素を
					使うのがよいらしい
					（横向きのスクロールバーが表示されそうだがそれは対処できる？）
				*/}
				<TaskList eaten={eaten} tasks={tasks} className='mb-5 w-[87.5%]'/>
				<div className={clsx(
					'absolute translate-x-full top-0 w-full',
					'pointer-events-none h-fit',
					'opacity-100',
					tasks.length > 0 && 'animate-come-and-eat',
				)}>
					<Image
						className={clsx(
							'w-fill h-auto',
							tasks.length > 0 ? 'opacity-100' : 'opacity-0',
							headingTrained && dogData[dogIndex].loveToRunBackwards && '-scale-x-100',
						)}
						alt='cute dog'
						width={150}
						height={150}
						src={'/to-dog-list/dogs/' + dogData[dogIndex].fileName}
						priority={true}
					/>
				</div>
			<TaskInput
				autoFocus
				onAddTask={newTask => {
					setTasks([...new Set([...tasks, newTask])]);
					if (mounted && tasks.length === 0) {
						setTimeout(() => setEaten(true), 3000);
						setTimeout(() => setTasks([]), 4000);
						setTimeout(() => setEaten(false), 5000);
						setTimeout(() => setDogIndex(v => (v + 1) % dogData.length), 5000);
					}
				}}
			/>
		</div>
	);
};


export default MainContainer;

