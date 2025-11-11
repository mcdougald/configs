'use client';
import {
	SiJavascript,
	SiMarkdown,
	SiMdx,
	SiReact,
	SiTypescript,
} from '@icons-pack/react-simple-icons';
import { FileIcon, TerminalIcon } from 'lucide-react';
import { FC, SVGProps } from 'react';

type Icon = {
	language: string[];

	icon: FC<SVGProps<SVGSVGElement>>;
};

const icons: Icon[] = [
	{
		language: ['javascript', 'js', 'mjs', 'cjs'],
		icon: SiJavascript,
	},
	{
		language: ['typescript', 'ts', 'mts', 'cts'],
		icon: SiTypescript,
	},
	{
		language: ['jsx', 'tsx'],
		icon: SiReact,
	},
	{
		language: ['sh', 'bash', 'zsh'],
		icon: TerminalIcon,
	},
	{
		language: ['markdown', 'md'],
		icon: SiMarkdown,
	},
	{
		language: ['mdx'],
		icon: SiMdx,
	},
];

const languageToIcon = new Map<string, FC<SVGProps<SVGSVGElement>>>();

for (const icon of icons) {
	for (const language of icon.language) {
		languageToIcon.set(language, icon.icon);
	}
}

export const getIconByLanguage = (
	language: string,
): FC<SVGProps<SVGSVGElement>> => {
	return languageToIcon.get(language) ?? FileIcon;
};
