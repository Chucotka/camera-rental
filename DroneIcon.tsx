export const DroneIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main body */}
    <rect x="40" y="35" width="20" height="30" rx="3" fill="currentColor" />
    
    {/* Camera */}
    <circle cx="50" cy="60" r="5" fill="currentColor" />
    
    {/* Left arm */}
    <line x1="40" y1="45" x2="15" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    
    {/* Right arm */}
    <line x1="60" y1="45" x2="85" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    
    {/* Left propeller left */}
    <circle cx="15" cy="30" r="3" fill="currentColor" />
    <ellipse cx="15" cy="20" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
    
    {/* Left propeller right */}
    <circle cx="15" cy="30" r="3" fill="currentColor" />
    <ellipse cx="25" cy="30" rx="3" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
    
    {/* Right propeller left */}
    <circle cx="85" cy="30" r="3" fill="currentColor" />
    <ellipse cx="85" cy="20" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
    
    {/* Right propeller right */}
    <circle cx="85" cy="30" r="3" fill="currentColor" />
    <ellipse cx="75" cy="30" rx="3" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);
