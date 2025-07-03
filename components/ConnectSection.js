import React from "react";

export default function ConnectSection() {
  return (
    <div className="flex flex-col items-center gap-2 mt-12 mb-4">
      <span className="text-gray-400 text-sm">Created by <span className="font-semibold text-white">Nithin N</span></span>
      <div className="flex gap-4 mt-1">
        <a
          href="https://www.linkedin.com/in/nithin-n-a4b837275/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:scale-110 transition-transform"
        >
          {/* LinkedIn SVG */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#0077B5"/>
            <path d="M7.75 8.5C8.44036 8.5 9 7.94036 9 7.25C9 6.55964 8.44036 6 7.75 6C7.05964 6 6.5 6.55964 6.5 7.25C6.5 7.94036 7.05964 8.5 7.75 8.5Z" fill="white"/>
            <path d="M8.5 10H7V18H8.5V10Z" fill="white"/>
            <path d="M12.5 10H11V18H12.5V14.5C12.5 13.3954 13.3954 12.5 14.5 12.5C15.6046 12.5 16.5 13.3954 16.5 14.5V18H18V14.25C18 12.1789 16.0711 10.5 14 10.5C13.2044 10.5 12.4413 10.8161 11.8787 11.3787C11.3161 11.9413 11 12.7044 11 13.5V18H12.5V10Z" fill="white"/>
          </svg>
        </a>
        <a
          href="https://github.com/Nithin9585"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:scale-110 transition-transform"
        >
          {/* GitHub SVG */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#181717"/>
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" fill="white"/>
          </svg>
        </a>
      </div>
    </div>
  );
} 