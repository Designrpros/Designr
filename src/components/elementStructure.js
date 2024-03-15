
// This is more for documentation purposes since JS won't enforce this structure.
export const elementStructure = {
  type: '', // e.g., "heading", "image", "text"
  content: '', // Optional for text content
  src: '', // Optional for image source URL
  // Add more properties as needed for different element types
  level: 0, // Optional for nesting elements within sections
};


const tools = [
  { type: 'innerSection', icon: 'dashboard', label: 'Inner Section' },
  { type: 'heading', content: 'New Header', icon: 'title', label: 'Heading' },
  { type: 'image', icon: 'image', label: 'Image' },
  { type: 'textEditor', icon: 'edit', label: 'Text Editor' },
  { type: 'video', icon: 'videocam', label: 'Video' },
  { type: 'button', icon: 'radio_button_unchecked', label: 'Button' },
  { type: 'divider', icon: 'remove', label: 'Divider' },
  { type: 'spacer', icon: 'height', label: 'Spacer' },
  { type: 'googleMaps', icon: 'map', label: 'Google Maps' },
  { type: 'icon', icon: 'face', label: 'Icon' },
  { type: 'posts', icon: 'view_list', label: 'Posts' },
  { type: 'portfolio', icon: 'work', label: 'Portfolio' },
  { type: 'menu', icon: 'menu', label: 'Menu' },
  { type: 'form', icon: 'assignment', label: 'Form' },
  { type: 'loopGrid', icon: 'grid_on', label: 'Loop Grid' },
  { type: 'loopCarousel', icon: 'view_carousel', label: 'Loop Carousel' },
  { type: 'gallery', icon: 'photo_library', label: 'Gallery' },
  { type: 'blockquote', icon: 'format_quote', label: 'Blockquote' },
  { type: 'codeHighlight', icon: 'code', label: 'Code Highlight' },
  { type: 'sidebar', icon: 'vertical_split', label: 'Sidebar' },
  // Add other tools as needed
];

export { tools };