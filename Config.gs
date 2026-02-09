/**
 * Scout Check-In System Configuration
 * Customize these variables for your Pack
 */

var CONFIG = {
  // Pack Information
  packName: "Pack 685",
  packLocation: "City, State",
  
  // Branding
  packLogoUrl: "", // URL to your pack logo image (leave empty if none)
  primaryColor: "#667eea",
  secondaryColor: "#764ba2",
  
  // Background (leave backgroundImageUrl empty to use gradient)
  backgroundImageUrl: "", // URL to background image
  backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  
  // Leadership Contact Information
  leadership: {
    cubmaster: {
      name: "Brian Shipman",
      email: "cubmaster@pack685.com",
      phone: "(555) 123-4567"
    },
    assistantCubmaster: {
      name: "Amber Alesso",
      email: "cubmaster@pack685.com",
      phone: "(555) 234-5678"
    },
    committeeChair: {
      name: "David Anderson",
      email: "packchair@pack685.com",
      phone: "(555) 345-6789"
    }
  },
  
  // Web App Settings
  webAppUrl: "https://script.google.com/macros/s/AKfycbyFytMVAE404Kz3r3V_Jv0kmFP_CunjWKLNXIZErmuSBwMm_QweS0ZvAc2-3Q12oUtDnA/exec"
};

/**
 * Get configuration settings
 */
function getConfig() {
  return CONFIG;
}

/**
 * Get CSS variables from config
 */
function getConfigCSS() {
  var bg = CONFIG.backgroundImageUrl 
    ? "url('" + CONFIG.backgroundImageUrl + "') center/cover no-repeat" 
    : CONFIG.backgroundGradient;
    
  return {
    background: bg,
    primaryColor: CONFIG.primaryColor,
    secondaryColor: CONFIG.secondaryColor
  };
}
