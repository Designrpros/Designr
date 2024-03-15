// Initial configuration for a new website
const initialWebsiteConfig = {
    sections: [
      {
        id: 'section-1',
        type: 'header',
        elements: [
          { id: 'element-1', type: 'text', content: 'Welcome to My Website' }
        ]
      },
      {
        id: 'section-2',
        type: 'content',
        elements: [
          { id: 'element-2', type: 'text', content: 'Here is some introductory content about the website.' },
          { id: 'element-3', type: 'image', src: 'path/to/image.jpg', alt: 'An example image' }
        ]
      }
      // Add more sections as needed
    ]
    // Include other global settings as needed
  };
  


  // Function to load website configuration from local storage
const loadWebsiteConfigFromLocalStorage = (websiteId) => {
    try {
      const storedConfig = localStorage.getItem(`websiteConfig_${websiteId}`);
      if (storedConfig) {
        return JSON.parse(storedConfig);
      } else {
        // If no configuration is found, return the initial configuration
        return initialWebsiteConfig;
      }
    } catch (error) {
      console.error("Failed to load website configuration:", error);
      return initialWebsiteConfig; // Return initial config on error
    }
  };
  
  // Function to save website configuration to local storage
  const saveWebsiteConfigToLocalStorage = (websiteId, config) => {
    try {
      localStorage.setItem(`websiteConfig_${websiteId}`, JSON.stringify(config));
      console.log('Website configuration saved successfully.');
    } catch (error) {
      console.error("Failed to save website configuration:", error);
    }
  };
  