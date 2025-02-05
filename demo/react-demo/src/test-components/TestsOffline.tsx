import React from 'react';
import { InlineIcon } from '@iconify/react/dist/offline';
import { TestIcons, toggleTest } from './TestIcons';

export function TestsOffline() {
	return (
		<section className="tests">
			<h1>Tests (offline module)</h1>

			<h2>References</h2>

			<div className="test-row">
				<TestIcons id="offline-ref1" />
				Getting reference
				<InlineIcon
					icon="demo"
					ref={(element) => {
						const key = 'offline-ref1';
						if (element?.tagName === 'svg') {
							toggleTest(key, 'success');
						} else {
							toggleTest(key, 'failed');
						}
					}}
				/>
			</div>

			<div className="test-row">
				<TestIcons id="offline-ref-missing" icon="success" />
				Getting reference for empty icon
				<InlineIcon
					icon=""
					ref={() => {
						// Cannot be called because there is no SVG to render!
						toggleTest('offline-ref-missing', 'failed');
					}}
				/>
			</div>

			<div className="test-row">
				<TestIcons id="offline-ref-missing2" icon="success" />
				Getting reference for missing icon with fallback text{' '}
				<InlineIcon
					icon="invalid"
					ref={() => {
						// Cannot be called because there is no SVG to render!
						toggleTest('offline-ref-missing2', 'failed');
					}}
				>
					😀
				</InlineIcon>
			</div>

			<h2>Style</h2>

			<div className="test-row">
				<TestIcons id="offline-style" />
				Inline style for icon
				<InlineIcon
					icon="demo"
					style={{
						color: '#1769aa',
						fontSize: '24px',
						lineHeight: '1em',
						verticalAlign: '-0.25em',
					}}
					ref={(element) => {
						const key = 'offline-style';
						if (element?.tagName === 'svg') {
							let errors = false;

							// Get style
							const style = element.style;

							switch (style.color.toLowerCase()) {
								case 'rgb(23, 105, 170)':
								case '#1769aa':
									break;

								default:
									console.log('Invalid color:', style.color);
									errors = true;
							}

							if (style.fontSize !== '24px') {
								console.log(
									'Invalid font-size:',
									style.fontSize
								);
								errors = true;
							}

							if (style.verticalAlign !== '-0.25em') {
								console.log(
									'Invalid vertical-align:',
									style.verticalAlign
								);
								errors = true;
							}

							toggleTest(key, errors ? 'failed' : 'success');
						} else {
							toggleTest(key, 'failed');
						}
					}}
				/>
			</div>

			<div className="test-row">
				<TestIcons id="offline-color1" />
				Green color from attribute:{' '}
				<InlineIcon
					icon="demo"
					color="green"
					ref={(element) => {
						const key = 'offline-color1';
						if (element?.tagName === 'svg') {
							let errors = false;

							// Get style
							const style = element.style;

							switch (style.color.toLowerCase()) {
								case 'rgb(0, 128, 0)':
								case '#008000':
								case 'green':
									break;

								default:
									console.log('Invalid color:', style.color);
									errors = true;
							}

							toggleTest(key, errors ? 'failed' : 'success');
						} else {
							toggleTest(key, 'failed');
						}
					}}
				/>
			</div>

			<div className="test-row">
				<TestIcons id="offline-color2" />
				Green color from style:{' '}
				<InlineIcon
					icon="demo"
					style={{
						color: 'green',
					}}
					ref={(element) => {
						const key = 'offline-color2';
						if (element?.tagName === 'svg') {
							let errors = false;

							// Get style
							const style = element.style;

							switch (style.color.toLowerCase()) {
								case 'rgb(0, 128, 0)':
								case '#008000':
								case 'green':
									break;

								default:
									console.log('Invalid color:', style.color);
									errors = true;
							}

							toggleTest(key, errors ? 'failed' : 'success');
						} else {
							toggleTest(key, 'failed');
						}
					}}
				/>
			</div>

			<div className="test-row">
				<TestIcons id="offline-color3" />
				Green color from attribute (overrides style) + red from style:{' '}
				<InlineIcon
					icon="demo"
					color="green"
					style={{
						color: 'red',
					}}
					ref={(element) => {
						const key = 'offline-color3';
						if (element?.tagName === 'svg') {
							let errors = false;

							// Get style
							const style = element.style;

							switch (style.color.toLowerCase()) {
								case 'rgb(0, 128, 0)':
								case '#008000':
								case 'green':
									break;

								default:
									console.log('Invalid color:', style.color);
									errors = true;
							}

							toggleTest(key, errors ? 'failed' : 'success');
						} else {
							toggleTest(key, 'failed');
						}
					}}
				/>
			</div>
		</section>
	);
}
