/**
 * BLOCK: wpnet-cover-slider
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";

// const { Component, Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, InnerBlocks } = wp.editor;
const {
	PanelBody,
	PanelRow,
	TextControl,
	// SelectControl,
	RadioControl,
} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("wpnet/block-cover-slider", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("WPnet.pl - Cover slider"), // Block title.
	icon: "images-alt2", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("wpnet-cover-slider"), __("Image Carousel")],
	attributes: {
		fullheight: {
			type: "string",
			default: "false",
		},
		autoplay: {
			type: "string",
			default: "true",
		},
		speed: {
			type: "string",
			default: "500",
		},
		delay: {
			type: "string",
			default: "3000",
		},
		loop: {
			type: "string",
			default: "true",
		},
		effect: {
			type: "string",
			default: "slide",
		},
	},

	supports: {
		align: ["center", "wide", "full"],
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	edit: function (props) {
		const {
			fullheight,
			autoplay,
			loop,
			speed,
			delay,
			effect,
		} = props.attributes;

		function updateSliderSetting(event) {
			const selected = event.target.querySelector(
				"#cover-slider-loop-setting option:checked"
			);
			props.setAttributes({ loop: selected.value });
			event.preventDefault();
		}

		function updateSliderSetting(value) {
			props.setAttributes(value);
		}

		return [
			<InspectorControls>
				<PanelBody title={__("Carousel Settings")}>
					<PanelRow>
						<RadioControl
							label="Full height"
							selected={fullheight}
							options={[
								{ label: "True", value: "true" },
								{ label: "False", value: "false" },
							]}
							onChange={(option) => {
								updateSliderSetting({ fullheight: option });
							}}
						/>
					</PanelRow>
					<PanelRow>
						<RadioControl
							label="Auto Play"
							selected={autoplay}
							options={[
								{ label: "True", value: "true" },
								{ label: "False", value: "false" },
							]}
							onChange={(option) => {
								updateSliderSetting({ autoplay: option });
							}}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Delay"
							value={delay}
							onChange={(option) => {
								updateSliderSetting({ delay: option });
							}}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Speed"
							value={speed}
							onChange={(option) => {
								updateSliderSetting({ speed: option });
							}}
						/>
					</PanelRow>
					<PanelRow>
						<RadioControl
							label="Loop"
							selected={loop}
							options={[
								{ label: "True", value: "true" },
								{ label: "False", value: "false" },
							]}
							onChange={(option) => {
								updateSliderSetting({ loop: option });
							}}
						/>
					</PanelRow>
					<PanelRow>
						{/* <SelectControl */}
						<RadioControl
							label="Effect"
							selected={effect}
							options={[
								{ label: "Slide", value: "slide" },
								{ label: "Fade", value: "fade" },
								{ label: "Cube", value: "cube" },
								{ label: "Coverflow", value: "coverflow" },
								{ label: "Flip", value: "flip" },
							]}
							onChange={(option) => {
								updateSliderSetting({ effect: option });
							}}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className="wp-block-wpnet-cover-slider">
				<p className="info">
					You can create slides using the 'Cover' block. Press the '+' button
					below.
				</p>
				<InnerBlocks allowedBlocks={["core/cover"]} />
			</div>,
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function (props) {
		const {
			fullheight,
			autoplay,
			loop,
			speed,
			delay,
			effect,
		} = props.attributes;
		return (
			<div
				className={`swiper-container wpnet-swiper-container js-wpnet-swiper-container`}
				data-cover-slider-fullheight={fullheight}
				data-cover-slider-autoplay={autoplay}
				data-cover-slider-delay={delay}
				data-cover-slider-loop={loop}
				data-cover-slider-speed={speed}
				data-cover-slider-effect={effect}
			>
				<div className="swiper-wrapper wpnet-swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				<div className="swiper-pagination js-wpnet-swiper-pagination" />
				<div className="js-wpnet-swiper-button-prev swiper-button-prev wpnet-swiper-button-prev" />
				<div className="js-wpnet-swiper-button-next swiper-button-next wpnet-swiper-button-next" />
			</div>
		);
	},
});
