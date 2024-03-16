
export const elementStructure = {
  type: '', // e.g., "heading", "image", "text"
  content: '', // Optional for text content
  src: '', // Optional for image source URL
  // Add more properties as needed for different element types
  level: 0, // Optional for nesting elements within sections
  styles: {
    htmlTag: 'h2',
    textAlign: 'center',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    textShadow: 'none',
    // Add more style properties as needed
  },
};


const tools = [
  { id: 'tool-1', type: 'innerSection', icon: 'dashboard', label: 'Inner Section' },
  { id: 'tool-2', type: 'heading', content: 'New Header', icon: 'title', label: 'Heading' },
  { id: 'tool-3', type: 'image', icon: 'image', label: 'Image' },
  { id: 'tool-4', type: 'textEditor', icon: 'edit', label: 'Text Editor' },
  { id: 'tool-5', type: 'video', icon: 'videocam', label: 'Video' },
  { id: 'tool-6', type: 'button', icon: 'radio_button_unchecked', label: 'Button' },
  { id: 'tool-7', type: 'divider', icon: 'remove', label: 'Divider' },
  { id: 'tool-8', type: 'spacer', icon: 'height', label: 'Spacer' },
  { id: 'tool-9', type: 'googleMaps', icon: 'map', label: 'Google Maps' },
  { id: 'tool-10', type: 'icon', icon: 'face', label: 'Icon' },
  { id: 'tool-11', type: 'posts', icon: 'view_list', label: 'Posts' },
  { id: 'tool-12', type: 'portfolio', icon: 'work', label: 'Portfolio' },
  { id: 'tool-13', type: 'menu', icon: 'menu', label: 'Menu' },
  { id: 'tool-14', type: 'form', icon: 'assignment', label: 'Form' },
  { id: 'tool-15', type: 'loopGrid', icon: 'grid_on', label: 'Loop Grid' },
  { id: 'tool-16', type: 'loopCarousel', icon: 'view_carousel', label: 'Loop Carousel' },
  { id: 'tool-17', type: 'gallery', icon: 'photo_library', label: 'Gallery' },
  { id: 'tool-18', type: 'blockquote', icon: 'format_quote', label: 'Blockquote' },
  { id: 'tool-19', type: 'codeHighlight', icon: 'code', label: 'Code Highlight' },
  { id: 'tool-20', type: 'sidebar', icon: 'vertical_split', label: 'Sidebar' },
  // Add other tools as needed
];


export { tools };