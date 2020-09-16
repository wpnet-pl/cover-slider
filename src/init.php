<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package WPnet
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function wpnet_cover_slider_assets() { // phpcs:ignore
	// Styles.
	wp_register_style('swiper', "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.css", false, '', 'all');
	wp_enqueue_style('swiper');

	wp_enqueue_style(
		'wpnet_cover_slider-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	wp_register_script('swiper', "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/js/swiper.min.js", '', '', true);
	wp_enqueue_script('swiper');

	wp_register_script('wpnet_cover_slider-swiper-init-js', plugins_url( 'src/js/swiper-init.js', dirname( __FILE__ ) ), array("swiper"), '', true);
	wp_enqueue_script('wpnet_cover_slider-swiper-init-js');
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'wpnet_cover_slider_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function wpnet_cover_slider_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'wpnet_cover_slider-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'wpnet_cover_slider-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'wpnet_cover_slider_editor_assets' );
