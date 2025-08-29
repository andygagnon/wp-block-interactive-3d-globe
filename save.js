/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

// The Save function defines the content to be saved to the database.
// Since the 3D globe is dynamic, we save a static container for the view.js script to target.
export default function Save({ attributes }) {
	const { blockTitle } = attributes;
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			<RichText.Content
				tagName="h2"
				className="globe-title"
				value={blockTitle}
			/>
			<div className="globe-canvas-container" id={`globe-container-${blockProps.id}`}></div>
			<div className="globe-info-box"></div>
		</div>
	);
}
