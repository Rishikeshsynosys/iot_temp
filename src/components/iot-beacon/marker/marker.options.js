export const getMachineMarker = (state) => {
    let fillColor;
    switch (state) {
      case "running":
        fillColor = "#34A853"; // Google Maps green
        break;
      case "stopped":
        fillColor = "#DB4437"; // Google Maps red
        break;
      default:
        fillColor = "#9E9E9E"; // Google Maps gray
        break;
    }
  
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 16 24");
    svg.innerHTML = `
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0.5" dy="0.5" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0.5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <path d="M8 0.5c-4.1 0-7.5 3.4-7.5 7.5 0 2 0.5 3.8 1.5 5.4 1.4 2.3 3.4 4.9 5.1 7.2 0.3 0.4 0.6 0.8 0.9 1.2 0.3-0.4 0.6-0.8 0.9-1.2 1.7-2.3 3.7-4.9 5.1-7.2 1-1.6 1.5-3.4 1.5-5.4 0-4.1-3.4-7.5-7.5-7.5z" 
            fill="${fillColor}" 
            filter="url(#shadow)" />
      <circle cx="8" cy="8" r="3.5" fill="white" />
    `;
  
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
  
    return {
      url: `data:image/svg+xml;base64,${window.btoa(svgString)}`,
      scaledSize: new google.maps.Size(24, 36),
      anchor: new google.maps.Point(12, 36),
    };
  };