import type { FullIconifyIcon } from '@iconify/utils/lib/icon';
import { iconToSVG } from '@iconify/utils/lib/svg/build';
import {
	elementDataProperty,
	IconifyElement,
	IconifyElementProps,
	IconifyElementData,
} from '../scanner/config';
import { applyClasses, iconClasses } from './classes';
import { generateHTML } from './html';
import { applyStyle } from './style';

const commonProps: Record<string, string> = {
	display: 'inline-block',
};

const monotoneProps: Record<string, string> = {
	'background-color': 'currentColor',
};

const coloredProps: Record<string, string> = {
	'background-color': 'transparent',
};

// Dynamically add common props to variables above
const propsToAdd: Record<string, string> = {
	image: 'var(--svg)',
	repeat: 'no-repeat',
	size: '100% 100%',
};
const propsToAddTo: Record<string, Record<string, string>> = {
	'-webkit-mask': monotoneProps,
	'mask': monotoneProps,
	'background': coloredProps,
};
for (const prefix in propsToAddTo) {
	const list = propsToAddTo[prefix];
	for (const prop in propsToAdd) {
		list[prefix + '-' + prop] = propsToAdd[prop];
	}
}

/**
 * Render icon as inline SVG
 */
export function renderBackground(
	element: IconifyElement,
	props: IconifyElementProps,
	iconData: FullIconifyIcon
): IconifyElement {
	// Generate data to render
	const renderData = iconToSVG(iconData, {
		...props.customisations,
	});
	const renderAttribs = renderData.attributes;

	// Get old data
	const oldData = element[elementDataProperty];

	// Generate SVG
	const svgAttribs: Record<string, string> = {
		...renderAttribs,
	};
	svgAttribs.width = iconData.width.toString();
	svgAttribs.height = iconData.height.toString();
	const html = generateHTML(svgAttribs, renderData.body);

	// Add classes
	const classesToAdd = iconClasses(props.icon);
	const addedClasses = applyClasses(
		element,
		classesToAdd,
		new Set(oldData && oldData.addedClasses)
	);

	// Update style
	const isMonotone = renderData.body.indexOf('currentColor') !== -1;
	const url =
		'url("data:image/svg+xml,' +
		html
			.replace(/"/g, "'")
			.replace(/%/g, '%25')
			.replace(/#/g, '%23')
			.replace(/{/g, '%7B')
			.replace(/}/g, '%7D')
			.replace(/</g, '%3C')
			.replace(/>/g, '%3E') +
		'")';
	const newStyles: Record<string, string> = {
		'--svg': url,
		'width': renderAttribs.width,
		'height': renderAttribs.height,
		...commonProps,
		...(isMonotone ? monotoneProps : coloredProps),
	};
	if (renderData.inline) {
		newStyles['vertical-align'] = '-0.125em';
	}

	const addedStyles = applyStyle(
		element,
		newStyles,
		oldData && oldData.addedStyles
	);

	// Add data to element
	const newData: IconifyElementData = {
		...props,
		status: 'loaded',
		addedClasses,
		addedStyles,
	};
	element[elementDataProperty] = newData;

	return element;
}
